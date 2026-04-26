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
  - HANDOFF.md
---

# Interactive Design: Aesthetic-First Framework

*Source: Kinney, Drew. MFA Thesis, Miami International University of Art & Design, 2009.*

---

## Core Position

Aesthetic judgment drives experience. Architecture supports it. Not the reverse.

Tschumi: "Designing conditions, rather than conditioning designs."
Han: "Interfaces should start conforming to us."

---

## Three Affect Domains (Norman)

| Domain | What | Target |
|---|---|---|
| Visceral | First-contact impact | Trust, attraction |
| Behavioral | Usability of actual use | Ease, feedback, efficiency |
| Reflective | Memory after use | Loyalty, return |

Visceral primes Behavioral. Skip Visceral and users start fighting friction from the first interaction.

---

## 15 Principles

1. Aesthetic Effect — Aesthetics introduced after architecture is lipstick. Attractive interfaces test as more usable before use begins. Ask: Does the first screen produce trust, or neutral?

2. Affordance — Visual signal that tells a user what an element does. Violate once and the trust chain breaks. Ask: Can a new user act without instruction?

3. Proximity / Chunking — Near objects read as related. Content breaks into scannable units. Ask: Do related elements cluster? Can a user find what they need in 5 seconds?

4. Color & Psychology — Color is functional. Every decision targets a specific Visceral response. Ask: What emotion does each dominant color produce? Is that the right one?

5. Common Fate — Objects moving the same direction read as a group. Misaligned animation creates confusion. Ask: Does motion confirm or contradict grouping logic?

6. Consistency / Similarity — Similar appearance = similar function. No exceptions. Ask: Is every inconsistency intentional and communicative?

7. Efficiency of Use — Minimum friction to goal completion. Count steps. Remove any that don't carry function. Ask: How many steps to complete the primary task? Can any be cut?

8. Experience / Emotion — Emotion is a design tool. Design the emotional arc of the full experience. Ask: What should the user feel at each key moment? Does the design produce that?

9. Figure / Ground — While navigating, the system is figure. While reading, content is figure. Both must be supported. Ask: Can user focus move naturally between system and content?

10. Fitt's Law — Target acquisition = function of distance and size. Minimum 44x44px on touch. Ask: Are high-frequency targets large and reachable where the hand rests?

11. Hierarchy / Sequence — One dominant element per screen. Every path leads to a goal. Ask: What is the single most important element? Does its size, position, and weight match that?

12. Learnable / Memorable — Consistent systems mean no relearning on return visits. Ask: Could a user returning after 30 days navigate without reorienting?

13. Mental Models — Design that matches the user's model disappears. Conflict produces friction users blame on themselves. Ask: What does the user expect this to do? Does it do that?

14. Process Funnel — Wide entry, narrow to conversion. User's place in flow always preserved. Ask: Can a user leave the primary flow and return to exactly where they left?

15. You Are Not the User — Designer preference is irrelevant. Real users, observed under real conditions, are the only valid test. Ask: When did a real user last use this system while being observed?

---

## Post-Desktop Rules

- Tap targets minimum 44x44px
- No hover states — every hover behavior needs a touch replacement
- Non-linear navigation expected
- Design for the condition, not the device
- Spatial/AR: depth is a new axis of hierarchy

---

## Audit Execution

Pre-audit: answer four questions.
1. What emotion leads the Visceral experience?
2. What mental model do users arrive with?
3. What is the single conversion/engagement goal?
4. Who is the actual user?

Per principle: score as PASSES | FAILS | MIXED | UNSCORED. Assign Norman domain.

Compile all findings into this structured JSON object:

{
  "url": "<site or interface reviewed>",
  "preAudit": {
    "emotion": "",
    "mentalModel": "",
    "conversionGoal": "",
    "actualUser": ""
  },
  "findings": [
    {
      "id": 1,
      "principle": "Aesthetic Effect",
      "verdict": "PASSES",
      "domain": "visceral",
      "summary": "One-line verdict",
      "detail": "Full finding paragraph",
      "recommendation": "Specific action or null"
    }
  ],
  "specificDecisions": ["Numbered specific action items"],
  "validationQuestion": ""
}

---

## OUTPUT RULE — CRITICAL

Do NOT output raw markdown or a text report. After completing the audit:

1. Load DASHBOARD.md — build the React artifact dashboard with the findings data
2. Load HANDOFF.md — implement model selector, prompt assembly, screenshot, API dispatch

One sentence of preamble maximum before the artifact.
