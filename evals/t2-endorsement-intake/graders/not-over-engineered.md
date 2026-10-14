---
type: llm
weight: 2
focus: { source: file, path: docs/design/endorsement-intake/design.md }
---

The design is for one team of 6 engineers, peak load of about 40 requests a minute, and three REST integrations.

Pass only if the current architecture (not rejected alternatives or the evolution path) is a modular monolith or at most a small number of deployables owned by that one team, and does NOT adopt: microservices per bounded context, Kubernetes, event streaming (Kafka, Pub/Sub used as an event log, or similar), event sourcing, CQRS with separate read stores, a service mesh, or multi-region active-active deployment. A single queue for asynchronous work such as document generation is acceptable.
