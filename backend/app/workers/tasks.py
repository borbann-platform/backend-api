import asyncio
from datetime import datetime
import logging
import random
import time

from celery import chord, group, shared_task

from app import crud, models, schemas  # Keep imports for structure
from app.core.db import AsyncSessionFactory  # Use session factory directly in tasks
from app.services.processing_service import ProcessingService  # Import dummy service

logger = logging.getLogger(__name__)


# --- Helper to run async code from sync Celery tasks ---
def async_to_sync(awaitable):
    """Runs an awaitable in a new event loop."""
    return asyncio.run(awaitable)


# --- Dummy Sub-Tasks ---
@shared_task(bind=True, max_retries=1, default_retry_delay=5)
def dummy_source_task(self, source_id: int, source_type: str):
    """DUMMY: Simulates processing any data source type."""
    task_id = self.request.id
    logger.info(f"DUMMY TASK dummy_source_task[ID:{task_id}]: Start DS:{source_id} Type:{source_type}")
    await_time = random.uniform(0.05, 0.2)
    time.sleep(await_time)  # Simulate work

    # Simulate occasional failure
    if random.random() < 0.08:
        error_msg = f"Simulated failure processing source {source_id}"
        logger.warning(f"DUMMY TASK dummy_source_task[ID:{task_id}]: {error_msg}")
        raise ValueError(error_msg)  # Raise exception for Celery retry/failure

    # Simulate successful result (list of dicts)
    num_records = random.randint(1, 3)
    result = [{f"data_{source_id}_{i}": random.random(), "source_type": source_type} for i in range(num_records)]
    logger.info(f"DUMMY TASK dummy_source_task[ID:{task_id}]: Finish DS:{source_id}, generated {num_records} records.")
    return result


# --- Dummy Aggregation Task (Callback) ---
@shared_task(bind=True)
def dummy_aggregate_task(self, results: list, pipeline_id: int, run_id: int):
    """DUMMY: Simulates aggregating results and saving."""
    task_id = self.request.id
    logger.info(
        f"DUMMY TASK dummy_aggregate_task[ID:{task_id}]: Start Aggregation for RunID:{run_id}, PipelineID:{pipeline_id}. Received {len(results)} results."
    )
    log_messages = [f"Aggregation simulation started at {datetime.utcnow()}"]
    final_status = schemas.PipelineStatus.COMPLETED
    output_location = None
    errors_encountered = sum(1 for r in results if isinstance(r, Exception))

    # Instantiate dummy service
    service = ProcessingService()

    async def process_and_save():
        nonlocal output_location, final_status  # Allow modification
        try:
            # Call dummy processing service
            processed_df = await service.process_pipeline_results(results, {"dummy_pipeline_cfg": True})

            if not processed_df.empty:
                # Simulate saving (no actual file handler needed here for dummy)
                await asyncio.sleep(0.1)  # Simulate save time
                output_location = f"dummy_outputs/run_{run_id}_output_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.csv"
                log_messages.append(f"Simulated saving results to {output_location}, shape: {processed_df.shape}")
                logger.info(f"DUMMY AGGREGATION: Simulated save complete to {output_location}")
            else:
                log_messages.append("No data processed after aggregation/filtering.")
                # Keep COMPLETED status if no errors, otherwise FAILED was set below

        except Exception as e:
            logger.error(f"DUMMY AGGREGATION: Error during dummy processing: {e}", exc_info=True)
            log_messages.append(f"ERROR during processing: {e}")
            final_status = schemas.PipelineStatus.FAILED
            output_location = None

        if errors_encountered > 0 and final_status != schemas.PipelineStatus.FAILED:
            log_messages.append("Pipeline simulation completed with source task errors.")
            # Optional: Set a specific status like COMPLETED_WITH_ERRORS if needed
        elif errors_encountered > 0 and not processed_df.empty:
            final_status = schemas.PipelineStatus.FAILED  # Fail if errors and no data

        # Simulate DB Update
        final_log = "\n".join(log_messages)
        logger.info(f"DUMMY AGGREGATION: Simulating final DB update for RunID:{run_id} to status {final_status}")
        if AsyncSessionFactory:  # Check if DB is configured
            async with AsyncSessionFactory() as session:
                try:
                    # Call dummy CRUD functions
                    await crud.pipeline_run.update_run_status(
                        db=session,
                        run_id=run_id,
                        status=final_status,
                        output_location=output_location,
                        run_log=final_log,
                    )
                    await crud.pipeline.update(  # Use generic update for status
                        db=session,
                        db_obj=models.Pipeline(id=pipeline_id),  # Need a dummy obj for update
                        obj_in={"status": schemas.PipelineStatus.IDLE},
                    )
                    logger.info(f"DUMMY AGGREGATION: DB update simulation successful for RunID:{run_id}.")
                except Exception as db_exc:
                    logger.error(
                        f"DUMMY AGGREGATION: Failed DB update simulation for RunID:{run_id}: {db_exc}", exc_info=True
                    )
        else:
            logger.warning("DUMMY AGGREGATION: Skipping DB update simulation as DB is not configured.")

    async_to_sync(process_and_save())
    logger.info(f"DUMMY TASK dummy_aggregate_task[ID:{task_id}]: Finish Aggregation Simulation for RunID:{run_id}")


