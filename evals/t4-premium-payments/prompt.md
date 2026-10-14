---
description: A critical multi-team payments platform. Must size as T4, include the full floor for every spike, and stay within budget or record overrides.
expected_outcome: T4 Critical; multi-region on AWS in Java; ledger with reconciliation; idempotency; tokenized cards; Canadian residency; customer-managed keys; tested regional failover.
tags: [sizing, t4, domain-insurance]
runs: 3
max_turns: 200
timeout_seconds: 3000
allowed_tools: [Read, Glob, Grep, Skill, Agent]
append_system_prompt: "This is a non-interactive run: no one will answer questions or approve steps. Never ask the user a question or wait for confirmation. Treat the facts in the request as the user's complete answers. When a workflow asks you to confirm, lock, or choose, accept your own recommendation and continue. Record anything you still don't know as an explicit assumption. Keep going until every file the request names is written."
---

Design a premium payments platform for our insurance group, then write the requirements to `docs/design/premium-payments/requirements.md` and the final design to `docs/design/premium-payments/design.md`. Use `premium-payments` as the slug.

Everything we know:

- **Purpose:** collect premiums for all our brands by card, ACH, and bank transfer; run installment plans; issue refunds; reconcile with banks and card processors; post to the general ledger.
- **Load:** 4 million policyholders. Normally about 150 payments a second; on renewal and due dates, bursts above 1,500 a second.
- **Data:** about 6 TB a year, kept for 7 years.
- **Availability:** 99.99%. Our regulator expects us to keep taking payments if we lose an entire cloud region.
- **Integrity:** ledger-grade. Every cent must reconcile, and auditors must be able to reconstruct the full history of any account.
- **Compliance:** PCI DSS, GLBA, and state insurance regulations. Some customers are in Canada, and their data must stay in Canada.
- **Team:** 6 teams that deploy independently.
- **Integrations:** 3 card processors, 2 banks (ACH and wires), the general ledger, the billing system, the policy admin system, 4 brand customer portals, and a fraud service.
- **Lifespan:** a platform for 10+ years with many internal consumers.
- **Stack:** Java with Spring Boot, on AWS.
