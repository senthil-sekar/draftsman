---
type: llm
weight: 2
focus: { source: file, path: docs/design/pto-tracker/design.md }
---

The design is right-sized for a two-month internal tool used by 6 people and built by one part-time developer.

Pass only if the design's current architecture (not alternatives it rejected, and not its evolution path or future triggers) is a single small deployable on a managed or serverless service, with one simple data store, and it does NOT adopt any of: microservices or multiple services, Kubernetes, message queues or event buses, event streaming, CQRS, event sourcing, caching layers, multi-region deployment, or an API gateway in front of internal services. Mentioning these as rejected or deferred is fine.
