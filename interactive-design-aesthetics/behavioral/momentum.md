---
name: interactive-design-aesthetics/behavioral/momentum
description: >
  Leaf evaluation. Behavioral — Momentum. Fitt's Law + Efficiency of Use:
  targets are reachable and the path to goal completion has no unnecessary steps.
  Returns one finding covering both.
---

# Behavioral / Momentum — Fitt's Law + Efficiency of Use

Momentum during use = minimum friction from intent to completion.
Fitt's Law governs target acquisition: larger, closer = faster.
Efficiency governs step count: every step not removed is friction that compounds.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Fitt's Law

- Are primary CTAs sized for their importance?
- On touch: are all interactive targets minimum 44×44px?
- Are competing CTAs separated by sufficient space to prevent mis-taps?
- Are the most frequent actions closest to the natural resting position of the hand?
- Do touch targets have sufficient padding even when visual size appears smaller?

Failure modes: two CTAs in close proximity causing mis-taps, close buttons under 44px
on mobile, primary action no larger than secondary, dense link lists with insufficient
tap spacing, icon-only buttons with a small interactive hit area.

## Efficiency of Use

- Count steps from landing to completing the conversion goal from PRE-AUDIT.md.
- Is every step necessary? Can any be combined or eliminated?
- Does the interface require decisions at the point of maximum commitment (cart)?
- Are repeat users able to shortcut the flow?
- Are defaults set to the most common user choice?

Failure modes: configuration options surfaced at checkout, required fields that aren't
required, no saved preferences for return users, decisions at the conversion point that
belong earlier in the funnel.

PASSES: all high-frequency targets correctly sized and positioned; primary task in minimum steps.
MIXED: target sizing or efficiency correct independently; one layer adds friction the other doesn't.
FAILS: multiple undersized targets or unnecessary steps in the primary conversion path.

---

## Output

{
  "principle": "Fitt's Law + Efficiency",
  "meta": "momentum",
  "domain": "behavioral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
