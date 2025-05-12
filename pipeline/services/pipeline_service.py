"""
Pipeline service to help do pipeline CRUD
"""

import asyncio
from datetime import datetime
from uuid import UUID, uuid4
from typing import Optional, List, TYPE_CHECKING
from loguru import logger

from ingestion import Ingestor

from models.pipeline import (
    Pipeline,
    PipelineCreate,
    PipelineConfig,
    RunFrequency,
    PipelineStatus,
)
from models.ingestion import IngestorInput
from stores.base import PipelineStore
from scheduler.utils import calculate_next_run, UTC

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
            now = datetime.now(UTC)

            # Calculate the initial next_run time
            initial_next_run = calculate_next_run(
                frequency=run_frequency,
                last_run=None,
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
                    next_run=initial_next_run,
                ),
                status=PipelineStatus.INACTIVE,
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
            # 1. Create a deep copy to modify
            updated_pipeline = existing_pipeline.model_copy(deep=True)

            # 2. Update top-level fields directly from the input model
            updated_pipeline.name = pipeline_in.name
            updated_pipeline.description = pipeline_in.description

            # 3. Handle config update carefully
            config_changed = False
            frequency_changed = False
            original_frequency = (
                updated_pipeline.config.run_frequency
            )  # Store before potential change

            # Check if the input payload actually provided config data
            if pipeline_in.config:
                config_changed = True
                # Update the fields *within* the existing config object
                # Ensure the nested ingestor_config is also handled correctly (assuming assignment works or potentially use model_copy/re-init if complex)
                updated_pipeline.config.ingestor_config = (
                    pipeline_in.config.ingestor_config.model_copy(deep=True)
                )  # Use model_copy for safety
                updated_pipeline.config.run_frequency = pipeline_in.config.run_frequency

                # Check if the frequency actually changed after the update
                if updated_pipeline.config.run_frequency != original_frequency:
                    frequency_changed = True

            # 4. Recalculate next_run ONLY if frequency changed
            if frequency_changed:
                logger.info(
                    f"Run frequency changed for pipeline {pipeline_id} from {original_frequency} to {updated_pipeline.config.run_frequency}. Recalculating next run."
                )
                now = datetime.now(UTC)
                # Use the existing last_run from the copied object
                updated_pipeline.config.next_run = calculate_next_run(
                    frequency=updated_pipeline.config.run_frequency,
                    last_run=updated_pipeline.config.last_run,
                    start_reference_time=now,
                )
                logger.info(
                    f"Recalculated next_run for {pipeline_id}: {updated_pipeline.config.next_run}"
                )

            # 5. Update the timestamp before saving
            updated_pipeline.updated_at = datetime.now(UTC)

            # 6. Save the updated pipeline
            await self.store.save(updated_pipeline)
            logger.info(f"Pipeline updated successfully: id={updated_pipeline.id}")

            # 7. Notify the scheduler if config changed (including frequency)
            # Scheduler needs the *final* state of the updated pipeline for rescheduling.
            if self.scheduler_manager and config_changed:
                logger.debug(
                    f"Notifying scheduler to reschedule pipeline {updated_pipeline.id} due to config change."
                )
                # Pass the fully updated pipeline object
                asyncio.create_task(
                    self.scheduler_manager.reschedule_pipeline(updated_pipeline)
                )
            elif self.scheduler_manager:
                logger.debug(
                    f"Pipeline {updated_pipeline.id} updated (non-config fields), no reschedule needed based on config."
                    # NOTE: might still want to reschedule if other non-config updates could affect execution,
                    # but based on current logic, only config changes trigger rescheduling.
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
        Logs associated with this run will include the pipeline_id.
        """
        # Use contextualize to tag logs originating from this specific run
        with logger.contextualize(
            pipeline_id=str(pipeline_id)
        ):  # Ensure it's a string for context
            logger.info(
                "Attempting run execution for pipeline"
            )  # Log context takes effect here
            pipeline = await self.store.get(pipeline_id)

            if not pipeline:
                logger.error("Cannot run pipeline: Pipeline not found")
                return
            if pipeline.status == PipelineStatus.ACTIVE:
                logger.warning("Pipeline is already ACTIVE. Skipping run.")
                return

            # --- Mark as ACTIVE ---
            # original_status = pipeline.status # Store original status for potential rollback
            try:
                pipeline.status = PipelineStatus.ACTIVE
                pipeline.updated_at = datetime.now(UTC)
                await self.store.save(pipeline)
                logger.info("Pipeline marked as ACTIVE.")
            except Exception as e:
                logger.error(
                    f"Failed to mark pipeline as ACTIVE: {e}. Aborting run.",
                    exc_info=True,
                )
                # Attempt to restore status? Requires careful thought on atomicity
                # pipeline.status = original_status
                # await self.store.save(pipeline) # Potential race condition/overwrite here
                return

            # --- Execute Pipeline Logic ---
            run_successful = False
            try:
                logger.info("Executing core logic...")
                # This call and anything within it will inherit the pipeline_id context
                await self._execute_ingestion(pipeline.config.ingestor_config)
                logger.info("Core logic finished successfully.")
                run_successful = True
            except Exception as e:
                logger.error(
                    f"Core logic failed during pipeline run: {e}", exc_info=True
                )
                # run_successful remains False

            # --- Update Final State ---
            try:
                # Fetch latest state again (important if external changes possible)
                final_pipeline_state = await self.store.get(pipeline_id)
                if not final_pipeline_state:
                    logger.warning(
                        "Pipeline disappeared during run. Cannot update final state."
                    )
                    # Handle potential deletion during run (e.g., unschedule if needed)
                    if self.scheduler_manager:
                        logger.warning(
                            "Attempting to unschedule potentially orphaned job"
                        )
                        asyncio.create_task(
                            self.scheduler_manager.unschedule_pipeline(pipeline_id)
                        )
                    return

                final_pipeline_state = final_pipeline_state.model_copy(deep=True)
                now = datetime.now(UTC)
                final_pipeline_state.status = (
                    PipelineStatus.INACTIVE if run_successful else PipelineStatus.FAILED
                )

                if run_successful:
                    final_pipeline_state.config.last_run = now

                current_last_run = final_pipeline_state.config.last_run
                final_pipeline_state.config.next_run = calculate_next_run(
                    frequency=final_pipeline_state.config.run_frequency,
                    last_run=current_last_run,
                    start_reference_time=now,
                )
                final_pipeline_state.updated_at = now

                await self.store.save(final_pipeline_state)
                logger.info(
                    f"Pipeline run finished. Status: {final_pipeline_state.status}, Last Run: {final_pipeline_state.config.last_run}, Next Run: {final_pipeline_state.config.next_run}"
                )

                if self.scheduler_manager:
                    logger.debug(
                        "Notifying scheduler to reschedule pipeline after run completion"
                    )
                    asyncio.create_task(
                        self.scheduler_manager.reschedule_pipeline(final_pipeline_state)
                    )

            except Exception as e:
                logger.error(
                    f"Failed to update pipeline state after run execution: {e}",
                    exc_info=True,
                )
                # Pipeline might be left ACTIVE or FAILED state might not be saved. Needs monitoring.

    async def _execute_ingestion(self, config: IngestorInput):
        """
        Executes the ingestion process for a pipeline using the provided IngestorInput config.
        Returns the ingestion results or raises an exception on failure.
        """
        try:
            # from ..ingestion import Ingestor
            logger.info(f"Executing ingestion with config: {config}")
            results = Ingestor.run(config.sources)
            logger.info(
                f"Ingestion completed successfully. Results count: {len(results.records)}"
            )
            return results
        except ImportError:
            logger.error("Failed to import Ingestor. Cannot execute ingestion.")
            raise RuntimeError("Ingestion module not found")
        except Exception as e:
            logger.error(f"Ingestion execution failed: {e}", exc_info=True)
            raise
