---
name: interactive-design-aesthetics/visceral/momentum
description: >
  Leaf evaluation. Visceral — Momentum. Common Fate: objects moving together
  read as a group. First-contact motion either confirms or contradicts groupings.
  Returns one finding.
---

# Visceral / Momentum — Common Fate

Motion before thought. Objects moving the same direction group before the mind registers why.
Misaligned animation creates perceptual confusion even when layout is correct.
First-contact motion is either confirmatory or contradictory — there's no neutral.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- Do elements introduced together move together?
- Does animation direction confirm the grouping logic of the layout?
- Are entrance and exit animations consistent across similar elements?
- Does scroll-linked animation reinforce or contradict content hierarchy?
- Is motion speed consistent, or does it vary arbitrarily across components?

Failure modes: elements from the same group animating in different directions,
inconsistent easing curves across similar components, animations that distract
from rather than direct attention, motion contradicting the reading order.

PASSES: animation system is coherent; motion confirms groupings in the first moment.
MIXED: most animation correct but specific sequences contradict grouping logic.
FAILS: animation is inconsistent or creates confusion about element relationships.
UNSCORED: no animation; principle does not apply.

---

## Output

{
  "principle": "Common Fate",
  "meta": "momentum",
  "domain": "visceral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
