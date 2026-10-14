---
description: A two-month internal stopgap for 6 supervisors. Must size as T0 and stay a single small deployable.
expected_outcome: T0 Prototype; one small app on a managed AWS service in Python; no messaging, containers orchestration, or service split.
tags: [sizing, t0]
runs: 3
max_turns: 120
timeout_seconds: 1800
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

Design a small internal tool for our claims operations team, then write the requirements to `docs/design/pto-tracker/requirements.md` and the final design to `docs/design/pto-tracker/design.md`. Use `pto-tracker` as the slug.

Everything we know:

- **Purpose:** 6 claims supervisors record which adjusters are out of office and reassign those adjusters' open claims while they're away.
- **Users:** the same 6 supervisors, business hours, one office.
- **Data:** adjuster names, out-of-office dates, and claim numbers that were reassigned. A few thousand rows in total. No customer data.
- **Availability:** if it's down for a day, they go back to a spreadsheet.
- **Integrity:** if two supervisors reassign the same claim at the same time, last write wins is fine.
- **Team:** one developer, part-time.
- **Integrations:** none. Supervisors type or paste claim numbers.
- **Lifespan:** a stopgap for about two months, until our claims vendor ships this feature.
- **Stack:** Python, on our existing AWS account.
