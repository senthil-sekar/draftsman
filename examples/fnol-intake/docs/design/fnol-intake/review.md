# FNOL Intake Service: Right-size review

- **Date:** 2026-09-16
- **Verdict:** RIGHT-SIZED
- **Budget:** 8 used / 10 limit (overrides: 0)

## Traceability
| Component | Traces to | Finding |
|---|---|---|
| Intake API + modules | FR-1, FR-3, FR-4, FR-7 | ✅ |
| Hosting | NFR-1 | ✅ |
| PolicyGateway | FR-2, C-3 | ✅ |
| Data | FR-3, FR-4, NFR-3, NFR-6 | ✅ |
| Messaging | FR-5, FR-6, NFR-3 | ✅ |
| Edge and identity | NFR-4 | ✅ |

| Requirement | Mechanism | Finding |
|---|---|---|
| NFR-1 … NFR-6 | Section 7 | ✅ All covered |

## Findings
| # | Type | Severity | Finding | Fix |
|---|---|---|---|---|
| 1 | Under | Medium | The R-2 fallback ("pending verification") creates claims without a verified policy, but no requirement covers re-verification | Add FR-8: re-verify pending claims when the policy system recovers, using a scheduled job in PolicyGateway |
| 2 | Drift | Low | The context diagram omits API Management, which appears in the component view | Add APIM to the context diagram |

## Baseline floor check
All T2 items, and all items raised by D3=2, D4=2, D5=2, and D7=2, are present (section 8).

## Recommended changes
1. Run `/draftsman:clarify` to add FR-8 as a change request, then regenerate sections 4 and 10.
