"""
Background service to execute pipelines: ingestion → normalization.
"""

from typing import List, Dict, Any
from uuid import UUID
from datetime import datetime

import stores
import models
from ingestion.ingestor import Ingestor
from normalization.normalizer import Normalizer


def execute_pipeline(pipeline: models.Pipeline, run_id: UUID) -> None:
    """
    Execute a pipeline: ingest data, normalize it, and update run status.

    Args:
        pipeline: The Pipeline model to run.
        run_id: UUID of the RunResult to update.
    """
    run = stores.runs.get(run_id)
    if not run:
        return

    # Mark as running
    run.status = 'RUNNING'
    run.started_at = datetime.utcnow()

    try:
        # Ingest raw records
        raw_records: List[Dict[str, Any]] = Ingestor.run(pipeline.sources)

        # Normalize records
        normalizer = Normalizer()
        canonical: List[Dict[str, Any]] = []
        for raw in raw_records:
            source_type = raw.get('source_type')
            source = raw.get('source')
            if not source_type or not source:
                raise ValueError("Record missing 'source_type' or 'source'.")
            norm = normalizer.normalize([raw], source_type, source)
            canonical.extend(norm)

        # Success
        run.status = 'COMPLETED'
        run.finished_at = datetime.utcnow()
        run.results = canonical

    except Exception as e:
        # Failure
        run.status = 'FAILED'
        run.finished_at = datetime.utcnow()
        run.error = str(e)