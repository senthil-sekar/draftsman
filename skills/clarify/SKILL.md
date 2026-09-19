---
name: clarify
description: Run Draftsman's drill-down requirement questions, score the Scale Profile, and lock requirements. Use when a draftsman session needs requirements clarified, or when the user wants to revisit or change requirements.
argument-hint: "[slug] [topic to revisit]"
---

# /draftsman:clarify

Read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md`. Load the active session from `docs/design/<slug>/` (use the slug in `$ARGUMENTS`, or the most recently updated `draftsman.json`; if several are active, ask which).

Use the `rightsizing` skill and load `scale-profile.md`.

## Goal

Leave this command with functional requirements, non-functional requirements, constraints, a scored Scale Profile, a complexity budget, and the user's explicit approval to **lock** them.

## Question rounds

Run up to **4 rounds**, each with **at most 5 questions**. Skip any question already answered by the brief or the survey; confirm those instead ("I found <language> and <IaC tool>. Is that the stack to build on?"). If the survey found nothing and the user states no preference, record "open" in `requirements.md` — don't default to any particular language or cloud provider.

| Round | Focus | Covers |
|---|---|---|
| 1 | **Purpose and users** | Core user journeys, who uses it, what "done" looks like for v1, what's out of scope |
| 2 | **Scale and quality** | Peak load (D1), data volume and growth (D2), availability and recovery (D3), latency targets |
| 3 | **Integrity and risk** | Consistency needs (D4), sensitive data and regulations (D5), audit needs |
| 4 | **People and landscape** | Team size and skills (D6), systems to integrate (D7), lifespan and deadline (D8), **language/runtime and cloud provider** (found by the survey, or ask; "no preference" is a valid answer) |

### How to ask

- Offer concrete choices mapped to score levels, plus "I don't know". Example for D1: "Peak traffic? (a) a handful of internal users (b) hundreds per minute (c) thousands per minute (d) bursts of 10x or more (e) I don't know."
- Translate jargon. Ask "If two people edit the same claim at once, what must never happen?" rather than "What consistency model do you need?"
- After each round, write answers into `requirements.md` right away (FR-, NFR-, C-, A-, Q- IDs) and show a one-line summary of what changed.
- Stop early if the remaining questions can't change any score or decision.

## Score and lock

1. Score D1–D8 using the table. For every "I don't know", take the lower plausible score and add an assumption.
2. Compute total, tier, spikes, and complexity budget (see `complexity-budget.md`).
3. Present the **Scale Profile** block and a compact requirements table.
4. Say in one sentence what the tier implies ("T2 Standard: expect a modular monolith or a few services, not a microservice platform").
5. Ask the user to **lock** the requirements, or to correct anything.
6. When the user approves:
   - Set `requirements.md` status to `LOCKED` with today's date.
   - Update `draftsman.json`: `profile`, `budget.limit`, `assumptions`, `openQuestions`, `phase: "requirements-locked"`.
   - Next step: `/draftsman:options`.

## Revisiting after lock

If the session is already locked, treat this command as a **change request**: show the current value, the proposed change, and which scores, ADRs, or design sections it would affect. Apply it only after the user confirms, then set `phase` back to the earliest affected phase.
