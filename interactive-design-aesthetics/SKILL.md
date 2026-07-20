---
name: interactive-design-aesthetics
description: >
  Apply Drew Kinney's aesthetic-first interactive design framework to any
  interactive project — websites, apps, touch/spatial/ambient interfaces,
  data visualizations, kiosks. Use when asked to design, critique, audit,
  wireframe, prototype, or evaluate any UI or UX; when asked about navigation,
  affordance, hierarchy, color, user trust, or interaction patterns; when
  comparing print to digital; or when a user wants to move beyond window
  dressing into experience design. Invoking /interactive-design-aesthetics
  followed by a URL or interface name runs a full automated audit via the
  React artifact dashboard.
---

# Interactive Design: Aesthetic-First Framework

*Source: Kinney, Drew. MFA Thesis, Miami International University of Art & Design, 2009.*

---

## Core Position

Aesthetic judgment drives experience. Architecture supports it. Not the reverse.

Tschumi: *"Designing conditions, rather than conditioning designs."*
Han: *"Interfaces should start conforming to us."*

Designers who wait for engineers to finish building before applying aesthetics are decorators. That seat at the table is now contested by PMs, component libraries, and AI trained on mediocre averages. Aesthetic judgment is the one tool only designers own. Use it first.

---

## Three Affect Domains (Norman)

Sequential. All three required. Five principles run in parallel across all three.

| Principle | **Visceral** — first contact → trust | **Behavioral** — use → ease | **Reflective** — memory → loyalty |
|---|---|---|---|
| **Signal** | Color and aesthetic effect set emotional tone before any interaction | Affordance declares what's interactive; figure/ground guides active focus | Consistency makes the signal system recognizable — users trust what they already know |
| **Order** | Hierarchy establishes the dominant element — first path the eye follows | Proximity and chunking make content findable; sequence guides task completion | Learnable systems encode structure; users never reorient on return |
| **Momentum** | Common fate groups elements in the first moment — motion before thought | Fitt's Law and efficiency minimize time-to-goal on every interaction | Smooth arc leaves no friction residue — nothing the user remembers fighting |
| **Alignment** | Aesthetic effect primes emotional expectation before any action | Mental models determine whether the system feels native or alien | You Are Not the User — only observed use validates alignment over time |
| **Arc** | Experience and emotion are designed, not left to emerge | Process funnel preserves the user's place at every interruption | Completed arcs build loyalty; broken arcs don't recover |

Visceral primes Behavioral. "If it looks good, it works better" is not irrational — it's how perception works. Skip Visceral and users start every interaction fighting friction. Reflective never recovers.

---

## 15 Principles

Each entry: what it is, what breaks when violated, one test question.

**1. Aesthetic Effect**
Aesthetics introduced after architecture is lipstick. Build it in. Attractive interfaces test as more usable even before use begins — the perception is real and measurable.
*Ask: Does the first screen produce trust, or neutral?*

**2. Affordance**
Visual signal that tells a user what an element does and that it's interactive. Underlines signal links. Raised shapes signal buttons. Violate affordance once and the trust chain breaks.
*Ask: Can a new user act without instruction?*

**3. Proximity / Chunking**
Proximity: near objects read as related. Chunking: content broken into scannable units. A nav bar is proximity. Paragraph breaks are chunking. Neither is decoration.
*Ask: Do related elements cluster? Can a user find what they need in 5 seconds?*

**4. Color & Psychology**
Color is functional, not aesthetic. Every color decision targets a specific Visceral response. Hue, saturation, value, tint, opacity are emotional levers. Choose schemes based on the intended emotional state at each moment.
*Ask: What emotion does each dominant color produce? Is that the right one?*

**5. Common Fate**
Objects moving the same direction read as a group. Misaligned animation creates perceptual confusion even when layout is correct. Motion must reinforce — or deliberately break — visual groupings.
*Ask: Does motion confirm or contradict the grouping logic?*

**6. Consistency / Similarity**
Users map the system during first use. Break the pattern and they relearn, fatigue, leave. Similar appearance = similar function. Changed appearance = changed function. No exceptions.
*Ask: Is every inconsistency intentional and communicative?*

**7. Efficiency of Use**
Technology is secondary. Experience is primary. Efficiency is not minimalism — it is minimum friction to goal completion. Count steps on the most common task. Remove any that don't carry function.
*Ask: How many steps to complete the primary task? Can any be cut?*

**8. Experience / Emotion**
Emotion is a design tool. Curiosity, fun, and excitement improve information processing neurologically. Design the emotional arc of the full experience, not just the layout of each screen.
*Ask: What should the user feel at each key moment? Does the design produce that?*

**9. Figure / Ground**
Dynamic in interactive design. While navigating, the system is figure. When reading, content is figure. Both states must be supported. The shift between them must be seamless.
*Ask: Can user focus move naturally between system and content?*

