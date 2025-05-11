from loguru import logger
from queue import Queue
from typing import Dict, Optional
import json

# Per-run log queues (thread-safe)
RUN_LOG_QUEUES: Dict[str, Queue] = {}
RUN_LOG_HANDLERS: Dict[str, int] = {}

# Structured log format
def make_log_record(level: str, message: str, pipeline_id: Optional[str], run_id: Optional[str], status: Optional[str] = None, error: Optional[str] = None, extra: Optional[dict] = None) -> dict:
    record = {
        "level": level,
        "message": message,
        "pipeline_id": pipeline_id,
        "run_id": run_id,
        "status": status,
        "error": error,
        "extra": extra or {},
    }
    return record

# Custom loguru sink for per-run logging
def log_sink(message):
    record = message.record
    run_id = record["extra"].get("run_id")
    pipeline_id = record["extra"].get("pipeline_id")
    if run_id and run_id in RUN_LOG_QUEUES:
        # Structure the log as JSON for frontend parsing
        log_entry = make_log_record(
            level=record["level"].name,
            message=record["message"],
            pipeline_id=pipeline_id,
            run_id=run_id,
            status=record["extra"].get("status"),
            error=record["extra"].get("error"),
            extra=record["extra"]
        )
        RUN_LOG_QUEUES[run_id].put(json.dumps(log_entry))

# Setup per-run logging sink
def setup_run_logging(pipeline_id: str, run_id: str):
    log_queue = Queue()
    RUN_LOG_QUEUES[run_id] = log_queue
    handler_id = logger.add(
        log_sink,
        filter=lambda record: record["extra"].get("run_id") == run_id,
        enqueue=True
    )
    RUN_LOG_HANDLERS[run_id] = handler_id
    return log_queue

# Remove per-run logging sink and clean up
def cleanup_run_logging(run_id: str):
    if run_id in RUN_LOG_HANDLERS:
        logger.remove(RUN_LOG_HANDLERS[run_id])
        del RUN_LOG_HANDLERS[run_id]
    if run_id in RUN_LOG_QUEUES:
        del RUN_LOG_QUEUES[run_id]

# Helper for logging with context
def pipeline_log(level: str, message: str, pipeline_id: str, run_id: str, status: Optional[str] = None, error: Optional[str] = None, extra: Optional[dict] = None):
    logger.log(level, message, extra={"pipeline_id": pipeline_id, "run_id": run_id, "status": status, "error": error, **(extra or {})})

# Example usage:
# setup_run_logging(pipeline_id, run_id)
# pipeline_log("INFO", "Pipeline started", pipeline_id, run_id, status="RUNNING")
# pipeline_log("ERROR", "Pipeline failed", pipeline_id, run_id, status="FAILED", error="Some error")
# cleanup_run_logging(run_id)
