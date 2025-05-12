import asyncio
import sys
from enum import Enum
from pydantic_settings import BaseSettings, SettingsConfigDict
from loguru import logger


class StoreType(str, Enum):
    """Supported pipeline data store types."""

    MEMORY = "MEMORY"


class AppSettings(BaseSettings):
    """
    Central configuration settings for the application.
    Loads values from environment variables or a .env file.
    """

    # Application settings
    APP_NAME: str = "PipelineRunnerApp"
    LOG_LEVEL: str = "DEBUG"  # Logging level (e.g., DEBUG, INFO, WARNING)
    LOG_ENABLE_SSE: bool = True  # Flag to enable/disable SSE log streaming sink

    # Store configuration
    STORE_TYPE: StoreType = StoreType.MEMORY

    # Scheduler configuration
    SCHEDULER_CHECK_INTERVAL: int = 60  # Seconds between pipeline discovery checks
    SCHEDULER_MAX_CONCURRENT_RUNS: int = 5  # Max concurrent pipeline runs via scheduler
    SCHEDULER_MISFIRE_GRACE_SEC: int = 300  # Grace time for missed jobs (seconds)

    # Ingestion Defaults
    DEFAULT_API_TIMEOUT: int = 30
    DEFAULT_SCRAPER_LLM_PROVIDER: str = "openai/gpt-4o-mini"
    DEFAULT_SCRAPER_CACHE_MODE: str = "ENABLED"
    DEFAULT_SCRAPER_PROMPT: str = (
        "Extract all data from the page in as much detailed as possible"
    )

    # SSE Configuration
    SSE_LOG_QUEUE_MAX_SIZE: int = 1000  # Max size for the SSE log queue

    # Pydantic settings configuration
    model_config = SettingsConfigDict(
        env_file=".env",  # Load .env file if it exists
        case_sensitive=False,  # Environment variables are case-insensitive
        extra="ignore",  # Ignore extra fields from environment
    )


settings = AppSettings()

# --- Basic Loguru Configuration ---
logger.remove()
logger.add(
    sys.stderr,
    level=settings.LOG_LEVEL.upper(),
    # format="{time:YYYY-MM-DD HH:mm:ss.SSS} | {level: <8} | {name}:{function}:{line} - {message}",
    colorize=True,
)

# File Sink
logger.add(
    "logs/app_{time}.log",
    level=settings.LOG_LEVEL.upper(),
    rotation="10 MB",  # Rotate log file when it reaches 10 MB
    retention="7 days",  # Keep logs for 7 days
    compression="zip",  # Compress rotated files
    format="{time:YYYY-MM-DD HH:mm:ss.SSS} | {level: <8} | {name}:{function}:{line} - {message}",
)

logger.info("Logger configured with level: {}", settings.LOG_LEVEL)
logger.info(
    "Application settings loaded. Store type: {}, SSE Logging: {}",
    settings.STORE_TYPE,
    "Enabled" if settings.LOG_ENABLE_SSE else "Disabled",
)

# --------- SSE Log Queue ---------

sse_log_queue = None


def set_sse_log_queue(queue):
    """Sets the global SSE log queue instance."""
    global sse_log_queue
    sse_log_queue = queue
    if settings.LOG_ENABLE_SSE and queue:
        logger.info("SSE Log Queue set and SSE sink enabled.")
        logger.add(
            sse_log_sink,
            level=settings.LOG_LEVEL.upper(),
            format="{message}",
            enqueue=True,
        )
    elif settings.LOG_ENABLE_SSE and not queue:
        logger.warning("SSE Log Queue is None, cannot enable SSE sink.")
    else:
        logger.info("SSE Logging is disabled by configuration.")


def sse_log_sink(message):
    """Loguru sink function to put messages onto the SSE queue."""
    if sse_log_queue:
        try:
            record = message.record
            log_entry = f"{record['time']:YYYY-MM-DD HH:mm:ss.SSS} | {record['level']: <8} | {record['name']}:{record['function']}:{record['line']} - {record['message']}"
            sse_log_queue.put_nowait(log_entry)
        except asyncio.QueueFull:
            print("Warning: SSE log queue is full. Dropping message.", file=sys.stderr)
        except Exception as e:
            print(f"Error in SSE log sink: {e}", file=sys.stderr)
