"""
In‐memory stores for pipelines and runs.
"""

from typing import Dict, List, Optional
from uuid import UUID, uuid4
from datetime import datetime

import models

# In‐memory storage
pipelines: Dict[UUID, models.Pipeline] = {}
runs: Dict[UUID, models.RunResult] = {}


def create_pipeline(pipeline_in: models.PipelineCreate) -> models.Pipeline:
    """
    Create and store a new pipeline.
    """
    pipeline_id = uuid4()
    now = datetime.utcnow()
    pipeline = models.Pipeline(
        id=pipeline_id,
        name=pipeline_in.name,
        sources=pipeline_in.sources,
        created_at=now,
    )
    pipelines[pipeline_id] = pipeline
    return pipeline


def get_pipeline(pipeline_id: UUID) -> Optional[models.Pipeline]:
    """
    Retrieve a pipeline by its ID.
    """
    return pipelines.get(pipeline_id)


def list_pipelines() -> List[models.Pipeline]:
    """
    List all registered pipelines.
    """
    return list(pipelines.values())


def create_run(pipeline_id: UUID) -> models.RunResult:
    """
    Create and store a new run for a given pipeline.
    """
    run_id = uuid4()
    now = datetime.utcnow()
    run = models.RunResult(
        id=run_id,
        pipeline_id=pipeline_id,
        status='PENDING',
        started_at=now,
        finished_at=None,
        results=None,
        error=None,
    )
    runs[run_id] = run
    return run


def get_run(run_id: UUID) -> Optional[models.RunResult]:
    """
    Retrieve a run by its ID.
    """
    return runs.get(run_id)


def list_runs_for_pipeline(pipeline_id: UUID) -> List[models.RunResult]:
    """
    List all runs for a specific pipeline.
    """
    return [r for r in runs.values() if r.pipeline_id == pipeline_id]