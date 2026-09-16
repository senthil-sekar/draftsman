# ADR-0005: Anti-corruption layer for policy admin

- **Status:** Accepted
- **Date:** 2026-09-16
- **Decision point:** DP-8

## Decision
The PolicyGateway module translates the SOAP policy model (C-3) into a PolicyCoverage value object, with timeouts, retries, and a circuit breaker.

## Budget override
None.

<!-- Abbreviated in this example. ADR-0001 and ADR-0004 show the full template. -->
