---
name: interactive-design-aesthetics/dashboard
description: >
  Technical specification for the self-running React artifact dashboard.
  Three sequential Anthropic API calls: audit JSON, SVG mockup, HTML prototype.
  Model selector covers 7 image generation targets. Markdown export included.
  See design-audit.jsx for implementation.
---

# Dashboard — Audit Artifact Technical Specification

## Overview

The dashboard is a React artifact (`.jsx`) that runs a full 15-principle design audit automatically. Input: any URL, app name, or interface description. Output: scored audit report, Claude SVG mockup, copyable image prompts for 7 external models, live HTML prototype, downloadable Markdown report.

Claude's role when invoking the dashboard: inject the target and render the artifact. The artifact runs everything else.

---

## Architecture

### Three-Phase Pipeline

All API calls go through the Anthropic passthrough. No external keys required. Google, OpenAI, and all other image generation APIs are blocked by the artifact sandbox CSP and cannot be called directly.

```
User input → [1. AUDIT] → [2. SVG MOCKUP] → [3. HTML PROTOTYPE] → Results
```

**Phase 1: Audit**
- Endpoint: `api.anthropic.com/v1/messages`
- Model: `claude-sonnet-4-20250514`
- Max tokens: 1000
- Output: compact JSON (domain scores, violations, strengths, validation question)
- Approx output size: 400-600 tokens

**Phase 2: SVG Mockup**
- Same endpoint and model
- Input: audit summary (target + violation fixes)
- Output: raw SVG element, rect/text/line/circle only, max 48 elements
- Renders inline via `dangerouslySetInnerHTML`

**Phase 3: HTML Prototype**
- Same endpoint and model
- Input: target name + top violation fix + color brief
- Output: raw HTML, inline CSS only, no JS, 60-line hard limit
- Renders in sandboxed `<iframe srcDoc>`

### Token Constraint

The artifact sandbox enforces a hard 1000-token cap per API response. All prompts are engineered to produce outputs within this ceiling. Exceeding it causes JSON truncation and parse failure.

Audit JSON schema is strictly constrained:
- `verdict` strings: 6 words max
- `finding` strings: 12 words max
- `fix` strings: 12 words max
- Max 3 violations
- Max 4 strengths

SVG generation:
- Max 48 elements
- Permitted: `rect`, `text`, `line`, `circle` only
- Forbidden: `path`, `gradient`, `clipPath`, `defs`

HTML prototype:
- Hard 60-line limit in system prompt
- Inline CSS only, no `<script>` tags

---

## State

```javascript
const [phase, setPhase]         // "input" | "loading" | "done"
const [target, setTarget]       // URL or interface description
const [step, setStep]           // 0=audit, 1=svg, 2=prototype
const [pct, setPct]             // 0-100 progress
const [audit, setAudit]         // parsed audit JSON
const [svgMarkup, setSvgMarkup] // raw SVG string
const [proto, setProto]         // raw HTML string
const [err, setErr]             // error message string
const [model, setModel]         // selected model ID
const [copied, setCopied]       // prompt copy confirmation
const [mdCopied, setMdCopied]   // markdown copy confirmation
```

---

## API Call Helper

```javascript
async function callClaude(messages, system) {
  let raw = "";
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages,
    }),
  });
  raw = await res.text();
  const data = JSON.parse(raw);
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  if (!data.content) throw new Error("No content: " + raw.slice(0, 150));
  return data.content.filter(b => b.type === "text").map(b => b.text).join("");
}
```

No `anthropic-version` header. No API key header. Both are handled by the passthrough.

---

## Audit JSON Schema

```json
{
  "target": "Interface Name",
  "visceral":   { "score": 8, "verdict": "6 words max" },
  "behavioral": { "score": 6, "verdict": "6 words max" },
  "reflective": { "score": 9, "verdict": "6 words max" },
  "overall": 8,
  "violations": [
    {
      "principle": "Principle Name",
      "severity": "high",
      "finding": "12 words max describing what breaks",
      "fix": "12 words max describing the exact change"
    }
  ],
  "strengths": ["Principle Name"],
  "validationQuestion": "10 words max"
}
```

Severity values: `high`, `medium`, `low` only.

---

## Image Model Selector

Seven models. One renders automatically (Claude SVG). Six generate copyable prompts for external platforms.

```javascript
const MODELS = [
  { id: "claude",     label: "Claude SVG",      url: null },
  { id: "nanoBanana", label: "Nano Banana Pro",  url: "https://aistudio.google.com/prompts/new_chat" },
  { id: "gpt4o",      label: "GPT-4o",           url: "https://chat.openai.com" },
  { id: "dalle",      label: "DALL-E 3",         url: "https://labs.openai.com" },
  { id: "midjourney", label: "Midjourney",       url: "https://www.midjourney.com" },
  { id: "ideogram",   label: "Ideogram",         url: "https://ideogram.ai" },
  { id: "sdxl",       label: "Stable Diffusion", url: "https://replicate.com/stability-ai/sdxl" },
]
```

