---
type: llm
weight: 2
focus: { source: file, path: docs/design/fraud-detection/design.md }
---

Fraud scores affect real policyholders.

Pass only if the design does all three: (1) routes flagged claims to human review (for example a special investigations unit referral) rather than automatically denying them, (2) logs the inputs, rules or model version, and outcome behind each score, and (3) includes testing or monitoring for unfair bias or discrimination in the scoring.
