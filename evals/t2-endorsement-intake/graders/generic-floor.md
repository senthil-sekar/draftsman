---
type: llm
weight: 2
focus: { source: file, path: docs/design/endorsement-intake/design.md }
---

Pass only if the design names a concrete mechanism for every one of these:

1. The policy change and premium adjustment apply atomically, never one without the other: a database transaction, the transactional outbox pattern, a saga with compensation, or a single atomic operation in the system of record that owns both (for example, one idempotent call to the policy admin system rather than separate calls).
2. Audit logging of access to driver license numbers and dates of birth.
3. Encryption at rest for that personal data.
4. Zone redundancy or an equivalent for 99.9% availability.
5. Timeouts and retries (or circuit breakers) on calls to the policy admin system, rating engine, and document service.
