import logging
import random
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, models, schemas  # Import local schemas and crud
from app.core.db import get_db  # Import DB dependency
from app.services.processing_service import ProcessingService  # Import services
from app.workers.tasks import run_pipeline_task  # Import Celery task

logger = logging.getLogger(__name__)
router = APIRouter()

# --- API Endpoint Definitions ---


@router.post("/", response_model=schemas.PipelineRead, status_code=201)
async def create_pipeline(
    pipeline_in: schemas.PipelineCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    DUMMY: Creates a new pipeline configuration.
    """
    logger.info("Endpoint: create_pipeline called")
    # In real implementation: Add checks, call services if needed.
    # Here, directly call (dummy) CRUD.
    created_pipeline = await crud.pipeline.create(db=db, obj_in=pipeline_in)
    # No need to check for existence as dummy create always returns something
    return created_pipeline


@router.get("/", response_model=List[schemas.PipelineRead])
async def read_pipelines(db: AsyncSession = Depends(get_db), skip: int = 0, limit: int = Query(100, le=200)):
    """
    DUMMY: Retrieves a list of pipelines.
    """
    logger.info("Endpoint: read_pipelines called")
    # Call (dummy) CRUD
    pipelines = await crud.pipeline.get_multi(db, skip=skip, limit=limit)
    return pipelines


@router.get("/{pipeline_id}", response_model=schemas.PipelineReadWithDetails)
async def read_pipeline(pipeline_id: int, db: AsyncSession = Depends(get_db)):
    """
    DUMMY: Retrieves details for a specific pipeline, including sources and recent runs.
    """
    logger.info(f"Endpoint: read_pipeline called for id={pipeline_id}")
    # Call (dummy) CRUD that includes related data loading simulation
    db_pipeline = await crud.pipeline.get_with_details(db, id=pipeline_id)
    if db_pipeline is None:
        # Raise standard FastAPI exception for not found
        raise HTTPException(status_code=404, detail="Pipeline not found (simulated)")
    return db_pipeline


@router.put("/{pipeline_id}", response_model=schemas.PipelineRead)
async def update_pipeline(
    pipeline_id: int,
    pipeline_in: schemas.PipelineUpdate,
    db: AsyncSession = Depends(get_db),
):
    """
    DUMMY: Updates an existing pipeline configuration.
    """
    logger.info(f"Endpoint: update_pipeline called for id={pipeline_id}")
    # First, get the existing object (dummy)
    db_pipeline = await crud.pipeline.get(db, id=pipeline_id)
    if not db_pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found (simulated)")

    # Call (dummy) CRUD update
    updated_pipeline = await crud.pipeline.update(db=db, db_obj=db_pipeline, obj_in=pipeline_in)
    return updated_pipeline


@router.delete("/{pipeline_id}", response_model=schemas.PipelineRead)
async def delete_pipeline(pipeline_id: int, db: AsyncSession = Depends(get_db)):
    """
    DUMMY: Deletes a pipeline configuration.
    Returns the deleted object representation.
    """
    logger.info(f"Endpoint: delete_pipeline called for id={pipeline_id}")
    # Call (dummy) CRUD remove
    deleted_pipeline = await crud.pipeline.remove(db=db, id=pipeline_id)
    if deleted_pipeline is None:
        raise HTTPException(status_code=404, detail="Pipeline not found (simulated)")
    return deleted_pipeline  # Return the object that was 'deleted'


@router.post("/{pipeline_id}/run", status_code=202, response_model=dict)
async def trigger_pipeline_run(pipeline_id: int, db: AsyncSession = Depends(get_db)):
    """
    DUMMY: Simulates triggering an asynchronous pipeline run via Celery.
    """
    logger.info(f"Endpoint: trigger_pipeline_run called for id={pipeline_id}")
    # Check pipeline status using dummy CRUD
    db_pipeline = await crud.pipeline.get(db, id=pipeline_id)
    if not db_pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found (simulated)")
    if db_pipeline.status == schemas.PipelineStatus.PAUSED:
        raise HTTPException(status_code=400, detail="Pipeline is paused (simulated)")
    if db_pipeline.status == schemas.PipelineStatus.RUNNING:
        raise HTTPException(status_code=409, detail="Pipeline is already running (simulated)")

    # Simulate scheduling the Celery task
    logger.info(f"Endpoint: Simulating run_pipeline_task.delay({pipeline_id})")
    # In real code: task = run_pipeline_task.delay(pipeline_id)
    #               task_id = task.id
    # For dummy:
    dummy_task_id = f"dummy-celery-task-{random.randint(10000, 99999)}"
    logger.info(f"Endpoint: Simulated task scheduling, got dummy task ID: {dummy_task_id}")

    # Optionally update pipeline status immediately (using dummy crud)
    # await crud.pipeline.update_pipeline_status(db, pipeline_id=pipeline_id, status=schemas.PipelineStatus.RUNNING)

    return {"message": "Pipeline run simulated successfully", "job_id": dummy_task_id}


# --- Add dummy endpoints for pause/resume if needed, similar to trigger_pipeline_run ---
