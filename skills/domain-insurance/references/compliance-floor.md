# Insurance floor additions

These add to `rightsizing/references/baseline-floor.md` when `domain` is `insurance`. Like every floor item, they cost 0 budget points and are never cut to fit the budget. A missing item is an **Under** finding.

Each item names the obligation that usually drives it. Obligations vary by jurisdiction and line of business, so confirm which apply and record unconfirmed ones as assumptions.

## Any system holding policyholder or claimant data

| Floor item | Usually driven by |
|---|---|
| Encryption in transit and at rest; MFA for workforce access to nonpublic personal information (NPI) | NAIC Insurance Data Security Model Law (#668) as adopted by states; NYDFS 23 NYCRR 500 |
| Audit trail of who read or changed NPI | Same, plus GLBA privacy (enforced through state insurance regulators) |
| Security event detection and alerting fast enough to support regulator notification (often 72 hours from determining a cybersecurity event) | NAIC #668 state laws; NYDFS Part 500 |
| Inventory of third-party service providers that receive NPI, with the data each one gets | NAIC #668 third-party oversight |
| Retention and deletion policy per record type, with legal hold | State record-retention and market-conduct rules (commonly 5–10 years after policy expiry or claim closure; confirm per state) |

## Policy, rating, and underwriting

| Floor item | Usually driven by |
|---|---|
| Effective-dated policy records that handle out-of-sequence endorsements | Policy accuracy; billing correctness |
| Store the rating-table version and inputs used for every rated transaction | Rate filings with state departments of insurance; market-conduct exams |
| Log the permissible purpose for every MVR, CLUE, or credit-based score pull; restrict and log access to DMV-sourced fields | FCRA; Driver's Privacy Protection Act (DPPA) |
| Adverse action notice workflow when consumer report data contributes to a decline or higher premium | FCRA |

## Claims

| Floor item | Usually driven by |
|---|---|
| Timestamped claim lifecycle events, with diary or SLA timers for acknowledgement, decision, and payment deadlines | State unfair claims settlement practices laws |
| Append-only reserve and payment entries, reconciled against the payment system | Financial reporting; D4 = 3 |
| Sanctions screening (OFAC SDN list) of payees before any claim disbursement | OFAC regulations |
| Authority limits: a second approver above a configurable payment or reserve threshold | Internal controls; audit |
| A referral path to the special investigations unit (SIU) or fraud scoring | State anti-fraud plan and fraud reporting requirements |
| Medical and bodily-injury records classified and access-restricted as the most sensitive tier | State medical privacy laws; contractual requirements |

## Premium payments

| Floor item | Usually driven by |
|---|---|
| Card data never touches the system: processor-hosted fields or tokenization to shrink PCI scope | PCI DSS |
| Idempotent payment commands and daily reconciliation against processor and bank files | Financial integrity |
