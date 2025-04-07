import logging
import random
from datetime import datetime, timedelta
from typing import List, Optional, Sequence

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app import models, schemas

logger = logging.getLogger(__name__)


class CRUDPipeline:
    """CRUD operations for Pipeline models (Dummy Implementation)."""

    async def get(self, db: AsyncSession, id: int) -> Optional[models.Pipeline]:
        """DUMMY: Get a Pipeline by ID."""
        logger.info(f"DUMMY CRUD: Simulating get Pipeline with id={id}")
        # In real code: result = await db.execute(select(models.Pipeline).filter(models.Pipeline.id == id))
        #               return result.scalars().first()
        if id == 999:  # Simulate not found
            return None
        # Return a dummy model instance
        return models.Pipeline(id=id, name=f"Dummy Pipeline {id}", status=schemas.PipelineStatus.IDLE)

    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> Sequence[models.Pipeline]:
        """DUMMY: Get multiple Pipelines."""
        logger.info(f"DUMMY CRUD: Simulating get_multi Pipeline skip={skip}, limit={limit}")
        # In real code: result = await db.execute(select(models.Pipeline).offset(skip).limit(limit))
        #               return result.scalars().all()
        return [
            models.Pipeline(id=i, name=f"Dummy Pipeline {i}", status=schemas.PipelineStatus.IDLE)
            for i in range(skip + 1, skip + limit + 1)
        ]

    async def get_with_details(self, db: AsyncSession, id: int) -> Optional[models.Pipeline]:
        """DUMMY: Get a Pipeline with related sources and runs."""
        logger.info(f"DUMMY CRUD: Simulating get_with_details Pipeline id={id}")
        # In real code: Use eager loading
        # stmt = select(models.Pipeline).options(
        #     selectinload(models.Pipeline.data_sources),
        #     selectinload(models.Pipeline.runs).order_by(models.PipelineRun.started_at.desc()).limit(5) # Example limit
        # ).filter(models.Pipeline.id == id)
        # result = await db.execute(stmt)
        # return result.scalars().first()
        pipeline = await self.get(db, id)
        if pipeline:
            pipeline.data_sources = [
                models.DataSource(
                    id=id * 10 + 1,
                    pipeline_id=id,
                    type=schemas.DataSourceType.URL,
                    config={"url": "http://dummy.example.com"},
                    name="Dummy URL",
                ),
                models.DataSource(
                    id=id * 10 + 2,
                    pipeline_id=id,
                    type=schemas.DataSourceType.API,
                    config={"url": "http://dummy.api/data", "method": "GET"},
                    name="Dummy API",
                ),
            ]
            pipeline.runs = [
                models.PipelineRun(
                    id=id * 100 + 1,
                    pipeline_id=id,
                    status=schemas.PipelineStatus.COMPLETED,
                    started_at=datetime.utcnow(),
                ),
                models.PipelineRun(
                    id=id * 100 + 2,
                    pipeline_id=id,
                    status=schemas.PipelineStatus.FAILED,
                    started_at=datetime.utcnow() - timedelta(hours=1),
                ),
            ]
        return pipeline

    async def create(self, db: AsyncSession, *, obj_in: schemas.PipelineCreate) -> models.Pipeline:
        """DUMMY: Create a Pipeline."""
        logger.info(f"DUMMY CRUD: Simulating create Pipeline with data: {obj_in.model_dump()}")
        # In real code: db_obj = models.Pipeline(**obj_in.model_dump())
        #               db.add(db_obj); await db.flush(); await db.refresh(db_obj)
        new_id = random.randint(100, 1000)
        db_obj = models.Pipeline(id=new_id, status=schemas.PipelineStatus.IDLE, **obj_in.model_dump())
        logger.info(f"DUMMY CRUD: Simulated creation with id={new_id}")
        return db_obj

    async def update(
        self, db: AsyncSession, *, db_obj: models.Pipeline, obj_in: schemas.PipelineUpdate | dict
    ) -> models.Pipeline:
        """DUMMY: Update a Pipeline."""
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        logger.info(f"DUMMY CRUD: Simulating update Pipeline id={db_obj.id} with data: {update_data}")
        # In real code: update object fields, add, flush, refresh
        for field, value in update_data.items():
            if value is not None:  # Apply updates
                setattr(db_obj, field, value)
        db_obj.updated_at = datetime.utcnow()  # Simulate timestamp update
        return db_obj

    async def remove(self, db: AsyncSession, *, id: int) -> Optional[models.Pipeline]:
        """DUMMY: Remove a Pipeline."""
        logger.info(f"DUMMY CRUD: Simulating remove Pipeline id={id}")
        obj = await self.get(db=db, id=id)
        if obj:
            logger.info(f"DUMMY CRUD: Found pipeline {id} to remove.")
            # In real code: await db.delete(obj); await db.flush()
            return obj  # Return the simulated object to be deleted
        logger.warning(f"DUMMY CRUD: Pipeline {id} not found for removal.")
        return None


# Instantiate CRUD objects for pipelines, datasources, runs etc.
pipeline = CRUDPipeline()
# ... add dummy crud_datasource and crud_pipelinerun similar to above
