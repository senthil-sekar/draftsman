---
type: llm
weight: 2
focus: { source: file, path: docs/design/endorsement-intake/design.md }
---

Pass only if the design addresses at least three of these insurance-specific concerns with a concrete mechanism:

1. Effective-dated policy changes, including out-of-sequence (backdated) endorsements.
2. Storing the rating version or rating inputs used for each re-rate, so the premium can be reproduced.
3. Restricted, logged access to driver data obtained from or protected as DMV or consumer-report data (DPPA or FCRA), or a permissible-purpose record.
4. Security event detection and incident response that supports regulator notification (for example, NYDFS Part 500 or a state version of the NAIC Insurance Data Security Model Law).
5. A record retention and legal-hold policy for policy and endorsement records.
