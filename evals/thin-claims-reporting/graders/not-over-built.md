---
type: llm
weight: 3
focus: { source: file, path: docs/design/claims-analytics/design.md }
---

The user gave a one-sentence brief with no users, volumes, freshness, or history requirements. The repository is a FastAPI app on ECS Fargate with one RDS PostgreSQL database, SQS, and Terraform on AWS.

Pass only if the current design (not rejected alternatives, and not the evolution path or future triggers) builds reporting on what exists: SQL views or materialized views, a reporting schema, or a read replica of the existing PostgreSQL, a reporting module in the existing app, and optionally a BI tool. Fail if the current design adopts any of: a data warehouse (Redshift, Snowflake, BigQuery, Databricks), a data lake or lakehouse, an ETL/ELT pipeline platform (Glue, Airflow, dbt Cloud, Fivetran), event streaming (Kafka, Kinesis), stream processing, a new database engine, or a new service split out of the app.
