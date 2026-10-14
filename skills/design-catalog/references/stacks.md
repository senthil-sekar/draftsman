# Stacks

Equivalent options across ecosystems. "Cost" is budget points (complexity, not money); "Ops" is operational burden (L/M/H).

**Column order is alphabetical. It is not a ranking, and it is not a default.** Never present the whole table to the user. Confirm the language/runtime and cloud provider first (from `Existing context` in `requirements.md`, or ask), then show only the column(s) that match, plus one open-source or commercial alternative when it's relevant. If the user has no preference yet, say so and present the 2–3 best cross-ecosystem options instead of the full table.

## Column meanings

| Column | Meaning |
|---|---|
| **AWS / Azure / GCP** | Managed services run by the cloud provider, billed by usage |
| **Open source** | Software under an OSI-approved license, usually self-hosted. Copyleft licenses (GPL, AGPL) are named because they matter if you modify or redistribute. |
| **Commercial / SaaS** | Licensed, subscription, or source-available software (not OSI-approved), self-hosted or offered as a service across clouds |

Every option you present states its license type on a `License:` line (see the option shape in the `design-catalog` skill). Budget points don't capture license fees: put the licensing model (per user, per core, consumption) in the option's Cons. Prefer products the organization **already licenses** over new contracts (core rule 12), and never recommend a commercial product without naming an open-source or cloud-native alternative, unless a requirement rules those out.

Licenses change. Check the dated notes at the end of this file, and confirm anything else through the `researcher` agent.

## Compute / hosting (DP-2)

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS | Cost | Ops | Best for |
|---|---|---|---|---|---|---|---|---|
| Managed app platform | Elastic Beanstalk, App Runner | App Service | App Engine, Cloud Run | Dokku | Heroku, Render, Fly.io | 1 | L | T0–T2 web apps and APIs |
| Serverless containers | App Runner, ECS Fargate | Container Apps | Cloud Run | Knative | — | 1 | L | T1–T3 containerized services |
| Functions | Lambda | Azure Functions | Cloud Run functions (formerly Cloud Functions) | Knative Functions, Fermyon Spin | Cloudflare Workers, Vercel Functions | 2 | L | Event-driven, bursty work |
| Managed Kubernetes | EKS | AKS | GKE | Kubernetes, k3s, OKD | Red Hat OpenShift, Rancher Prime | 4 | H | T3+ with a platform team |
| VMs / bare metal | EC2 | Virtual Machines | Compute Engine | Proxmox VE, OpenStack | VMware vSphere | 3 | H | Lift-and-shift, special runtimes, on-prem or regulatory requirements |

## Primary data store (DP-3)

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS | Pros | Cons |
|---|---|---|---|---|---|---|---|
| Relational | RDS, Aurora | Azure SQL, Azure Database for PostgreSQL | Cloud SQL, AlloyDB | PostgreSQL, MySQL, MariaDB | SQL Server, Oracle Database, IBM Db2; Neon, PlanetScale (SaaS) | ACID, joins, mature | Vertical scale limits |
| Document | DynamoDB, DocumentDB | Cosmos DB | Firestore | Apache CouchDB, FerretDB | MongoDB (SSPL) and MongoDB Atlas, Couchbase | Flexible schema, horizontal scale | Weak cross-document transactions; modeling by access pattern |
| Key-value / cache | ElastiCache, MemoryDB | Azure Managed Redis | Memorystore | Valkey (BSD), Redis 8+ (AGPLv3 option) | Redis Software, Redis Cloud, Momento | Microsecond reads | Not a system of record |
| Wide-column | Keyspaces | Cosmos DB for Apache Cassandra | Bigtable | Apache Cassandra | ScyllaDB (source-available), DataStax Astra DB | Massive write scale | Query-driven modeling, ops heavy |
| Search | OpenSearch Service | Azure AI Search | Vertex AI Search | OpenSearch, Apache Solr, Typesense (GPL) | Elasticsearch and Elastic Cloud, Algolia | Full-text, facets | Another store to sync |
| Blob / object | S3 | Blob Storage | Cloud Storage | Ceph, SeaweedFS | Cloudflare R2, Backblaze B2 | Cheap, durable files | Not queryable |

