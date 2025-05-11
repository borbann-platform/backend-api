"""
Base module defining protocols for the normalization layer.
"""

from typing import Protocol, Dict, Any


class TextExtractor(Protocol):
    """
    Protocol for text extraction strategies.
    """

    def extract(self, record: Dict[str, Any]) -> str:
        """
        Extract and return text from a flattened record.

        Args:
            record: A flattened record dict.

        Returns:
            A string containing the extracted text.
        """
        ...