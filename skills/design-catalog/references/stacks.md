# Stacks

Equivalent options across ecosystems. "Cost" is budget points; "Ops" is operational burden (L/M/H).

**Column order is alphabetical — it is not a ranking, and it is not a default.** Never present the whole table to the user. Confirm the language/runtime and cloud provider first (from `Existing context` in `requirements.md`, or ask), then show only the column(s) that match, plus one OSS/self-hosted alternative when it's relevant. If the user has no preference yet, say so and present the 2–3 best cross-ecosystem options instead of the full table.

## Compute / hosting (DP-2)

| Option | AWS | Azure | GCP | OSS / other | Cost | Ops | Best for |
|---|---|---|---|---|---|---|---|
| Managed app platform | Elastic Beanstalk / App Runner | App Service | App Engine / Cloud Run | Fly.io, Render, Heroku | 1 | L | T0–T2 web apps and APIs |
| Serverless containers | App Runner / ECS Fargate | Container Apps | Cloud Run | Knative | 1 | L | T1–T3 containerized services |
| Functions | Lambda | Azure Functions | Cloud Functions | OpenFaaS, Fermyon Spin | 2 | L | Event-driven, bursty work |
| Managed Kubernetes | EKS | AKS | GKE | k3s, OpenShift | 4 | H | T3+ with a platform team |
| VMs / bare metal | EC2 | Virtual Machines | Compute Engine | Any bare-metal or colo provider | 3 | H | Lift-and-shift, special runtimes, on-prem/regulatory requirements |

## Primary data store (DP-3)

| Option | AWS | Azure | GCP | OSS | Pros | Cons |
|---|---|---|---|---|---|---|
| Relational | RDS, Aurora | Azure SQL, PostgreSQL Flexible Server | Cloud SQL, AlloyDB | PostgreSQL, MySQL, MariaDB, SQL Server | ACID, joins, mature | Vertical scale limits |
| Document | DynamoDB, DocumentDB | Cosmos DB (NoSQL) | Firestore | MongoDB | Flexible schema, horizontal scale | Weak cross-document transactions; modeling by access pattern |
| Key-value / cache | ElastiCache | Azure Cache for Redis | Memorystore | Redis, Valkey, KeyDB | Microsecond reads | Not a system of record |
| Wide-column | Keyspaces | Cosmos DB (Cassandra API) | Bigtable | Cassandra, ScyllaDB | Massive write scale | Query-driven modeling, ops heavy |
| Search | OpenSearch Service | Azure AI Search | Vertex AI Search | Elasticsearch, OpenSearch, Meilisearch, Typesense | Full-text, facets | Another store to sync |
| Blob / object | S3 | Blob Storage | Cloud Storage | MinIO, Ceph | Cheap, durable files | Not queryable |

## Messaging (DP-6)

| Option | AWS | Azure | GCP | OSS | Cost | Best for |
|---|---|---|---|---|---|---|
| Simple queue | SQS | Storage Queues | Cloud Tasks | RabbitMQ | 2 | Background jobs, load leveling |
| Enterprise broker | SQS + SNS, Amazon MQ | Service Bus | Pub/Sub | RabbitMQ, NATS, ActiveMQ | 2 | Commands, pub/sub, sessions, dead-lettering |
| Event streaming | Kinesis, MSK | Event Hubs | Pub/Sub, Managed Kafka | Kafka, Redpanda, Pulsar | 4 | High-volume events, replay, many consumers |
| Event routing | EventBridge | Event Grid | Eventarc | CloudEvents, Knative Eventing | 1 | Reacting to platform and SaaS events |

## Identity (DP-5)

| Option | AWS | Azure | GCP | OSS |
|---|---|---|---|---|
| Workforce SSO | IAM Identity Center | Microsoft Entra ID | Cloud Identity | Keycloak, Authentik |
| Customer identity | Cognito | Entra External ID | Identity Platform | Keycloak, Ory, Auth0/Okta (SaaS, provider-agnostic) |
| Service-to-service | IAM roles | Managed identities | Service accounts | SPIFFE/SPIRE, mTLS with cert-manager |

## Frontend (DP-11)

Cost and trade-offs for each pattern are in `patterns.md`; below are concrete framework choices per pattern, across ecosystems.

- **Static site / SSG:** Astro, Eleventy, Hugo, Jekyll, Next.js (static export) — host on S3+CloudFront (AWS), Azure Static Web Apps, Firebase Hosting/Cloud CDN (GCP), or Netlify/Cloudflare Pages/Vercel (provider-agnostic).
- **Server-rendered MPA:** ASP.NET Core Razor Pages/MVC (.NET), Django/Flask templates (Python), Spring MVC + Thymeleaf (Java), Rails/Sinatra (Ruby), Laravel/Symfony (PHP), Express + templating (Node) — hosted on the same platforms as backend compute (DP-2).
- **SPA (client-rendered):** React, Vue, Angular, Svelte, Blazor WebAssembly — served as static assets from the same hosts as SSG, calling a separate API.
- **SSR / meta-framework (hybrid):** Next.js, Nuxt, SvelteKit, Remix (JS/TS), Blazor Server (.NET) — host on Amplify/App Runner (AWS), Static Web Apps + Functions or App Service (Azure), Cloud Run (GCP), or Vercel/Netlify (provider-agnostic).
- **Micro-frontends:** Module Federation (Webpack/Vite), single-spa, or native web components to compose independently deployed pieces — framework-agnostic; each fragment hosts on whichever option above fits it.

## Workflow (DP-9)

Step Functions (AWS) · Durable Functions or Logic Apps (Azure) · Workflows (GCP) · Temporal, Camunda (OSS, any cloud)

## Observability (DP-13)

CloudWatch + X-Ray (AWS) · Azure Monitor + Application Insights · Cloud Monitoring + Trace (GCP) · OpenTelemetry → Grafana/Prometheus/Tempo/Loki, Datadog, New Relic, Honeycomb (provider-agnostic)

Recommend **OpenTelemetry instrumentation** regardless of backend, so the backend can change later.

## IaC and CI/CD (DP-14)

CloudFormation / CDK (AWS) · Bicep (Azure) · Terraform / OpenTofu or Pulumi (multi-cloud) — with GitHub Actions, GitLab CI, CircleCI, or the cloud provider's own pipeline (Azure DevOps, AWS CodePipeline, Cloud Build).

## Application frameworks (by team skill)

| Ecosystem | Web/API | Messaging abstraction | Testing |
|---|---|---|---|
| Go | net/http, Echo, Chi | native SDKs, Watermill | go test |
| Java / Kotlin | Spring Boot, Quarkus, Ktor | Spring Cloud Stream | JUnit, Testcontainers |
| .NET | ASP.NET Core (minimal APIs or controllers), .NET Aspire for local orchestration | MassTransit, Wolverine, cloud SDKs | xUnit, Testcontainers |
| Node/TS | NestJS, Fastify, Express, Hono | BullMQ, native SDKs | Vitest, Jest |
| PHP | Laravel, Symfony | Laravel queues, native SDKs | PHPUnit, Pest |
| Python | FastAPI, Django, Flask | Celery, native SDKs | pytest |
| Ruby | Rails, Sinatra | Sidekiq, native SDKs | RSpec, Minitest |
| Rust | Axum, Actix-web | native SDKs | cargo test |
