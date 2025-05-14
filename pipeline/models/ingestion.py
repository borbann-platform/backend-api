import enum
from typing import Any
from fastapi import UploadFile
from pydantic import BaseModel, Field


# ------ Adapter Model ------


class AdapterRecord(BaseModel):
    """
    Record output from each adapter.
    """

    source: str = Field(..., description="Source type")
    data: dict[str, Any] = Field(..., description="Data output from the adapter")


class OutputData(BaseModel):
    """
    Output data from a pipeline run.
    """

    records: list[AdapterRecord] = Field(..., description="List of adapter records")
    unified: bool | None = Field(
        default=False, description="Whether the records are unified"
    )
    metadata: dict[str, Any] | None = Field(
        default=None, description="Metadata about the run"
    )


# ------------------------------------

# ------ Ingestor Model ------


class SourceType(str, enum.Enum):
    API = "api"
    FILE = "file"
    SCRAPE = "scrape"


class ApiConfig(BaseModel):
    url: str
    headers: dict[str, str] | None = None
    timeout: int | None = None
    token: str | None = None


class FileConfig(BaseModel):
    upload: UploadFile


class ScrapeConfig(BaseModel):
    urls: list[str]
    api_key: str | None = None
    schema_file: str | None = None
    prompt: str | None = None
    llm_provider: str | None = None
    output_format: str | None = None
    verbose: bool | None = None
    cache_mode: str | None = None


class IngestSourceConfig(BaseModel):
    """
    Configuration for a single ingestion source, to be used by the Ingestor.
    The 'type' field selects the adapter ('api', 'file', or 'scrape').
    The 'config' field contains the adapter-specific configuration.
    """

    type: SourceType = Field(..., description="Source type: 'api', 'file', or 'scrape'")
    config: ApiConfig | FileConfig | ScrapeConfig = Field(
        ..., description="Configuration for the adapter"
    )

    @property
    def parsed_config(self) -> ApiConfig | FileConfig | ScrapeConfig:
        if self.type == SourceType.API:
            return ApiConfig(**self.config.model_dump())
        elif self.type == SourceType.FILE:
            return FileConfig(**self.config.model_dump())
        elif self.type == SourceType.SCRAPE:
            return ScrapeConfig(**self.config.model_dump())
        else:
            raise ValueError(f"Unsupported type: {self.type}")


class IngestorInput(BaseModel):
    """
    Input for the ingestor.
    """

    sources: list[IngestSourceConfig]


# ------------------------------------
