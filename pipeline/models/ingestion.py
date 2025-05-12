from typing import Any
from pydantic import BaseModel, Field


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
