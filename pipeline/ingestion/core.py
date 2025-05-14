from ingestion.ingestors import (
    IngestionMethod,
    SimpleIngestionStrategy,
    MLIngestionStrategy,
)
from models.ingestion import IngestSourceConfig, OutputData


class Ingestor:
    """
    Ingestor for aggregating data using different strategies.

    Args:
        sources (list[IngestSourceConfig]): List of sources to ingest.
        strategy (str, optional): Strategy to use for ingestion [simple, ml]. Defaults to "simple".
    """

    @staticmethod
    async def run(
        sources: list[IngestSourceConfig], strategy: str = "simple"
    ) -> OutputData:
        strategies: dict[str, IngestionMethod] = {
            "simple": SimpleIngestionStrategy(),
            "ml": MLIngestionStrategy(),
        }

        if strategy not in strategies:
            raise ValueError(f"Unsupported strategy: {strategy}")

        return await strategies[strategy].run(sources)
