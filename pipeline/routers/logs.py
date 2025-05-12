# routers/logs.py
import asyncio
from fastapi import APIRouter, Request, Depends
from sse_starlette.sse import EventSourceResponse
from loguru import logger

from dependencies import get_sse_log_queue

router = APIRouter(
    prefix="/logs",
    tags=["Logging"],
)


async def log_stream_generator(request: Request, queue: asyncio.Queue):
    """Generates SSE messages from the log queue."""
    logger.info("SSE client connected for log streaming.")
    while True:
        try:
            if await request.is_disconnected():
                logger.info("SSE client disconnected.")
                break

            log_message = await queue.get()
            yield {"event": "log", "data": log_message}

            queue.task_done()

        except asyncio.CancelledError:
            logger.info("Log stream task cancelled (client likely disconnected).")
            break
        except Exception as e:
            logger.error(f"Error in SSE log generator: {e}", exc_info=True)
            try:
                yield {"event": "error", "data": f"Log streaming error: {e}"}
            except Exception:  # Ignore if yield fails (client might be gone)
                pass
            await asyncio.sleep(1)  # Avoid tight loop on persistent error


@router.get("/stream", summary="Stream application logs via SSE")
async def stream_logs(
    request: Request, queue: asyncio.Queue = Depends(get_sse_log_queue)
):
    """
    Establishes a Server-Sent Events (SSE) connection to stream application logs.

    Events:
    - **event: log**: Contains a single log entry as string data.
    - **event: error**: Sent if an error occurs during streaming.
    """
    event_generator = log_stream_generator(request, queue)
    return EventSourceResponse(event_generator)
