import pytest
import json
from unittest.mock import patch, AsyncMock, MagicMock, mock_open

from ingestion.adapters.web_scraper_adapter import WebScraperAdapter
from models.adapters import AdapterRecord


@pytest.mark.asyncio
async def test_fetch_with_llm_extraction():
    """
    Test fetching data using LLM extraction.
    """
    mock_result = MagicMock()
    mock_result.success = True
    mock_result.url = "http://example.com"
    mock_result.extracted_content = json.dumps({"title": "Example"})

    with patch(
        "ingestion.adapters.web_scraper_adapter.AsyncWebCrawler"
    ) as mock_crawler_cls:
        mock_crawler = AsyncMock()
        mock_crawler_cls.return_value = mock_crawler
        mock_crawler.arun_many.return_value = [mock_result]

        adapter = WebScraperAdapter(
            urls=["http://example.com"],
            api_key="fake-key",
            schema_file=None,
            prompt="Extract data",
        )

        records = await adapter._fetch_async()

        assert isinstance(records, list)
        assert isinstance(records[0], AdapterRecord)
        assert records[0].data["title"] == "Example"
        assert records[0].data["source_url"] == "http://example.com"


@pytest.mark.asyncio
async def test_fetch_with_schema_file():
    """
    Test fetching data using schema file.
    """
    schema = {"title": {"selector": "h1"}}
    mock_result = MagicMock()
    mock_result.success = True
    mock_result.url = "http://example.com"
    mock_result.extracted_content = json.dumps({"title": "Example"})

    with patch("builtins.open", mock_open(read_data=json.dumps(schema))):
        with patch(
            "ingestion.adapters.web_scraper_adapter.AsyncWebCrawler"
        ) as mock_crawler_cls:
            mock_crawler = AsyncMock()
            mock_crawler_cls.return_value = mock_crawler
            mock_crawler.arun_many.return_value = [mock_result]

            adapter = WebScraperAdapter(
                urls=["http://example.com"],
                api_key="fake-key",
                schema_file="schema.json",
            )

            records = await adapter._fetch_async()

            assert len(records) == 1
            assert records[0].data["title"] == "Example"
            assert records[0].data["source_url"] == "http://example.com"


def test_fetch_sync_calls_async():
    """
    Test that the sync fetch method calls the async fetch method.
    """
    adapter = WebScraperAdapter(
        urls=["http://example.com"], api_key="fake-key", prompt="Extract data"
    )
    with patch.object(adapter, "_fetch_async", new=AsyncMock(return_value=[])):
        result = adapter.fetch()
        assert result == []
