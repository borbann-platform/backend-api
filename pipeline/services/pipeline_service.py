from datetime import datetime, timezone
from uuid import UUID, uuid4
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


class PipelineService:
    def __init__(self, store: PipelineStore):
        self.store = store
        logger.info(f"PipelineService initialized with store: {type(store).__name__}")

    async def create_pipeline(
        self,
        name: str,
        description: str,
        ingestor_config: IngestorInput,
        run_frequency: RunFrequency,
    ) -> Pipeline:
        """Create a new pipeline using the store"""
        logger.info(
            f"Creating pipeline: name={name}, description={description}, ingestor_config=..., run_frequency={run_frequency}"
        )
        try:
            pipeline_id = uuid4()
            now = datetime.now(timezone.utc)
            pipeline = Pipeline(
                id=pipeline_id,
                name=name,
                description=description,
                config=PipelineConfig(
                    ingestor_config=ingestor_config,
                    run_frequency=run_frequency,
                    # will be set by scheduler
                    last_run=None,
                    next_run=None,
                ),
                status=PipelineStatus.INACTIVE,
                created_at=now,
                updated_at=now,
            )
            await self.store.save(pipeline)
            logger.info(f"Pipeline created and saved: id={pipeline.id}")
            return pipeline
        except Exception as e:
            logger.error(f"Failed to create pipeline: {e}")
            raise e

    async def update_pipeline(
        self, pipeline_id: UUID, pipeline_in: PipelineCreate
    ) -> Pipeline | None:
        """Update an existing pipeline using the store"""
        logger.info(f"Updating pipeline: id={pipeline_id}, update_data=...")
        existing_pipeline = await self.store.get(pipeline_id)
        if not existing_pipeline:
            logger.warning(f"Pipeline not found for update: id={pipeline_id}")
            return None

        try:
            # TODO: review code here
            # Create an updated pipeline object based on existing one and input
            # Be careful about mutable defaults if not using Pydantic properly
            update_data = pipeline_in.model_dump(
                exclude_unset=True
            )  # Get only provided fields

            # Merge update_data into a dict representation of the existing pipeline
            # Note: This simplistic merge might need refinement based on how partial updates should behave,
            # especially for nested structures like 'config'. Pydantic's model_update might be useful here if applicable.
            updated_pipeline_data = existing_pipeline.model_dump()

            if "name" in update_data:
                updated_pipeline_data["name"] = update_data["name"]
            if "description" in update_data:
                updated_pipeline_data["description"] = update_data["description"]

            # Merge config - replace the whole config if provided in input
            if "config" in update_data:
                # Ensure the input config is a PipelineConfig object before assignment
                if pipeline_in.config:
                    updated_pipeline_data["config"] = pipeline_in.config.model_dump()
                else:
                    # Handle cases where config might be passed differently if needed
                    logger.error("Invalid config format for update")
                    raise ValueError("Invalid config format for update")

            # Re-validate the merged data into a Pipeline object
            # Preserve original ID and created_at
            updated_pipeline = Pipeline.model_validate(updated_pipeline_data)
            # updated_at is handled by the store's save method

            await self.store.save(updated_pipeline)  # Save the updated object
            logger.info(f"Pipeline updated: id={updated_pipeline.id}")
            return updated_pipeline
        except Exception as e:
            logger.error(f"Failed to update pipeline id={pipeline_id}: {e}")
            raise e

    async def delete_pipeline(self, pipeline_id: UUID) -> bool:
        """Delete an existing pipeline using the store"""
        logger.info(f"Deleting pipeline: id={pipeline_id}")
        deleted = await self.store.delete(pipeline_id)
        if not deleted:
            logger.warning(f"Pipeline not found for deletion: id={pipeline_id}")
        return deleted

    async def get_pipeline(self, pipeline_id: UUID) -> Pipeline | None:
        """Get a single pipeline by ID"""
        logger.info(f"Getting pipeline: id={pipeline_id}")
        return await self.store.get(pipeline_id)

    async def list_pipelines(self) -> list[Pipeline]:
        """Get all pipelines"""
        logger.info("Listing all pipelines")
        return await self.store.get_all()

    async def run_pipeline(self, pipeline_id: UUID) -> None:
        """Run an existing pipeline"""
        pipeline = await self.store.get(pipeline_id)
        if not pipeline:
            logger.error(f"Cannot run pipeline: Pipeline not found (id={pipeline_id})")
            return
        if pipeline.status == PipelineStatus.ACTIVE:
            logger.warning(
                f"Pipeline id={pipeline_id} is already active/running (status={pipeline.status}). Skipping run."
            )
            return

        logger.info(
            f"Attempting to run pipeline: id={pipeline_id}, name='{pipeline.name}'"
        )

        try:
            # 2. Update status to ACTIVE (optional, depends on desired state mgmt)
            # pipeline.status = PipelineStatus.ACTIVE
            # pipeline.config.last_run = datetime.now(timezone.utc) # Mark start time
            # await self.store.save(pipeline)

            # 3. Execute the actual pipeline logic (ingestion, processing, etc.)
            # This part depends heavily on your pipeline runner implementation
            # It would use pipeline.config.ingestor_config, etc.
            logger.info(f"Executing pipeline logic for id={pipeline_id}...")
            # ...
            # result = await actual_pipeline_runner(pipeline.config)
            # ...
            logger.info(f"Pipeline logic finished for id={pipeline_id}.")

            # 4. Update status (e.g., back to INACTIVE) and run times on completion
            # Fetch the latest state in case it changed during run
            current_pipeline_state = await self.store.get(pipeline_id)
            if current_pipeline_state:
                current_pipeline_state.status = (
                    PipelineStatus.INACTIVE
                )  # Or COMPLETED if you have that state
                current_pipeline_state.config.last_run = datetime.now(
                    timezone.utc
                )  # Mark end time
                # TODO: Calculate next_run based on current_pipeline_state.config.run_frequency
                # current_pipeline_state.config.next_run = calculate_next_run(...)
                await self.store.save(current_pipeline_state)
                logger.info(
                    f"Pipeline run finished and state updated for id={pipeline_id}"
                )
            else:
                logger.warning(
                    f"Pipeline id={pipeline_id} disappeared during run. Cannot update final state."
                )

        except Exception as e:
            logger.error(f"Failed during pipeline run id={pipeline_id}: {e}")
            # Optionally update status to FAILED
            current_pipeline_state = await self.store.get(pipeline_id)
            if current_pipeline_state:
                # current_pipeline_state.status = PipelineStatus.FAILED # Add a FAILED state if desired
                await self.store.save(current_pipeline_state)
            # Handle/log the error appropriately
            # raise # Optionally re-raise
