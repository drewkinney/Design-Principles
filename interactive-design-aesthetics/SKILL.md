---
name: interactive-design-aesthetics
description: >
  Audits any website, app, or interface against Drew Kinney's aesthetic-first
  interactive design framework — 15 principles across Norman's three affect domains
  (Visceral, Behavioral, Reflective). Triggers on: /interactive-design-aesthetics,
  any request to audit, critique, evaluate, or redesign a UI or UX, references to
  affordance, hierarchy, color psychology, navigation, interaction patterns, or user
  trust. Renders findings as an interactive dashboard artifact — not a text report —
  with checkboxes per finding, live screenshot capture, model selector, and one-click
  prompt dispatch to Claude or external models. Use when asked to design, audit,
  wireframe, prototype, or evaluate any interactive surface including websites,
  apps, touch interfaces, kiosks, spatial UI, and data visualizations.
sub_skills:
  - PRE-AUDIT.md
  - VISCERAL.md
  - BEHAVIORAL.md
  - REFLECTIVE.md
  - POST-DESKTOP.md
  - DASHBOARD.md
  - HANDOFF.md
---

# Orchestrator

This file manages execution order, parallelism, and final output.
It contains no audit logic — that lives in the sub-skills.

---

## Execution Plan

### Step 1 — Sequential (must complete before Step 2)

Load PRE-AUDIT.md. Run it against the target interface.
Output: preAudit object { emotion, mentalModel, conversionGoal, actualUser }

### Step 2 — Parallel (run all four simultaneously)

Load and execute these sub-skills at the same time.
Do not wait for one to finish before starting the next.

  VISCERAL.md    → findings[] for principles 1–5, domain: visceral
  BEHAVIORAL.md  → findings[] for principles 6–11, domain: behavioral
  REFLECTIVE.md  → findings[] for principles 12–15, domain: reflective
  POST-DESKTOP.md → postDesktop[] flags appended to relevant findings

Each sub-skill returns a findings array. Run them in a single pass —
process all four domains in parallel within the same generation, not sequentially.
This means: think through all four domain audits at once, not one after another.

### Step 3 — Merge

Combine all returned arrays into the master audit object:

{
  "url": "<target>",
  "preAudit": { ...from PRE-AUDIT.md },
  "findings": [ ...visceral[], ...behavioral[], ...reflective[] ],
  "postDesktop": [ ...from POST-DESKTOP.md ],
  "specificDecisions": [ "derived from FAILS and MIXED findings" ],
  "validationQuestion": "single most critical test before any fix is built"
}

specificDecisions: extract the most concrete, numbered action from each
FAILS or MIXED finding recommendation. Maximum one decision per finding.

validationQuestion: one sentence. The single observation that would confirm
or invalidate the most important recommendation in the audit.

### Step 4 — Render

Load DASHBOARD.md. Build the React artifact.
Load HANDOFF.md. Implement action panel.

---

## Output Rules — Non-Negotiable

1. Output NOTHING before the artifact. Zero preamble. No "Here is the audit."
2. Do NOT show raw JSON, markdown findings, code blocks, or text reports.
3. Do NOT show the sub-skill files or their contents.
4. Do NOT show the original prompt inside the dashboard.
5. ALL output — findings, pre-audit answers, decisions, validation question,
   model selector, prompt preview, model response — lives inside the artifact.
6. The artifact IS the response. Nothing else.
