---
type: llm
weight: 2
focus: { source: file, path: docs/design/agent-licensing/design.md }
---

The design is right-sized for 40 internal users, 300 agents' licenses, one team of 3, and two simple integrations.

Pass only if the current architecture (not rejected alternatives or the evolution path) is a single application or modular monolith with one primary database and a scheduled job for the nightly import and reminders, and does NOT adopt microservices, Kubernetes, event streaming, event sourcing, CQRS, a workflow engine, or multi-region deployment. A simple queue or the platform's scheduler is acceptable.
