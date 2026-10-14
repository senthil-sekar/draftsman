---
type: llm
weight: 3
focus: { source: file, path: docs/design/fraud-detection/design.md }
---

The user gave a one-sentence brief: no claim volume, latency target, team size, existing systems, or data available for training.

Pass only if the current design (not rejected alternatives, and not the evolution path or future triggers with stated conditions) avoids all of: event streaming (Kafka, Kinesis, Event Hubs, Pub/Sub used as an event log), stream processing (Flink, Spark Streaming), a data lake or lakehouse, a feature store, Kubernetes, microservices or more than a few deployables, a graph database, and self-hosted or fine-tuned models. A rules engine or scoring service, a single relational store, a queue for asynchronous scoring, and a hosted or managed model are acceptable.
