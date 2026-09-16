# ADR-0003: Azure SQL Database and Blob Storage

- **Status:** Accepted
- **Date:** 2026-09-16
- **Decision point:** DP-3

## Decision
Azure SQL (zone redundant, point-in-time restore for NFR-5) holds claims and the outbox; Blob Storage holds photos with a 7-year lifecycle policy (NFR-6).

## Budget override
None.

<!-- Abbreviated in this example. ADR-0001 and ADR-0004 show the full template. -->
