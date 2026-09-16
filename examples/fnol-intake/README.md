# Example: FNOL intake (auto insurance)

A complete Draftsman session for a **First Notice of Loss** intake service: policyholders and agents report an auto accident, upload photos, and get a claim number.

The prompt was:

> /draftsman:start Build a service where customers and agents report car accidents (first notice of loss), upload photos, and get a claim number. It has to check the policy in our policy admin system and send the claim to fraud scoring.

What to notice:

- **Scored T2 Standard (13), budget 10.** Microservices were offered but flagged: their unlock condition needs D6 ≥ 2, and this is one team.
- **Messaging was raised** because fraud scoring and notifications are asynchronous. **Caching and search were not**, and `options.md` says why.
- **Budget used: 8 / 10**, with no overrides.
- **The review found no High issues**, one Medium, and one Low.

Files: [`requirements.md`](docs/design/fnol-intake/requirements.md) · [`options.md`](docs/design/fnol-intake/options.md) · [`decisions/`](docs/design/fnol-intake/decisions/) · [`design.md`](docs/design/fnol-intake/design.md) · [`review.md`](docs/design/fnol-intake/review.md) · [`draftsman.json`](docs/design/fnol-intake/draftsman.json)
