---
name: interactive-design-aesthetics/behavioral/alignment
description: >
  Leaf evaluation. Behavioral — Alignment. Mental Models: does the interface
  match the user's internal model, making the system disappear during use?
  Returns one finding.
---

# Behavioral / Alignment — Mental Models

Users arrive with an internal model of how systems work.
Design that matches disappears — users never notice it.
Design that conflicts produces friction users blame on themselves.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- Does the interface match the mental model identified in PRE-AUDIT.md?
- Where does it conflict with that model?
- Are conflicts deliberate and supported by sufficient onboarding?
- Do handoffs between sections maintain the model?
- Do unconventional patterns require discovery that wasn't designed for?
- Does scroll behavior match the universal model of scroll = move down?

Failure modes: support sections that feel like a different product, checkout flow
diverging from e-commerce norm without justification, navigation patterns breaking
category conventions without a better alternative, scroll-jacking conflicting with
the universal model.

PASSES: interface matches the arriving mental model; conflicts are intentional and supported.
MIXED: core model matched; specific sections or transitions conflict without support.
FAILS: significant conflicts with the dominant model; friction is frequent and unexplained.

---

## Output

{
  "principle": "Mental Models",
  "meta": "alignment",
  "domain": "behavioral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
