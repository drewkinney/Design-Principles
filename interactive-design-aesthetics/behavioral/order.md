---
name: interactive-design-aesthetics/behavioral/order
description: >
  Leaf evaluation. Behavioral — Order. Proximity / Chunking: content is organized
  into findable groups. Near objects read as related. Returns one finding.
---

# Behavioral / Order — Proximity / Chunking

Proximity and chunking are navigation, not decoration.
Near objects read as related. Chunked content is scannable.
Order during use determines whether users find what they need or leave.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- Do related elements cluster visually?
- Can the user identify content groups in under 5 seconds?
- Are section breaks — whitespace, rules, color — communicating hierarchy?
- Does related functionality share a visual container or region?
- Is there orphaned content that belongs to a group but is spatially isolated?
- Are CTAs adjacent to the content that motivates them?

Failure modes: equal spacing between all elements destroying proximity logic,
content walls with no chunking, CTAs separated from motivating content, related
functionality scattered across regions, no visual container for grouped actions.

PASSES: groupings clear; user can identify content groups within 5 seconds.
MIXED: most groupings correct but specific sections break proximity logic.
FAILS: layout does not communicate relationships; user must read everything to navigate.

---

## Output

{
  "principle": "Proximity / Chunking",
  "meta": "order",
  "domain": "behavioral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
