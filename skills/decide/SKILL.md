---
name: decide
description: Record a design decision as an ADR in a Draftsman session and update the complexity budget. Use when the user picks an option, accepts a recommendation, or wants to supersede an earlier decision.
argument-hint: "[slug] <decision point> <chosen option>"
---

# /draftsman:decide

Read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md`. Load the active session.

**Gate:** `phase` must be `requirements-locked` or later.

## Steps

1. **Identify the decision** from `$ARGUMENTS` or the conversation: decision point ID, chosen option, and whether the user picked it or accepted the recommendation. If anything is ambiguous, ask one question.
2. **Check for conflicts** with earlier ADRs and locked requirements. If there is one, raise a change request per the core rules instead of recording.
3. **Update the budget.** Add the option's cost to `budget.spent`. If this takes the design over `budget.limit`, tell the user, name the cheaper alternative, and ask whether to proceed. If they proceed, fill the ADR's **Budget override** section and append the ADR ID to `budget.overrides`.
4. **Write the ADR** to `docs/design/<slug>/decisions/ADR-NNNN-<kebab-title>.md` from `${CLAUDE_PLUGIN_ROOT}/templates/adr.md`. Number sequentially from existing ADRs.
5. **Superseding:** if this replaces an earlier decision, set the old ADR's status to `Superseded by ADR-NNNN`, subtract its cost from `budget.spent`, and note which design sections need regeneration.
6. **Update `draftsman.json`:** append `{ "id", "decisionPoint", "choice", "cost", "chosenBy", "status" }` to `decisions`, update `budget`, `updatedAt`.
7. Confirm in one line: `ADR-0003 recorded: Azure Service Bus (2 pts) · budget 7/10`.
