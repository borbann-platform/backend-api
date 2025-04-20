"""
FastAPI service for managing and running data integration pipelines.
"""

from typing import List, Dict, Any
from uuid import UUID

from fastapi import FastAPI, HTTPException, BackgroundTasks

import models
import stores
import services

app = FastAPI(title="Data Integration Pipeline API")


@app.post(
    "/pipelines",
    response_model=models.Pipeline,
    status_code=201,
    summary="Create a new pipeline"
)
def create_pipeline(pipeline_in: models.PipelineCreate) -> models.Pipeline:
    """
    Register a new pipeline with sources configuration.
    """
    return stores.create_pipeline(pipeline_in)


@app.get(
    "/pipelines",
    response_model=List[models.Pipeline],
    summary="List all pipelines"
)
def list_pipelines() -> List[models.Pipeline]:
    """
    Retrieve all registered pipelines.
    """
    return stores.list_pipelines()


@app.get(
    "/pipelines/{pipeline_id}",
    response_model=models.Pipeline,
    summary="Get a pipeline by ID"
)
def get_pipeline(pipeline_id: UUID) -> models.Pipeline:
    """
    Fetch details of a specific pipeline.
    """
    pipeline = stores.get_pipeline(pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipeline


@app.post(
    "/pipelines/{pipeline_id}/run",
    response_model=models.Run,
    status_code=201,
    summary="Trigger a pipeline run"
)
def run_pipeline(
    pipeline_id: UUID,
    background_tasks: BackgroundTasks
) -> models.Run:
    """
    Start a new run for the given pipeline. Runs asynchronously.
    """
    pipeline = stores.get_pipeline(pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    run = stores.create_run(pipeline_id)
    background_tasks.add_task(services.execute_pipeline, pipeline, run.id)
    return run


@app.get(
    "/pipelines/{pipeline_id}/runs",
    response_model=List[models.Run],
    summary="List runs for a pipeline"
)
def list_runs(pipeline_id: UUID) -> List[models.Run]:
    """
    List all runs associated with a pipeline.
    """
    pipeline = stores.get_pipeline(pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    runs = stores.list_runs_for_pipeline(pipeline_id)
    # Return only the Run fields (omit results/error)
    return [models.Run(**r.dict()) for r in runs]


@app.get(
    "/pipelines/{pipeline_id}/runs/{run_id}",
    response_model=models.Run,
    summary="Get run status"
)
def get_run(pipeline_id: UUID, run_id: UUID) -> models.Run:
    """
    Retrieve the status of a specific run.
    """
    pipeline = stores.get_pipeline(pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    run = stores.get_run(run_id)
    if not run or run.pipeline_id != pipeline_id:
        raise HTTPException(status_code=404, detail="Run not found")

    return models.Run(**run.dict())


@app.get(
    "/pipelines/{pipeline_id}/runs/{run_id}/results",
    response_model=List[Dict[str, Any]],
    summary="Get run results"
)
def get_run_results(pipeline_id: UUID, run_id: UUID) -> List[Dict[str, Any]]:
    """
    Retrieve normalized results of a completed run.
    """
    pipeline = stores.get_pipeline(pipeline_id)
    if not pipeline:
        raise HTTPException(status_code=404, detail="Pipeline not found")

    run = stores.get_run(run_id)
    if not run or run.pipeline_id != pipeline_id:
        raise HTTPException(status_code=404, detail="Run not found")

    if run.status != 'COMPLETED':
        raise HTTPException(
            status_code=409,
            detail="Run not completed or has failed"
        )

    return run.results or []