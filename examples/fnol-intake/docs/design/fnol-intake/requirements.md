# FNOL Intake Service: Requirements

> Status: LOCKED — locked on 2026-09-16.

## 1. Problem statement
Policyholders and agents report auto accidents by phone today, which takes 20+ minutes and delays claims. We need a digital first-notice-of-loss intake that validates the policy, captures the loss details and photos, issues a claim number immediately, and hands the claim to fraud scoring and adjusters.

## 2. Scope
- **In scope:** web and mobile intake API, policy validation, photo upload, claim number issuance, hand-off to fraud scoring, confirmation notifications.
- **Out of scope:** adjuster workflow, payments, the mobile app UI itself (separate team).

## 3. Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Policyholders and agents submit a loss report (date, location, vehicles, parties, description) | Must |
| FR-2 | Validate that the policy was active on the loss date and covers the vehicle | Must |
| FR-3 | Upload up to 20 photos per claim (≤ 15 MB each) | Must |
| FR-4 | Issue a unique claim number on submission | Must |
| FR-5 | Send each new claim to fraud scoring | Must |
| FR-6 | Email/SMS confirmation with the claim number | Should |
| FR-7 | Agents see the status of claims they submitted | Could |

## 4. Non-functional requirements
| ID | Quality | Target | Source |
|---|---|---|---|
| NFR-1 | Availability | 99.9% monthly | Round 2 |
| NFR-2 | Latency | Submit p95 < 2 s, excluding photo upload | Round 2 |
| NFR-3 | Integrity | Never create duplicate claims for one submission; never lose a submitted claim | Round 3 |
| NFR-4 | Security | PII encrypted; access audited; GLBA and state insurance data-security rules | Round 3 |
| NFR-5 | Recovery | RPO 5 min, RTO 1 h | Round 2 |
| NFR-6 | Retention | Claim data retained 7 years | Round 3 |

## 5. Constraints
| ID | Constraint | Why |
|---|---|---|
| C-1 | Azure only | Company standard |
| C-2 | .NET 8 | Team skills |
| C-3 | Policy admin system is a SOAP service on-premises, reachable via ExpressRoute | Existing landscape |

## 6. Existing context
- **Current stack and skills:** .NET 8, Bicep, GitHub Actions (found by survey, confirmed)
- **Systems to integrate with:** policy admin (SOAP), fraud scoring (REST, async-friendly), notification service (REST), document management (future)
- **System map:** none

## 7. Scale Profile
```
D1 Load 1 | D2 Data 1 | D3 Avail 2 | D4 Consist 2 | D5 Compl 2 | D6 Team 1 | D7 Integr 2 | D8 Life 2
Total 13 → T2 Standard
Spikes: none
Complexity budget: 10 points
```

## 8. Assumptions
| ID | Assumption | Risk if wrong |
|---|---|---|
| A-1 | Peak ~3,000 claims/day (post-storm), under 5 req/s | Catastrophe events could spike 10x → revisit D1 |
| A-2 | Photos average 4 MB; ~500 GB/year | Video support would change D2 |

## 9. Open questions
| ID | Question | Blocking? |
|---|---|---|
| Q-1 | Does fraud scoring need photos, or only claim data? | No |
