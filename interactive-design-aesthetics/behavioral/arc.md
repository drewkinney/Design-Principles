---
name: interactive-design-aesthetics/behavioral/arc
description: >
  Leaf evaluation. Behavioral — Arc. Process Funnel: the user's place in the flow
  is always preserved. No interruption breaks the arc before conversion.
  Returns one finding.
---

# Behavioral / Arc — Process Funnel

Users pursue goals. Any interruption risks losing them before completion.
Funnel: wide entry, narrow to conversion. Place in flow is always preserved.
The arc of use is sustained or it isn't — there's no partial preservation.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- Does the funnel narrow consistently from entry to conversion?
- Are decisions introduced at the conversion point that belong earlier?
- Can the user leave the primary flow and return exactly where they left?
- Does supplementary content — financing, compare, specs — disrupt or support the funnel?
- Are there links in the checkout that open in the same window?
- Does the confirmation page close the loop and return the user to a logical next state?

Failure modes: financing and trade-in options appearing mid-cart, links in checkout
navigating away from the flow, configuration complexity revealed progressively rather
than mapped upfront, confirmation page that doesn't close the loop.

PASSES: funnel narrows consistently; no premature widening at conversion; place always preserved.
MIXED: top-of-funnel correct; specific mid-funnel or cart decisions disrupt the arc.
FAILS: multiple funnel-widening decisions at conversion; measurable abandonment risk.

---

## Output

{
  "principle": "Process Funnel",
  "meta": "arc",
  "domain": "behavioral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
