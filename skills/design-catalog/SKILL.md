---
name: design-catalog
description: Draftsman's catalog of architecture patterns, technology stacks, and decision points, each with cost, fit, pros, and cons. Use when presenting design options, recommending a stack or pattern, or explaining trade-offs during a draftsman session.
user-invocable: false
---

# Design catalog

Load only the file you need.

| File | Use it to |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/design-catalog/references/decision-points.md` | Decide **which** decisions this system actually needs to make |
| `${CLAUDE_PLUGIN_ROOT}/skills/design-catalog/references/patterns.md` | Compare architecture and integration patterns |
| `${CLAUDE_PLUGIN_ROOT}/skills/design-catalog/references/stacks.md` | Compare concrete technologies across Azure, AWS, GCP, and open source |

## How to present an option

Every option you present uses this shape:

```
### Option B: Modular monolith on Azure Container Apps  ⭐ Recommended
Fit: Strong. T2 profile, one team (D6=1), 3 integrations (D7=1)
Cost: 2 + 1 = 3 points (budget 10)
Pros: one deployable; module boundaries let you split later; low ops
Cons: one scaling unit; needs discipline to keep modules decoupled
Team fit: matches existing .NET 8 skills
Traces to: FR-1..FR-6, NFR-2
```

## Recommendation rules

1. Prefer the **cheapest option that satisfies every requirement** it traces to.
2. Prefer what the **team already knows and runs**, unless a requirement rules it out. Say which requirement.
3. Prefer **managed services** over self-hosted at T0–T2.
4. Never recommend an option whose unlock condition is unmet without saying so plainly.
5. The catalog is a starting point, not a whitelist. Anything outside it gets a cost estimate using the same scale and a note saying it was estimated.
