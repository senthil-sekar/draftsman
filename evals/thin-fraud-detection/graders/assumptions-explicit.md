---
type: llm
weight: 2
focus: { source: file, path: docs/design/fraud-detection/requirements.md }
---

The user gave no facts about claim volume, latency, team, existing claims system, or historical fraud data.

Pass only if the requirements explicitly record assumptions (labeled as assumptions, for example "A-1") about at least three of: claim volume, scoring latency, team size, the existing claims or core system, availability of labeled fraud history, or which fraud types matter. Fail if those unknowns are presented as stated requirements without being marked as assumptions.
