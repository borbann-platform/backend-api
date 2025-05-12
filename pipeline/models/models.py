"""
Pydantic models for pipelines and runs.
"""

from typing import List, Union, Annotated, Optional, Literal, Dict, Any
from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, Field, HttpUrl, field_validator, ValidationInfo


class RunCreate(BaseModel):
    """
    Model for creating a new run. (Empty)
    """

    pass


class Run(BaseModel):
    """
    Status of a pipeline run.
    """

    id: UUID
    pipeline_id: UUID
    status: Literal["PENDING", "RUNNING", "COMPLETED", "FAILED"]
    started_at: datetime
    finished_at: Optional[datetime] = None


class RunResult(Run):
    """
    Extended run model including results or error.
    """

    results: Optional[List[Dict[str, Any]]] = None
    error: Optional[str] = None


class ApiConfig(BaseModel):
    """
    Configuration for an API source.
    """

    url: HttpUrl = Field(..., description="API endpoint URL")
    token: Optional[str] = Field(
        None,
        description="Optional bearer token for API authentication",
    )


class ScrapeConfig(BaseModel):
    """
    Configuration for a web-scraping source.
    """

    urls: List[HttpUrl] = Field(
        ...,
        description="List of URLs to scrape",
    )
    schema_file: Optional[str] = Field(
        None,
        description="Path to a JSON file containing CSS extraction schema",
    )
    prompt: Optional[str] = Field(
        None,
        description="Prompt string for LLM-based extraction",
    )


class FileConfig(BaseModel):
    """
    Configuration for a file-based source. Supports either a file path or an uploaded file.
    """

    path: Optional[str] = Field(
        None,
        description="Path to the input file (optional if upload is provided)",
    )
    upload: Optional[Any] = Field(
        None,
        description="Uploaded file object or metadata (optional if path is provided)",
    )
    upload_filename: Optional[str] = Field(
        None,
        description="Original filename of the uploaded file (for validation)",
    )
    format: Literal["csv", "json", "sqlite"] = Field(
        "json", description="Format of the file"
    )

    @field_validator("path", mode="before")
    def require_path_or_upload(cls, v, info: ValidationInfo):
        data = info.data
        if not v and not data.get("upload"):
            raise ValueError("Either 'path' or 'upload' must be provided.")
        return v

    @field_validator("upload_filename", mode="before")
    def filename_extension_matches_format(cls, v, info: ValidationInfo):
        fmt = info.data.get("format")
        if v and fmt and not v.lower().endswith(f".{fmt}"):
            raise ValueError(f"Uploaded file extension must match format '{fmt}'")
        return v

    @field_validator("path", mode="after")
    def path_or_upload_extension_matches_format(cls, v, info: ValidationInfo):
        fmt = info.data.get("format")
        upload_filename = info.data.get("upload_filename")
        if v and fmt and not v.lower().endswith(f".{fmt}"):
            raise ValueError(f"File extension must match format '{fmt}'")
        if upload_filename and fmt and not upload_filename.lower().endswith(f".{fmt}"):
            raise ValueError(f"Uploaded file extension must match format '{fmt}'")
        return v


class ApiSource(BaseModel):
    """
    An API-based data source.
    """

    type: Literal["api"] = Field(
        "api",
        description="Discriminator for API source",  # Removed const=True
    )
    config: ApiConfig


class ScrapeSource(BaseModel):
    """
    A web-scraping data source.
    """

    type: Literal["scrape"] = Field(
        "scrape",
        description="Discriminator for scrape source",  # Removed const=True
    )
    config: ScrapeConfig


class FileSource(BaseModel):
    """
    A file-based data source.
    """

    type: Literal["file"] = Field(
        "file",
        description="Discriminator for file source",  # Removed const=True
    )
    config: FileConfig


Source = Annotated[
    Union[ApiSource, ScrapeSource, FileSource],
    Field(discriminator="type", description="Union of all source types"),
]


class PipelineCreate(BaseModel):
    """
    Payload for creating a new pipeline.
    """

    name: Optional[str] = Field(
        default=None,
        description="Optional human-readable name for the pipeline",
    )
    sources: List[Source] = Field(
        ..., description="List of data sources for this pipeline"
    )


class Pipeline(BaseModel):
    """
    Representation of a pipeline.
    """

    id: UUID = Field(..., description="Unique identifier for the pipeline")
    name: Optional[str] = Field(
        None, description="Optional human-readable name for the pipeline"
    )
    sources: List[Source] = Field(..., description="List of configured data sources")
    created_at: datetime = Field(
        ..., description="UTC timestamp when the pipeline was created"
    )
