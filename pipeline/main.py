from fastapi import FastAPI
from contextlib import asynccontextmanager
import platform
import asyncio
from loguru import logger

from stores.memory import InMemoryPipelineStore
from stores.base import PipelineStore
from services.pipeline_service import PipelineService
from scheduler.manager import SchedulerManager
from routers.pipelines import router as pipelines_router

# ! Window specific asyncio policy
if platform.system() == "Windows":
    logger.info("Setting WindowsProactorEventLoopPolicy for asyncio.")
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())

# --- Resource Initialization ---
pipeline_store: PipelineStore = InMemoryPipelineStore()
pipeline_service = PipelineService(store=pipeline_store)
scheduler_manager = SchedulerManager(pipeline_service=pipeline_service)

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
    title="Data Integration Pipeline API",
    description="API for managing and running data integration pipelines.",
    version="0.1.0",
    lifespan=lifespan,
)

# Include the pipelines router
app.include_router(pipelines_router)


# --- Root Endpoint (Optional) ---
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Data Integration Pipeline API"}


# --- Run with Uvicorn (Example) ---
if __name__ == "__main__":
    import uvicorn

    logger.info("Starting Uvicorn server...")
    # ! use reload=True only for development
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, loop="asyncio")
