---
type: llm
focus: { source: file, path: docs/design/premium-payments/draftsman.json }
---

Read the `budget` object. Pass only if `budget.limit` and `budget.spent` are both numbers and either `budget.spent` is less than or equal to `budget.limit`, or `budget.overrides` lists at least one ADR ID justifying the excess.
