---
type: llm
weight: 3
focus: { source: file, path: docs/design/claims-reporting/design.md }
---

The existing system is a FastAPI modular monolith on ECS Fargate with RDS PostgreSQL, SQS, and Terraform on AWS. The change adds reports for 15 managers over two years of claims, with data up to 24 hours stale.

Pass only if the design builds the reporting on what already exists: for example SQL views or materialized views, a reporting schema, or a read replica of the existing PostgreSQL database, a reporting module in the existing app, or a managed BI tool reading from PostgreSQL. Fail if the current design (not rejected alternatives or the evolution path) introduces a separate data platform: a data warehouse or lakehouse (Redshift, Snowflake, Databricks, BigQuery), a data lake with an ETL pipeline, event streaming (Kafka, Kinesis), a new database engine, a second language, or a new service split out of the monolith.
