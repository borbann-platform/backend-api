from pydantic_settings import BaseSettings
from pathlib import Path

# Define a base directory for uploads, ensure it exists
UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


class Settings(BaseSettings):
    PROJECT_NAME: str = "Data Integration Pipeline API"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = "postgresql+asyncpg://user:password@db/data_pipeline_db"
    CELERY_BROKER_URL: str = "redis://redis:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://redis:6379/0"

    OPENAI_API_KEY: str = "your_openai_key_here"  # Replace in .env or secrets manager
    NEWS_API_KEY: str | None = None  # Replace if using Bing etc.

    # Example Thai RSS feeds - load from config file or DB ideally
    NEWS_SOURCES_RSS: list[str] = [
        "https://www.bangkokpost.com/rss/data/most-recent.xml",
        "https://www.nationthailand.com/rss/feed.xml",
    ]

    UPLOAD_DIR: Path = UPLOAD_DIR  # Make upload dir accessible via settings

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"


settings = Settings()
