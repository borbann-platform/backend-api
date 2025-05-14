"""
Define the DataSourceAdapter protocol for ingestion adapters.
"""

from typing import Protocol
from models.ingestion import AdapterRecord


class DataSourceAdapter(Protocol):
    """
    Protocol for data source adapters.
    """

    async def fetch(self) -> list[AdapterRecord]:
        """
        Fetch data from the source.

        Returns:
            A list of records, each represented as a dict.
        """
        ...