## Messaging (DP-6)

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS | Cost | Best for |
|---|---|---|---|---|---|---|---|
| Simple queue | SQS | Storage Queues | Cloud Tasks | RabbitMQ | CloudAMQP | 2 | Background jobs, load leveling |
| Enterprise broker | SNS + SQS, Amazon MQ | Service Bus | Pub/Sub | RabbitMQ, NATS, Apache ActiveMQ | IBM MQ, Solace PubSub+, TIBCO EMS | 2 | Commands, pub/sub, sessions, dead-lettering |
| Event streaming | Kinesis, MSK | Event Hubs | Pub/Sub, Managed Service for Apache Kafka | Apache Kafka, Apache Pulsar | Confluent, Redpanda (BSL), StreamNative | 4 | High-volume events, replay, many consumers |
| Event routing | EventBridge | Event Grid | Eventarc | Knative Eventing | — | 1 | Reacting to platform and SaaS events |

## Identity and secrets (DP-5)

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS |
|---|---|---|---|---|---|
| Workforce SSO | IAM Identity Center | Microsoft Entra ID | Cloud Identity | Keycloak | Okta, Ping Identity |
| Customer identity | Cognito | Entra External ID | Identity Platform | Keycloak, Ory | Auth0, Okta Customer Identity, Stytch |
| Service-to-service | IAM roles | Managed identities | Service accounts | SPIFFE/SPIRE, cert-manager | — |
| Secrets (floor item) | Secrets Manager | Key Vault | Secret Manager | OpenBao (fork of Vault) | HashiCorp Vault (BSL), HCP Vault, CyberArk |

## API management and integration (DP-4, DP-8)

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS | Cost | Best for |
|---|---|---|---|---|---|---|---|
| API gateway / management | API Gateway | API Management | Apigee, API Gateway | Kong Gateway (OSS), Apache APISIX, Envoy Gateway | Kong Konnect, MuleSoft Anypoint | 1 | External consumers; 3+ APIs; throttling or auth at the edge |
| Integration platform (iPaaS / ESB) | AppFlow, Step Functions | Logic Apps | Application Integration | Apache Camel, Apache NiFi | MuleSoft, Boomi, IBM App Connect, TIBCO | 2 | D7 ≥ 2 with many integrations, or a platform the org already runs |

## Frontend (DP-11)

Cost and trade-offs for each pattern are in `patterns.md`. Below are concrete framework choices per pattern, across ecosystems. The frameworks named are open source; the hosting is managed cloud or SaaS.

- **Static site / SSG:** Astro, Eleventy, Hugo, Jekyll, Next.js (static export). Host on S3 + CloudFront (AWS), Azure Static Web Apps, Firebase Hosting or Cloud CDN (GCP), or Netlify, Cloudflare Pages, or Vercel (SaaS).
- **Server-rendered MPA:** ASP.NET Core Razor Pages/MVC (.NET), Django or Flask templates (Python), Spring MVC + Thymeleaf (Java), Rails or Sinatra (Ruby), Laravel or Symfony (PHP), Express + templating (Node). Hosted on the same platforms as backend compute (DP-2).
- **SPA (client-rendered):** React, Vue, Angular, Svelte, Blazor WebAssembly. Served as static assets from the same hosts as SSG, calling a separate API.
- **SSR / meta-framework (hybrid):** Next.js, Nuxt, SvelteKit, Remix (JS/TS), Blazor Server (.NET). Host on Amplify or App Runner (AWS), Static Web Apps + Functions or App Service (Azure), Cloud Run (GCP), or Vercel or Netlify (SaaS).
- **Micro-frontends:** Module Federation (Webpack/Vite), single-spa, or native web components to compose independently deployed pieces. Framework-agnostic; each fragment hosts on whichever option above fits it.

## Analytics and reporting (DP-15)