# --- Dummy Pipeline Orchestrator Task ---
@shared_task(bind=True)
def run_pipeline_task(self, pipeline_id: int):
    """DUMMY: Simulates fetching pipeline details and scheduling sub-tasks."""
    task_id = self.request.id
    logger.info(
        f"DUMMY TASK run_pipeline_task[ID:{task_id}]: Start Orchestration Simulation for PipelineID:{pipeline_id}"
    )
    run_id = None

    async def setup_and_dispatch():
        nonlocal run_id
        if not AsyncSessionFactory:
            logger.error("Cannot simulate pipeline run: Database not configured.")
            return None, "Database not configured"

        async with AsyncSessionFactory() as session:
            # 1. Get Pipeline (dummy)
            pipeline = await crud.pipeline.get_with_details(session, id=pipeline_id)
            if not pipeline:
                logger.error(f"Pipeline {pipeline_id} not found (simulated).")
                return None, "Pipeline not found"
            if pipeline.status != schemas.PipelineStatus.IDLE:
                logger.warning(f"Pipeline {pipeline_id} not idle (status: {pipeline.status}), skipping run simulation.")
                return None, f"Pipeline status is {pipeline.status}"

            # 2. Create Run Record (dummy)
            run = await crud.pipeline_run.create(
                session, pipeline_id=pipeline_id, celery_task_id=task_id, status=schemas.PipelineStatus.RUNNING
            )
            run_id = run.id
            logger.info(f"Created dummy PipelineRun record with RunID:{run_id}")

            # 3. Update Pipeline Status (dummy)
            await crud.pipeline.update(session, db_obj=pipeline, obj_in={"status": schemas.PipelineStatus.RUNNING})
            logger.info(f"Set dummy Pipeline {pipeline_id} status to RUNNING")

            # 4. Prepare sub-tasks (using dummy sources from get_with_details)
            if not pipeline.data_sources:
                logger.warning(f"No data sources found for pipeline {pipeline_id}. Finishing run.")
                await crud.pipeline_run.update_run_status(
                    session, run_id=run_id, status=schemas.PipelineStatus.COMPLETED, run_log="No data sources found."
                )
                await crud.pipeline.update(session, db_obj=pipeline, obj_in={"status": schemas.PipelineStatus.IDLE})
                return [], None  # No tasks to run

            sub_tasks = [dummy_source_task.s(ds.id, ds.type.value) for ds in pipeline.data_sources]
            logger.info(f"Prepared {len(sub_tasks)} dummy sub-tasks for RunID:{run_id}")
            return sub_tasks, None

    async def fail_run(error_message: str):
        """Helper to mark run as failed if setup simulation fails."""
        if run_id and AsyncSessionFactory:
            logger.error(f"Simulating run failure for RunID:{run_id} - {error_message}")
            async with AsyncSessionFactory() as session:
                await crud.pipeline_run.update_run_status(
                    db=session,
                    run_id=run_id,
                    status=schemas.PipelineStatus.FAILED,
                    run_log=f"Orchestration failed: {error_message}",
                )
                await crud.pipeline.update(
                    db=session, db_obj=models.Pipeline(id=pipeline_id), obj_in={"status": schemas.PipelineStatus.IDLE}
                )

    try:
        sub_task_signatures, error = async_to_sync(setup_and_dispatch())

        if error:
            logger.error(f"Orchestration setup simulation failed: {error}")
            # fail_run should have been called if run_id was set
            return

        if not sub_task_signatures:
            logger.info("No sub-tasks to execute.")
            return  # Setup marked run as completed/failed

        # Define the workflow chord
        workflow = chord(
            header=group(sub_task_signatures),
            body=dummy_aggregate_task.s(pipeline_id=pipeline_id, run_id=run_id),  # Ensure run_id is passed
        )

        # Simulate applying the workflow
        logger.info(
            f"DUMMY TASK run_pipeline_task[ID:{task_id}]: Simulating Celery chord apply_async() for RunID:{run_id}"
        )
        # In a real test you might call workflow() directly to execute synchronously
        # For this dummy structure, just log the intent.
        logger.info(f"DUMMY TASK run_pipeline_task[ID:{task_id}]: Workflow simulation scheduled for RunID:{run_id}")

    except Exception as exc:
        logger.error(
            f"DUMMY TASK run_pipeline_task[ID:{task_id}]: Orchestration Simulation FAILED: {exc}", exc_info=True
        )
        async_to_sync(fail_run(f"Orchestration simulation exception: {type(exc).__name__}"))
