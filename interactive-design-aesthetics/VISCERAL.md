---
name: interactive-design-aesthetics/visceral
description: >
  Sub-skill. Audits Principles 1–5 (Visceral domain). Runs in parallel
  with BEHAVIORAL.md, REFLECTIVE.md, and POST-DESKTOP.md after PRE-AUDIT.md
  completes. Returns findings array for visceral domain only.
---

# Visceral Domain Audit — Principles 1–5

Visceral = first-contact impact. Trust and attraction established before
any interaction occurs. If Visceral fails, Behavioral starts in deficit.

Score each principle: PASSES | FAILS | MIXED | UNSCORED

---

## Principle 1 — Aesthetic Effect

Definition: Aesthetics introduced after architecture is lipstick. Build it in.
Attractive interfaces test as more usable before use begins — the perception
is real, measurable, and neurologically grounded.

Evaluate:
- Does the first screen produce trust or neutrality?
- Does the visual treatment feel considered or assembled?
- Is there evidence of aesthetic intent in typography, spacing, and image choice?
- Does the aesthetic match the lead emotion identified in PRE-AUDIT.md?

Failure modes: generic component libraries applied without visual judgment,
inconsistent type scales, stock photography that signals effort was not spent,
aesthetic that contradicts the intended emotional target.

PASSES: first screen produces trust and matches the lead emotion.
MIXED: trust present but aesthetic does not match the emotional target, or is cautious/safe.
FAILS: first screen produces neutral or negative response; no discernible aesthetic intent.

---

## Principle 2 — Affordance

Definition: Visual signal that tells a user what an element does and that it's interactive.
Underlines signal links. Raised shapes signal buttons. Violate affordance once
and the trust chain breaks for the session.

Evaluate:
- Can a new user identify interactive elements without instruction?
- Do buttons look like buttons? Do links look like links?
- Are hover-only affordances the only signal (failure on touch)?
- Do scroll-triggered animations hijack expected scroll behavior without warning?
- Are any interactive elements visually indistinguishable from static content?

Failure modes: flat design removing all affordance signals, scroll-jacking without
progress indicators, icon-only controls with no label, ghost buttons that disappear
on colored backgrounds.

PASSES: all interactive elements self-identify.
MIXED: most affordances correct but specific patterns (scroll, animation) create confusion.
FAILS: new user cannot identify primary interactions without trial and error.

---

## Principle 3 — Proximity / Chunking

Definition: Proximity — near objects read as related.
Chunking — content broken into scannable units.
Neither is decoration. Both are navigation.

Evaluate:
- Do related elements cluster visually?
- Can the user identify content groups in under 5 seconds?
- Are section breaks (whitespace, rules, color) communicating hierarchy?
- Does related functionality share a visual container or region?
- Is there orphaned content that belongs to a group but is spatially isolated?

Failure modes: equal spacing between all elements (destroys proximity logic),
content walls with no chunking, CTAs separated from the content that motivates them.

PASSES: groupings clear, scannable in under 5 seconds.
MIXED: most groupings correct but specific sections break proximity logic.
FAILS: layout does not communicate relationships; user must read everything to navigate.

---

## Principle 4 — Color & Psychology

Definition: Color is functional, not aesthetic. Every color decision targets
a specific Visceral response. Hue, saturation, value, tint, and opacity
are emotional levers. Choose schemes based on the intended emotional state.

Evaluate:
- What emotion does each dominant color produce?
- Does that emotion match the lead emotion from PRE-AUDIT.md?
- Is color being used to encode hierarchy, status, or action?
- Does the palette work as a system, or were colors chosen independently?
- Are there color decisions that contradict the emotional target?
- Does the dark/light mode implementation maintain emotional consistency?

Failure modes: brand color applied uniformly regardless of emotional target,
high-saturation color used for everything creating visual noise, budget/premium
products sharing identical color systems, CTAs that don't contrast sufficiently
to signal primacy.

PASSES: palette produces the target emotion; color encodes meaning consistently.
MIXED: palette direction correct but specific applications contradict the target.
FAILS: color choices produce the wrong emotion or no discernible emotional effect.

---

## Principle 5 — Common Fate

Definition: Objects moving the same direction read as a group.
Misaligned animation creates perceptual confusion even when layout is correct.
Motion must reinforce — or deliberately break — visual groupings.

Evaluate:
- Do elements introduced together move together?
- Does animation direction confirm the grouping logic?
- Are entrance/exit animations consistent across similar elements?
- Does scroll-linked animation reinforce or contradict the content hierarchy?
- Is motion speed consistent, or does it vary arbitrarily across components?

Failure modes: elements from the same group animating in different directions,
inconsistent easing curves across similar components, animations that distract
from rather than direct attention, motion that contradicts the reading order.

PASSES: animation system is coherent; motion confirms groupings.
MIXED: most animation correct but specific sequences contradict grouping logic.
FAILS: animation is inconsistent or creates confusion about which elements are related.
UNSCORED: interface has no animation; principle does not apply.

---

## Output

Return a findings array. Five entries, one per principle. No prose outside the array.

[
  {
    "id": 1,
    "principle": "Aesthetic Effect",
    "verdict": "PASSES | FAILS | MIXED | UNSCORED",
    "domain": "visceral",
    "summary": "One sentence verdict — direct, specific to this interface",
    "detail": "Two to four sentences. What was observed. Why it passes or fails.",
    "recommendation": "One specific action. Null if PASSES."
  },
  { "id": 2, "principle": "Affordance", ... },
  { "id": 3, "principle": "Proximity / Chunking", ... },
  { "id": 4, "principle": "Color & Psychology", ... },
  { "id": 5, "principle": "Common Fate", ... }
]
