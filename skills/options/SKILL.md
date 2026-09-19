---
name: options
description: Present Draftsman's design options for each needed decision point, with fit, cost, pros, cons, team fit, and a recommendation. Use after requirements are locked, or when the user asks to compare stacks, technologies, or patterns in a draftsman session.
argument-hint: "[slug] [decision point, e.g. DP-3]"
---

# /draftsman:options

Read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md`. Load the active session.

**Gate:** `phase` must be `requirements-locked` or later. If not, stop and point to `/draftsman:clarify`.

Use the `design-catalog` skill (`decision-points.md`, then `patterns.md` and `stacks.md` as needed) and the `rightsizing` skill (`complexity-budget.md`).

## Steps

0. **Confirm the platform.** Read the **Language / runtime preference** and **Cloud / hosting preference** from `requirements.md`'s Existing context. For decision points backed by `stacks.md`, show only the column(s) matching that preference plus one OSS/self-hosted alternative when relevant — never the full multi-provider table. If both are "open," say so and present the 2–3 best cross-ecosystem options instead, naming the trade-off of staying provider-agnostic. Architecture-style and pattern decisions (`patterns.md`) are provider-agnostic and unaffected by this step.
1. **Select decision points.** Go through `decision-points.md` and keep only those whose trigger applies to the locked requirements. List the rest under **Not needed** with a one-line reason each. If `$ARGUMENTS` names a decision point, work on that one only.
2. **Build options.** For each decision point, prepare **2–3 options** that actually fit the profile. Include at least one option cheaper than the recommendation when one exists, so the user sees the trade-off. Use the option shape from the `design-catalog` skill. If `decision-points.md`, `patterns.md`, and `stacks.md` have no entry for this decision point or a candidate option, or the user asks to double-check against current practice, delegate to the `researcher` agent (give it the decision point, the Scale Profile, the existing stack, and any "Org tooling" findings from the survey) instead of estimating from memory. Fold its options in, keep its cost estimates marked **estimated**, and carry its source and date into `options.md`.
3. **Check each option** against unlock conditions and the remaining budget, counting the costs of decisions already accepted. Say plainly if an option would push the design over budget.
4. **Write `options.md`** from `${CLAUDE_PLUGIN_ROOT}/templates/options.md`.
5. **Present in batches of up to 3 decision points**, in the order from `decision-points.md`. For each one, show the options compactly and ask the user to choose: accept the recommendation, pick another option, or ask for more detail.
6. **Record each choice** by following `${CLAUDE_PLUGIN_ROOT}/skills/decide/SKILL.md`, then continue with the next batch. Re-check later options if an earlier choice changes them (for example, choosing Functions changes the messaging options).
7. When every raised decision point has an ADR, set `phase: "decided"`. Next step: `/draftsman:doc`.

## Don't

- Don't present more than 3 options per decision point.
- Don't recommend an option because it is popular or modern; tie every recommendation to requirement IDs, scores, or team fit.
- Don't present options for decision points marked **Not needed**, unless the user asks.
- Don't present a live-researched option without its source and date, or with the same confidence as a catalog entry.
