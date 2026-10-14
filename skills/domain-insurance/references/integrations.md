# Insurance integrations

Systems an insurance design commonly has to talk to. Ask which ones the user's organization runs before assuming any of them; each one the design depends on counts toward D7.

| Area | Typical systems | Integration style | Design notes |
|---|---|---|---|
| Core policy, billing, claims | Guidewire (PolicyCenter, BillingCenter, ClaimCenter), Duck Creek, Majesco, Sapiens, in-house mainframe (COBOL/CICS, DB2) | Suite APIs and messaging; nightly batch files for mainframes | The core system owns the record. Put an anti-corruption layer in front of it; don't copy its data model into new services. |
| Rating | Core suite rating, standalone rating engines, spreadsheet-driven rating | Synchronous request/response | Store the rating version used per transaction (floor item). Timeouts and a clear failure path when rating is down. |
| Agency and distribution | Agency management systems, comparative raters, agent portals | ACORD XML (P&C), ACORD AL3 downloads | Map ACORD at the edge; keep the internal model clean. |
| Consumer and loss data | LexisNexis (CLUE, MVR), Verisk / ISO ClaimSearch, credit-based insurance scores | Vendor APIs, often per-call priced | Permissible-purpose logging (floor item). Cache only where the vendor's terms allow it. |
| Auto physical damage | CCC, Mitchell, Audatex/Solera | Vendor platforms with assignment and estimate APIs | Asynchronous: assignments and estimates come back over hours or days. |
| Fraud | Internal SIU tools, NICB, vendor fraud scoring | Asynchronous scoring and referral | Usually a queue consumer, not an inline dependency of FNOL. |
| Payments | Card processors, banks (ACH, wires, checks), lockbox | Processor APIs; bank files (NACHA, BAI2) | Daily reconciliation; idempotent commands; tokenized cards (floor items). |
| Documents and communications | Document composition (e.g. OpenText Exstream, Smart Communications), e-signature, print and mail vendors | Asynchronous job APIs | Store which template version produced each document. |
| Regulatory reporting | Statistical agents, state DOI filings, NAIC reporting | Periodic batch extracts | Usually a reporting extract from the ledger or warehouse, not a live integration. |
| Telematics | Device or mobile-app telematics providers | High-volume event streams | Raises D2 and possibly D1; check consent and state privacy rules for driving data. |

## Common shapes

- **Batch is normal.** Many core and vendor integrations are nightly files. Design file ingestion with checksums, idempotent loads, and reconciliation reports instead of assuming real-time APIs everywhere.
- **Asynchronous by nature.** Estimates, fraud scores, and document generation take minutes to days. Model them as state transitions on the claim or policy, not as long synchronous calls.
- **One owner per record.** Decide for every entity (policy, claim, payment, document) which system is the system of record, and say so in the design.
