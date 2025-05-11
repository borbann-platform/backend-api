from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from log.logging_utils import RUN_LOG_QUEUES
from queue import Empty
import asyncio

router = APIRouter()

@router.get("/pipelines/{pipeline_id}/runs/{run_id}/logs/stream")
async def stream_logs(request: Request, pipeline_id: str, run_id: str):
    log_queue = RUN_LOG_QUEUES.get(run_id)
    if not log_queue:
        raise HTTPException(status_code=404, detail="No logs for this run.")

    async def event_generator():
        while True:
            if await request.is_disconnected():
                break
            try:
                log_line = log_queue.get(timeout=1)
                yield f"data: {log_line}\n\n"
            except Empty:
                await asyncio.sleep(0.2)
                continue

    return StreamingResponse(event_generator(), media_type="text/event-stream")
