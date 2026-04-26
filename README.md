# Design-Principles
The desktop metaphor died. Design kept decorating its corpse. Touch, spatial, ambient, worn — each new surface arrived without a design logic. Engineers filled the gap. They still do. Aesthetic judgment isn't window dressing. It's the only lever designers own. Use it or lose the seat.


===================================================================================

---
name: interactive-design-aesthetics
description: >
  Apply Drew Kinney's aesthetic-first interactive design framework to any
  interactive project — websites, apps, touch/spatial/ambient interfaces,
  data visualizations, kiosks. Use when asked to design, critique, audit,
  wireframe, prototype, or evaluate any UI or UX; when asked about navigation,
  affordance, hierarchy, color, user trust, or interaction patterns; when
  comparing print to digital; or when a user wants to move beyond window
  dressing into experience design.
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
 
Sequential. All three required.
 
| Domain | What | Target |
|---|---|---|
| **Visceral** | First-contact impact | Trust, attraction |
| **Behavioral** | Usability of actual use | Ease, feedback, efficiency |
| **Reflective** | Memory after use | Loyalty, return |
 
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
Target acquisition time = function of distance / size. Larger targets at shorter distances are faster to hit. Screen corners are effectively infinite targets. Most-used controls should be largest and closest. In touch contexts: minimum 44×44px. No hover states exist. Design accordingly.
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
 
- Tap targets minimum 44×44px
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
 
## Output Structure
 
1. **Diagnosis** — which principles are violated or at risk
2. **Recommendations** — ordered by impact on Visceral → Behavioral → Reflective
3. **Specific decisions** — not "improve hierarchy" but "move primary CTA to upper-right, increase 40%"
4. **Validation question** — one thing to confirm before building
 **
