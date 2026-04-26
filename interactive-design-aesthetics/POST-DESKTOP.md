---
name: interactive-design-aesthetics/post-desktop
description: >
  Sub-skill. Audits post-desktop surface requirements: touch, spatial, voice,
  ambient. Runs in parallel with VISCERAL.md, BEHAVIORAL.md, and REFLECTIVE.md.
  Returns postDesktop[] flags that are merged into the master audit object and
  displayed as a separate panel in the dashboard.
---

# Post-Desktop Audit

The desktop metaphor is dead in practice. Touch, spatial, voice, and ambient
surfaces each require design logic that the desktop era never addressed.
This sub-skill audits those requirements independently of the 15 principles.

---

## Surface Detection

First: identify what surfaces the interface is deployed on.
Check for each. Score only surfaces that apply.

- Desktop web (mouse + keyboard)
- Mobile web (touch, variable viewport)
- Native iOS / Android app
- Tablet (touch, landscape/portrait shift)
- Spatial / AR / VR (depth as hierarchy axis)
- Voice interface
- Ambient / wearable (glanceable, no persistent attention)

---

## Touch Rules

Apply to all touch surfaces.

TAP TARGET SIZE
Minimum 44×44px for all interactive elements.
Applies to the hit area, not the visual size.
An icon that is 20px wide with 12px padding = 44px hit area. Acceptable.
An icon that is 20px wide with 4px padding = 28px hit area. Fails.

Score: PASSES | FAILS | MIXED
Evidence: name specific controls that fail the 44px minimum.

TAP TARGET PROXIMITY
Competing tap targets need minimum 8px gap.
Adjacent targets under 8px apart cause mis-taps.

Score: PASSES | FAILS | MIXED
Evidence: name specific CTA pairs or navigation clusters that violate proximity.

HOVER STATE REPLACEMENT
Every behavior triggered by hover on desktop needs a touch-native replacement.
Hover menus, hover tooltips, hover state reveals — all require touch alternatives.
No hover state is acceptable as the only affordance signal on a touch surface.

Score: PASSES | FAILS | MIXED | NOT APPLICABLE
Evidence: name specific hover-only interactions with no touch alternative.

---

## Navigation Model

LINEAR VS NON-LINEAR
Desktop assumes linear flows. Touch users expect non-linear navigation.
Forcing touch users through a linear flow creates friction.
Deep linking, breadcrumbs, and back-stack awareness are requirements, not features.

Score: PASSES | FAILS | MIXED

VIEWPORT SHIFT
Landscape ↔ portrait transitions must not break the layout or lose the user's position.
Layouts that collapse incorrectly or reset scroll position on rotation fail this check.

Score: PASSES | FAILS | MIXED | NOT APPLICABLE

---

## Condition Design

Design for the condition, not the device.
The condition = hand position, ambient light, attention level, motion context.

ONE-HANDED USE
Can the primary task be completed one-handed?
Primary controls should fall within thumb reach on a standard phone (lower 60% of screen).
Controls in the top 20% of the screen on mobile are outside the natural thumb arc.

Score: PASSES | FAILS | MIXED

AMBIENT LIGHT
Does the interface remain legible in direct sunlight?
Contrast ratios that pass WCAG 2.1 AA in normal light often fail in sunlight.
Light mode interfaces with light grey text are the most common failure.

Score: PASSES | FAILS | MIXED | UNABLE TO ASSESS

ATTENTION LEVEL
Is the interface designed for divided attention?
If the user is likely to be doing something else simultaneously (walking, in a meeting),
can the primary task be completed with minimal cognitive load?

Score: PASSES | FAILS | MIXED | NOT APPLICABLE

---

## Spatial / AR / VR (score only if applicable)

DEPTH AS HIERARCHY
Depth is a new axis of hierarchy in spatial interfaces.
Closer elements read as more important. Use depth intentionally.

GESTURE VOCABULARY
Spatial gestures must be discoverable. No gesture should be the only way
to complete a critical task without a visible alternative.

---

## Output

Return a postDesktop array. One entry per check that applies.
Skip checks that are NOT APPLICABLE and do not include them in the output.

[
  {
    "check": "Tap Target Size",
    "surface": "mobile web",
    "verdict": "PASSES | FAILS | MIXED",
    "evidence": "Specific control names or patterns that fail",
    "fix": "Specific px or layout change. Null if PASSES."
  },
  {
    "check": "Hover State Replacement",
    "surface": "mobile web",
    "verdict": "PASSES | FAILS | MIXED",
    "evidence": "...",
    "fix": "..."
  }
]
