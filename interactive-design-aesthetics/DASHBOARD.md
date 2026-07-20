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

### Data-Injection Pipeline

Claude performs all computation before rendering the artifact. No API calls from the artifact — works in Claude Code desktop, web, and all environments without any API key.

```
/interactive-design-aesthetics [target]
  → [1. AUDIT (Claude)]
  → [2. SVG MOCKUP (Claude)]
  → [3. HTML PROTOTYPE (Claude)]
  → [4. Artifact rendered with data injected as constants]
```

**Phase 1: Audit**
- Claude evaluates all 15 principles using the framework
- Output: compact JSON per schema
- Constraints: verdicts 6 words max, findings/fixes 12 words max, max 3 violations, max 4 strengths

**Phase 2: SVG Mockup**
- Claude generates raw SVG applying violation fixes
- Constraints: `rect`, `text`, `line`, `circle` only — no `path`, `gradient`, `clipPath`, `defs`
- Max 48 elements. Renders inline via `dangerouslySetInnerHTML`

**Phase 3: HTML Prototype**
- Claude generates minimal self-contained HTML for top fix
- Constraints: inline CSS only, no `<script>` tags, hard 60-line limit
- Renders in sandboxed `<iframe srcDoc>`

**Phase 4: Artifact**
- Claude renders `design-audit.jsx` with three constants filled at the top:
  ```javascript
  const AUDIT_DATA = { /* audit JSON */ };
  const SVG_MARKUP = `<svg ...>...</svg>`;
  const PROTO_HTML = `...html...`;
  ```
- `useState` initializes from these constants. Artifact starts in `"done"` phase immediately.

---

## State

```javascript
const [phase, setPhase]         // "empty" | "done"
const [audit]                   // parsed audit JSON (from AUDIT_DATA constant)
const [svgMarkup]               // raw SVG string (from SVG_MARKUP constant)
const [proto]                   // raw HTML string (from PROTO_HTML constant)
const [model, setModel]         // selected model ID
const [copied, setCopied]       // prompt copy confirmation
const [mdCopied, setMdCopied]   // markdown copy confirmation
const [mdOverlay, setMdOverlay] // markdown report overlay visible
```

---

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

### Empty Phase
Shown when `AUDIT_DATA` is null (template state) or after "NEW AUDIT" is clicked. Centered. Displays skill invocation instruction: `/interactive-design-aesthetics [target]`. No form, no button — user runs a new audit from Claude Code.

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

## External Image APIs

All third-party image generation APIs (Google, OpenAI, Stability AI, Replicate, Ideogram) cannot be called from the artifact. This is not fixable from component code. The Image Model selector generates copyable prompts for each platform — user pastes externally.

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
