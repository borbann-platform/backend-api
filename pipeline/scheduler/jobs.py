"""
Contains the main SchedulerManager class
"""

# scheduler/jobs.py
from uuid import UUID
from loguru import logger

# Avoid direct dependency on PipelineService here if possible.
# Instead, the manager will hold the service and pass necessary info.


async def execute_pipeline_job(pipeline_id: UUID, pipeline_service):
    """
    Job function executed by APScheduler. Calls the PipelineService to run the pipeline.

    Args:
        pipeline_id: The ID of the pipeline to run.
        pipeline_service: The instance of PipelineService (passed via scheduler setup).
                          NOTE: Passing complex objects directly might have issues depending
                          on the job store/executor. Consider alternatives if problems arise.
    """
    logger.info(f"Scheduler job started for pipeline_id: {pipeline_id}")
    try:
        # The run_pipeline method should handle its own internal state updates
        # (like setting status to ACTIVE/INACTIVE and updating last_run)
        await pipeline_service.run_pipeline(pipeline_id)
        logger.info(
            f"Scheduler job finished successfully for pipeline_id: {pipeline_id}"
        )
    except Exception as e:
        # The run_pipeline method should ideally handle its own errors,
        # but we catch exceptions here as a fallback for logging.
        logger.error(
            f"Scheduler job failed for pipeline_id {pipeline_id}: {e}", exc_info=True
        )
        # Consider adding retry logic here or within APScheduler config if needed
