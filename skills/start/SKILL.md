---
name: start
description: Start a Draftsman system design session from a rough idea. Use whenever the user asks to design, architect, or plan a system, service, tool, platform, or major feature, of any size (including small internal tools), or asks what to build for a new capability.
argument-hint: "<rough description of what you want to build>"
---

# /draftsman:start

Begin a guided design session for: **$ARGUMENTS**

First read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md` and follow it for the whole session.

## Steps

1. **Check for an existing session.** Look for `docs/design/*/draftsman.json`. If one matches this idea, offer to resume it with `/draftsman:status` instead of starting over.
2. **Capture the brief.** If no description was provided, ask the user to describe the idea in a few sentences. Don't ask anything else yet.
3. **Survey existing context.** Delegate to the `surveyor` agent to scan the repository for the current stack, IaC, pipelines, and system maps. If the workspace has no code, skip this and note "greenfield". If the idea changes or extends a system that already exists here (rather than building a new one beside it), switch to the `/draftsman:evolve` workflow (read `${CLAUDE_PLUGIN_ROOT}/skills/evolve/SKILL.md`) and say so in one line.
4. **Create the session.**
   - Choose a short kebab-case `slug` and confirm it with the user in one line.
   - Create `docs/design/<slug>/`.
   - Copy `${CLAUDE_PLUGIN_ROOT}/templates/draftsman.json` and fill `slug`, `title`, `phase: "intake"`, `updatedAt`.
   - Copy `${CLAUDE_PLUGIN_ROOT}/templates/requirements.md` and fill **Problem statement**, a first-draft **Scope**, and **Existing context** from the brief and the survey. Mark everything else as pending.
5. **Play it back.** In five bullets or fewer, restate what you understood: the problem, the users, the core capabilities, what's already there, and what's unclear.
6. **Hand off.** Set `phase` to `clarify` and continue straight into the `/draftsman:clarify` workflow (read `${CLAUDE_PLUGIN_ROOT}/skills/clarify/SKILL.md`) unless the user asks to stop.

## Don't

- Don't propose any architecture or technology.
- Don't ask more than one question in this command (the slug confirmation or a missing brief).
