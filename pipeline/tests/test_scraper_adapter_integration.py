import os
import pytest
from ingestion.adapters.web_scraper_adapter import WebScraperAdapter
from models.ingestion import AdapterRecord


@pytest.mark.integration
@pytest.mark.asyncio
async def test_web_scraper_adapter_with_llm():
    """
    Integration test for WebScraperAdapter using LLM extraction on books.toscrape.com.
    Requires OPENAI_API_KEY to be set in the environment.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    assert api_key is not None, "OPENAI_API_KEY environment variable must be set."

    test_url = (
        "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html"
    )

    adapter = WebScraperAdapter(
        urls=[test_url],
        api_key=api_key,
        prompt="Extract book title, price, availability, and description.",
        llm_provider="openai/gpt-4o-mini",
        schema_file=None,
        verbose=True,
    )

    records = await adapter._fetch_async()

    assert isinstance(records, list)
    assert len(records) > 0

    for record in records:
        assert isinstance(record, AdapterRecord)
        assert "source_url" in record.data
        assert record.data["source_url"] == test_url

        print("✅ Extracted data:", record.data)
