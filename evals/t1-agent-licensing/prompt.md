---
description: A modest internal product with no language or cloud chosen. Must size as T1 and must not silently pick a stack.
expected_outcome: T1 Simple; a single app with a scheduled job; language and cloud either recorded as explicit assumptions or presented as cross-ecosystem options, never assumed silently.
tags: [sizing, t1, platform-agnostic]
runs: 3
max_turns: 120
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

Design a producer licensing tracker for our distribution team, then write the requirements to `docs/design/agent-licensing/requirements.md` and the final design to `docs/design/agent-licensing/design.md`. Use `agent-licensing` as the slug.

Everything we know:

- **Purpose:** track state producer licenses for about 300 independent agents and email reminders 60, 30, and 7 days before a license expires. The licensing team updates records by hand when an agent renews.
- **Users:** 40 internal staff on the licensing and distribution teams, business hours.
- **Data:** agent name, National Producer Number, business address, licensed states and lines, expiry dates. About 50,000 records over five years.
- **Availability:** should be up during business hours; an hour-long outage is annoying but acceptable.
- **Integrity:** one person edits a given license record at a time. No money is involved.
- **Team:** one team of 3 developers.
- **Integrations:** a nightly pull of license data from NIPR (the National Insurance Producer Registry), and sending email through our company email service.
- **Lifespan:** a product we expect to use for years.
- **Stack:** we haven't chosen a language or a cloud provider yet. The team is open.
