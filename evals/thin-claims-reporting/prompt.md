---
description: The one-line brief from the real use case. Facts are missing, so the design must record assumptions and stay on the existing stack instead of building a data platform.
expected_outcome: Evolve from claims-portal; unknowns scored low and recorded as assumptions; reporting on the existing PostgreSQL (views or replica) plus perhaps a BI tool; no warehouse, lakehouse, or streaming.
tags: [thin-brief, brownfield, evolve]
runs: 3
max_turns: 150
timeout_seconds: 2400
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

This is our claims platform and it has no reporting or analytics. Scan the project and design what we need to build. Write the requirements to `docs/design/claims-analytics/requirements.md` and the design to `docs/design/claims-analytics/design.md`, using `claims-analytics` as the slug.
