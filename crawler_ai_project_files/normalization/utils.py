"""
Utility functions for the normalization layer.
"""

import json
import uuid
from typing import Dict, Any


def flatten_dict(
    d: Dict[str, Any],
    parent_key: str = "",
    sep: str = "."
) -> Dict[str, Any]:
    """
    Recursively flatten a nested dictionary.

    Args:
        d: The dictionary to flatten.
        parent_key: The base key string for recursion.
        sep: Separator between keys.

    Returns:
        A flattened dictionary with compound keys.
    """
    items: Dict[str, Any] = {}
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten_dict(v, new_key, sep=sep))
        else:
            items[new_key] = v
    return items


def generate_id(source: str, record: Dict[str, Any]) -> str:
    """
    Generate a stable UUID based on source and record content.

    Args:
        source: Identifier for the data source (URL or file path).
        record: The flattened record dict.

    Returns:
        A string representation of a UUID.
    """
    record_json = json.dumps(record, sort_keys=True)
    namespace = uuid.NAMESPACE_URL
    uid = uuid.uuid5(namespace, f"{source}-{record_json}")
    return str(uid)


def extract_all_text(record: Dict[str, Any]) -> str:
    """
    Extract all string values from the record and concatenate them.

    Args:
        record: A flattened record dict.

    Returns:
        A single string containing all text values separated by spaces.
    """
    texts = [v for v in record.values() if isinstance(v, str)]
    return " ".join(texts)