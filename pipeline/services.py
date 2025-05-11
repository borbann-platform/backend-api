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
from log.logging_utils import setup_run_logging, cleanup_run_logging, pipeline_log


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

    # Setup structured per-run logging
    setup_run_logging(str(pipeline.id), str(run_id))
    pipeline_log("INFO", "Pipeline run starting", str(pipeline.id), str(run_id), status="RUNNING")

    # Mark as running
    run.status = 'RUNNING'
    run.started_at = datetime.utcnow()

    try:
        # Ingest raw records
        pipeline_log("INFO", "Ingesting raw records", str(pipeline.id), str(run_id))
        raw_records: List[Dict[str, Any]] = Ingestor.run(pipeline.sources)
        pipeline_log("INFO", f"Ingested {len(raw_records)} records", str(pipeline.id), str(run_id))

        # Normalize records
        normalizer = Normalizer()
        canonical: List[Dict[str, Any]] = []
        for raw in raw_records:
            source_type = raw.get('source_type')
            source = raw.get('source')
            if not source_type or not source:
                pipeline_log("ERROR", "Record missing 'source_type' or 'source'", str(pipeline.id), str(run_id), status="FAILED")
                raise ValueError("Record missing 'source_type' or 'source'.")
            norm = normalizer.normalize([raw], source_type, source)
            canonical.extend(norm)

        # Success
        run.status = 'COMPLETED'
        run.finished_at = datetime.utcnow()
        run.results = canonical
        pipeline_log("SUCCESS", f"Pipeline run completed with {len(canonical)} records", str(pipeline.id), str(run_id), status="COMPLETED")

    except Exception as e:
        # Log failure with stack trace
        pipeline_log("ERROR", f"Pipeline run failed: {e}", str(pipeline.id), str(run_id), status="FAILED", error=str(e))
        run.status = 'FAILED'
        run.finished_at = datetime.utcnow()
        run.error = str(e)
    finally:
        pipeline_log("INFO", "Pipeline run finished", str(pipeline.id), str(run_id), status=run.status)
        cleanup_run_logging(str(run_id))