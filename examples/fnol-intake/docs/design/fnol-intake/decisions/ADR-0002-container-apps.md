# ADR-0002: Azure Container Apps

- **Status:** Accepted
- **Date:** 2026-09-16
- **Decision point:** DP-2

## Decision
Run the API and the outbox relay as two container apps with zone redundancy (NFR-1). App Service was a close alternative; AKS was rejected because its unlock condition is unmet (no platform team).

## Budget override
None.

<!-- Abbreviated in this example. ADR-0001 and ADR-0004 show the full template. -->
