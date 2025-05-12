"""
Pipeline service to help do pipeline CRUD
"""

import asyncio
from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional, List, TYPE_CHECKING
from loguru import logger

from models.pipeline import (
    Pipeline,
    PipelineCreate,
    PipelineConfig,
    RunFrequency,
    PipelineStatus,
)
from models.ingestion import IngestorInput
from stores.base import PipelineStore
from scheduler.utils import calculate_next_run, UTC  # Import the utility and UTC

# !use TYPE_CHECKING to avoid circular imports at runtime
# the SchedulerManager needs PipelineService, and PipelineService now needs SchedulerManager
if TYPE_CHECKING:
    from scheduler.manager import SchedulerManager


class PipelineService:
    """
    Pipeline service to help do pipeline CRUD
    """

    def __init__(
        self,
        store: PipelineStore,
        scheduler_manager: Optional["SchedulerManager"] = None,
    ):
        self.store = store
        self.scheduler_manager: Optional["SchedulerManager"] = (
            scheduler_manager  # Store the scheduler instance
        )
        logger.info(f"PipelineService initialized with store: {type(store).__name__}")
        if scheduler_manager:
            logger.info("PipelineService configured with SchedulerManager.")
        else:
            logger.warning(
                "PipelineService initialized without SchedulerManager. Scheduling notifications disabled."
            )

    def set_scheduler_manager(self, scheduler_manager: "SchedulerManager"):
        """
        Method to link the scheduler later if needed (e.g., after both are created)
        """
        self.scheduler_manager = scheduler_manager
        logger.info("SchedulerManager linked to PipelineService.")

    async def create_pipeline(
        self,
        name: str,
        description: str,
        ingestor_config: IngestorInput,
        run_frequency: RunFrequency,
    ) -> Pipeline:
        """Create a new pipeline, save it, and notify the scheduler."""
        logger.info(
            f"Creating pipeline: name={name}, description={description}, run_frequency={run_frequency}"
        )
        try:
            pipeline_id = uuid4()
            now = datetime.now(UTC)  # Use UTC consistently

            # Calculate the initial next_run time
            initial_next_run = calculate_next_run(
                frequency=run_frequency,
                last_run=None,  # No last run yet
                start_reference_time=now,
            )

            pipeline = Pipeline(
                id=pipeline_id,
                name=name,
                description=description,
                config=PipelineConfig(
                    ingestor_config=ingestor_config,
                    run_frequency=run_frequency,
                    last_run=None,
                    next_run=initial_next_run,  # Store the calculated next run
                ),
                status=PipelineStatus.INACTIVE,  # Start as inactive
                created_at=now,
                updated_at=now,
            )
            await self.store.save(pipeline)
            logger.info(
                f"Pipeline created and saved: id={pipeline.id}, next_run={initial_next_run}"
            )

            # Notify the scheduler to add the job immediately
            if self.scheduler_manager:
                logger.debug(f"Notifying scheduler to schedule pipeline {pipeline.id}")
                # Use asyncio.create_task for fire-and-forget notification
                asyncio.create_task(self.scheduler_manager.schedule_pipeline(pipeline))
            else:
                logger.warning(
                    f"Scheduler not available, cannot schedule pipeline {pipeline.id} immediately."
                )

            return pipeline
        except Exception as e:
            logger.error(f"Failed to create pipeline: {e}", exc_info=True)
            raise  # Re-raise the exception after logging

    async def update_pipeline(
        self, pipeline_id: UUID, pipeline_in: PipelineCreate
    ) -> Optional[Pipeline]:
        """Update an existing pipeline, save it, and notify the scheduler."""
        logger.info(f"Updating pipeline: id={pipeline_id}")
        existing_pipeline = await self.store.get(pipeline_id)
        if not existing_pipeline:
            logger.warning(f"Pipeline not found for update: id={pipeline_id}")
            return None

        try:
            update_data = pipeline_in.model_dump(exclude_unset=True)
            # Use model_copy for a cleaner update merge
            updated_pipeline = existing_pipeline.model_copy(
                deep=True, update=update_data
            )

            # Check if frequency changed, if so, recalculate next_run
            config_changed = "config" in update_data
            frequency_changed = False
            if (
                config_changed
                and updated_pipeline.config.run_frequency
                != existing_pipeline.config.run_frequency
            ):
                frequency_changed = True
                logger.info(
                    f"Run frequency changed for pipeline {pipeline_id}. Recalculating next run."
                )
                now = datetime.now(UTC)
                updated_pipeline.config.next_run = calculate_next_run(
                    frequency=updated_pipeline.config.run_frequency,
                    last_run=existing_pipeline.config.last_run,  # Base on last run
                    start_reference_time=now,
                )
                logger.info(
                    f"Recalculated next_run for {pipeline_id}: {updated_pipeline.config.next_run}"
                )

            # Save the updated pipeline (store's save method handles updated_at)
            await self.store.save(updated_pipeline)
            logger.info(f"Pipeline updated: id={updated_pipeline.id}")

            # Notify the scheduler if relevant config changed
            # We notify on any config change or if frequency specifically changed
            if self.scheduler_manager and (config_changed or frequency_changed):
                logger.debug(
                    f"Notifying scheduler to reschedule pipeline {updated_pipeline.id}"
                )
                asyncio.create_task(
                    self.scheduler_manager.reschedule_pipeline(updated_pipeline)
                )
            elif self.scheduler_manager:
                logger.debug(
                    f"Pipeline {updated_pipeline.id} updated, but no schedule change needed."
                )

            return updated_pipeline
        except Exception as e:
            logger.error(
                f"Failed to update pipeline id={pipeline_id}: {e}", exc_info=True
            )
            raise

    async def delete_pipeline(self, pipeline_id: UUID) -> bool:
        """Delete an existing pipeline and notify the scheduler."""
        logger.info(f"Attempting to delete pipeline: id={pipeline_id}")

        pipeline_exists = await self.store.get(pipeline_id) is not None
        if not pipeline_exists:
            logger.warning(f"Pipeline {pipeline_id} not found for deletion.")
            return False

        # Notify scheduler *before* deleting from store, in case deletion fails
        if self.scheduler_manager:
            logger.debug(f"Notifying scheduler to unschedule pipeline {pipeline_id}")
            # We need to wait for this to ensure the job is removed before DB record gone
            await self.scheduler_manager.unschedule_pipeline(pipeline_id)
        else:
            logger.warning(
                f"Scheduler not available, cannot unschedule pipeline {pipeline_id}."
            )

        # Proceed with deletion from store
        deleted = await self.store.delete(pipeline_id)
        if deleted:
            logger.info(f"Pipeline deleted successfully from store: id={pipeline_id}")
        else:
            # This might happen if pipeline was already gone, or store error
            logger.warning(
                f"Pipeline {pipeline_id} not found in store for deletion, or delete failed."
            )
            # Scheduler job should have been removed anyway if it existed.
        return deleted

    async def get_pipeline(self, pipeline_id: UUID) -> Optional[Pipeline]:
        """Get a single pipeline by ID."""
        logger.debug(f"Getting pipeline: id={pipeline_id}")
        return await self.store.get(pipeline_id)

    async def list_pipelines(self) -> List[Pipeline]:
        """Get all pipelines."""
        logger.debug("Listing all pipelines")
        return await self.store.get_all()

    async def run_pipeline(self, pipeline_id: UUID) -> None:
        """
        Executes the pipeline logic, updating status and run times.
        This is called by the scheduler job or manual trigger.
        """
        logger.info(f"Attempting run execution for pipeline: id={pipeline_id}")
        pipeline = await self.store.get(pipeline_id)

        if not pipeline:
            logger.error(f"Cannot run pipeline: Pipeline not found (id={pipeline_id})")
            return
        # Simple lock mechanism using status
        if pipeline.status == PipelineStatus.ACTIVE:
            logger.warning(
                f"Pipeline id={pipeline_id} is already ACTIVE. Skipping run."
            )
            return

        # --- Mark as ACTIVE ---
        try:
            pipeline.status = PipelineStatus.ACTIVE
            # Optionally mark start time here if needed, but last_run usually marks completion
            # pipeline.config.last_run = datetime.now(UTC)
            await self.store.save(pipeline)
            logger.info(f"Pipeline {pipeline_id} marked as ACTIVE.")
        except Exception as e:
            logger.error(
                f"Failed to mark pipeline {pipeline_id} as ACTIVE: {e}. Aborting run.",
                exc_info=True,
            )
            # Restore original status if possible? Depends on store implementation.
            return  # Abort run if we can't even update status

        # --- Execute Pipeline Logic ---
        run_successful = False
        try:
            logger.info(f"Executing core logic for pipeline id={pipeline_id}...")
            # ---------------------------------------------------
            # TODO: replace with actual pipeline execution call
            # Example: await self._execute_ingestion(pipeline.config.ingestor_config)
            # Example: await self._process_data(...)
            await asyncio.sleep(5)  # Simulate work
            logger.info(f"Core logic finished successfully for id={pipeline_id}.")
            # ---------------------------------------------------
            run_successful = True

        except Exception as e:
            logger.error(
                f"Core logic failed during pipeline run id={pipeline_id}: {e}",
                exc_info=True,
            )
            # run_successful remains False

        # --- Update Final State ---
        try:
            # Fetch the latest state again in case of external changes (though unlikely with ACTIVE status lock)
            final_pipeline_state = await self.store.get(pipeline_id)
            if not final_pipeline_state:
                logger.warning(
                    f"Pipeline {pipeline_id} disappeared during run. Cannot update final state."
                )
                return

            now = datetime.now(UTC)
            final_pipeline_state.status = PipelineStatus.INACTIVE  # Reset status
            # TODO: Add a FAILED status?
            # final_pipeline_state.status = PipelineStatus.INACTIVE if run_successful else PipelineStatus.FAILED

            if run_successful:
                final_pipeline_state.config.last_run = (
                    now  # Mark completion time on success
                )

            # Calculate and store the *next* run time after this one
            final_pipeline_state.config.next_run = calculate_next_run(
                frequency=final_pipeline_state.config.run_frequency,
                last_run=final_pipeline_state.config.last_run,  # Use the updated last_run
                start_reference_time=now,
            )

            await self.store.save(final_pipeline_state)
            logger.info(
                f"Pipeline {pipeline_id} run finished. Status: {final_pipeline_state.status}, Last Run: {final_pipeline_state.config.last_run}, Next Run: {final_pipeline_state.config.next_run}"
            )

            # Notify scheduler about the *new* next run time
            if self.scheduler_manager:
                logger.debug(
                    f"Notifying scheduler to reschedule pipeline {pipeline_id} after run completion."
                )
                asyncio.create_task(
                    self.scheduler_manager.reschedule_pipeline(final_pipeline_state)
                )

        except Exception as e:
            logger.error(
                f"Failed to update pipeline {pipeline_id} state after run execution: {e}",
                exc_info=True,
            )
            # The pipeline might be left in ACTIVE state if this fails. Requires manual intervention or recovery logic.

    # TODO: Complete this method
    # --- Placeholder for actual execution ---
    async def _execute_ingestion(self, config: IngestorInput):
        # Replace with your actual ingestion logic
        logger.info(f"Simulating ingestion with config: {config}")
        await asyncio.sleep(2)  # Simulate I/O
        logger.info("Ingestion simulation complete.")
