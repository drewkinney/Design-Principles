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
  - DASHBOARD.md
---

# Orchestrator — Minimal

This file does one thing: extract the target URL or interface description from
the user's message and pass it to DASHBOARD.md.

## Execution — Two Steps Only

### Step 1
Extract the audit target from the user message.
This is the URL, app name, or interface description they provided.
Call it TARGET.

### Step 2
Load DASHBOARD.md. Build the React artifact immediately.
Inject TARGET into the artifact as the url constant.

That is all. The artifact runs its own audit.
Claude does not run the audit. Claude does not process sub-skills.
Claude does not produce findings. The artifact does all of that.

## Output Rule
Zero preamble. Zero text. Render the artifact immediately.
The artifact IS the response.
