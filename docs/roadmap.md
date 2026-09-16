# Roadmap

## 0.1 (this release)
- Seven-command workflow with gates and anti-drift rules
- Scale Profile, complexity budget, unlock conditions, baseline floor
- Surveyor, drafter, and inspector agents
- Adapters for Cursor, GitHub Copilot, and generic `AGENTS.md` tools
- Worked example: FNOL intake

## 0.2
- **Evals** (`claude plugin eval`): prompts for known-size systems (a T0 internal tool, a T2 intake service, a T4 payments platform) graded on tier accuracy and on whether the design stays inside its budget, run with and without the plugin
- **Domain packs** as optional skills: insurance, payments, healthcare. Each adds compliance floor items and typical integrations.
- **Team defaults** file (`.draftsman/defaults.yaml`) for approved clouds, languages, and banned technologies, applied as constraints automatically

## 0.3
- **AgentAtlas integration**: read the live topology through `atlas-mcp` and check new designs against existing services and contracts
- **Brownfield mode**: an `evolve` command for changing an existing system, starting from the current Scale Profile
- **Export**: C4 model (Structurizr DSL) and draw.io from `design.md`

## Later
- Cost estimation per option using public cloud pricing APIs
- Team-level dashboards of design decisions across repos
