---
name: interactive-design-aesthetics/visceral/signal
description: >
  Leaf evaluation. Visceral — Signal. Color & Psychology: does color communicate
  the correct emotional tone before interaction? Returns one finding.
---

# Visceral / Signal — Color & Psychology

Color is functional. Every decision targets a specific emotional response.
Hue, saturation, value, tint, opacity are levers, not choices.
The palette either communicates the lead emotion or it doesn't.

Score: PASSES | FAILS | MIXED | UNSCORED

---

## Evaluate

- What emotion does each dominant color produce?
- Does that emotion match the lead emotion from PRE-AUDIT.md?
- Is color encoding hierarchy, status, and action — or is it purely decorative?
- Does the palette function as a system, or were colors chosen independently?
- Are there color decisions that contradict the emotional target?
- Does dark/light mode maintain emotional consistency?

Failure modes: brand color applied uniformly regardless of emotional target,
high-saturation color on everything creating visual noise, budget and premium
products sharing identical color systems, CTAs that don't contrast enough to
signal primacy, palettes assembled from preference rather than emotional logic.

PASSES: palette produces the target emotion; color encodes meaning consistently.
MIXED: palette direction correct but specific applications contradict the target.
FAILS: color produces the wrong emotion or no discernible emotional signal.

---

## Output

{
  "principle": "Color & Psychology",
  "meta": "signal",
  "domain": "visceral",
  "verdict": "PASSES | FAILS | MIXED | UNSCORED",
  "summary": "One sentence. Direct. Specific to this interface.",
  "detail": "Two to four sentences. What was observed. Why it passes or fails.",
  "recommendation": "One specific action. Null if PASSES."
}
