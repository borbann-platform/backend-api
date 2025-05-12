from .base import IngestionMethod
from models.ingestion import IngestSourceConfig, OutputData


class MLIngestionStrategy(IngestionMethod):
    def run(self, sources: list[IngestSourceConfig]) -> OutputData:
        # TODO: Add ML-based logic (e.g., deduplication, entity linking, classification)
        return OutputData(
            records=[],  # Placeholder
            unified=True,
            metadata={"message": "ML strategy not implemented yet"},
        )
