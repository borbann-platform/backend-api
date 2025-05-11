"""
Define the DataSourceAdapter protocol for ingestion adapters.
"""

from typing import Protocol, List, Dict, Any


class DataSourceAdapter(Protocol):
    """
    Protocol for data source adapters.
    """

    def fetch(self) -> List[Dict[str, Any]]:
        """
        Fetch data from the source.

        Returns:
            A list of records, each represented as a dict.
        """
        ...