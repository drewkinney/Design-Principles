---
name: interactive-design-aesthetics/reflective/alignment
description: >
  Leaf evaluation. Reflective — Alignment. You Are Not the User: only observed
  use under real conditions validates alignment over time. Returns one finding.
---

# Reflective / Alignment — You Are Not the User

Designer preference is irrelevant to user experience.
Designers who design for themselves ship systems that work for designers.
Real users, observed under real conditions, are the only valid test.
Every hesitation is a design failure. Not a user error.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- Is there evidence of user research informing specific design decisions?
- Are there patterns suggesting designer preference overriding user data?
  (scroll-jacking is canonical — designers love it, users don't)
- Are there edge cases that clearly weren't tested with real users?
- What would five real users hesitate on when completing the primary task?
- Does the design optimize for the demo or the actual use condition?
- Does A/B testing challenge the fundamental assumptions of the flow?

Failure modes: interfaces that look impressive in presentations but create friction in
use, interaction patterns requiring explanation, designs prioritizing visual elegance
over task completion, testing that never challenges the fundamental flow assumptions.

PASSES: evidence of user research; no obvious designer-preference overrides.
MIXED: mostly research-informed; one or two patterns suggest aesthetic preference won.
FAILS: multiple patterns suggest designer preference; no evidence of observed user testing.
UNSCORED: insufficient evidence to assess; recommend user observation before any changes.

---

## Output

{
  "principle": "You Are Not the User",
  "meta": "alignment",
  "domain": "reflective",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
