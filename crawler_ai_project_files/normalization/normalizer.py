"""
Normalizer module to transform raw records into a canonical schema.
"""

from typing import List, Dict, Any, Optional

from .base import TextExtractor
from .utils import flatten_dict, generate_id, extract_all_text


class _DefaultTextExtractor:
    """
    Default text extractor using the extract_all_text utility.
    """

    def extract(self, record: Dict[str, Any]) -> str:
        """
        Extract text from the record.

        Args:
            record: A flattened record dict.

        Returns:
            A string containing concatenated text values.
        """
        return extract_all_text(record)


class Normalizer:
    """
    Class to normalize raw records into a canonical format.
    """

    def __init__(self, extractor: Optional[TextExtractor] = None):
        """
        Initialize the Normalizer.

        Args:
            extractor: Optional custom TextExtractor strategy.
        """
        self.extractor: TextExtractor = extractor or _DefaultTextExtractor()

    def normalize(
        self,
        records: List[Dict[str, Any]],
        source_type: str,
        source: str
    ) -> List[Dict[str, Any]]:
        """
        Normalize a list of raw records.

        Args:
            records: Raw records to normalize.
            source_type: Type of the source ('api', 'scrape', 'file').
            source: Original source identifier (URL or path).

        Returns:
            A list of canonical records matching the schema.
        """
        normalized: List[Dict[str, Any]] = []

        for raw in records:
            flat = flatten_dict(raw)
            text = self.extractor.extract(flat)
            rec_id = generate_id(source, flat)
            metadata = {k: v for k, v in flat.items() if not isinstance(v, str)}

            canonical = {
                "id": rec_id,
                "source_type": source_type,
                "source": source,
                "raw": raw,
                "metadata": metadata,
                "text": text,
            }
            normalized.append(canonical)

        return normalized


if __name__ == "__main__":
    # Example usage
    sample = [{"title": "Hello", "details": {"body": "World", "count": 5}}]
    norm = Normalizer()
    records = norm.normalize(sample, source_type="api", source="https://example.com")
    print(records)