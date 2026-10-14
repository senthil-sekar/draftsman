---
name: domain-insurance
description: Draftsman's insurance domain pack. Adds insurance-specific scoring hints, baseline floor items, and typical integrations. Use when the system being designed serves a carrier, MGA, agency, or insurtech, or touches policies, endorsements, rating, underwriting, billing, premiums, claims, FNOL, reserves, or claim payments.
user-invocable: false
---

# Insurance domain pack

A domain pack sharpens the generic model for one industry. It never replaces the Scale Profile, budget, or floor; it adds to them.

When this pack applies, set `"domain": "insurance"` in `draftsman.json`. From then on:

- Use the **scoring hints** below while scoring in `/draftsman:clarify`. They tell you which dimensions insurance facts usually move; the user's answers still decide the score.
- Add the floor items in `${CLAUDE_PLUGIN_ROOT}/skills/domain-insurance/references/compliance-floor.md` to the generic baseline floor. They cost 0 budget points and are never cut.
- Use `${CLAUDE_PLUGIN_ROOT}/skills/domain-insurance/references/integrations.md` when raising DP-8 (legacy integration) or listing systems to integrate with.

This pack is a design checklist, not legal advice. Obligations vary by state, country, and line of business; confirm them with the user's compliance team and record anything unconfirmed as an assumption.

## Scoring hints

| Signal in the brief or answers | Usually means |
|---|---|
| Claim reserves, claim payments, premium ledger, refunds, commissions | **D4 = 3** (ledger-grade) |
| Policy changes (endorsements, cancellations, reinstatements) | **D4 ≥ 2**: the policy change and its premium adjustment apply together |
| Driver license numbers, MVR, CLUE, credit-based insurance scores | **D5 ≥ 2** (consumer report and DMV-data rules) |
| Card or bank premium payments | **D5 ≥ 2** (PCI DSS); with any other regime, **D5 = 3** |
| Bodily injury claims or medical records | **D5 ≥ 2** |
| Licensed in New York, or in states that adopted the NAIC Insurance Data Security Model Law | **D5 ≥ 2** |
| Customers in more than one country, or residency demands | **D5 = 3** |
| FNOL or claims intake during catastrophe (CAT) events | **D1**: ask about CAT surge; 10x bursts mean **D1 = 3** |
| Renewal or billing cycles | **D1**: batch peaks on due dates; ask how big |
| A core suite (Guidewire, Duck Creek, Majesco, Sapiens) or a mainframe | **D7 ≥ 2** (legacy) |

## Domain concepts to get right

- **Effective dating.** Policy data is effective-dated, and endorsements can arrive out of sequence (a change backdated before another change). The data model must answer "what did this policy look like on date X, as known on date Y".
- **Reproducible rating.** It must be possible to reproduce the premium for any transaction: store the rating-table version and inputs used, not only the result.
- **Claims money.** Reserves and payments are a ledger, not a balance column: append-only entries, reconciled against the payment system.
- **Authority limits.** Claim payments and reserve changes above a threshold need a second approver.
- **Deadlines.** Claims handling has regulatory clocks (acknowledgement, decision, payment). Timestamp every lifecycle event so compliance can be shown.

## Use what exists

Carriers usually run a core suite or a mainframe for policy, billing, and claims. Before designing a new store or service for policy or claims data, ask whether the core system already owns it. Prefer the suite's extension and integration points behind an anti-corruption layer over copying its data.
