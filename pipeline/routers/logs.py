import asyncio
from fastapi import APIRouter, Request, Depends
from sse_starlette.sse import EventSourceResponse
from loguru import logger
from uuid import UUID

from dependencies import get_sse_log_queue

router = APIRouter(
    prefix="/logs",
    tags=["Logging"],
)


async def pipeline_log_stream_generator(
    request: Request, queue: asyncio.Queue, target_pipeline_id: str
):
    """Generates SSE messages from the log queue."""
    logger.info(
        f"SSE client connected for log streaming for pipeline_id: {target_pipeline_id}"
    )
    yield {
        "event": "info",
        "data": f"Streaming logs for pipeline {target_pipeline_id}...",
    }

    while True:
        try:
            if await request.is_disconnected():
                logger.info(
                    f"SSE client disconnected for pipeline_id: {target_pipeline_id}"
                )
                break

            raw_message = await queue.get()

            try:
                yield {"event": "log", "data": raw_message}
            except Exception as parse_err:
                logger.error(f"Error processing log message: {parse_err}")
                yield {"event": "error", "data": f"Error processing log: {parse_err}"}

            queue.task_done()

        except asyncio.CancelledError:
            logger.info(
                f"Log stream task cancelled for pipeline_id: {target_pipeline_id}"
            )
            break
        except Exception as e:
            logger.error(
                f"Error in SSE log generator for pipeline {target_pipeline_id}: {e}",
                exc_info=True,
            )
            try:
                yield {"event": "error", "data": f"Log streaming error: {e}"}
            except Exception as e:
                logger.error(f"Error sending error event: {e}")
            await asyncio.sleep(1)


@router.get("/stream/{pipeline_id}", summary="Stream specific pipeline logs via SSE")
async def stream_pipeline_logs(
    pipeline_id: UUID,
    request: Request,
    queue: asyncio.Queue = Depends(get_sse_log_queue),
):
    """
    Establishes an SSE connection to stream logs for a *specific pipeline run*.

    Connect to this endpoint while a pipeline is running (or shortly after)
    to see its logs.

    Events:
    - **event: info**: Connection established message.
    - **event: log**: Contains a single log entry string for the specified pipeline.
    - **event: error**: Sent if an error occurs.
    """
    pipeline_id_str = str(pipeline_id)

    event_generator = pipeline_log_stream_generator(request, queue, pipeline_id_str)
    return EventSourceResponse(event_generator)
