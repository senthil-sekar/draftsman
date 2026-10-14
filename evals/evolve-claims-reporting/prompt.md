---
description: Brownfield change. Adding reporting to an existing FastAPI + PostgreSQL system on AWS must extend what exists, not bolt on a data platform.
expected_outcome: Evolve session from claims-portal; reporting built on the existing PostgreSQL (views, read replica) and app, maybe a managed BI tool; components marked Existing/Changed/New; rollout steps.
tags: [brownfield, evolve, domain-insurance]
runs: 3
max_turns: 150
timeout_seconds: 2400
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

This repository is our claims portal. It has no reporting, and we need to add it. Plan the change, then write the requirements to `docs/design/claims-reporting/requirements.md` and the final design to `docs/design/claims-reporting/design.md`. Use `claims-reporting` as the slug.

Everything we know about the change:

- **Users:** about 15 claims operations managers.
- **Reports:** claims opened and closed per day, average cycle time per adjuster, and open-claim aging buckets (0–30, 31–60, 61–90, 90+ days). Each report can be exported to CSV.
- **Freshness:** data can be up to 24 hours old.
- **History:** two years.
- **Team:** the same team of 4 that runs the portal today.
- **Constraints:** stay on our current stack unless something truly can't be done with it.
