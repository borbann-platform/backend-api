import sys
import platform
import asyncio

from fastapi import FastAPI
from contextlib import asynccontextmanager
from loguru import logger

from config import settings, set_sse_log_queue

from stores.memory import InMemoryPipelineStore
from stores.base import PipelineStore
from services.pipeline_service import PipelineService
from scheduler.manager import SchedulerManager
from routers.pipelines import router as pipelines_router
from routers.logs import router as logs_router

sse_queue = asyncio.Queue(maxsize=settings.SSE_LOG_QUEUE_MAX_SIZE)

# ! Window specific asyncio policy
if platform.system() == "Windows" or sys.platform == "win32":
    logger.info("Setting WindowsSelectorEventLoopPolicy for asyncio.")
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())


# --- Resource Initialization ---
pipeline_store: PipelineStore = InMemoryPipelineStore()
pipeline_service = PipelineService(store=pipeline_store)
scheduler_manager = SchedulerManager(
    pipeline_service=pipeline_service,
    check_interval_seconds=settings.SCHEDULER_CHECK_INTERVAL,
    max_concurrent_runs=settings.SCHEDULER_MAX_CONCURRENT_RUNS,
    misfire_grace_sec=settings.SCHEDULER_MISFIRE_GRACE_SEC,
)
# to avoid circular import
pipeline_service.set_scheduler_manager(scheduler_manager)


# --- Lifespan Management (for startup/shutdown) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application startup...")
    # Store instances in app state for dependency injection
    app.state.pipeline_store = pipeline_store
    app.state.scheduler_manager = scheduler_manager
    app.state.pipeline_service = pipeline_service
    app.state.sse_log_queue = sse_queue

    # Configure Loguru SSE Sink (needs the queue instance)
    set_sse_log_queue(sse_queue)

    # Initialize and start the scheduler
    logger.info("Initializing and starting SchedulerManager...")
    scheduler_manager.start()
    logger.info("SchedulerManager started.")

    yield

    # --- Shutdown ---
    logger.info("Application shutdown...")
    logger.info("Shutting down SchedulerManager...")
    scheduler_manager.stop()
    logger.info("SchedulerManager stopped.")
    logger.info("Cleanup complete.")


# --- FastAPI App ---
app = FastAPI(
    title=settings.APP_NAME,
    description="API for managing and running data integration pipelines.",
    version="0.1.0",
    lifespan=lifespan,
)

# Include the pipelines router
app.include_router(pipelines_router)
app.include_router(logs_router)


# --- Root Endpoint (Optional) ---
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Data Integration Pipeline API"}


# --- Run with Uvicorn (Example) ---
if __name__ == "__main__":
    import uvicorn

    if platform.system() == "Windows":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    import asyncio

    # asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())

    logger.info("Starting Uvicorn server...")
    # ! use reload=True only for development
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
