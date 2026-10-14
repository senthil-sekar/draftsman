---
type: llm
weight: 2
focus: { source: file, path: docs/design/endorsement-intake/design.md }
---

Pass only if the design names a concrete mechanism for every one of these:

1. The policy change and premium adjustment apply atomically (a database transaction, the transactional outbox pattern, or a saga with compensation), never one without the other.
2. Audit logging of access to driver license numbers and dates of birth.
3. Encryption at rest for that personal data.
4. Zone redundancy or an equivalent for 99.9% availability.
5. Timeouts and retries (or circuit breakers) on calls to the policy admin system, rating engine, and document service.
