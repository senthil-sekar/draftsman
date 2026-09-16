# Stacks

Equivalent options across ecosystems. "Cost" is budget points; "Ops" is operational burden (L/M/H). Prefer the column matching the team's existing platform unless a requirement rules it out.

## Compute / hosting (DP-2)

| Option | Azure | AWS | GCP | OSS / other | Cost | Ops | Best for |
|---|---|---|---|---|---|---|---|
| Managed app platform | App Service | Elastic Beanstalk / App Runner | App Engine / Cloud Run | Fly.io, Render | 1 | L | T0–T2 web apps and APIs |
| Serverless containers | Container Apps | App Runner / ECS Fargate | Cloud Run | Knative | 1 | L | T1–T3 containerized services |
| Functions | Azure Functions | Lambda | Cloud Functions | OpenFaaS | 2 | L | Event-driven, bursty work |
| Managed Kubernetes | AKS | EKS | GKE | k3s, OpenShift | 4 | H | T3+ with a platform team |
| VMs | Virtual Machines | EC2 | Compute Engine | | 3 | H | Lift-and-shift, special runtimes |

## Primary data store (DP-3)

| Option | Azure | AWS | GCP | OSS | Pros | Cons |
|---|---|---|---|---|---|---|
| Relational | Azure SQL, PostgreSQL Flexible Server | RDS, Aurora | Cloud SQL, AlloyDB | PostgreSQL, SQL Server | ACID, joins, mature | Vertical scale limits |
| Document | Cosmos DB (NoSQL) | DynamoDB, DocumentDB | Firestore | MongoDB | Flexible schema, horizontal scale | Weak cross-document transactions; modeling by access pattern |
| Key-value / cache | Azure Cache for Redis | ElastiCache | Memorystore | Redis, Valkey | Microsecond reads | Not a system of record |
| Wide-column | Cosmos DB (Cassandra API) | Keyspaces | Bigtable | Cassandra | Massive write scale | Query-driven modeling, ops heavy |
| Search | Azure AI Search | OpenSearch Service | Vertex AI Search | Elasticsearch, OpenSearch | Full-text, facets | Another store to sync |
| Blob / object | Blob Storage | S3 | Cloud Storage | MinIO | Cheap, durable files | Not queryable |

## Messaging (DP-6)

| Option | Azure | AWS | GCP | OSS | Cost | Best for |
|---|---|---|---|---|---|---|
| Simple queue | Storage Queues | SQS | Cloud Tasks | RabbitMQ | 2 | Background jobs, load leveling |
| Enterprise broker | Service Bus | SQS + SNS, Amazon MQ | Pub/Sub | RabbitMQ, NServiceBus/MassTransit on top | 2 | Commands, pub/sub, sessions, dead-lettering |
| Event streaming | Event Hubs | Kinesis, MSK | Pub/Sub, Managed Kafka | Kafka, Redpanda | 4 | High-volume events, replay, many consumers |
| Event routing | Event Grid | EventBridge | Eventarc | CloudEvents | 1 | Reacting to platform and SaaS events |

## Identity (DP-5)

| Option | Azure | AWS | GCP | OSS |
|---|---|---|---|---|
| Workforce SSO | Microsoft Entra ID | IAM Identity Center | Cloud Identity | Keycloak |
| Customer identity | Entra External ID | Cognito | Identity Platform | Keycloak, Auth0 (SaaS) |
| Service-to-service | Managed identities | IAM roles | Service accounts | SPIFFE/SPIRE |

## Workflow (DP-9)

Durable Functions or Logic Apps (Azure) · Step Functions (AWS) · Workflows (GCP) · Temporal, Camunda (OSS)

## Observability (DP-13)

Azure Monitor + Application Insights · CloudWatch + X-Ray · Cloud Monitoring + Trace · OpenTelemetry → Grafana/Prometheus/Tempo/Loki, Datadog, New Relic

Recommend **OpenTelemetry instrumentation** regardless of backend, so the backend can change later.

## IaC and CI/CD (DP-14)

Bicep · CloudFormation / CDK · Terraform / OpenTofu (multi-cloud) · Pulumi — with GitHub Actions or Azure DevOps Pipelines.

## Application frameworks (by team skill)

| Ecosystem | Web/API | Messaging abstraction | Testing |
|---|---|---|---|
| .NET | ASP.NET Core (minimal APIs or controllers), .NET Aspire for local orchestration | MassTransit, Wolverine, Azure SDK | xUnit, Testcontainers |
| Java | Spring Boot, Quarkus | Spring Cloud Stream | JUnit, Testcontainers |
| Node/TS | NestJS, Fastify | BullMQ, native SDKs | Vitest, Jest |
| Python | FastAPI, Django | Celery, native SDKs | pytest |
| Go | net/http, Echo | native SDKs, Watermill | go test |
