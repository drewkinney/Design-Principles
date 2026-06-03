---
name: interactive-design-aesthetics/behavioral/signal
description: >
  Leaf evaluation. Behavioral — Signal. Affordance + Figure/Ground: interactive
  elements self-identify and figure/ground shifts cleanly between navigation and content.
  Returns one finding covering both.
---

# Behavioral / Signal — Affordance + Figure/Ground

Signal during use operates on two layers: affordance (what can I do here?) and
figure/ground (what should I be looking at right now?).
Affordance breaks trust once. Figure/ground confusion makes focused action impossible.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Affordance

- Can a new user identify interactive elements without instruction?
- Do buttons look like buttons? Do links look like links?
- Are hover-only affordances the only signal (failure on touch)?
- Are any interactive elements visually indistinguishable from static content?

Failure modes: flat design removing all affordance signals, ghost buttons disappearing
on colored backgrounds, icon-only controls without labels, scroll-jacking without
progress indicators.

## Figure / Ground

- Does navigation visually recede when the user is in reading mode?
- Does content recede when navigation is active — menus, overlays?
- Do modal and overlay states clearly establish figure and ground?
- On mobile, does menu open/close re-establish the content ground cleanly?
- Do sticky headers maintain the right relationship as content scrolls?

Failure modes: sticky navigation competing with content for visual dominance,
overlays not sufficiently dimming the ground, sidebars fighting the main content
column, mobile menu close dropping the user without spatial re-establishment.

PASSES: all interactive elements self-identify; figure/ground shifts cleanly in all states.
MIXED: affordance correct; specific overlay or mobile states lose figure/ground, or vice versa.
FAILS: user cannot identify primary interactions; navigation and content compete consistently.

---

## Output

{
  "principle": "Affordance + Figure/Ground",
  "meta": "signal",
  "domain": "behavioral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
