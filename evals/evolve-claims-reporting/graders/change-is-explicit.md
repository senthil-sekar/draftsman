---
type: llm
weight: 2
focus: { source: file, path: docs/design/claims-reporting/design.md }
---

Pass only if the design makes the change explicit in both of these ways:

1. It distinguishes existing components from changed or new ones (a status column or equivalent labels such as Existing, Changed, New).
2. It describes how the change rolls out: the order of steps, any database migration or backfill of two years of history, and how to roll back.
