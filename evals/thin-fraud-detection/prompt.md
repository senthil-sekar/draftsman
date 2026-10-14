---
description: A one-line greenfield brief in a domain that invites over-building. Unknowns must become recorded low assumptions, not a streaming ML platform.
expected_outcome: Assumptions recorded for volume, team, and integrations; a rules or scoring service with a path to ML; no streaming, lakehouse, feature store, or service split in the current design; human review for fraud decisions.
tags: [thin-brief, greenfield, domain-insurance]
runs: 3
max_turns: 150
timeout_seconds: 2400
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

We're an auto insurer. Design a fraud detection capability for our claims. Write the requirements to `docs/design/fraud-detection/requirements.md` and the design to `docs/design/fraud-detection/design.md`, using `fraud-detection` as the slug.