Each external model receives a prompt built from `audit.target`, top 2 `violation.fix` strings, and top 2 `strength` strings. Prompt format varies by platform syntax:

| Model | Key Format Differences |
|---|---|
| Nano Banana Pro | Emphasizes text rendering accuracy, hex colors, 4K output |
| GPT-4o | Descriptive UI brief, realistic desktop framing |
| DALL-E 3 | Photorealistic UI mockup framing |
| Midjourney | `--ar 16:9 --style raw --v 6.1 --q 2` suffixes |
| Ideogram | Typography-forward, layout-specific |
| Stable Diffusion XL | Tag-style with `photorealistic, 8k` quality modifiers |

Selecting a model updates the displayed prompt and copy button label. External models show an outbound link to the platform.

---

## Markdown Report

Generated client-side from audit state. No API call.

```javascript
function buildMarkdown(audit, target, svgMarkup, model) {
  // Returns full audit report as Markdown string
  // Includes: domain score table, violations, strengths,
  //           validation question, model-specific image prompt,
  //           SVG markup in code block
}
```

Two export controls in the header:
- `COPY MD` — `navigator.clipboard.writeText(md)`
- `↓ REPORT.MD` — `URL.createObjectURL(blob)` + anchor download trigger

Report filename: `audit-[target-slug].md`

---

## Layout

### Input Phase
Centered single-column form. Target text input (Enter to submit). Error display. RUN AUDIT button.

### Loading Phase
Step label. Animated progress bar (red `#FF3D00` fill, tick marker). Three step indicators (AUDIT / SVG / BUILD) with color state: completed=`#00E5A0`, active=`#FF3D00`, pending=`#1A1A1A`. Percentage readout.

### Done Phase — three sections top to bottom

**Header bar** (always visible)
- Left: tool name
- Right: COPY MD + REPORT.MD + NEW AUDIT buttons

**Two-panel row (70vh)**

Left panel — Audit Report (scrollable):
- Interface name (DM Serif Display)
- Three domain score cards (color-coded top border)
- Overall score (large numeral)
- Violations (severity-colored left border, finding + fix)
- Strengths (tag pills)
- Validation question (italic)

Right panel — Image Output:
- Model selector pills (top, sticky)
- Claude SVG mockup (inline render, width 100%)
- Model prompt label + external link
- Prompt text block (scrollable)
- Copy prompt button
- CSP note for external models

**Prototype row (68vh)**
- Label bar
- Sandboxed iframe (`sandbox="allow-scripts"`)

---

## CSP Constraint Reference

Artifact sandbox `connect-src` allowlist (abbreviated):
```
https://api.anthropic.com      ← passthrough, works
https://cdnjs.cloudflare.com   ← CDN libs, works
https://cdn.jsdelivr.net       ← CDN libs, works
https://www.claudeusercontent.com
```

Blocked (all image generation APIs):
```
https://generativelanguage.googleapis.com  ← Nano Banana Pro / Gemini
https://api.openai.com                     ← GPT-4o / DALL-E
https://api.stability.ai                   ← Stable Diffusion
https://api.replicate.com                  ← Replicate
https://api.ideogram.ai                    ← Ideogram
```

This is not fixable from component code. Image generation must happen externally via copied prompts.

---

## Design System

```
Fonts:       Bebas Neue (labels), DM Serif Display (display), JetBrains Mono (UI/data)
Background:  #0A0A0A root  |  #0D0D0D surface  |  #080808 bars  |  #141414 borders
Text:        #F0EBE0 primary  |  #999 secondary  |  #666 muted  |  #444 labels
Scores:      #00E5A0 (>=8)  |  #FFD600 (>=6)  |  #FF3D00 (<6)
Severity:    #FF3D00 high  |  #FFD600 medium  |  #00E5A0 low
Accent:      #FF3D00
```

---

## Files

```
interactive-design-aesthetics/
  SKILL.md          ← Framework documentation + dashboard overview
  DASHBOARD.md      ← This file — technical specification
  design-audit.jsx  ← React artifact implementation
  BEHAVIORAL.md     ← Behavioral domain detail
  REFLECTIVE.md     ← Reflective domain detail
  VISCERAL.md       ← Visceral domain detail
  POST-DESKTOP.md   ← Post-desktop rules detail
  PRE-AUDIT.md      ← Pre-audit questions
  HANDOFF.md        ← Design handoff guidance
```
