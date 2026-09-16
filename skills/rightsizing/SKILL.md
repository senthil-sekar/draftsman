---
name: rightsizing
description: Draftsman's right-sizing model. Use whenever scoring requirements, choosing how much architecture a system needs, checking a design for over-engineering or under-engineering, or when any draftsman command refers to the Scale Profile, complexity budget, or baseline floor.
user-invocable: false
---

# Right-sizing model

Draftsman keeps designs honest with three linked tools. Load the reference file you need; do not load all of them by default.

| Tool | Answers | Reference |
|---|---|---|
| **Scale Profile** | How demanding is this system, dimension by dimension? | `${CLAUDE_PLUGIN_ROOT}/skills/rightsizing/references/scale-profile.md` |
| **Complexity budget** | How much architectural machinery is justified? | `${CLAUDE_PLUGIN_ROOT}/skills/rightsizing/references/complexity-budget.md` |
| **Baseline floor** | What is the minimum the design must include to be safe? | `${CLAUDE_PLUGIN_ROOT}/skills/rightsizing/references/baseline-floor.md` |

## The two laws

1. **Every component traces to a requirement.** A box, pattern, or technology with no requirement ID behind it is over-engineering until proven otherwise.
2. **Every requirement traces to a mechanism.** A non-functional requirement with no component or practice satisfying it is under-engineering.

## How the tools fit together

- The **Scale Profile** scores 8 dimensions from 0 to 3 and maps the total to a tier (T0 to T4).
- The **tier** sets the complexity budget, a ceiling on architectural cost.
- **Individual dimension scores** unlock specific patterns (for example, Consistency 3 unlocks event sourcing) and raise the baseline floor.
- Going over budget is allowed only with an ADR that records a budget override and names the requirement that forces it.

## Defaults when the user doesn't know

- If a dimension is unknown, score it at the **lower** plausible value, record an assumption (`A-n`), and flag it as a risk to revisit.
- Never raise a score "to be safe". Safety comes from the baseline floor, not from inflated scale.
