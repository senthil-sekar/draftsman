---
type: llm
weight: 2
focus: { source: file, path: docs/design/handbook-assistant/design.md }
---

The corpus is about 5,000 documents and a few hundred questions a day, and the team already runs PostgreSQL on AWS.

Pass only if the current design (not rejected alternatives or the evolution path) does retrieval in an existing or already-managed store (for example pgvector in the existing PostgreSQL, or a managed search service such as OpenSearch or a managed knowledge base), uses a hosted model API rather than self-hosting a model, and does NOT add a dedicated vector database product (Pinecone, Qdrant, Weaviate, Milvus, Zilliz) or Kubernetes.
