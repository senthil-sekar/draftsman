# ADR-0001: Modular monolith

- **Status:** Accepted
- **Date:** 2026-09-16
- **Decision point:** DP-1
- **Deciders:** Product owner, with Draftsman

## Context
One team of six (D6=1), three integrations (D7=2), T2 profile with a 10-point budget. Sub-domains: Intake, Policy verification, Claim hand-off.

## Options considered
| Option | Cost | Summary |
|---|---|---|
| Layered monolith | 1 | Simplest; weak boundaries |
| Modular monolith | 2 | One deployable with enforced modules |
| Microservices | 6 | Unlock condition unmet (D6 < 2) |

## Decision
We will use a **modular monolith** with modules `Intake`, `PolicyGateway`, and `Handoff`, with boundaries enforced by architecture tests.
Chosen by: accepted recommendation

## Consequences
- **Positive:** one pipeline and one deployable; modules can become services later.
- **Negative:** a single scaling unit for the API.
- **Follow-ups:** add NetArchTest rules in CI.

## Budget override
None.
