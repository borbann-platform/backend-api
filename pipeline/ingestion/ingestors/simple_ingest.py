from config import settings

from ingestion.adapters.api_adapter import ApiAdapter
from ingestion.adapters.file_adapter import FileAdapter
from ingestion.adapters.web_scraper_adapter import WebScraperAdapter
from .base import IngestionMethod
from models.ingestion import (
    AdapterRecord,
    IngestSourceConfig,
    SourceType,
    ApiConfig,
    FileConfig,
    ScrapeConfig,
    OutputData,
)
from loguru import logger


class SimpleIngestionStrategy(IngestionMethod):
    def run(self, sources: list[IngestSourceConfig]) -> OutputData:
        results: list[AdapterRecord] = []

        for source in sources:
            try:
                match source.type:
                    case SourceType.API:
                        config = source.config
                        assert isinstance(config, ApiConfig)
                        adapter = ApiAdapter(
                            url=config.url,
                            headers=config.headers,
                            timeout=config.timeout or settings.DEFAULT_API_TIMEOUT,
                            token=config.token,
                        )
                        records = adapter.fetch()

                    case SourceType.FILE:
                        config = source.config
                        assert isinstance(config, FileConfig)
                        adapter = FileAdapter(upload=config.upload)
                        records = adapter.fetch()

                    case SourceType.SCRAPE:
                        config = source.config
                        assert isinstance(config, ScrapeConfig)
                        adapter = WebScraperAdapter(
                            urls=config.urls,
                            api_key=config.api_key,
                            schema_file=config.schema_file,
                            prompt=config.prompt or settings.DEFAULT_SCRAPER_PROMPT,
                            llm_provider=config.llm_provider
                            or settings.DEFAULT_SCRAPER_LLM_PROVIDER,
                            output_format=config.output_format or "json",
                            verbose=config.verbose or False,
                            cache_mode=config.cache_mode
                            or settings.DEFAULT_SCRAPER_CACHE_MODE,
                        )
                        records = adapter.fetch()

                results.extend(records)

            except ValueError as ve:
                logger.error(f"Configuration error for source {source.type}: {ve}")
            except Exception as e:
                logger.error(
                    f"Failed to ingest from source {source.type}: {e}", exc_info=True
                )

        return OutputData(
            records=results,
            unified=False,
            metadata={"source_count": len(sources), "record_count": len(results)},
        )
