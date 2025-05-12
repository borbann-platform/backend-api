import asyncio
from fastapi import Request, status
from fastapi.exceptions import HTTPException

from loguru import logger


async def get_pipeline_service(request: Request):
    service = request.app.state.pipeline_service
    if not service:
        raise Exception("PipelineService not initialized or available in app state.")
    return service


async def get_sse_log_queue(request: Request) -> asyncio.Queue | None:
    """Dependency to get the SSE log queue from app state."""
    queue = getattr(request.app.state, "sse_log_queue", None)
    if not queue:
        logger.error("SSE log queue not found in application state.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Log streaming service queue not available.",
        )
    return queue
