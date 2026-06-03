---
name: interactive-design-aesthetics/behavioral
description: >
  Domain orchestrator. Behavioral — use → ease. Spawns 5 principle evaluations
  in parallel, collects results, returns behavioral_findings[].
---

# Behavioral Domain — Use → Ease

Behavioral = usability of actual use. Ease, feedback, and efficiency during the interaction.
Visceral primed it. Behavioral delivers or fails it.

---

## Execution

Spawn in parallel. Collect 5 finding objects.

| Meta-Principle | File | Covers |
|---|---|---|
| Signal | behavioral/signal.md | Affordance + Figure/Ground |
| Order | behavioral/order.md | Proximity / Chunking |
| Momentum | behavioral/momentum.md | Fitt's Law + Efficiency of Use |
| Alignment | behavioral/alignment.md | Mental Models |
| Arc | behavioral/arc.md | Process Funnel |

---

## Output

Return `behavioral_findings[]` — five finding objects, one per principle.
Pass to HANDOFF.md for compilation with visceral_findings[] and reflective_findings[].

[
  { "principle": "Affordance + Figure/Ground", "meta": "signal", "domain": "behavioral", "verdict": "...", "summary": "...", "detail": "...", "recommendation": "..." },
  { "principle": "Proximity / Chunking", "meta": "order", "domain": "behavioral", "verdict": "...", "summary": "...", "detail": "...", "recommendation": "..." },
  { "principle": "Fitt's Law + Efficiency", "meta": "momentum", "domain": "behavioral", "verdict": "...", "summary": "...", "detail": "...", "recommendation": "..." },
  { "principle": "Mental Models", "meta": "alignment", "domain": "behavioral", "verdict": "...", "summary": "...", "detail": "...", "recommendation": "..." },
  { "principle": "Process Funnel", "meta": "arc", "domain": "behavioral", "verdict": "...", "summary": "...", "detail": "...", "recommendation": "..." }
]
