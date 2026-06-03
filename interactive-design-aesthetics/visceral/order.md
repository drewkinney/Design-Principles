---
name: interactive-design-aesthetics/visceral/order
description: >
  Leaf evaluation. Visceral — Order. Hierarchy / Sequence: one dominant element
  per screen establishes the first path the eye follows. Returns one finding.
---

# Visceral / Order — Hierarchy / Sequence

Hierarchy is the first thing the eye resolves. One dominant element establishes the path.
Every path leads to a goal — preferably a business goal.
No clear primary element means no hierarchy, and the visceral moment has no direction.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- Is there one unambiguous dominant element per screen?
- Does visual weight match importance for every element?
- Does the sequence guide toward the conversion goal from PRE-AUDIT.md?
- Is the primary CTA visually dominant over secondary actions?
- Does the hierarchy hold on mobile as well as desktop?
- Do any screens have two or more elements competing equally for dominance?

Failure modes: equal visual weight across competing sections, primary CTA same size
as secondary navigation, hero that establishes hierarchy but body sections with no
dominant element, mobile reflow destroying the intended reading sequence.

PASSES: one dominant element per screen; sequence leads toward the conversion goal.
MIXED: top-level hierarchy clear; interior pages or mobile states lose the sequence.
FAILS: multiple elements compete for dominance; no clear path to conversion goal.

---

## Output

{
  "principle": "Hierarchy / Sequence",
  "meta": "order",
  "domain": "visceral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
