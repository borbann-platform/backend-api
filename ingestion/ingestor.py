"""
Ingestor module to orchestrate data ingestion from multiple adapters.
"""

from typing import List, Dict, Any

from ingestion.adapters.api_adapter import ApiAdapter
from ingestion.adapters.file_adapter import FileAdapter
from ingestion.adapters.web_scraper_adapter import WebScraperAdapter


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
        aggregated: List[Dict[str, Any]] = []

        for src in sources:
            src_type = src.get("type")
            config = src.get("config", {})
            if src_type == "api":
                adapter = ApiAdapter(**config)
            elif src_type == "scrape":
                adapter = WebScraperAdapter(**config)
            elif src_type == "file":
                adapter = FileAdapter(**config)
            else:
                raise ValueError(f"Unknown source type: {src_type}")

            try:
                data = adapter.fetch()
                aggregated.extend(data)
            except Exception as e:
                raise RuntimeError(
                    f"Ingestion failed for source '{src_type}' with config {config}: {e}"
                )

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