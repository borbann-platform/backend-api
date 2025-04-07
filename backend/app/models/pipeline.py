import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql import func
from app.core.db import Base  # Import Base from your core db setup


# Define Enums directly here or import from schemas if preferred
# If defined here, ensure schemas.py uses these or compatible definitions
class PipelineStatusEnum(str, enum.Enum):
    IDLE = "idle"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PAUSED = "paused"


class DataSourceTypeEnum(str, enum.Enum):
    URL = "url"
    API = "api"
    FILE = "file"


class Pipeline(Base):
    __tablename__ = "pipelines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    status = Column(Enum(PipelineStatusEnum), default=PipelineStatusEnum.IDLE, nullable=False)
    schedule = Column(String, nullable=True, comment="Cron-like schedule format")
    configuration = Column(
        JSONB, nullable=True, default=dict, comment="Pipeline-specific config, e.g., processing rules"
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    data_sources = relationship("DataSource", back_populates="pipeline", cascade="all, delete-orphan", lazy="selectin")
    runs = relationship("PipelineRun", back_populates="pipeline", cascade="all, delete-orphan", lazy="selectin")

    def __repr__(self) -> str:
        return f"<Pipeline(id={self.id}, name='{self.name}')>"


class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(Integer, primary_key=True, index=True)
    pipeline_id = Column(Integer, ForeignKey("pipelines.id"), nullable=False)
    type = Column(Enum(DataSourceTypeEnum), nullable=False)
    name = Column(String, nullable=True, comment="User-friendly name for the source")
    config = Column(JSONB, nullable=False, comment="Source-specific config (url, api details, file path/info)")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship
    pipeline = relationship("Pipeline", back_populates="data_sources")

    def __repr__(self) -> str:
        return f"<DataSource(id={self.id}, type='{self.type}', pipeline_id={self.pipeline_id})>"


class PipelineRun(Base):
    __tablename__ = "pipeline_runs"

    id = Column(Integer, primary_key=True, index=True)
    pipeline_id = Column(Integer, ForeignKey("pipelines.id"), nullable=False)
    celery_task_id = Column(String, nullable=True, index=True, comment="Celery task ID for the main pipeline run")
    status = Column(Enum(PipelineStatusEnum), default=PipelineStatusEnum.RUNNING, nullable=False)
    started_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    finished_at = Column(DateTime(timezone=True), nullable=True)
    output_location = Column(String, nullable=True, comment="Path to results file or data store reference")
    run_log = Column(Text, nullable=True, comment="Execution logs or error details")

    # Relationship
    pipeline = relationship("Pipeline", back_populates="runs")

    def __repr__(self) -> str:
        return f"<PipelineRun(id={self.id}, status='{self.status}', pipeline_id={self.pipeline_id})>"
