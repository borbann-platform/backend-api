from datetime import datetime, timezone
from typing import Dict, List, Optional
from uuid import UUID

from loguru import logger

from models.pipeline import Pipeline, PipelineCreate
from .base import PipelineStore


class InMemoryPipelineStore(PipelineStore):
    """
    In-memory implementation of the PipelineStore.
    Stores pipelines in a simple dictionary. Not persistent across restarts.
    """

    _pipelines: Dict[UUID, Pipeline]

    def __init__(self):
        logger.info("Initializing InMemoryPipelineStore")
        self._pipelines = {}

    async def save(self, pipeline: Pipeline) -> None:
        logger.debug(f"Saving pipeline (in-memory): id={pipeline.id}")
        pipeline.updated_at = datetime.now(timezone.utc)
        self._pipelines[pipeline.id] = pipeline.model_copy(deep=True)
        logger.info(f"Pipeline saved (in-memory): id={pipeline.id}")

    async def get(self, pipeline_id: UUID) -> Optional[Pipeline]:
        logger.debug(f"Getting pipeline (in-memory): id={pipeline_id}")
        pipeline = self._pipelines.get(pipeline_id)
        if pipeline:
            return pipeline.model_copy(deep=True)
        logger.warning(f"Pipeline not found (in-memory): id={pipeline_id}")
        return None

    async def get_all(self) -> List[Pipeline]:
        logger.debug("Getting all pipelines (in-memory)")
        return [p.model_copy(deep=True) for p in self._pipelines.values()]

    async def delete(self, pipeline_id: UUID) -> bool:
        logger.debug(f"Deleting pipeline (in-memory): id={pipeline_id}")
        if pipeline_id in self._pipelines:
            del self._pipelines[pipeline_id]
            logger.info(f"Pipeline deleted (in-memory): id={pipeline_id}")
            return True
        logger.warning(f"Pipeline not found for deletion (in-memory): id={pipeline_id}")
        return False

    async def update(self, pipeline_id: UUID, pipeline_in: PipelineCreate) -> Pipeline:
        logger.debug(f"Updating pipeline (in-memory): id={pipeline_id}")
        pipeline = self._pipelines.get(pipeline_id)
        if not pipeline:
            raise ValueError(f"Pipeline not found (in-memory): id={pipeline_id}")
        pipeline.name = pipeline_in.name
        pipeline.description = pipeline_in.description
        pipeline.config = pipeline_in.config
        pipeline.updated_at = datetime.now(timezone.utc)
        self._pipelines[pipeline_id] = pipeline.model_copy(deep=True)
        logger.info(f"Pipeline updated (in-memory): id={pipeline_id}")
        return pipeline.model_copy(deep=True)