**10. Fitt's Law**
Target acquisition time = function of distance / size. Larger targets at shorter distances are faster to hit. Screen corners are effectively infinite targets. Most-used controls should be largest and closest. In touch contexts: minimum 44x44px. No hover states exist. Design accordingly.
*Ask: Are high-frequency targets large and reachable where the hand rests?*

**11. Hierarchy / Sequence**
Information sequence communicates importance. One dominant element per screen establishes the path. Every path leads to a goal — preferably a business goal. If there's no clear primary element, there's no hierarchy.
*Ask: What is the single most important element? Does its size, position, and weight match that?*

**12. Learnable / Memorable**
Attractive interfaces are easier to learn — attention and retention improve together. Consistent aesthetic systems mean no relearning on return visits. Applies Hierarchy, Mental Models, Consistency, and Proximity simultaneously.
*Ask: Could a user returning after 30 days immediately continue without reorienting?*

**13. Mental Models**
Users arrive with an internal picture of how systems work. Design that matches the model disappears — users never notice it. Design that conflicts produces friction users blame on themselves. Match the dominant model or invest in building a new one deliberately.
*Ask: What does the user expect this to do? Does it do that?*

**14. Process Funnel**
Users pursue goals. Any interruption — a link replacing the current window, an unexpected state change — risks losing them before completion. Funnel: wide entry, narrow to conversion. Supplementary content opens in overlays or new tabs. The user's place in the flow is always preserved.
*Ask: Can a user leave the primary flow and return to exactly where they left?*

**15. You Are Not the User**
Designer preference is irrelevant to user experience. Designers who design for themselves ship systems that work for designers. Real users, observed under real conditions, are the only valid test. Every hesitation is a design failure. Not a user error.
*Ask: When did a real user — not a colleague — last use this system while being observed?*

---

## Post-Desktop Rules

The desktop metaphor is dead in practice. Touch, spatial, voice, and ambient surfaces each require fresh logic:

- Tap targets minimum 44x44px
- No hover states — every hover behavior needs a touch replacement
- Non-linear navigation expected — linear flows create friction on touch
- Design for the condition (hand, eye position, context) not the device
- Spatial/AR: depth is a new axis of hierarchy — use it

---

## Project Application

**Before wireframes:** Answer four questions.
1. What emotion leads the Visceral experience?
2. What mental model do users arrive with?
3. What is the single conversion/engagement goal?
4. Who is the actual user?

**Per screen:** Run the short checklist.
- Visceral: immediate trust?
- Affordance: self-explaining?
- Hierarchy: path clear?
- Consistency: system-wide match?
- Fitt's Law: targets sized and positioned correctly?
- Mental Model: matches expectation?
- Funnel: place in flow preserved?

**Testing:** Observe. Don't explain. Don't help. Record hesitation. Hesitation is data.

---

## Sub-Skill Architecture

Three domain orchestrators run in parallel. Each spawns 5 leaf evaluations, collects findings, returns its domain array to HANDOFF.md for compilation.

```
PRE-AUDIT.md
    ↓
┌─────────────┬──────────────┬──────────────┐
VISCERAL.md   BEHAVIORAL.md  REFLECTIVE.md
    ↓               ↓               ↓
alignment       signal          signal
signal          order           order
momentum        momentum        momentum
order           alignment       alignment
arc             arc             arc
    ↓               ↓               ↓
visceral_[]   behavioral_[]  reflective_[]
    └───────────────┴───────────────┘
                    ↓
              HANDOFF.md
```

| Domain | File | Meta-Principle | Principle |
|---|---|---|---|
| Visceral | visceral/alignment.md | Alignment | Aesthetic Effect |
| Visceral | visceral/signal.md | Signal | Color & Psychology |
| Visceral | visceral/momentum.md | Momentum | Common Fate |
| Visceral | visceral/order.md | Order | Hierarchy / Sequence |
| Visceral | visceral/arc.md | Arc | Experience / Emotion |
| Behavioral | behavioral/signal.md | Signal | Affordance + Figure/Ground |
| Behavioral | behavioral/order.md | Order | Proximity / Chunking |
| Behavioral | behavioral/momentum.md | Momentum | Fitt's Law + Efficiency |
| Behavioral | behavioral/alignment.md | Alignment | Mental Models |
| Behavioral | behavioral/arc.md | Arc | Process Funnel |
| Reflective | reflective/signal.md | Signal | Consistency / Similarity |
| Reflective | reflective/order.md | Order | Learnable / Memorable |
| Reflective | reflective/momentum.md | Momentum | Memory Residue |
| Reflective | reflective/alignment.md | Alignment | You Are Not the User |
| Reflective | reflective/arc.md | Arc | Loyalty / Return |

---

## Output Structure

