---
description: A mid-size insurance product with one team. Must size as T2, avoid microservices (D6 = 1), and include the generic and insurance floor.
expected_outcome: T2 Standard; modular monolith or a few components on GCP in TypeScript; atomic policy + premium change; audit logging, zone redundancy, resilient outbound calls; effective-dated endorsements, rating version stored, driver-data handling.
tags: [sizing, t2, domain-insurance]
runs: 3
max_turns: 150
timeout_seconds: 2400
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

Design an endorsement intake service for our commercial auto insurance line, then write the requirements to `docs/design/endorsement-intake/requirements.md` and the final design to `docs/design/endorsement-intake/design.md`. Use `endorsement-intake` as the slug.

Everything we know:

- **Purpose:** agents and underwriters submit mid-term endorsement requests on commercial auto policies (add or remove a vehicle, add a driver, change the garaging address). The service validates the request, gets a re-rate from the rating engine, applies the change to the policy, and issues an updated policy document.
- **Load:** about 3,000 requests a day, peaking at about 40 a minute at month end.
- **Data:** about 200 GB over five years, including uploaded documents.
- **Availability:** 99.9% during business hours across US time zones.
- **Integrity:** the policy change and its premium adjustment must apply together or not at all. Never one without the other.
- **Compliance:** requests include driver license numbers and dates of birth. We write business in New York and in several states that adopted the NAIC Insurance Data Security Model Law.
- **Team:** one team of 6 engineers.
- **Integrations:** our policy admin system (REST API), the rating engine (REST API), and the document generation service (REST API).
- **Lifespan:** a product we expect to run for several years.
- **Stack:** TypeScript on Node.js, on Google Cloud.
