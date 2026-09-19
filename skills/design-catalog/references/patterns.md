# Patterns

Costs and unlock conditions match `rightsizing/references/complexity-budget.md`.

## Architecture styles

| Pattern | Cost | Use when | Avoid when | Pros | Cons |
|---|---|---|---|---|---|
| Layered monolith | 1 | T0–T1, one small team | Several teams need independent releases | Simplest to build, test, deploy | Boundaries erode without discipline |
| Modular monolith | 2 | T1–T2; boundaries matter but one team | Parts have wildly different scaling needs | Clear bounded contexts; can split later; one deploy | Needs enforced module rules (tests or analyzers) |
| Microservices | 6 | D6 ≥ 2 and independent scaling or release cadence | One team; unclear domain boundaries | Independent deploy/scale; team autonomy | Distributed failures, data consistency, heavy ops |
| Serverless / event-driven functions | 2 | Bursty or event-triggered workloads | Long-running, chatty, or latency-critical paths | Pay per use; no servers | Cold starts; harder local testing; vendor lock-in |
| Strangler fig | 2 | Replacing a legacy system incrementally | Greenfield | Low-risk migration; value early | Two systems run in parallel for a while |

## Data and consistency

| Pattern | Cost | Use when | Avoid when | Pros | Cons |
|---|---|---|---|---|---|
| Single relational DB | 0 (in DP-3) | Default for transactional data | Data or load at D2/D1 = 3 | ACID; mature tooling | Vertical scaling limits |
| Transactional outbox | 0 (floor at D4 ≥ 2) | A write must also publish a message | No messaging | Reliable publish without 2PC | Relay process to run |
| CQRS | 3 | Reads and writes need different models or scale | Simple CRUD | Optimized read models | Eventual consistency between sides |
| Event sourcing | 5 | Full history is a requirement; ledger-grade integrity | CRUD domains; team new to it | Complete audit; temporal queries | Steep learning curve; schema evolution is hard |
| Saga (orchestrated or choreographed) | 3 | A business transaction spans services | All data in one DB | Consistency without distributed locks | Compensation logic; harder debugging |
| Sharding | 5 | D2 = 3 or D1 = 3 | Anything smaller | Horizontal write scale | Cross-shard queries; rebalancing |
| Cache-aside | 1 | Read-heavy access or latency target | Data must always be fresh | Big latency wins | Invalidation bugs; stale reads |

## Integration

| Pattern | Cost | Use when | Avoid when | Pros | Cons |
|---|---|---|---|---|---|
| Synchronous REST/gRPC | 0 | Request/response with immediate answer | Long chains of calls (latency and availability multiply) | Simple, debuggable | Temporal coupling |
| Queue-based load leveling | 2 | Spiky load; slow downstreams | Caller needs the result now | Smooths spikes; retries | Latency; dead-letter handling |
| Publish/subscribe events | 2–4 | Several consumers react to the same fact | One consumer | Loose coupling | Harder to trace; schema versioning |
| Anti-corruption layer | 1 | Legacy or partner model differs from yours | Models already align | Protects your domain model | Translation code to maintain |
| API gateway | 1 | External consumers; 3+ APIs; throttling or auth at the edge | One internal API | Central policy, keys, quotas | Another hop; config sprawl |
| Backend for frontend | 2 | Multiple clients with different needs | One client | Tailored payloads | More services |

## Frontend

| Pattern | Cost | Use when | Avoid when | Pros | Cons |
|---|---|---|---|---|---|
| Static site / server-rendered MPA | 0 (in DP-11) | Content-first, simple forms, small team, SEO matters | Rich, app-like interactivity | Simplest to build and host; great SEO and load time | Full page reloads; less app-like UX |
| SPA (client-rendered) | 1 | App-like interactivity; a separate API already exists | SEO-critical public content; low-powered or offline-first clients | Rich UX; clean API/frontend split | Client bundle size; SEO needs extra work; auth/state on the client |
| SSR / meta-framework (hybrid) | 2 | Need both SEO and rich interactivity | Small team unfamiliar with the framework's server runtime | Fast first paint; SEO; still app-like | Two runtimes to operate (server + client); more moving parts |
| Micro-frontends | 5 | D6 ≥ 3 with independent UI teams shipping the same product | One team; one release cadence | Independent team deploys | Shared design system and routing overhead; duplicate dependencies |

## Resilience (floor items, cost 0 when required)

Timeouts, retries with exponential backoff and jitter, circuit breakers, bulkheads, idempotency keys, dead-letter queues, health checks.
