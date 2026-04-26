---
name: interactive-design-aesthetics/pre-audit
description: >
  Sub-skill. Runs before all domain audits. Establishes the four framing
  questions that context every principle evaluation. Must complete before
  VISCERAL.md, BEHAVIORAL.md, REFLECTIVE.md, and POST-DESKTOP.md begin.
---

# Pre-Audit Framework

Answer all four questions for the target interface before any principle is scored.
These answers frame every verdict. A PASSES on the wrong emotional target is still a failure.

---

## Question 1 — Lead Emotion

What single emotion should the Visceral experience produce on first contact?

Not a list. One emotion. Derive it from the interface's business purpose and user context.
Examples: desire, trust, relief, curiosity, excitement, calm, urgency.

If the interface is trying to produce two emotions simultaneously, that is itself a finding.
Note it. Then pick the dominant one.

---

## Question 2 — Arriving Mental Model

What internal picture does the user bring before touching the interface?

Users are not blank. They arrive with expectations built from prior systems,
category conventions, and cultural norms. Identify the dominant model.

Examples:
- E-commerce: "browse → select → configure → pay"
- Dashboard: "overview first, detail on demand"
- Support: "find → resolve → close"
- Landing page: "show me what this is in 5 seconds"

If the interface violates this model, that is a guaranteed friction point.
Flag it here so the domain audits can weight it appropriately.

---

## Question 3 — Single Conversion Goal

What is the one action the interface most needs the user to complete?

Not a list of goals. One. If the team cannot name one, the interface has no hierarchy.
That is a Hierarchy / Sequence failure before the audit even begins. Note it.

Examples: purchase, sign up, book, request demo, subscribe, download, apply.

---

## Question 4 — Actual User

Who is the real user? Not the target persona. The actual person using this right now.

Describe them in one or two sentences: context, device, level of familiarity,
what they want to accomplish, what they're afraid of, how much time they have.

Designers who skip this question design for themselves.
That is what Principle 15 (You Are Not the User) exists to prevent.

---

## Output

Return a single preAudit object. No prose. No formatting.

{
  "emotion": "one word or short phrase",
  "mentalModel": "one sentence describing the user's arriving expectation",
  "conversionGoal": "one action",
  "actualUser": "one to two sentence description"
}
