---
type: llm
weight: 2
focus: { source: file, path: docs/design/handbook-assistant/options.md }
---

Look at every URL cited as a source in this options document.

Pass only if at least one source URL is cited, and every one is official documentation or a licensing page from the maker of the product it describes (for example postgresql.org, github.com/pgvector/pgvector, aws.amazon.com, docs.aws.amazon.com, qdrant.tech for Qdrant), a cloud provider's architecture guidance, or a standards body or foundation. Fail if any source is a blog, forum, Q&A site, video, review or listicle site, Wikipedia, or one vendor's page making claims about a competing product.
