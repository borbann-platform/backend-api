from abc import ABC, abstractmethod
from models.ingestion import IngestSourceConfig, OutputData


class IngestionMethod(ABC):
    @abstractmethod
    async def run(self, sources: list[IngestSourceConfig]) -> OutputData:
        pass
