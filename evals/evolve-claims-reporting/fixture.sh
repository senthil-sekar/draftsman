#!/usr/bin/env bash
# An existing claims portal (FastAPI + PostgreSQL on AWS) with an earlier Draftsman session.
set -euo pipefail

mkdir -p app/claims infra .github/workflows docs/design/claims-portal

cat > pyproject.toml <<'EOF'
[project]
name = "claims-portal"
version = "2.3.0"
requires-python = ">=3.12"
dependencies = ["fastapi>=0.115", "uvicorn>=0.30", "sqlalchemy>=2.0", "psycopg[binary]>=3.2", "alembic>=1.13", "boto3>=1.35"]
EOF

cat > app/main.py <<'EOF'
from fastapi import FastAPI
from app.claims.routes import router as claims_router

app = FastAPI(title="Claims Portal")
app.include_router(claims_router, prefix="/claims")

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
EOF

cat > app/claims/models.py <<'EOF'
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class Adjuster(Base):
    __tablename__ = "adjusters"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))

class Claim(Base):
    __tablename__ = "claims"
    id: Mapped[int] = mapped_column(primary_key=True)
    claim_number: Mapped[str] = mapped_column(String(32), unique=True)
    status: Mapped[str] = mapped_column(String(20))  # open, pending, closed
    adjuster_id: Mapped[int] = mapped_column(ForeignKey("adjusters.id"))
    opened_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    closed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
EOF

cat > app/claims/routes.py <<'EOF'
from fastapi import APIRouter

router = APIRouter()

@router.get("/{claim_number}")
def get_claim(claim_number: str) -> dict[str, str]:
    return {"claim_number": claim_number}
EOF

cat > infra/main.tf <<'EOF'
provider "aws" { region = "us-east-1" }

resource "aws_db_instance" "claims" {
  engine            = "postgres"
  engine_version    = "16.4"
  instance_class    = "db.m6g.large"
  allocated_storage = 200
  multi_az          = true
  backup_retention_period = 14
}

resource "aws_ecs_service" "portal" {
  name          = "claims-portal"
  launch_type   = "FARGATE"
  desired_count = 2
}

resource "aws_sqs_queue" "notifications" {
  name = "claims-notifications"
}
EOF

cat > .github/workflows/ci.yml <<'EOF'
name: ci
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pip install . && pytest
EOF

cat > docs/design/claims-portal/draftsman.json <<'EOF'
{
  "schemaVersion": 1,
  "slug": "claims-portal",
  "title": "Claims Portal",
  "mode": "new",
  "baseline": null,
  "domain": "insurance",
  "phase": "reviewed",
  "phases": ["intake", "clarify", "requirements-locked", "options", "decided", "designed", "reviewed"],
  "profile": {
    "scores": { "D1": 1, "D2": 1, "D3": 1, "D4": 2, "D5": 1, "D6": 1, "D7": 1, "D8": 2 },
    "total": 10,
    "tier": "T2",
    "spikes": []
  },
  "budget": { "limit": 10, "spent": 6, "overrides": [] },
  "decisions": [
    { "id": "ADR-0001", "decisionPoint": "DP-1", "choice": "Modular monolith (FastAPI)", "cost": 2, "chosenBy": "accepted-recommendation", "status": "Accepted" },
    { "id": "ADR-0002", "decisionPoint": "DP-2", "choice": "ECS Fargate", "cost": 1, "chosenBy": "accepted-recommendation", "status": "Accepted" },
    { "id": "ADR-0003", "decisionPoint": "DP-3", "choice": "RDS PostgreSQL Multi-AZ", "cost": 0, "chosenBy": "accepted-recommendation", "status": "Accepted" },
    { "id": "ADR-0004", "decisionPoint": "DP-6", "choice": "SQS for notification jobs", "cost": 2, "chosenBy": "accepted-recommendation", "status": "Accepted" },
    { "id": "ADR-0005", "decisionPoint": "DP-5", "choice": "Cognito for staff SSO", "cost": 1, "chosenBy": "user-selection", "status": "Accepted" }
  ],
  "openQuestions": [],
  "assumptions": [],
  "updatedAt": "2026-06-01T12:00:00Z"
}
EOF

cat > docs/design/claims-portal/design.md <<'EOF'
# Claims Portal: Design

Profile: T2 Standard · Budget used 6 / 10 · Decisions: ADR-0001 … ADR-0005

## 1. Summary
A FastAPI modular monolith on ECS Fargate where adjusters view and update auto claims. Data lives in RDS PostgreSQL (Multi-AZ). Notification emails go through an SQS queue processed by a worker in the same app.

## 4. Components
| Component | Responsibility | Technology | Cost | Traces to |
|---|---|---|---|---|
| Portal app (claims, adjusters, notifications modules) | Claim views and updates | FastAPI modular monolith | 2 | FR-1..FR-5 |
| Hosting | Run the app and worker | ECS Fargate | 1 | NFR-1 |
| Data | Claims and adjusters | RDS PostgreSQL Multi-AZ | 0 | FR-1..FR-5, NFR-2 |
| Notifications queue | Email jobs | SQS | 2 | FR-4 |
| Identity | Staff SSO | Cognito | 1 | NFR-3 |

## 9. Deployment
Terraform in `infra/`, GitHub Actions CI, one AWS region (us-east-1).
EOF

cat > docs/design/claims-portal/requirements.md <<'EOF'
# Claims Portal: Requirements

> Status: LOCKED — locked on 2026-05-20.

## 3. Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Adjusters view assigned claims | Must |
| FR-2 | Adjusters update claim status | Must |
| FR-3 | Supervisors reassign claims | Must |
| FR-4 | Email notifications on status change | Should |
| FR-5 | Search claims by number | Must |

## 4. Non-functional requirements
| ID | Quality | Target |
|---|---|---|
| NFR-1 | Availability | 99.5% business hours |
| NFR-2 | Durability | Daily backups, 14-day retention |
| NFR-3 | Access | Staff SSO only |

## 6. Existing context
- **Current stack and skills:** Python 3.12, FastAPI, PostgreSQL, Terraform, GitHub Actions
- **Language / runtime preference:** Python (found in repo)
- **Cloud / hosting preference:** AWS (found in repo)
EOF
