# Design Principles

The desktop metaphor died. Design kept decorating its corpse. Touch, spatial, ambient, worn — each new surface arrived without a design logic. Engineers filled the gap. They still do. Aesthetic judgment isn't window dressing. It's the only lever designers own. Use it or lose the seat.

---

## /interactive-design-aesthetics

A Claude skill that audits any website, app, or interface against Drew Kinney's aesthetic-first interactive design framework — derived from his 2009 MFA thesis at Miami International University of Art & Design — and delivers findings as an interactive dashboard, not a text report.

### What it does

Point it at a URL or describe an interface. The skill runs a structured audit across 15 design principles organized into Norman's three affect domains (Visceral, Behavioral, Reflective), then renders an interactive dashboard where you review findings, flag issues for correction, and dispatch a targeted prompt to the AI model of your choice.

The dashboard captures a live screenshot of the audited site, pre-checks all failing and mixed findings, and passes the screenshot as an image alongside the prompt when sending to a Claude model — so the receiving model has direct visual context, not just a description.

### What's included

```
interactive-design-aesthetics/
├── SKILL.md       Audit engine — 15 principles, four pre-audit questions,
│                  structured JSON output spec, output rules
├── DASHBOARD.md   React artifact spec — findings grouped by domain,
│                  checkboxes, scorecard, select controls
└── HANDOFF.md     Prompt assembly template, Microlink screenshot capture,
                   Anthropic API direct call with image block,
                   external model clipboard + navigate fallback
```

**SKILL.md** runs the audit and compiles all findings into a structured JSON object. It does not output raw markdown. It delegates rendering entirely to the sub-skills.

**DASHBOARD.md** defines the React artifact: findings grouped by Visceral, Behavioral, and Reflective domains; verdict badges (PASSES / FAILS / MIXED / UNSCORED); expand/collapse per finding; FAILS and MIXED pre-checked by default; scorecard pills in the header; Select All Failing and Deselect All controls.

**HANDOFF.md** handles the right-panel action layer: builds the correction prompt from checked findings using a structured template, captures a screenshot via Microlink API (free, no key required), and dispatches. For Anthropic models it calls the API directly and attaches the screenshot as a base64 image block. For external models (GPT-4o, Gemini 2.5 Pro, Mistral Large) it copies the prompt to the clipboard and opens the model URL in a new tab.

### Model options

| Model | Type | Default |
|---|---|---|
| Claude Sonnet 4.6 | Anthropic direct API | Yes |
| Claude Opus 4.6 | Anthropic direct API | |
| Claude Haiku 4.5 | Anthropic direct API | |
| GPT-4o | Clipboard + openai.com | |
| Gemini 2.5 Pro | Clipboard + aistudio.google.com | |
| Mistral Large | Clipboard + console.mistral.ai | |

### The 15 principles

Aesthetic Effect, Affordance, Proximity/Chunking, Color & Psychology, Common Fate, Consistency/Similarity, Efficiency of Use, Experience/Emotion, Figure/Ground, Fitt's Law, Hierarchy/Sequence, Learnable/Memorable, Mental Models, Process Funnel, You Are Not the User.

Each scored PASSES / FAILS / MIXED / UNSCORED, assigned to a Norman domain, and accompanied by a finding summary, full detail, and a specific recommendation when the verdict is not PASSES.

---

## How to use it

### Install the skill in Claude

Claude skills live at `/mnt/skills/user/` in Claude's container environment. To install:

1. Clone this repo
2. Copy the `interactive-design-aesthetics/` directory into `/mnt/skills/user/`

```
cp -r interactive-design-aesthetics /mnt/skills/user/
```

Claude reads skill directories on load. The `SKILL.md` description field tells Claude when to trigger the skill automatically.

### Trigger it in conversation

Type `/interactive-design-aesthetics` followed by a URL or interface description:

```
/interactive-design-aesthetics apple.com
/interactive-design-aesthetics our checkout flow on mobile
/interactive-design-aesthetics [paste a description of the interface]
```

Claude runs the audit, renders the dashboard artifact, and waits for your input.

### Use the dashboard

1. Expand any finding card to read the full detail and recommendation
2. Check the issues you want corrected — FAILS and MIXED are pre-checked by default
3. Use Select All Failing or Deselect All as needed
4. Choose your target model from the dropdown
5. Click Generate Prompt — the assembled prompt appears in the right panel
6. Click Send to Model — Claude models get a direct API call with the screenshot attached; external models get clipboard + browser open

### Export as file

After review, ask Claude to export the audit:

```
export this as a markdown file
export this as a word doc
```

---

## Framework source

Kinney, Drew. *Aesthetic-First Interactive Design.* MFA Thesis, Miami International University of Art & Design, 2009.

Norman, Donald. *Emotional Design: Why We Love (or Hate) Everyday Things.* Basic Books, 2004.

Tschumi, Bernard. *Architecture and Disjunction.* MIT Press, 1994.

Han, Byung-Chul. *In the Swarm: Digital Prospects.* MIT Press, 2017.
