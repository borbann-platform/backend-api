from datetime import datetime, timezone
import enum
from uuid import UUID
from pydantic import BaseModel, Field

from models.ingestion import IngestorInput


class PipelineStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    FAILED = "failed"


class RunFrequency(str, enum.Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"


class PipelineConfig(BaseModel):
    ingestor_config: IngestorInput
    run_frequency: RunFrequency
    last_run: datetime | None = None
    next_run: datetime | None = None


class Pipeline(BaseModel):
    id: UUID
    name: str
    description: str
    config: PipelineConfig
    status: PipelineStatus = Field(default=PipelineStatus.INACTIVE)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PipelineCreate(BaseModel):
    name: str
    description: str
    config: PipelineConfig
