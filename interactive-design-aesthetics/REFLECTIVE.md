---
name: interactive-design-aesthetics/reflective
description: >
  Sub-skill. Audits Principles 12–15 (Reflective domain). Runs in parallel
  with VISCERAL.md, BEHAVIORAL.md, and POST-DESKTOP.md after PRE-AUDIT.md
  completes. Returns findings array for reflective domain only.
---

# Reflective Domain Audit — Principles 12–15

Reflective = memory after use. Loyalty, return, and identity attachment.
This domain determines whether the experience is remembered as the brand intended.
Visceral attracted. Behavioral delivered. Reflective earns the return.

Score each principle: PASSES | FAILS | MIXED | UNSCORED

---

## Principle 12 — Learnable / Memorable

Definition: Attractive interfaces are easier to learn — attention and retention
improve together. Consistent aesthetic systems mean no relearning on return visits.
Applies Hierarchy, Mental Models, Consistency, and Proximity simultaneously.

Evaluate:
- Could a user returning after 30 days navigate immediately without reorienting?
- Does the visual system have enough distinctiveness to be memorable?
- Are the most important interactions learnable in one session?
- Does the design system compound over time (each visit requires less effort)?
- Is the interface distinctive enough that users associate it with the brand?

Failure modes: design so generic it provides no memory hooks, frequent redesigns
that force relearning, inconsistent system that requires users to re-discover
interactions, interfaces that are functional but visually forgettable.

PASSES: system is learnable in one session and distinctive enough to be memorable.
MIXED: functional but generic; users can navigate on return but without brand recognition.
FAILS: redesigns, inconsistency, or generic design prevent memory formation.

---

## Principle 13 — Mental Models

Definition: Users arrive with an internal picture of how systems work.
Design that matches the model disappears — users never notice it.
Design that conflicts produces friction users blame on themselves.
Match the dominant model or invest in building a new one deliberately.

Evaluate:
- Does the interface match the mental model identified in PRE-AUDIT.md?
- Where does it conflict with that model?
- Are any conflicts deliberate and supported by sufficient onboarding?
- Do handoffs between sections (e.g., shopping → support → account) maintain the model?
- Do unconventional interaction patterns require discovery that wasn't designed for?

Failure modes: support/help sections that feel like a different product,
checkout flow that diverges from the e-commerce norm without justification,
navigation patterns that break category conventions without providing a better alternative,
scroll-jacking that conflicts with the universal model of scroll = move down.

PASSES: interface matches the arriving mental model; conflicts are intentional and supported.
MIXED: core model matched; specific sections or transitions conflict without support.
FAILS: significant conflicts with the dominant model; friction is frequent and unexplained.

---

## Principle 14 — Process Funnel

Definition: Users pursue goals. Any interruption risks losing them before completion.
Funnel: wide entry, narrow to conversion.
Supplementary content opens in overlays or new tabs.
The user's place in the flow is always preserved.

Evaluate:
- Does the funnel narrow consistently from entry to conversion?
- Are decisions introduced at the conversion point that belong earlier?
- Can the user leave the primary flow (compare, research) and return exactly?
- Does supplementary content (financing, trade-in, carrier) disrupt or support the funnel?
- Are there links in the checkout flow that open in the same window?
- Does the funnel widen at the point it should be narrowing?

Failure modes: financing and trade-in options appearing mid-cart, links in the
checkout that navigate away from the flow, configuration complexity revealed
progressively rather than mapped upfront, confirmation page that doesn't close
the loop and return the user to a logical next state.

PASSES: funnel narrows consistently; no premature widening at conversion.
MIXED: top-of-funnel correct; specific mid-funnel or cart decisions disrupt flow.
FAILS: multiple funnel-widening decisions at the conversion point; measurable abandonment risk.

---

## Principle 15 — You Are Not the User

Definition: Designer preference is irrelevant to user experience.
Designers who design for themselves ship systems that work for designers.
Real users, observed under real conditions, are the only valid test.
Every hesitation is a design failure. Not a user error.

Evaluate:
- Is there evidence of user research informing specific design decisions?
- Are there patterns that suggest designer preference overriding user data?
  (scroll-jacking is the canonical example — designers love it, users don't)
- Are there edge cases that clearly weren't tested with real users?
- What would five real users hesitate on if observed completing the primary task?
- Does the design optimize for the demo or the actual use condition?

Failure modes: interfaces that look impressive in presentations but create friction
in use, interaction patterns that require explanation, designs that prioritize
visual elegance over task completion, A/B testing that never challenges the
fundamental assumptions of the flow.

PASSES: evidence of user research; no obvious designer-preference overrides.
MIXED: mostly research-informed; one or two patterns suggest aesthetic preference won.
FAILS: multiple patterns suggest designer preference; no evidence of observed user testing.
UNSCORED: insufficient evidence to assess; recommend user observation before any changes.

---

## Output

Return a findings array. Four entries, one per principle. No prose outside the array.

[
  {
    "id": 12,
    "principle": "Learnable / Memorable",
    "verdict": "PASSES | FAILS | MIXED | UNSCORED",
    "domain": "reflective",
    "summary": "One sentence verdict — direct, specific to this interface",
    "detail": "Two to four sentences. What was observed. Why it passes or fails.",
    "recommendation": "One specific action. Null if PASSES."
  },
  { "id": 13, "principle": "Mental Models", ... },
  { "id": 14, "principle": "Process Funnel", ... },
  { "id": 15, "principle": "You Are Not the User", ... }
]
