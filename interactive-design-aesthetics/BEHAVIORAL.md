---
name: interactive-design-aesthetics/behavioral
description: >
  Sub-skill. Audits Principles 6–11 (Behavioral domain). Runs in parallel
  with VISCERAL.md, REFLECTIVE.md, and POST-DESKTOP.md after PRE-AUDIT.md
  completes. Returns findings array for behavioral domain only.
---

# Behavioral Domain Audit — Principles 6–11

Behavioral = usability of actual use. Ease, feedback, and efficiency
during the interaction itself. Visceral primed it. Behavioral delivers or fails it.

Score each principle: PASSES | FAILS | MIXED | UNSCORED

---

## Principle 6 — Consistency / Similarity

Definition: Users map the system during first use. Break the pattern and
they relearn, fatigue, and leave. Similar appearance = similar function.
Changed appearance = changed function. No exceptions.

Evaluate:
- Does the same component look the same everywhere it appears?
- Does every inconsistency communicate a meaningful difference in function?
- Does the type scale hold across all sections?
- Do CTA patterns (label, shape, color) remain consistent across pages?
- Does the design system hold across hardware, software, and services sections?
- Are navigation patterns identical on every page type?

Failure modes: primary CTA changes color between sections, heading scale
inconsistent across page types, component spacing varies without reason,
service pages diverge from product page design language.

PASSES: system-wide consistency; every variation is intentional and communicative.
MIXED: core patterns consistent but specific sections or page types break the system.
FAILS: inconsistencies are frequent, unintentional, and require relearning.

---

## Principle 7 — Efficiency of Use

Definition: Technology is secondary. Experience is primary.
Efficiency is minimum friction to goal completion — not minimalism.
Count steps on the most common task. Remove any that don't carry function.

Evaluate:
- Count the steps from landing to completing the conversion goal from PRE-AUDIT.md.
- Is every step necessary? Could any be combined or eliminated?
- Does the interface require decisions at the point of maximum commitment (cart)?
- Are repeat users able to shortcut the flow?
- Does form length match the actual data requirement?
- Are defaults set to the most common user choice?

Failure modes: configuration options surfaced at checkout rather than at selection,
required fields that aren't required, no saved preferences for return users,
multi-step flows that could be one step, decisions introduced at the conversion point
that belong earlier in the funnel.

PASSES: primary task completable in minimum steps; no unnecessary decisions.
MIXED: flow mostly efficient but specific steps add friction without function.
FAILS: significant unnecessary steps; common task takes materially longer than it should.

---

## Principle 8 — Experience / Emotion

Definition: Emotion is a design tool. Curiosity, fun, and excitement improve
information processing neurologically. Design the emotional arc of the full
experience, not just the layout of each screen.

Evaluate:
- Does each key moment in the flow produce the intended emotional state?
- Is there a designed emotional arc from landing to conversion?
- Does the interface sustain emotional engagement past the hero section?
- Do service/utility sections maintain emotional consistency with product sections?
- Does the post-conversion state (confirmation, onboarding) deliver on the promise?

Failure modes: strong Visceral layer that evaporates during the purchase flow,
service/subscription pages with no emotional arc, utility-style presentation
for products that require emotional buy-in, confirmation screens that feel bureaucratic.

PASSES: emotional arc sustained from landing through conversion.
MIXED: strong at entry points; flat or inconsistent mid-flow or on service sections.
FAILS: emotional engagement absent beyond the hero; interface feels transactional.

---

## Principle 9 — Figure / Ground

Definition: Dynamic in interactive design. While navigating, the system is figure.
When reading, content is figure. Both states must be supported.
The shift between them must be seamless.

Evaluate:
- Does navigation visually recede when the user is in reading mode?
- Does content recede when navigation is active (menus, overlays)?
- Do modal/overlay states clearly establish what is figure and what is ground?
- On mobile, does the menu open/close transition re-establish the content ground cleanly?
- Do sticky headers maintain the right figure/ground relationship as content scrolls?

Failure modes: sticky navigation that competes with content for visual dominance,
mobile menu close that drops the user back into content without spatial re-establishment,
overlays that don't sufficiently dim the ground, sidebars that fight the main content
column for primacy.

PASSES: figure/ground shifts cleanly in all states.
MIXED: desktop correct; mobile transition or specific overlay states lose the relationship.
FAILS: navigation and content compete consistently; user cannot establish reading focus.

---

## Principle 10 — Fitt's Law

Definition: Target acquisition time = function of distance / size.
Larger targets at shorter distances are faster to hit.
Screen corners are effectively infinite targets.
Most-used controls must be largest and closest. Touch minimum: 44×44px.

Evaluate:
- Are primary CTAs sized appropriately for their importance?
- On touch: are all interactive targets minimum 44×44px?
- Are competing CTAs (Learn More + Buy) separated by sufficient space?
- Are the most frequent actions closest to the natural resting position of the hand?
- Are small secondary controls (filters, toggles, close buttons) still tappable?
- Do touch targets have sufficient padding even when visual size appears smaller?

Failure modes: two CTAs in close proximity causing mis-taps, close buttons under
44px on mobile, primary action no larger than secondary action, dense link lists
with insufficient tap target spacing, icon-only buttons that are visually large
but have a small interactive hit area.

PASSES: all high-frequency targets correctly sized and positioned.
MIXED: desktop correct; mobile has specific target proximity or sizing issues.
FAILS: multiple high-frequency targets are undersized or placed in low-acquisition positions.

---

## Principle 11 — Hierarchy / Sequence

Definition: Information sequence communicates importance.
One dominant element per screen establishes the path.
Every path leads to a goal — preferably a business goal.
No clear primary element means no hierarchy.

Evaluate:
- Is there one unambiguous dominant element per screen?
- Does the visual weight of each element match its importance?
- Does the sequence guide the user toward the conversion goal from PRE-AUDIT.md?
- Is the primary CTA visually dominant over secondary actions?
- Does the hierarchy hold on mobile as well as desktop?
- Are there screens where two or more elements compete equally for dominance?

Failure modes: equal visual weight across multiple competing sections,
primary CTA same size as secondary navigation, hero that establishes hierarchy
but body sections that have no clear dominant element, mobile reflow that
destroys the intended reading sequence.

PASSES: one dominant element per screen; sequence leads to conversion goal.
MIXED: top-level hierarchy clear; interior pages or mobile states lose the sequence.
FAILS: multiple elements compete for dominance; no clear path to conversion goal.

---

## Output

Return a findings array. Six entries, one per principle. No prose outside the array.

[
  {
    "id": 6,
    "principle": "Consistency / Similarity",
    "verdict": "PASSES | FAILS | MIXED | UNSCORED",
    "domain": "behavioral",
    "summary": "One sentence verdict — direct, specific to this interface",
    "detail": "Two to four sentences. What was observed. Why it passes or fails.",
    "recommendation": "One specific action. Null if PASSES."
  },
  { "id": 7, "principle": "Efficiency of Use", ... },
  { "id": 8, "principle": "Experience / Emotion", ... },
  { "id": 9, "principle": "Figure / Ground", ... },
  { "id": 10, "principle": "Fitt's Law", ... },
  { "id": 11, "principle": "Hierarchy / Sequence", ... }
]