When responding conversationally (no artifact requested):
1. **Diagnosis** — which principles are violated or at risk
2. **Recommendations** — ordered by impact on Visceral → Behavioral → Reflective
3. **Specific decisions** — not "improve hierarchy" but "move primary CTA to upper-right, increase 40%"
4. **Validation question** — one thing to confirm before building

When `/interactive-design-aesthetics [target]` is invoked, render the full artifact dashboard (see DASHBOARD.md).

---

## Artifact Dashboard

Invoking `/interactive-design-aesthetics` followed by a URL, app name, or interface description renders a three-section React artifact dashboard that runs the audit automatically.

### Pipeline

Claude performs all computation. No API calls from the artifact — works in Claude Code desktop, web, and all environments without any API key.

When `/interactive-design-aesthetics [target]` is invoked, Claude:

1. **Audit** — Evaluates all 15 principles using the framework. Produces compact JSON: domain scores (Visceral/Behavioral/Reflective, 1–10), up to 3 violations with severity and specific fix, up to 4 strengths, one validation question. Schema: `{"target","visceral":{"score","verdict"},"behavioral":{"score","verdict"},"reflective":{"score","verdict"},"overall","violations":[{"principle","severity","finding","fix"}],"strengths":[],"validationQuestion"}`. All strings short: verdicts 6 words max, findings/fixes 12 words max, severity `high`/`medium`/`low` only.

2. **SVG Mockup** — Generates compact SVG UI mockup (viewBox `0 0 800 480`). Applies violation fixes. Constraints: `rect`, `text`, `line`, `circle` only — no `path`, `gradient`, `clipPath`. Colors: bg `#0D0D0D`, surface `#161616`, border `#242424`, text `#F0EBE0`, accent `#FF3D00`, green `#00E5A0`. Max 48 elements. Realistic labels.

3. **HTML Prototype** — Generates minimal self-contained HTML demonstrating the top fix. Inline CSS only, no JS. Dark theme `#0D0D0D` bg, `#FF3D00` accent. Hard 60-line limit.

4. **Artifact** — Renders `design-audit.jsx` with `AUDIT_DATA`, `SVG_MARKUP`, and `PROTO_HTML` constants filled in at the top of the file. Artifact starts in "done" phase immediately.

### Constraint: External Image APIs

All third-party image generation APIs — Google Generative AI, OpenAI, Stability AI, etc. — cannot be called from the artifact sandbox. The Image Model selector generates copyable prompts for external platforms instead.

### Image Model Selector

The right panel includes a model selector with seven options:

| Model | Type | Behavior |
|---|---|---|
| Claude SVG | Internal | Auto-generates SVG mockup via Anthropic passthrough |
| Nano Banana Pro | External | Generates formatted prompt for Google AI Studio / ImagineArt |
| GPT-4o | External | Generates formatted prompt for ChatGPT |
| DALL-E 3 | External | Generates formatted prompt for OpenAI Labs |
| Midjourney | External | Generates prompt with `--ar 16:9 --style raw --v 6.1` flags |
| Ideogram | External | Generates prompt emphasizing typography and layout |
| Stable Diffusion XL | External | Generates prompt for Replicate |

Each external model shows a formatted prompt optimized for that platform's syntax, a copy button, and a direct link to the platform. Claude SVG is the only model that renders automatically inside the dashboard.

### Prompt Format Per Model

- **Claude SVG**: Internal SVG generation only — no copyable prompt
- **Nano Banana Pro**: Emphasizes text rendering accuracy, 4K output, layout structure with hex colors
- **GPT-4o**: Descriptive UI brief with color palette and component list
- **DALL-E 3**: Photorealistic UI mockup framing
- **Midjourney**: Weighted prompt with `--ar 16:9 --style raw --v 6.1 --q 2`
- **Ideogram**: Typography-forward layout description
- **Stable Diffusion XL**: Tag-style prompt with quality modifiers

### Markdown Report Export

The header bar includes two export controls:

- **COPY MD** — Copies the full audit report as Markdown to clipboard
- **DOWN REPORT.MD** — Downloads the report as a `.md` file

The markdown report includes: domain scores table, violations with severity and fix, strengths list, validation question, the selected model's image prompt in a code block, and the SVG markup in an SVG code block.

### Design System

- **Background**: `#0A0A0A` root, `#0D0D0D` surface, `#141414` borders
- **Text**: `#F0EBE0` primary, `#999` secondary, `#444` labels
- **Scores**: `#00E5A0` >= 8, `#FFD600` >= 6, `#FF3D00` < 6
- **Severity**: `#FF3D00` high, `#FFD600` medium, `#00E5A0` low
- **Accent**: `#FF3D00`
- **Fonts**: Bebas Neue (labels/headers), DM Serif Display (display type), JetBrains Mono (data/UI)

### Source

Dashboard implementation: `interactive-design-aesthetics/design-audit.jsx`
Full technical specification: `interactive-design-aesthetics/DASHBOARD.md`
