# Scale Profile

Score each dimension 0–3. Use the user's answers; where they don't know, take the lower plausible score and record an assumption.

| # | Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|---|
| D1 | **Load** (peak traffic) | Internal tool, < 10 req/s | < 100 req/s | < 1,000 req/s | > 1,000 req/s, or spiky 10x bursts |
| D2 | **Data** (volume and growth) | < 10 GB | < 1 TB | < 10 TB | > 10 TB, or high-velocity streams |
| D3 | **Availability** (target) | Best effort (~99%) | 99.5% | 99.9% | 99.95%+, or multi-region required |
| D4 | **Consistency** (integrity needs) | Eventual is fine | Per-entity strong consistency | Multi-entity transactions | Ledger-grade: money, policy, claims reserves; full reconstruction needed |
| D5 | **Compliance** (security and regulation) | No sensitive data | Basic PII | One regime (PCI, HIPAA, SOC 2, GLBA, state insurance regs) | Multiple regimes, audit trails, data residency |
| D6 | **Team** (size and topology) | 1–2 devs | One team, ≤ 8 | 2–4 teams | 5+ teams deploying independently |
| D7 | **Integration** (surface) | Standalone | 1–3 integrations | 4–10, including legacy | 10+, partners, or many event consumers |
| D8 | **Lifespan** (horizon) | Prototype or spike, < 3 months | MVP, to be validated | Product, multi-year | Platform, 5+ years, many consumers |

## Tier mapping (sum of D1–D8)

| Total | Tier | Shape it usually implies |
|---|---|---|
| 0–4 | **T0 Prototype** | Single deployable, managed services, minimal ops |
| 5–9 | **T1 Simple** | Single app or modular monolith, one database, CI/CD |
| 10–14 | **T2 Standard** | Modular monolith or a few services, async where needed, full observability |
| 15–19 | **T3 Scaled** | Services per bounded context, messaging backbone, automated resilience |
| 20–24 | **T4 Critical** | Multi-region, strict governance, dedicated platform capabilities |

## Spikes override the average

A single dimension at 3 is a **spike**. Spikes unlock mechanisms regardless of tier. For example, a T1 system with D4 = 3 still needs ledger-grade integrity, but not microservices. Always list spikes separately in the profile.

## Recording format

```
Scale Profile
D1 Load 1 | D2 Data 1 | D3 Avail 2 | D4 Consist 3 | D5 Compl 2 | D6 Team 1 | D7 Integr 2 | D8 Life 2
Total 14 → T2 Standard
Spikes: D4 Consistency (3)
Assumptions: A-1 peak load taken from "a few thousand users/day"
```
