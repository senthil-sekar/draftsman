---
name: doc
description: Generate the Draftsman design document with Mermaid diagrams, component traceability, NFR mechanisms, baseline floor, and evolution path. Use after all decisions are recorded, or when the user asks to write or regenerate the design doc.
argument-hint: "[slug]"
---

# /draftsman:doc

Read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md`. Load the active session.

**Gate:** `phase` must be `decided` or later. Then list `docs/design/<slug>/decisions/` and check that every entry in `draftsman.json` `decisions`, and every decision point raised in `options.md`, has an ADR file:
- **Decided but no file** (the choice is in `draftsman.json`, `options.md`, or the conversation): write the missing ADR now by following `${CLAUDE_PLUGIN_ROOT}/skills/decide/SKILL.md`. That records an existing decision; it doesn't make a new one.
- **Never decided:** list it and point to `/draftsman:options`.

## Steps

1. **Draft.** Delegate to the `drafter` agent with the paths to `requirements.md`, `options.md`, every ADR, `${CLAUDE_PLUGIN_ROOT}/templates/design.md`, and `current-state.md` if `mode` is `evolve`. The drafter returns the full design document.
2. **Check the draft yourself before writing it:**
   - Every component in section 4 has a `Traces to` value.
   - Every NFR appears in section 7.
   - Every floor item for this tier, these scores, and these capabilities appears in section 8 (load `baseline-floor.md` from the `rightsizing` skill), plus the domain pack's floor additions if `draftsman.json` has a `domain`.
   - Every technology named matches an accepted ADR, or in evolve mode an `Existing` component in `current-state.md`. Anything else is either removed or raised as a new decision.
   - Mermaid blocks use valid syntax: `flowchart`, `sequenceDiagram`, or `erDiagram`; no parentheses or quotes inside unquoted labels.
3. **Write** `docs/design/<slug>/design.md`.
4. **Update** `draftsman.json`: `phase: "designed"`, `budget.spent` recomputed from the components table, `updatedAt`.
5. **Summarize** in five bullets or fewer, then recommend `/draftsman:review`.
