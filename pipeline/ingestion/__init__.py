from .core import Ingestor
from .ingestors import IngestionMethod, SimpleIngestionStrategy, MLIngestionStrategy
from .adapters.api_adapter import ApiAdapter
from .adapters.file_adapter import FileAdapter
from .adapters.web_scraper_adapter import WebScraperAdapter

__all__ = [
    "Ingestor",
    "ApiAdapter",
    "FileAdapter",
    "WebScraperAdapter",
    "IngestionMethod",
    "SimpleIngestionStrategy",
    "MLIngestionStrategy",
]
