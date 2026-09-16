# Complexity budget

Every architectural choice has a **cost** in points: build effort, operational burden, and cognitive load. The tier sets how many points the design may spend.

| Tier | Budget |
|---|---|
| T0 Prototype | 3 |
| T1 Simple | 6 |
| T2 Standard | 10 |
| T3 Scaled | 16 |
| T4 Critical | 24 |

## Rules

- Sum the cost of every pattern and technology in the design (costs are in `design-catalog` → `patterns.md` and `stacks.md`).
- Baseline floor items (see `baseline-floor.md`) cost **0**; they are never cut to fit the budget.
- **Under budget is good.** Unused budget is not an invitation to add things.
- **Over budget** requires a `Budget override` section in an ADR that names the requirement ID forcing the cost. The review reports every override.
- A pattern whose **unlock condition** is not met counts double and is flagged, even if the design is under budget.

## Quick cost reference

| Choice | Cost | Unlock condition |
|---|---|---|
| Layered or single-app monolith | 1 | Always |
| Modular monolith | 2 | Always |
| Serverless functions (as primary compute) | 2 | Event-driven or bursty load |
| Microservices | 6 | D6 ≥ 2 **and** (D1 ≥ 2 **or** D7 ≥ 2) |
| Kubernetes (self-managed or AKS/EKS/GKE) | 4 | D6 ≥ 2 **and** a platform team or existing cluster |
| Managed container/app platform | 1 | Always |
| Message queue | 2 | Async work, load leveling, or retries across boundaries |
| Event streaming (Kafka, Event Hubs, Kinesis) | 4 | D7 ≥ 2 **and** (D1 ≥ 2 or 3+ consumers) |
| CQRS (separate read models) | 3 | Stated read/write asymmetry or conflicting query needs |
| Event sourcing | 5 | D4 = 3 **or** full history reconstruction required |
| Saga / process manager | 3 | A business transaction spans 2+ services |
| Distributed cache | 1 | Latency target or read-heavy access |
| Read replicas | 1 | D1 ≥ 2 with read-heavy access |
| Sharding / partitioned data | 5 | D2 = 3 **or** D1 = 3 |
| Multi-region active-passive | 4 | D3 ≥ 3 **or** a stated DR requirement |
| Multi-region active-active | 7 | D3 = 3 **and** a regional RTO near zero |
| Service mesh | 4 | Microservices **and** D6 = 3 |
| API gateway / APIM | 1 | External consumers or 3+ backend APIs |
| Workflow engine (Durable Functions, Temporal, Step Functions) | 2 | Long-running or human-in-the-loop processes |
| Search engine | 2 | Full-text or faceted search requirement |
| Polyglot persistence (each extra store type) | 2 | A query or data shape the primary store can't serve |
| Micro-frontends | 5 | D6 ≥ 3 with independent UI teams |
