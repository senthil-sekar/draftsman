# Trusted sources

The `researcher` agent may use **only** these sources. If no trusted source answers a question, report "no trusted source found". Never fill the gap from other sites or from memory.

If the project has `.draftsman/trusted-sources.md`, apply its additions (for example, an internal architecture site) and removals on top of this list.

## How to use them

1. **Search only with `allowed_domains`.** Every web search passes `allowed_domains`, built from this list: the official domains of the products being compared, plus the relevant guidance, standards, or regulator domains below. Never run an unrestricted search.
2. **Fetch only listed domains.** Fetching has no domain filter, so check every URL against this list before fetching it. Don't follow links that leave the list.
3. **Makers speak only for their own products.** A vendor's or project's own documentation is trusted for facts about that product: features, limits, versions, license, and pricing model. It is never trusted for claims about competitors or for "best X" rankings. Build comparisons from each product's own documentation.
4. **Licenses come from the source.** Read the project's `LICENSE` file in its official repository, the maker's licensing page, or the OSI license list.
5. **Regulations come from the regulator.** Cite the official text or the regulator's own guidance, not a law-firm or consultancy summary.
6. **Date everything.** Prefer documentation for the current version. Record the version and the date you read it.

## Allowed

### Official product and project documentation

The official domain of the product or project in question: the one its official repository or homepage links to. For example: `docs.aws.amazon.com`, `aws.amazon.com`, `learn.microsoft.com`, `azure.microsoft.com`, `cloud.google.com`, `docs.cloud.google.com`, `postgresql.org`, `kubernetes.io`, `opentelemetry.io`, `spring.io`, `nodejs.org`, `python.org`, `go.dev`.

Official source repositories on `github.com` or `gitlab.com`, **only under the project's own organization**: never forks, personal repositories, or issue threads by third parties.

### Cloud architecture guidance

| Source | Domains |
|---|---|
| AWS Well-Architected Framework, AWS Architecture Center | `aws.amazon.com`, `docs.aws.amazon.com` |
| Azure Architecture Center, Azure Well-Architected Framework | `learn.microsoft.com` |
| Google Cloud Architecture Center, Google Cloud Well-Architected Framework | `cloud.google.com`, `docs.cloud.google.com` |

### Standards bodies and foundations

| Domain | Use for |
|---|---|
| `opensource.org` | OSI definitions and approved licenses |
| `spdx.org` | License identifiers |
| `owasp.org` | Application security (Top 10, ASVS, Top 10 for LLM applications) |
| `nist.gov` | Security and AI risk frameworks (Cybersecurity Framework, SP 800-53, AI RMF) |
| `cisa.gov` | Security advisories and guidance |
| `ietf.org`, `rfc-editor.org` | Protocol standards |
| `w3.org` | Web standards |
| `cncf.io` | Cloud-native project maturity (graduated, incubating) |
| `apache.org`, `linuxfoundation.org` | Foundation project status and governance |
| `pcisecuritystandards.org` | PCI DSS |
| `cloudsecurityalliance.org` | Cloud security guidance |

### Regulators and official legal text

| Domain | Use for |
|---|---|
| `ecfr.gov`, `govinfo.gov`, `federalregister.gov` | US federal regulations |
| `ftc.gov`, `consumerfinance.gov`, `treasury.gov` | US agencies (FTC, CFPB, OFAC) |
| `naic.org` | NAIC model laws and bulletins |
| `dfs.ny.gov` and other official state insurance department sites | State insurance regulation |
| `eur-lex.europa.eu`, `edpb.europa.eu` | EU law and GDPR guidance |
| `priv.gc.ca` | Canadian privacy law and guidance |

### Curated practitioner references

For **patterns and practices only**, never for product facts.

| Domain | Use for |
|---|---|
| `martinfowler.com` | Architecture and integration patterns |
| `microservices.io` | Microservice and data-consistency patterns |
| `thoughtworks.com` | Technology Radar (adoption maturity) |

## Never use

Even when they rank first or are the only result:

- Personal and community blogs: Medium, dev.to, Hashnode, Substack, personal sites
- Forums and Q&A: Reddit, Hacker News, Stack Overflow, Quora
- Video platforms
- Review, affiliate, and "top 10" sites
- A vendor's comparison or "X vs Y" page about a competitor
- Wikipedia and AI-generated summaries: fine for orientation, but cite the primary source instead
- Law-firm or consultancy summaries of regulations
