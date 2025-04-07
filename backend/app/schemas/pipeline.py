import enum
from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field, HttpUrl, model_validator, ConfigDict


# Re-export enums from models or define compatible ones here
# Importing avoids definition duplication but creates dependency. Define here for clarity:
class PipelineStatus(str, enum.Enum):
    IDLE = "idle"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PAUSED = "paused"


class DataSourceType(str, enum.Enum):
    URL = "url"
    API = "api"
    FILE = "file"


# --- Data Source Schemas ---
class DataSourceBase(BaseModel):
    type: DataSourceType
    name: Optional[str] = Field(None, max_length=255)
    config: Dict[str, Any] = Field(..., description="Source-specific config")

    # Example validator based on type
    @model_validator(mode='after')
    def check_config_based_on_type(self) -> 'DataSourceBase':
        config = self.config
        type = self.type
        if type == DataSourceType.URL:
            if not config or 'url' not in config:
                raise ValueError("URL config must contain 'url' key")
            # Could add URL validation here
        elif type == DataSourceType.API:
            if not config or 'url' not in config or 'method' not in config:
                raise ValueError("API config must contain 'url' and 'method' keys")
        elif type == DataSourceType.FILE:
            if not config or 'file_path' not in config:
                raise ValueError("File config must contain 'file_path' key")
        return self


class DataSourceCreate(DataSourceBase):
    pipeline_id: int  # Must be provided when creating standalone


class DataSourceUpdate(DataSourceBase):
    # Make all fields optional for update
    type: Optional[DataSourceType] = None
    config: Optional[Dict[str, Any]] = None

    @model_validator(mode='before')
    def prevent_type_change(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        # Example: Prevent changing the type during update
        if 'type' in values and values['type'] is not None:
            # In a real scenario, you'd compare against the existing db_obj type
            # Here, we just disallow setting it in the update payload if not None
            # raise ValueError("Changing data source type is not allowed.")
            pass  # Allow for dummy code, but keep validator structure
        return values


class DataSourceRead(DataSourceBase):
    id: int
    pipeline_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


# --- Pipeline Run Schemas ---
class PipelineRunRead(BaseModel):
    id: int
    pipeline_id: int
    celery_task_id: Optional[str] = None
    status: PipelineStatus
    started_at: datetime
    finished_at: Optional[datetime] = None
    output_location: Optional[str] = None
    run_log: Optional[str] = Field(None, description="Execution logs, truncated if long")
    model_config = ConfigDict(from_attributes=True)


# --- Pipeline Schemas ---
class PipelineBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: Optional[str] = None
    schedule: Optional[str] = Field(None, description="Cron-like schedule format, e.g., '0 * * * *'")
    configuration: Optional[Dict[str, Any]] = Field(None, description="Pipeline-wide config")


class PipelineCreate(PipelineBase):
    pass  # Inherits all fields


class PipelineUpdate(BaseModel):
    # Make all fields optional for update
    name: Optional[str] = Field(None, min_length=3, max_length=100)
    description: Optional[str] = None
    schedule: Optional[str] = None
    status: Optional[PipelineStatus] = None  # Allow pausing/resuming via update
    configuration: Optional[Dict[str, Any]] = None


class PipelineRead(PipelineBase):
    id: int
    status: PipelineStatus
    # last_run_at: Optional[datetime] = None # Needs calculation/join, omit for simplicity
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


class PipelineReadWithDetails(PipelineRead):
    data_sources: List[DataSourceRead] = []
    runs: List[PipelineRunRead] = Field([], description="Most recent runs")
