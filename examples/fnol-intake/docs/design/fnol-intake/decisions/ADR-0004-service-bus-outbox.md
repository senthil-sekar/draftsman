# ADR-0004: Azure Service Bus with transactional outbox

- **Status:** Accepted
- **Date:** 2026-09-16
- **Decision point:** DP-6
- **Deciders:** Product owner, with Draftsman

## Context
FR-5 and FR-6 are asynchronous hand-offs. NFR-3 forbids losing or duplicating claims. D4=2 puts the outbox pattern on the baseline floor.

## Options considered
| Option | Cost | Summary |
|---|---|---|
| Storage Queues | 2 | Cheap; limited dead-lettering |
| Service Bus + outbox | 2 | Topics, duplicate detection, dead-letter queues |
| Event Hubs | 4 | Unlock condition unmet |

## Decision
We will publish `ClaimSubmitted` to a **Service Bus topic** via a **transactional outbox** in Azure SQL, with subscriptions for fraud scoring and notifications.
Chosen by: accepted recommendation

## Consequences
- **Positive:** no dual-write risk; each consumer retries independently.
- **Negative:** an outbox relay to run and monitor.
- **Follow-ups:** alert on dead-letter count > 0.

## Budget override
None.
