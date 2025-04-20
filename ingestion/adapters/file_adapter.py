"""
File adapter to load data from CSV or JSON files.
"""

from typing import List, Dict, Any
import json

import pandas as pd

from .base import DataSourceAdapter


class FileAdapter(DataSourceAdapter):
    """
    Adapter for reading data from local files (CSV or JSON).
    """

    def __init__(self, path: str):
        """
        Initialize the file adapter.

        Args:
            path: Path to the input file (.csv or .json).
        """
        self.path = path

    def fetch(self) -> List[Dict[str, Any]]:
        """
        Read and parse the file, returning a list of records.

        Returns:
            List of dicts from the file contents.

        Raises:
            RuntimeError: On read or parse errors.
            ValueError: If file extension is unsupported.
        """
        p = self.path.lower()
        if p.endswith(".csv"):
            try:
                df = pd.read_csv(self.path)
                return df.to_dict(orient="records")
            except Exception as e:
                raise RuntimeError(f"Failed to read CSV '{self.path}': {e}")
        if p.endswith(".json"):
            try:
                with open(self.path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                if isinstance(data, list):
                    return data
                if isinstance(data, dict):
                    return [data]
                raise RuntimeError(
                    f"JSON file '{self.path}' does not contain a list or dict."
                )
            except Exception as e:
                raise RuntimeError(f"Failed to read JSON '{self.path}': {e}")
        raise ValueError(
            f"Unsupported file extension for '{self.path}'. "
            "Only .csv and .json are supported."
        )