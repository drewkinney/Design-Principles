---
name: interactive-design-aesthetics/dashboard
description: >
  Sub-skill of /interactive-design-aesthetics.
  Renders audit findings as an interactive React artifact dashboard.
  Called automatically at the end of every audit. Never called standalone.
---

# Dashboard Sub-Skill

## Purpose

Convert the structured audit JSON into an interactive React artifact dashboard.
The dashboard is the audit's only output format.

---

## React Artifact Specification

### Layout — Three Columns

Left panel (30%): pre-audit summary (four questions), scorecard table
Center panel (45%): findings list with checkboxes, grouped by Norman domain
Right panel (25%): action panel — model selector, prompt preview, dispatch button

### Color System (CSS vars, transparent background)

Use var(--text-primary), var(--text-secondary), var(--bg-primary), var(--border-subtle).
Verdict badges:
- PASSES — green (#22c55e), text white
- FAILS — red (#ef4444), text white  
- MIXED — amber (#f59e0b), text black
- UNSCORED — grey (#6b7280), text white

Domain section headers:
- VISCERAL — var(--accent, #8b5cf6) or purple-ish
- BEHAVIORAL — var(--accent, #3b82f6) or blue-ish
- REFLECTIVE — var(--accent, #10b981) or green-ish

### Findings List (center panel)

Group findings by domain: Visceral → Behavioral → Reflective.
Each finding card contains:
- Checkbox (left) — checked state drives prompt generation
- Principle name (bold)
- Verdict badge
- Summary text (always visible)
- "Detail" expand toggle — clicking reveals full detail + recommendation
- If verdict is FAILS or MIXED: recommendation text shown in amber block after expand

Default state: FAILS and MIXED findings pre-checked. PASSES unchecked.

### Action Panel (right panel)

Model selector dropdown:
```
Label: "Target Model"
Options (in order):
  - Claude Sonnet 4.6 [default] — type: anthropic, id: claude-sonnet-4-6
  - Claude Opus 4.6             — type: anthropic, id: claude-opus-4-6
  - Claude Haiku 4.5            — type: anthropic, id: claude-haiku-4-5-20251001
  - GPT-4o                      — type: external, url: https://chat.openai.com
  - Gemini 2.5 Pro              — type: external, url: https://aistudio.google.com
  - Mistral Large               — type: external, url: https://console.mistral.ai
```

Below dropdown: screenshot URL field (auto-populated from HANDOFF.md screenshot logic).

"Generate Prompt" button:
- Assembles prompt from checked findings (see HANDOFF.md for prompt template)
- Shows prompt in a scrollable textarea in the right panel

"Send to Model" button (appears after prompt is generated):
- If type: anthropic — call Anthropic API directly (see HANDOFF.md)
- If type: external — copy prompt to clipboard + open model URL in new tab
- Show loading state while API responds
- Stream or display response in an expandable results pane below findings

### Scorecard Table (left panel, bottom)

| Domain | Score |
|--------|-------|
| Visceral | X/N |
| Behavioral | X/N |
| Reflective | X/N |
| Overall | X/15 |

Where X = count of PASSES, N = total findings in that domain.

### Select Controls

"Select All Failing" button — checks all FAILS + MIXED
"Deselect All" button — unchecks everything
Count display: "N issues selected"

---

## Data Hydration

The structured audit JSON from SKILL.md is the initialState for the component.
Hardcode it as a const at the top of the artifact — do not fetch it.

```jsx
const AUDIT_DATA = { /* paste the full JSON object here */ }
```

All findings, recommendations, and pre-audit answers come from this object.
The artifact renders from this data, not from re-running the audit.

---

## States to Handle

loading — initial render, data parsing
ready — normal interactive state
generating — prompt being assembled
sending — API call in progress
response — model response received, displayed in results pane
error — API or screenshot failure, show inline error with retry button
