"""
Ingestor module to orchestrate data ingestion from multiple adapters.
"""

from typing import List, Dict, Any

from ingestion.adapters.api_adapter import ApiAdapter
from ingestion.adapters.file_adapter import FileAdapter
from ingestion.adapters.web_scraper_adapter import WebScraperAdapter
from pydantic import BaseModel
from loguru import logger


class Ingestor:
    """
    Ingestor for aggregating data from various sources.
    """

    @staticmethod
    def run(sources: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Run ingestion for a list of sources.

        Args:
            sources: List of dicts, each with:
                - type: 'api', 'scrape', or 'file'
                - config: kwargs for the adapter constructor

        Returns:
            Flat list of all records fetched from sources.

        Raises:
            ValueError: For unknown source types.
            RuntimeError: If an adapter fails during fetch.
        """
        from log.logging_utils import pipeline_log
        aggregated: List[Dict[str, Any]] = []
        logger.info("Starting ingestion run for sources.")

        for src in sources:
            # accept Pydantic models or raw dicts
            if isinstance(src, BaseModel):
                src_item = src.dict()
            else:
                src_item = src
            src_type = src_item.get("type")
            config = src_item.get("config", {})
            # convert BaseModel config to dict if needed
            if not isinstance(config, dict) and hasattr(config, "dict"):
                config = config.dict(exclude_unset=True)
            pipeline_id = config.get("pipeline_id") or src_item.get("pipeline_id")
            run_id = config.get("run_id") or src_item.get("run_id")
            logger.info(f"Processing source type: {src_type} with config: {config}")
            if src_type == "api":
                adapter = ApiAdapter(**config)
            elif src_type == "scrape":
                adapter = WebScraperAdapter(**config)
            elif src_type == "file":
                adapter = FileAdapter(**config)
            else:
                logger.error(f"Unknown source type: {src_type}")
                pipeline_log("ERROR", f"Unknown source type: {src_type}", pipeline_id, run_id, status="FAILED")
                raise ValueError(f"Unknown source type: {src_type}")

            try:
                logger.info(f"Fetching records using {src_type} adapter.")
                records = adapter.fetch()
                logger.info(f"Fetched {len(records)} records from {src_type} source.")
                aggregated.extend(records)
                pipeline_log("SUCCESS", f"Fetched {len(records)} records.", pipeline_id, run_id, status="COMPLETED")
            except Exception as e:
                logger.error(f"Fetch failed for source {src_type}: {e}")
                pipeline_log("ERROR", f"Fetch failed: {e}", pipeline_id, run_id, status="FAILED")
                raise RuntimeError(f"Fetch failed for source {src_type}: {e}")

        logger.info(f"Ingestion run completed. Total records aggregated: {len(aggregated)}")
        return aggregated


if __name__ == "__main__":
    # Example usage of the Ingestor.
    example_sources = [
        {
            "type": "api",
            "config": {
                "url": "https://dummyjson.com/products",
                "headers": {"Accept": "application/json"},
            },
        },
        {
            "type": "file",
            "config": {"path": "data/sample.json"},
        },
        {
            "type": "scrape",
            "config": {
                "urls": ["https://www.hipflat.co.th/en"],
                "schema_file": None,
                "prompt": "Extract all listings",
                "llm_provider": "gemini/gemini-2.0-flash",
                "api_key": "AIzaSyAGnER5on8a0bVXU7quXFMnNyOvCiC_ees",
                "output_format": "json",
                "verbose": False,
                "cache_mode": "ENABLED",
            },
        },
    ]

    records = Ingestor.run(example_sources)
    print(f"Total records ingested: {len(records)}")
    for record in records:
        print(record)