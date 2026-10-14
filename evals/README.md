# Draftsman evals

Regression tests for the thing Draftsman exists to get right: **designs sized to their requirements.** Each case is a system with a known size, and the graders check that the design is neither too big nor too small, and that it stays on the stack the user asked for.

They run with [`claude plugin eval`](https://code.claude.com/docs/en/plugin-evals).

## Cases

| Case | Expected | What it catches |
|---|---|---|
| `t0-pto-tracker` | T0 Prototype | Over-engineering a two-month internal stopgap |
| `t1-agent-licensing` | T1 Simple, no stack given | Silently defaulting to one language or cloud |
| `t2-endorsement-intake` | T2 Standard, insurance | Microservices for one team; missing generic or insurance floor items |
| `t4-premium-payments` | T4 Critical, insurance | Under-engineering a multi-region ledger; blowing the budget without an override |
| `evolve-claims-reporting` | Brownfield change | Bolting a data platform onto an existing app instead of extending it |
| `thin-claims-reporting` | One-line brief, brownfield | Building a data platform when the brief says only "we have no reporting" |
| `thin-fraud-detection` | One-line brief, greenfield | Reaching for streaming, a lakehouse, or a feature store with no facts to justify them; auto-denying flagged claims |
| `research-handbook-assistant` | T1 with live research | Searching without the trusted-domain filter; citing blogs or forums; adding a vector database the existing PostgreSQL can replace |

The full-fact cases give the agent everything up front, and their facts put the expected Scale Profile total in the middle of its tier band, so a tier failure means real drift. The **thin-brief** cases give one sentence, like a real request. They test what Draftsman does with missing facts: score low, record assumptions, and extend what exists.

## Running

```bash
npm run eval:quick          # 1 run per case, plugin arm only: cheap smoke test
npm run eval                # 3 runs per case, with and without the plugin
npm run eval -- --case 't2-*'
```

Both scripts pass `--scaffold`, which runs the brownfield cases' `fixture.sh` to build a fake existing repository. It only writes files into the run's empty workspace. They allow `WebSearch` and `WebFetch` for the research case, which makes real web requests, so its results can vary with search results over time. They also pass `--no-publish`, so reports stay local. Add `--publish-report` to share one. In CI, also add `--trust-plugin`.

Results go to `evals/results/<timestamp>/` (gitignored): `report.html` and `aggregate-result.json`.

## Why the prompts state every answer

Eval runs have no user to answer questions. Every case uses `append_system_prompt` to tell the agent to accept its own recommendations and record assumptions instead of asking, and `AskUserQuestion` is removed with `--disallow-tools`. The interview itself isn't tested. The full-fact cases test whether the answers turn into a right-sized design; the thin-brief cases test what happens when the answers are missing.

## Reading the score and Δ

There are two kinds of grader, and both count toward the score:

- **Outcome graders** judge the design itself (`design.md`, `requirements.md`, `options.md`): is it right-sized, on the requested stack, covering the floor, citing trusted sources? These are fair to both arms, so their per-grader Δ is the honest measure of what the plugin adds.
- **Process graders** check plugin artifacts: the tier and budget in `draftsman.json`, ADRs written, evolve mode, the domain pack loaded, the `current-state.md` baseline. The no-plugin arm can't produce these, so they inflate the headline Δ. They're there to catch regressions in the plugin itself (for example, a T2 case drifting to T3). `t4-premium-payments/graders/budget-respected.md` is an `llm` grader but a process check, because it reads `draftsman.json`.

`tool_used: Skill` graders are indicators only and don't affect the score. The `--threshold` (default 1.0) applies to the plugin arm.

## Adding a case

1. Pick a system and write its facts so the total lands mid-band (see `skills/rightsizing/references/scale-profile.md`).
2. Pin the output paths in the prompt (`docs/design/<slug>/...`) so graders can read them.
3. Write at least one outcome grader. Phrase it so mentions of rejected alternatives or the evolution path don't cause false failures.
4. Run `npm run validate` (it checks grader types and regex syntax), then `npm run eval:quick -- --case <name>`.
