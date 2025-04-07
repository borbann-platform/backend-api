import logging
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

logger = logging.getLogger(__name__)

# Define a base directory for uploads relative to this config file's location
# Recommended: Define UPLOAD_DIR based on an environment variable or absolute path in production
_BASE_DIR = Path(__file__).resolve().parent.parent.parent # Moves up from core -> app -> backend
UPLOAD_DIR_DEFAULT = _BASE_DIR / "uploads"

class Settings(BaseSettings):
    """Application configuration settings."""

    PROJECT_NAME: str = "Borbann Backend API"
    API_V1_STR: str = "/api/v1"
    LOG_LEVEL: str = "INFO"

    # Database configuration (sensitive, use secrets management in production)
    DATABASE_URL: str = "postgresql+asyncpg://user:password@db:5432/borbann_db"

    # Celery configuration (sensitive, use secrets management in production)
    CELERY_BROKER_URL: str = "redis://redis:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://redis:6379/1" # Use different DB for results

    # Example external API key (sensitive)
    # SOME_EXTERNAL_API_KEY: str | None = None

    # File Uploads
    UPLOAD_DIR: Path = UPLOAD_DIR_DEFAULT

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore", case_sensitive=True
    )

settings = Settings()

# Ensure upload directory exists (can be done on startup as well)
try:
    settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
except OSError as e:
    logger.error(f"Could not create upload directory: {settings.UPLOAD_DIR} - {e}")