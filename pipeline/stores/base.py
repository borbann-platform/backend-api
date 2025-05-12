from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID

from models.pipeline import Pipeline, PipelineCreate


class PipelineStore(ABC):
    """
    Abstract Base Class for pipeline persistence.
    Defines the contract for saving, retrieving, and deleting pipelines.
    """

    @abstractmethod
    async def save(self, pipeline: Pipeline) -> None:
        """
        Save a pipeline (create or update).
        Implementations should handle checking if the ID exists
        and performing an insert or update accordingly.
        They should also update the 'updated_at' timestamp.
        """
        pass

    @abstractmethod
    async def get(self, pipeline_id: UUID) -> Optional[Pipeline]:
        """
        Retrieve a pipeline by its ID.
        Returns the Pipeline object if found, otherwise None.
        """
        pass

    @abstractmethod
    async def get_all(self) -> List[Pipeline]:
        """
        Retrieve all pipelines.
        Returns a list of Pipeline objects.
        """
        pass

    @abstractmethod
    async def delete(self, pipeline_id: UUID) -> bool:
        """
        Delete a pipeline by its ID.
        Returns True if deletion was successful, False otherwise (e.g., if not found).
        """
        pass

    @abstractmethod
    async def update(self, pipeline_id: UUID, pipeline_in: PipelineCreate) -> Pipeline:
        """
        Update an existing pipeline.
        Returns the updated Pipeline object.
        """
        pass

    async def connect(self) -> None:
        """Optional: Perform setup/connection logic."""
        pass

    async def disconnect(self) -> None:
        """Optional: Perform cleanup/disconnection logic."""
        pass
