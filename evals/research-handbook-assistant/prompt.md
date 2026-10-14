---
description: Live research path. The user asks to verify options against current sources; the researcher must search only trusted domains and the design should still pick the cheapest sufficient option.
expected_outcome: Researcher runs with allowed_domains; options.md cites only official docs, standards, or architecture centers; retrieval on the existing PostgreSQL (pgvector) rather than a dedicated vector database.
tags: [research, ai, t1]
runs: 3
max_turns: 150
timeout_seconds: 2400
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

Design a question-answering assistant over our claims handbook. Write the requirements to `docs/design/handbook-assistant/requirements.md`, the options to `docs/design/handbook-assistant/options.md`, and the design to `docs/design/handbook-assistant/design.md`, using `handbook-assistant` as the slug.

**For the vector search decision, verify the options against current published sources before recommending one.**

Everything we know:

- **Purpose:** 300 claims adjusters ask questions in plain language and get answers that cite the handbook section they came from.
- **Content:** about 5,000 documents (policy forms, procedures, state-specific guidelines), updated weekly.
- **Load:** a few hundred questions a day.
- **Availability:** business hours; 99.5% is fine.
- **Data:** the handbook contains no customer personal data.
- **Team:** one team of 3 developers.
- **Integrations:** none beyond our identity provider for sign-in.
- **Lifespan:** a product we expect to use for years.
- **Stack:** Python and PostgreSQL on AWS, which we already run.
