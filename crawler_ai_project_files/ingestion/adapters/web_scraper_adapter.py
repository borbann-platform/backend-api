"""
Web scraper adapter using crawl4ai to extract structured data.
"""

import asyncio
import json
from typing import List, Dict, Any, Optional

from crawl4ai import (
    AsyncWebCrawler,
    BrowserConfig,
    CrawlerRunConfig,
    CacheMode,
    LLMConfig,
    CrawlResult,
)
from crawl4ai.extraction_strategy import (
    JsonCssExtractionStrategy,
    LLMExtractionStrategy,
    ExtractionStrategy,
)

from .base import DataSourceAdapter
from loguru import logger


class WebScraperAdapter(DataSourceAdapter):
    """
    Adapter for web scraping using crawl4ai.
    """

    def __init__(
        self,
        urls: List[str],
        schema_file: Optional[str] = None,
        prompt: Optional[str] = None,
        llm_provider: str = "openai/gpt-4",
        api_key: Optional[str] = None,
        output_format: str = "json",
        verbose: bool = False,
        cache_mode: str = "ENABLED",
    ):
        """
        Initialize the scraper adapter.

        Args:
            urls: List of URLs to scrape.
            schema_file: Path to a JSON file with CSS extraction schema.
            prompt: Prompt for LLM-based extraction.
            llm_provider: LLM provider identifier.
            api_key: API key for the LLM provider.
            output_format: Desired format for the extracted data.
            verbose: Enable verbose logging.
            cache_mode: Crawl cache mode (e.g., 'ENABLED').
        """
        self.urls = urls
        self.schema_file = schema_file
        self.prompt = prompt
        self.llm_provider = llm_provider
        self.api_key = api_key
        self.output_format = output_format
        self.verbose = verbose
        self.cache_mode = cache_mode
        logger.info(f"Initialized WebScraperAdapter for URLs: {urls}")

    def fetch(self) -> List[Dict[str, Any]]:
        """
        Synchronously fetch data by running the async crawler.

        Returns:
            List of extracted records.

        Raises:
            RuntimeError: On failure during crawling or extraction.
        """
        logger.info("Starting synchronous fetch for web scraping.")
        try:
            return asyncio.run(self._fetch_async())
        except Exception as e:
            logger.error(f"Web scraping failed: {e}")
            raise RuntimeError(f"Web scraping failed: {e}")

    async def _fetch_async(self) -> List[Dict[str, Any]]:
        """
        Internal async method to perform crawling and extraction.
        """
        logger.info("Starting async web scraping fetch.")
        # Initialize crawler
        browser_cfg = BrowserConfig(headless=True, verbose=self.verbose)
        crawler = AsyncWebCrawler(config=browser_cfg)
        await crawler.start()

        # Prepare extraction strategy
        llm_cfg = LLMConfig(provider=self.llm_provider, api_token=self.api_key)
        extraction_strategy: Optional[ExtractionStrategy] = None

        if self.schema_file:
            try:
                with open(self.schema_file, "r", encoding="utf-8") as f:
                    schema = json.load(f)
                extraction_strategy = JsonCssExtractionStrategy(
                    schema=schema, verbose=self.verbose
                )
                logger.debug(f"Loaded schema file: {self.schema_file}")
            except Exception as e:
                logger.error(f"Failed to load schema file '{self.schema_file}': {e}")
                await crawler.close()
                raise RuntimeError(
                    f"Failed to load schema file '{self.schema_file}': {e}"
                )
        elif self.prompt:
            extraction_strategy = LLMExtractionStrategy(
                llm_config=llm_cfg,
                instruction=self.prompt,
                extraction_type="schema",
                apply_chunking=True,
                verbose=self.verbose,
            )
            logger.debug("Using LLM extraction strategy.")
        else:
            logger.error("Either 'schema_file' or 'prompt' must be provided.")
            await crawler.close()
            raise ValueError("Either 'schema_file' or 'prompt' must be provided.")

        # Configure cache mode
        try:
            cache_enum = getattr(CacheMode, self.cache_mode.upper())
        except AttributeError:
            logger.warning(f"Invalid cache mode '{self.cache_mode}', defaulting to ENABLED.")
            cache_enum = CacheMode.ENABLED

        run_cfg = CrawlerRunConfig(
            cache_mode=cache_enum,
            extraction_strategy=extraction_strategy,
            verbose=self.verbose,
        )

        # Execute crawl
        try:
            logger.info(f"Crawling URLs: {self.urls}")
            results: List[CrawlResult] = await crawler.arun_many(
                urls=self.urls, config=run_cfg
            )
            logger.debug(f"Crawling completed. Results: {results}")
        finally:
            await crawler.close()

        # Process crawl results
        records: List[Dict[str, Any]] = []
        for res in results:
            if not res.success or not res.extracted_content:
                logger.warning(f"Skipping failed or empty result for URL: {getattr(res, 'url', None)}")
                continue
            try:
                content = json.loads(res.extracted_content)
                logger.debug(f"Parsed extracted content for URL: {res.url}")
            except Exception:
                logger.error(f"Failed to parse extracted content for URL: {res.url}")
                continue
            if content is None:
                logger.warning(f"Extracted content is None for URL: {res.url}")
                continue
            if isinstance(content, list):
                for item in content:
                    if isinstance(item, dict):
                        item["source_url"] = res.url
                records.extend(content)
            elif isinstance(content, dict):
                content["source_url"] = res.url
                records.append(content)
            else:
                logger.warning(f"Extracted content for URL {res.url} is not a list or dict: {type(content)}")

        logger.info(f"Web scraping completed. Extracted {len(records)} records.")
        return records