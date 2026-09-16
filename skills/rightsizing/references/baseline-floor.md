# Baseline floor

The floor is the minimum a design must include. Floor items cost 0 budget points and are **never** removed to save budget. A missing floor item is an **under-engineering** finding.

## Every tier (T0+)

- Secrets outside source control (a vault or platform secret store)
- TLS for anything reachable over a network
- A README or run instructions

## T1+

- CI/CD pipeline with automated tests
- Infrastructure as code
- Structured logging with correlation IDs
- Health endpoint
- Automated backups for stateful stores

## T2+

- Distributed tracing and metrics (OpenTelemetry or equivalent)
- Alerting tied to an SLO
- Tested restore procedure
- Environments: at least dev and prod, with prod deploys gated

## T3+

- Documented SLOs and error budgets
- Load test plan
- Runbooks for top failure modes
- Automated rollback or progressive delivery

## Raised by dimension scores

| Condition | Required mechanisms |
|---|---|
| D1 ≥ 2 | Autoscaling rules; load test before launch |
| D3 ≥ 2 | Zone redundancy; timeouts, retries with backoff, and circuit breakers on remote calls; defined RTO/RPO |
| D3 = 3 | Tested regional failover |
| D4 ≥ 1 | Idempotent writes (idempotency keys on commands) |
| D4 ≥ 2 | Transactions or the outbox pattern whenever a write also publishes a message |
| D4 = 3 | Immutable audit history; reconciliation job |
| D5 ≥ 1 | Encryption at rest; data classification of PII fields; least-privilege identities |
| D5 ≥ 2 | Audit logging of data access; retention and deletion policy; access reviews |
| D5 = 3 | Data residency controls; key management with customer-managed keys where required |
| D7 ≥ 1 | Versioned API contracts; timeouts on every outbound call |
| D7 ≥ 2 | Anti-corruption layer for legacy integrations; dead-letter handling for messages; contract tests |
