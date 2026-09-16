# FNOL Intake Service: Options

Profile: T2 Standard · Budget 10 points · Spikes: none

## DP-1 Architecture style

### Option A: Layered monolith
- **Fit:** Adequate. Cheapest, but three integrations and distinct areas (intake, policy, hand-off) benefit from module boundaries.
- **Cost:** 1 · **Pros:** simplest · **Cons:** boundaries erode · **Team fit:** strong · **Traces to:** FR-1..FR-7

### Option B: Modular monolith  ⭐ Recommended
- **Fit:** Strong. One team (D6=1) with clear sub-domains.
- **Cost:** 2 · **Pros:** one deployable; clean seams to split later · **Cons:** needs enforced module rules · **Team fit:** strong · **Traces to:** FR-1..FR-7

### Option C: Microservices
- **Fit:** Poor. ⚠ Unlock condition not met (needs D6 ≥ 2).
- **Cost:** 6 · **Pros:** independent scaling · **Cons:** distributed ops for one team · **Traces to:** none that require it

**Why the recommendation:** Option B gives the boundaries FR-2/FR-5 integrations need at 2 points; C spends 60% of the budget on a problem this team doesn't have.

## DP-2 Compute / hosting
- **A: App Service** (1) — simple; fewer options for background workers.
- **B: Azure Container Apps (1)** ⭐ — runs the API and the outbox relay as separate scalable containers; zone redundancy for NFR-1.
- **C: AKS** (4) — ⚠ unlock condition not met (no platform team).

## DP-3 Primary data store
- **A: Azure SQL Database + Blob Storage (1)** ⭐ — ACID for NFR-3; outbox in the same transaction; Blob for FR-3 photos.
- **B: Cosmos DB + Blob** (3) — flexible schema, but cross-document transactions are limited and the team knows SQL.

## DP-6 Async messaging
- **A: Storage Queues** (2) — cheap, but no sessions, weaker dead-lettering.
- **B: Service Bus + outbox (2)** ⭐ — dead-lettering, duplicate detection for NFR-3, topics for fraud and notifications (FR-5, FR-6).
- **C: Event Hubs** (4) — ⚠ unlock condition not met (D1 < 2, 2 consumers).

## DP-8 Legacy integration
- **A: Anti-corruption layer module (1)** ⭐ — isolates the SOAP model (C-3).
- **B: Call SOAP directly from intake** (0) — leaks the legacy model into the domain.

## DP-4/DP-5 API and identity
- **A: REST behind API Management; Entra External ID for customers, Entra ID for agents, managed identities (1)** ⭐ — two external clients, throttling, audit at the edge.
- **B: REST without a gateway** (0) — fine for one client; weaker for the mobile app's key management.

## Not needed
| Decision point | Why it doesn't apply |
|---|---|
| DP-7 Caching | No read-heavy path; NFR-2 met without it |
| DP-9 Workflow engine | Hand-off is a single async step, not a long-running process |
| DP-10 Search | No search requirement |
| DP-11 Frontend | UI owned by another team (scope) |
