"""
Manages pipeline job scheduling using APScheduler.
"""

from datetime import datetime
from uuid import UUID
import asyncio

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.date import DateTrigger
from apscheduler.jobstores.memory import MemoryJobStore
from apscheduler.executors.asyncio import AsyncIOExecutor
from apscheduler.job import Job
from apscheduler.jobstores.base import JobLookupError

from config import settings

from loguru import logger

from models.pipeline import Pipeline, PipelineStatus
from services.pipeline_service import PipelineService
from .jobs import execute_pipeline_job
from .utils import UTC


class SchedulerManager:
    """Manages pipeline job scheduling using APScheduler."""

    def __init__(
        self,
        pipeline_service: PipelineService,
        check_interval_seconds: int = settings.SCHEDULER_CHECK_INTERVAL,
        max_concurrent_runs: int = settings.SCHEDULER_MAX_CONCURRENT_RUNS,
        misfire_grace_sec: int = settings.SCHEDULER_MISFIRE_GRACE_SEC,
    ):
        self.pipeline_service = pipeline_service
        self.check_interval_seconds = check_interval_seconds
        self.max_concurrent_runs = max_concurrent_runs
        self._scheduler: AsyncIOScheduler | None = None
        self._running = False
        self._discovery_job_id = "pipeline_discovery_job"
        self.misfire_grace_sec = misfire_grace_sec

        # Configure APScheduler
        jobstores = {"default": MemoryJobStore()}
        executors = {"default": AsyncIOExecutor()}
        job_defaults = {
            "coalesce": True,
            "max_instances": 1,
            "misfire_grace_time": self.misfire_grace_sec,
        }
        self._scheduler = AsyncIOScheduler(
            jobstores=jobstores,
            executors=executors,
            job_defaults=job_defaults,
            timezone=UTC,
        )
        logger.info(
            f"APScheduler configured with misfire_grace_time: {self.misfire_grace_sec}s"
        )

    async def schedule_pipeline(self, pipeline: Pipeline):
        """Adds or updates a job for a specific pipeline based on its next_run time."""
        if not self._running:
            logger.warning(
                f"Scheduler not running. Cannot schedule pipeline {pipeline.id}"
            )
            return

        if not self._scheduler:
            logger.error("Scheduler not initialized. Cannot schedule pipeline.")
            return

        job_id = str(pipeline.id)
        next_run_time = pipeline.config.next_run

        if not next_run_time:
            logger.warning(
                f"Pipeline {pipeline.id} has no next_run time. Cannot schedule."
            )
            # Ensure any existing job is removed if next_run becomes None
            await self.unschedule_pipeline(pipeline.id)
            return

        # Ensure next_run_time is timezone-aware (UTC)
        if next_run_time.tzinfo is None:
            logger.warning(
                f"Pipeline {pipeline.id} next_run time is naive. Assuming UTC."
            )
            next_run_time = UTC.localize(next_run_time)
        else:
            next_run_time = next_run_time.astimezone(UTC)

        # Check if pipeline should be scheduled (e.g., is INACTIVE)
        if pipeline.status != PipelineStatus.INACTIVE:
            logger.info(
                f"Pipeline {pipeline.id} is not INACTIVE (status: {pipeline.status}). Removing any existing schedule."
            )
            await self.unschedule_pipeline(pipeline.id)
            return

        try:
            existing_job: Job | None = self._scheduler.get_job(
                job_id, jobstore="default"
            )
            trigger = DateTrigger(run_date=next_run_time)

            if existing_job:
                # Job exists, check if trigger needs update
                if existing_job.trigger != trigger:
                    logger.info(
                        f"Rescheduling pipeline {job_id} to run at {next_run_time}"
                    )
                    self._scheduler.reschedule_job(
                        job_id, jobstore="default", trigger=trigger
                    )
                else:
                    logger.debug(
                        f"Pipeline {job_id} schedule already up-to-date for {next_run_time}."
                    )
            else:
                # Add new job
                logger.info(
                    f"Adding new schedule for pipeline {job_id} at {next_run_time}"
                )
                self._scheduler.add_job(
                    execute_pipeline_job,
                    trigger=trigger,
                    args=[pipeline.id, self.pipeline_service],  # Pass service instance
                    id=job_id,
                    name=f"Run Pipeline {pipeline.name} ({job_id})",
                    replace_existing=True,  # Important to handle race conditions
                    jobstore="default",
                )
        except Exception as e:
            logger.error(
                f"Failed to schedule/reschedule job for pipeline {job_id}: {e}",
                exc_info=True,
            )

    async def reschedule_pipeline(self, pipeline: Pipeline):
        """Alias for schedule_pipeline, as the logic is the same (add or update)."""
        await self.schedule_pipeline(pipeline)

    async def unschedule_pipeline(self, pipeline_id: UUID):
        """Removes the scheduled job for a specific pipeline."""
        if not self._running:
            logger.warning(
                f"Scheduler not running. Cannot unschedule pipeline {pipeline_id}"
            )
            return

        if not self._scheduler:
            logger.error("Scheduler not initialized. Cannot unschedule pipeline.")
            return

        job_id = str(pipeline_id)
        try:
            existing_job = self._scheduler.get_job(job_id, jobstore="default")
            if existing_job:
                self._scheduler.remove_job(job_id, jobstore="default")
                logger.info(f"Removed scheduled job for pipeline {job_id}")
            else:
                logger.debug(f"No scheduled job found to remove for pipeline {job_id}")
        except JobLookupError:
            logger.debug(
                f"Job {job_id} not found during unschedule attempt (likely already removed)."
            )
        except Exception as e:
            logger.error(
                f"Failed to remove job for pipeline {job_id}: {e}", exc_info=True
            )

    async def _discover_and_schedule_pipelines(self):
        """
        Periodically checks all pipelines and ensures scheduler state matches.
        Acts as a reconciliation loop.
        """
        if not self._running:
            return

        if not self._scheduler:
            logger.error(
                "Scheduler not initialized. Cannot perform discovery and reconciliation."
            )
            return

        logger.debug("Running periodic pipeline discovery and reconciliation...")
        try:
            pipelines = await self.pipeline_service.list_pipelines()
            scheduled_job_ids = {
                job.id
                for job in self._scheduler.get_jobs()
                if job.id != self._discovery_job_id
            }
            active_pipeline_ids = set()

            # Ensure all active/schedulable pipelines have correct jobs
            for pipeline in pipelines:
                pipeline_id_str = str(pipeline.id)
                active_pipeline_ids.add(pipeline_id_str)
                # Use the central schedule_pipeline method for consistency
                # This will handle adding, updating, or removing based on status and next_run
                await self.schedule_pipeline(pipeline)

            # Clean up jobs for pipelines that no longer exist in the store
            jobs_to_remove = scheduled_job_ids - active_pipeline_ids
            for job_id_to_remove in jobs_to_remove:
                logger.info(
                    f"Reconciliation: Removing job for deleted pipeline: {job_id_to_remove}"
                )
                await self.unschedule_pipeline(
                    UUID(job_id_to_remove)
                )  # Convert back to UUID

            logger.debug("Pipeline discovery and reconciliation finished.")

        except Exception as e:
            logger.error(
                f"Error during pipeline discovery/reconciliation: {e}", exc_info=True
            )

    def start(self):
        """Starts the scheduler and the discovery job."""
        if not self._running and self._scheduler:
            logger.info("Starting SchedulerManager...")
            self._scheduler.start()
            # Add the recurring reconciliation job
            self._scheduler.add_job(
                self._discover_and_schedule_pipelines,
                trigger="interval",
                seconds=self.check_interval_seconds,
                id=self._discovery_job_id,
                name="Reconcile Pipeline Schedules",
                replace_existing=True,
                jobstore="default",
                misfire_grace_time=None,
            )
            self._running = True
            logger.info(
                f"SchedulerManager started. Reconciliation interval: {self.check_interval_seconds}s"
            )
            # Run discovery once immediately on start
            logger.info("Performing initial pipeline schedule reconciliation...")
            asyncio.create_task(self._discover_and_schedule_pipelines())
        elif self._running:
            logger.warning("SchedulerManager is already running.")
        else:
            logger.error("Scheduler object not initialized. Cannot start.")

    def stop(self):
        """Stops the scheduler gracefully."""
        if self._running and self._scheduler:
            logger.info("Stopping SchedulerManager...")
            try:
                self._scheduler.remove_job(self._discovery_job_id, jobstore="default")
            except JobLookupError:
                logger.debug("Discovery job already removed or never added.")
            except Exception as e:
                logger.warning(f"Could not remove discovery job during shutdown: {e}")

            self._scheduler.shutdown()  # Waits for running jobs
            self._running = False
            logger.info("SchedulerManager stopped.")
        elif not self._scheduler:
            logger.error("Scheduler object not initialized. Cannot stop.")
        else:
            logger.info("SchedulerManager is not running.")

    # trigger_manual_run remains the same conceptually
    async def trigger_manual_run(self, pipeline_id: UUID):
        """Manually triggers a pipeline run immediately via the scheduler."""
        if not self._running or not self._scheduler:
            logger.error(
                "Scheduler not running or not initialized. Cannot trigger manual run."
            )
            return False

        logger.info(f"Manual run requested for pipeline {pipeline_id}")
        # Use a unique ID to allow multiple manual runs without conflicting
        job_id = f"manual_run_{pipeline_id}_{datetime.now(UTC).isoformat()}"
        try:
            pipeline = await self.pipeline_service.get_pipeline(pipeline_id)
            if not pipeline:
                logger.error(
                    f"Cannot trigger manual run: Pipeline {pipeline_id} not found."
                )
                return False
            # Ensure pipeline is not already running before adding manual job
            if pipeline.status == PipelineStatus.ACTIVE:
                logger.warning(
                    f"Cannot trigger manual run: Pipeline {pipeline_id} is already ACTIVE."
                )
                return False

            self._scheduler.add_job(
                execute_pipeline_job,
                trigger=DateTrigger(run_date=datetime.now(UTC)),  # Run ASAP
                args=[pipeline.id, self.pipeline_service],
                id=job_id,
                name=f"Manual Run Pipeline {pipeline.name} ({pipeline.id})",
                replace_existing=False,
                jobstore="default",
                misfire_grace_time=10,  # Short grace time for manual runs
            )
            logger.info(
                f"Manual run job added for pipeline {pipeline.id} with job_id {job_id}"
            )
            return True
        except Exception as e:
            logger.error(
                f"Failed to add manual run job for pipeline {pipeline_id}: {e}",
                exc_info=True,
            )
            return False