Start from the cheapest row that meets the requirement; each row down needs its unlock condition (`complexity-budget.md`).

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS | Cost | Best for |
|---|---|---|---|---|---|---|---|
| Reporting on the operational database | RDS/Aurora read replica | Azure SQL or PostgreSQL read replica | Cloud SQL read replica, AlloyDB read pool | PostgreSQL views and materialized views | — | 0–1 | One source system, hours-old data is fine, up to about 1 TB |
| BI and dashboards | QuickSight | Power BI (per-user licensing) | Looker, Looker Studio | Apache Superset, Metabase (AGPL) | Tableau, Sigma, ThoughtSpot | 1 | Self-service dashboards and exports for business users |
| Analytical warehouse | Redshift | Fabric Warehouse, Synapse Analytics | BigQuery | ClickHouse, DuckDB (embedded) | Snowflake, Databricks SQL, ClickHouse Cloud | 3 | Several sources combined; analytics that would slow the operational store |
| ELT / pipelines | Glue, Managed Workflows for Apache Airflow | Data Factory | Dataflow, Cloud Composer | dbt Core, Apache Airflow, Dagster | Fivetran, dbt Cloud, Informatica | — (part of the warehouse or lakehouse cost) | Loading and transforming data into the analytical store |
| Lakehouse | S3 + Athena, Lake Formation | Fabric OneLake, Azure Databricks | BigLake, Dataproc | Apache Iceberg, Delta Lake, Apache Spark, Trino | Databricks, Snowflake, Starburst | 5 | D2 = 3, large semi-structured data, or data science on raw history |
| Streaming analytics | Managed Service for Apache Flink | Stream Analytics | Dataflow | Apache Flink | Confluent (Flink) | 3 (plus event streaming) | Freshness under a minute at real load |

## AI and ML (DP-16)

**Fast-moving:** product names, model availability, and regions change often. Before recommending a specific model or service, confirm it through the `researcher` agent, and record the model version the design pins.

| Option | AWS | Azure | GCP | Open source | Commercial / SaaS | Cost | Best for |
|---|---|---|---|---|---|---|---|
| Hosted model API | Bedrock | Microsoft Foundry (includes Azure OpenAI) | Vertex AI | — | Anthropic API, OpenAI API | 1 | Generation, summarization, extraction, classification by prompting |
| Retrieval (RAG) on an existing store | pgvector on RDS/Aurora, OpenSearch k-NN | Azure AI Search, Cosmos DB vector search | pgvector on Cloud SQL/AlloyDB, Vertex AI Vector Search | pgvector, OpenSearch | — | 2 | Answers grounded in the organization's own documents and data |
| Dedicated vector database | — | — | — | Qdrant, Weaviate, Milvus | Pinecone, Zilliz Cloud | +2 (polyglot persistence) | Vector volume or filtering the existing store can't serve |
| Agent with tool use | Bedrock Agents | Foundry Agent Service | Vertex AI Agent Builder | Agent frameworks over any model API | Anthropic, OpenAI agent SDKs | 3 | Multi-step tasks that act in other systems |
| ML platform (classical models) | SageMaker AI | Azure Machine Learning | Vertex AI | MLflow, Kubeflow | Databricks, DataRobot | 3 | Training and serving prediction models (fraud, pricing, triage) |
| Self-hosted or fine-tuned models | GPU instances or EKS + vLLM, SageMaker AI endpoints | AKS GPU nodes, Azure ML endpoints | GKE GPU nodes, Vertex AI endpoints | vLLM, Ollama, KServe; open-weight models | NVIDIA NIM (licensed) | 5 | Residency or compliance rules out hosted APIs; a custom model; very high sustained volume |
| Evaluation, tracing, guardrails | Bedrock Guardrails and evaluations | Azure AI Content Safety, Foundry evaluations | Vertex AI evaluation, Model Armor | promptfoo, Langfuse, NeMo Guardrails | LangSmith, Arize, Braintrust | 0 (floor item) | Required for any LLM feature (`baseline-floor.md`) |

Open-weight models are not automatically open source. Model licenses vary, and some widely used ones (Llama, for example) carry custom terms the OSI says are not open source. Check the model's license like any other dependency.

## Workflow (DP-9)

Step Functions (AWS) · Durable Functions or Logic Apps (Azure) · Workflows (GCP) · Temporal (open source, MIT) · Temporal Cloud, Camunda 8 (commercial; production use needs a license)

## Observability (DP-13)

CloudWatch + X-Ray (AWS) · Azure Monitor + Application Insights · Cloud Monitoring + Trace (GCP) · OpenTelemetry → Prometheus, Grafana (AGPL), Tempo, Loki, Jaeger (open source) · Datadog, New Relic, Honeycomb, Dynatrace, Splunk, Grafana Cloud (SaaS)

