---
name: interactive-design-aesthetics/dashboard
description: >
  Sub-skill. Renders ALL audit output as a React artifact dashboard.
  No text report. No code shown. No raw JSON. Everything lives in the artifact.
  Called by the orchestrator after all parallel sub-skills complete and merge.
---

# Dashboard Sub-Skill

## Absolute Rules

1. No code shown to the user — ever. The artifact IS the output.
2. No raw JSON, markdown, or text findings outside the artifact.
3. No preamble before the artifact. Zero sentences.
4. The original prompt does NOT appear anywhere in the dashboard.
5. Everything else does: findings, pre-audit, decisions, validation question,
   post-desktop checks, model selector, prompt preview, model response.

---

## Layout

Two-column layout. Fixed header. No outer scroll — internal panels scroll independently.

HEADER (full width)
- Site/interface name (left)
- Scorecard pills: Visceral X/5 | Behavioral X/6 | Reflective X/4 | Total X/15 (right)
- Post-desktop status badge if any checks failed

LEFT COLUMN (60%)
Tab strip: Findings | Post-Desktop | Decisions | Validation

  FINDINGS TAB (default)
  Grouped by domain: Visceral → Behavioral → Reflective
  Each group has a domain header with colored dot and domain score
  Each finding card:
    - Checkbox (FAILS and MIXED pre-checked by default)
    - Principle name + verdict badge
    - Summary (always visible)
    - Expand toggle → reveals detail paragraph + recommendation block
    - Recommendation shown in amber left-border block when expanded
  
  POST-DESKTOP TAB
  Grid of check cards, one per returned postDesktop item
  Each card: check name, surface, verdict badge, evidence, fix
  Color-coded by verdict (same system as findings)
  
  DECISIONS TAB
  Numbered list of specific decisions derived from FAILS and MIXED
  Each decision has a checkbox
  Checked decisions are included in the handoff prompt
  
  VALIDATION TAB
  Single card with the validation question
  Button: "Add to prompt" — appends the validation question to the generated prompt

RIGHT COLUMN (40%)
Sticky. Scrolls independently.

  SELECTION CONTROLS
  "Select all failing" | "Deselect all" | "N issues selected" count

  MODEL SELECTOR
  Dropdown label: "Target model"
  Options:
    Claude Sonnet 4.6 [default] — anthropic — claude-sonnet-4-6
    Claude Opus 4.6             — anthropic — claude-opus-4-6
    Claude Haiku 4.5            — anthropic — claude-haiku-4-5-20251001
    GPT-4o                      — external  — https://chat.openai.com
    Gemini 2.5 Pro              — external  — https://aistudio.google.com
    Mistral Large               — external  — https://console.mistral.ai

  SCREENSHOT PANEL
  Auto-captures on mount via Microlink API (see HANDOFF.md)
  Shows thumbnail if captured; shows "Unavailable" with URL fallback if not
  Included as image block in Anthropic API calls

  GENERATE PROMPT BUTTON
  Assembles prompt from: checked findings + checked decisions + validation question (if added)
  Uses template from HANDOFF.md
  Renders prompt in scrollable read-only textarea below button

  SEND BUTTON (appears after prompt generated)
  Label: "Send to [Model Name]"
  Anthropic models → direct API call with screenshot as image block
  External models → copy to clipboard + open URL in new tab
  Shows loading state during API call

  RESPONSE PANEL (appears after send)
  Scrollable text area
  Renders model response
  "Copy response" button
  "Clear" button to reset

---

## Verdict Badge Colors

PASSES  — green background (#22c55e), white text
FAILS   — red background (#ef4444), white text
MIXED   — amber background (#f59e0b), black text
UNSCORED — grey background (#6b7280), white text

## Domain Colors

VISCERAL   — purple (#a855f7)
BEHAVIORAL — blue (#3b82f6)
REFLECTIVE — green (#22c55e)

## States

loading    — skeleton cards while data hydrates
ready      — normal interactive state
generating — prompt assembly in progress (brief spinner)
sending    — API call in progress (animated dots)
response   — model response received
error      — API or screenshot failure; inline error with retry

---

## Data Hydration

The full merged audit object from the orchestrator is hardcoded as a const
at the top of the artifact:

const AUDIT_DATA = { /* full merged JSON */ }

All rendering is driven from this object. No external fetches for audit data.
The only external fetch is the Microlink screenshot capture (see HANDOFF.md).

---

## Tab Persistence

Active tab state persists across interactions.
Checking a finding does not reset the active tab.
Opening the model response does not collapse the findings panel.
