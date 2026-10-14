---
name: evolve
description: Plan a change to an existing system with Draftsman (add a capability, integrate a new system, or handle new scale), starting from its current Scale Profile and architecture instead of a blank page. Use when the user wants to add to, modify, or scale a system that already exists in the repository or in an earlier draftsman session.
argument-hint: "<what you want to change or add>"
---

# /draftsman:evolve

Plan a change to an existing system: **$ARGUMENTS**

First read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md` and follow it for the whole session.

## How evolve differs from start

- **The current system is the starting point.** Its components are an accepted baseline: they need no ADRs, and their cost counts against the budget.
- **Only the change is designed.** Requirements, decisions, and the design cover what is new or changed.
- **"Extend what exists" is always the first option.**

## Steps

1. **Find the baseline**, in this order:
   1. An existing session in `docs/design/*/draftsman.json` for this system, preferably with `phase` `designed` or `reviewed`.
   2. Otherwise, the system itself: delegate to the `surveyor` agent (it reads AgentAtlas maps and manifests).
   3. If there is no existing system, this is not a change. Point to `/draftsman:start` and stop.
2. **Capture the brief.** If no description was provided, ask for one in a few sentences.
3. **Create the change session.** Choose a kebab-case `slug` for the change (not the system) and confirm it in one line. Create `docs/design/<slug>/` and copy `${CLAUDE_PLUGIN_ROOT}/templates/draftsman.json`. Set:
   - `mode: "evolve"`
   - `baseline: { "slug": <base session slug or null>, "source": "session" | "survey", "profile": <as-is scores, total, tier>, "spent": <as-is cost> }`
   - `domain` copied from the base session, if it has one.
4. **Write `current-state.md`** from `${CLAUDE_PLUGIN_ROOT}/templates/current-state.md`:
   - **From a session:** copy the profile and the components with their costs from its `draftsman.json` and `design.md`.
   - **From a survey:** list the components found, estimate each one's cost with `complexity-budget.md` from the `rightsizing` skill, and score an as-is profile, marking every inferred score as an assumption. Confirm the as-is profile with the user in one round of at most 5 questions.
   - Record constraints and debt that limit the change ("single PostgreSQL instance, no read replica").
5. **Write `requirements.md`** with only the change's requirements, constraints, and assumptions. In **Existing context**, point to `current-state.md`. The language/runtime and cloud preference default to the existing stack unless the user says otherwise.
6. **Re-score from the baseline.** Continue with the `/draftsman:clarify` workflow (read `${CLAUDE_PLUGIN_ROOT}/skills/clarify/SKILL.md`), with these differences:
   - Start from the baseline scores and ask only about dimensions the change could move.
   - Record each moved score as a delta in `requirements.md`: `D2 1 → 2: two years of reporting history`. Unmoved dimensions keep their baseline score.
   - Recompute total, tier, and budget. If the tier changes, say in one sentence what that implies.
7. **Set the budget.** `budget.limit` comes from the new tier; `budget.spent` starts at `baseline.spent`, so the change spends only what remains. If the baseline already exceeds the limit, record it under open questions as a pre-existing condition: the change can still proceed, but any added cost needs a budget override ADR.
8. **Options and decisions.** Continue with the `/draftsman:options` workflow (read `${CLAUDE_PLUGIN_ROOT}/skills/options/SKILL.md`), with these differences:
   - Raise only the decision points the change touches.
   - Option A for each one is **extend what exists**: an existing component, store, or platform, with its marginal cost (often 0).
   - A new technology must name the requirement the existing stack can't meet.
   - Replacing an existing component is a decision like any other; put the migration effort in its Cons.
9. **Design.** `/draftsman:doc` produces the **target state**, with three additions:
   - The components table gets a **Status** column: `Existing`, `Changed`, or `New`. Existing components carry their baseline cost and trace to `current-state.md`.
   - The Summary opens with one sentence of **current → target**.
   - Deployment includes a **Rollout**: the order of changes, data migrations and backfills, feature flags, and how to roll back each step.
10. **Review** with `/draftsman:review` as usual.

## Don't

- Don't redesign the existing system. Improvements outside the change go in **Risks and open items** or the **Evolution path**.
- Don't re-ask anything the baseline already answers.
- Don't introduce a parallel stack (a second database engine, language, or cloud) unless a requirement rules out the existing one.
