from typing import List, Dict
from uuid import UUID
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    BackgroundTasks,
)

from models.pipeline import Pipeline, PipelineCreate, PipelineStatus
from models.ingestion import OutputData
from services.pipeline_service import PipelineService
from dependencies import (
    get_pipeline_service,
)

router = APIRouter(
    prefix="/pipelines",
    tags=["Pipelines"],
    responses={404: {"description": "Pipeline not found"}},
)


@router.post(
    "/",
    response_model=Pipeline,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new pipeline",
    description="Creates a new pipeline configuration and schedules its first run if applicable. The pipeline starts in an INACTIVE state.",
)
async def create_pipeline(
    pipeline_in: PipelineCreate,
    service: PipelineService = Depends(get_pipeline_service),
) -> Pipeline:
    """
    Creates a new data integration pipeline.

    - **name**: A unique name for the pipeline.
    - **description**: A brief description of the pipeline's purpose.
    - **config**: Configuration details including:
        - **ingestor_config**: Settings for the data ingestion sources.
        - **run_frequency**: How often the pipeline should run (daily, weekly, monthly).
    """
    try:
        # The service already handles calculating next_run and notifying scheduler
        created_pipeline = await service.create_pipeline(
            name=pipeline_in.name,
            description=pipeline_in.description,
            ingestor_config=pipeline_in.config.ingestor_config,
            run_frequency=pipeline_in.config.run_frequency,
        )
        return created_pipeline
    except Exception as e:
        # Catch potential exceptions during creation (e.g., store errors)
        # Log the error ideally
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create pipeline: {e}",
        )


@router.get(
    "/",
    response_model=List[Pipeline],
    summary="List all pipelines",
    description="Retrieves a list of all configured pipelines.",
)
async def list_pipelines(
    service: PipelineService = Depends(get_pipeline_service),
) -> List[Pipeline]:
    """
    Returns a list of all pipelines currently stored.
    """
    return await service.list_pipelines()


@router.get(
    "/{pipeline_id}",
    response_model=Pipeline,
    summary="Get a specific pipeline",
    description="Retrieves the details of a single pipeline by its unique ID.",
)
async def get_pipeline(
    pipeline_id: UUID,
    service: PipelineService = Depends(get_pipeline_service),
) -> Pipeline:
    """
    Fetches a pipeline by its UUID. Returns 404 if not found.
    """
    pipeline = await service.get_pipeline(pipeline_id)
    if pipeline is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pipeline with id {pipeline_id} not found",
        )
    return pipeline


@router.put(
    "/{pipeline_id}",
    response_model=Pipeline,
    summary="Update a pipeline",
    description="Updates the configuration of an existing pipeline. If the run frequency changes, the schedule will be updated.",
)
async def update_pipeline(
    pipeline_id: UUID,
    pipeline_in: PipelineCreate,
    service: PipelineService = Depends(get_pipeline_service),
) -> Pipeline:
    """
    Updates an existing pipeline identified by its UUID.

    Allows modification of name, description, and configuration (including run frequency).
    Returns 404 if the pipeline does not exist.
    """
    updated_pipeline = await service.update_pipeline(pipeline_id, pipeline_in)
    if updated_pipeline is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pipeline with id {pipeline_id} not found",
        )
    return updated_pipeline


@router.delete(
    "/{pipeline_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a pipeline",
    description="Deletes a pipeline configuration and unschedules any future runs.",
)
async def delete_pipeline(
    pipeline_id: UUID,
    service: PipelineService = Depends(get_pipeline_service),
) -> None:
    """
    Deletes a pipeline by its UUID.

    Returns 204 No Content on successful deletion.
    Returns 404 if the pipeline does not exist.
    """
    # Check existence first for a clearer 404
    existing_pipeline = await service.get_pipeline(pipeline_id)
    if not existing_pipeline:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pipeline with id {pipeline_id} not found",
        )

    deleted = await service.delete_pipeline(pipeline_id)
    # Service's delete handles scheduler notification
    if not deleted:
        # This might happen in a race condition or if delete fails after get passes
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pipeline with id {pipeline_id} not found or could not be deleted.",
        )
    # No return body needed for 204


@router.post(
    "/{pipeline_id}/run",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=Dict[str, str],
    summary="Manually trigger a pipeline run",
    description="Initiates an immediate run of the specified pipeline in the background. The pipeline status will be updated during and after the run.",
)
async def run_pipeline_manually(
    pipeline_id: UUID,
    background_tasks: BackgroundTasks,
    service: PipelineService = Depends(get_pipeline_service),
) -> Dict[str, str]:
    """
    Triggers a pipeline run asynchronously.

    - Checks if the pipeline exists.
    - Adds the `service.run_pipeline` task to be executed in the background.
    - Returns immediately with a confirmation message.

    Returns 404 if the pipeline does not exist.
    The service layer handles checks for already active pipelines.
    """
    pipeline = await service.get_pipeline(pipeline_id)
    if pipeline is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Pipeline with id {pipeline_id} not found, cannot trigger run.",
        )

    # Optional: Check status here for a quicker response if already active,
    # although the service layer also checks this.
    if pipeline.status == PipelineStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,  # 409 Conflict is suitable here
            detail=f"Pipeline {pipeline_id} is already running.",
        )

    # Add the potentially long-running task to the background
    background_tasks.add_task(service.run_pipeline, pipeline_id=pipeline_id)

    return {"detail": f"Pipeline run triggered for {pipeline_id}"}


@router.get(
    "/{pipeline_id}/results",
    response_model=OutputData | None,
    summary="Get latest run results for a pipeline",
    description="Retrieves the aggregated data output from the last successful run of the specified pipeline.",
)
async def get_pipeline_results(
    pipeline_id: UUID,
    service: PipelineService = Depends(get_pipeline_service),
) -> OutputData | None:
    """
    Fetches the results of the last successful run for the given pipeline_id.
    Returns null or an empty structure if no successful run with output is found.
    """
    results = await service.get_pipeline_latest_results(pipeline_id)

    if results is None:
        pipeline_exists = await service.get_pipeline(pipeline_id)
        if not pipeline_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Pipeline with id {pipeline_id} not found.",
            )
        return None

    return results