Recommend **OpenTelemetry instrumentation** regardless of backend, so the backend can change later.

## IaC and CI/CD (DP-14)

CloudFormation / CDK (AWS) · Bicep (Azure) · OpenTofu (open source, MPL), Pulumi (open source, Apache 2.0) · Terraform (BSL, source-available), HCP Terraform, Spacelift (commercial). Pipelines: GitHub Actions, GitLab CI, Jenkins (open source), Argo CD (open source, GitOps), CircleCI, or the cloud provider's own (Azure DevOps, AWS CodePipeline, Cloud Build).

## Application frameworks (by team skill)

All open source.

| Ecosystem | Web/API | Messaging abstraction | Testing |
|---|---|---|---|
| Go | net/http, Echo, Chi | native SDKs, Watermill | go test |
| Java / Kotlin | Spring Boot, Quarkus, Ktor | Spring Cloud Stream | JUnit, Testcontainers |
| .NET | ASP.NET Core (minimal APIs or controllers), .NET Aspire for local orchestration | Wolverine, cloud SDKs (MassTransit v9+ is commercially licensed) | xUnit, Testcontainers |
| Node/TS | NestJS, Fastify, Express, Hono | BullMQ, native SDKs | Vitest, Jest |
| PHP | Laravel, Symfony | Laravel queues, native SDKs | PHPUnit, Pest |
| Python | FastAPI, Django, Flask | Celery, native SDKs | pytest |
| Ruby | Rails, Sinatra | Sidekiq, native SDKs | RSpec, Minitest |
| Rust | Axum, Actix-web | native SDKs | cargo test |

## Licensing notes (verified 2026-10-14)

Recent changes that make an older "open source" label wrong. Each was confirmed on the vendor's or the OSI's own site.

| Product | Status | Source |
|---|---|---|
| Terraform, Vault, other HashiCorp products | BSL 1.1 since August 2023 (last MPL releases: Terraform 1.5.7, Vault 1.14.8). Open-source forks: OpenTofu, OpenBao. | [HashiCorp](https://www.hashicorp.com/en/blog/hashicorp-adopts-business-source-license), [OpenTofu](https://opentofu.org/) |
| Redis | Redis 8 (May 2025) adds AGPLv3 alongside the source-available RSALv2 and SSPLv1; 7.4 is source-available only; 7.2 and earlier are BSD. Valkey stays BSD. | [Redis](https://redis.io/blog/agplv3/) |
| Elasticsearch, Kibana | AGPLv3 added as a source-code option in 2024; distributed binaries remain under the Elastic License. OpenSearch is Apache 2.0. | [Elastic](https://www.elastic.co/blog/elasticsearch-is-open-source-again), [Elastic FAQ](https://www.elastic.co/pricing/faq/licensing) |
| MongoDB Community Server | SSPL since October 2018; not OSI-approved. | [MongoDB](https://www.mongodb.com/legal/licensing/server-side-public-license/faq) |
| ScyllaDB | Source-available since 2025.1; 6.2 and earlier remain AGPL. | [ScyllaDB](https://www.scylladb.com/source-available-faq/) |
| Redpanda | Community Edition under the Redpanda BSL; code converts to Apache 2.0 after four years. | [Redpanda](https://docs.redpanda.com/current/get-started/licensing/overview/) |
| Camunda | Camunda 7 Community Edition reached end of life in October 2025 with no further security patches. Camunda 8.6+ Self-Managed needs a license for production. | [Camunda 7](https://camunda.com/blog/2025/02/camunda-7-enterprise-end-of-life-extension/), [Camunda 8](https://camunda.com/blog/2024/04/licensing-update-camunda-8-self-managed/) |
| MinIO | AGPLv3, but the upstream community repository was archived in April 2026 and is no longer maintained. Don't choose it for new designs; use Ceph or SeaweedFS. | [GitHub](https://github.com/minio/minio) |
| MassTransit (.NET) | v9+ requires a commercial license (Massient); 8.x and earlier remain MIT. | [MassTransit](https://masstransit.massient.com/configuration/license) |
| Azure Cache for Redis | Being retired in favor of Azure Managed Redis. | [Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/retirement-faq) |
| Llama models | Custom license that the OSI says is not open source. | [OSI](https://opensource.org/blog/metas-llama-license-is-still-not-open-source) |
