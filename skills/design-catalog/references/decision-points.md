# Decision points

Raise a decision only when its trigger applies. Skipping irrelevant decisions is part of right-sizing: do not ask about messaging for a system with no async work.

| ID | Decision | Always? | Trigger when not always |
|---|---|---|---|
| DP-1 | Architecture style | Yes | |
| DP-2 | Compute / hosting | Yes | |
| DP-3 | Primary data store | If stateful | Any persisted data |
| DP-4 | API style | If it exposes an interface | External or cross-team consumers |
| DP-5 | Identity and access | If users or callers authenticate | |
| DP-6 | Async messaging | No | Background work, load leveling, cross-service events, retries |
| DP-7 | Caching | No | Latency target or read-heavy profile |
| DP-8 | Integration approach for legacy | No | D7 ≥ 2 or a named legacy system |
| DP-9 | Workflow / orchestration | No | Long-running, multi-step, or human-in-the-loop processes |
| DP-10 | Secondary stores (search, analytics, blob) | No | A query or data shape the primary store can't serve well |
| DP-11 | Frontend approach | No | The system has a UI |
| DP-12 | Deployment topology (regions, zones) | No | D3 ≥ 2 |
| DP-13 | Observability stack | T2+ | |
| DP-14 | IaC and CI/CD tooling | T1+ | |

## Ordering

Decide in this order, because later choices depend on earlier ones:
DP-1 → DP-2 → DP-3 → DP-6 → DP-4 → DP-5 → the rest.

Batch at most **3 decisions per round** so the user can think about each one.
