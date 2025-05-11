"""
File adapter to load data from CSV or JSON files.
"""

from typing import List, Dict, Any
import json

import pandas as pd
from loguru import logger

from .base import DataSourceAdapter


class FileAdapter(DataSourceAdapter):
    """
    Adapter for reading data from local files (CSV or JSON), or from uploaded file-like objects.
    """

    def __init__(self, path: str = None, format: str = None, upload=None, upload_filename: str = None):
        """
        Initialize the file adapter.

        Args:
            path: Path to the input file (.csv or .json), optional if upload is provided.
            format: Optional file format (e.g., 'csv', 'json').
            upload: Optional file-like object (e.g., from upload).
            upload_filename: Optional original filename for validation/logging.
        """
        self.path = path
        self.format = format
        self.upload = upload
        self.upload_filename = upload_filename
        logger.info(f"Initialized FileAdapter for path: {path}, upload: {upload_filename}, format: {format}")

    def fetch(self) -> List[Dict[str, Any]]:
        """
        Read and parse the file, returning a list of records.
        Supports both path-based and uploaded file-like inputs.

        Returns:
            List of dicts from the file contents.

        Raises:
            RuntimeError: On read or parse errors.
            ValueError: If file extension is unsupported.
        """
        if self.upload is not None:
            # Handle uploaded file-like object
            logger.info(f"Fetching data from uploaded file: {self.upload_filename or '[no filename]'}")
            if self.format == "csv" or (self.upload_filename and self.upload_filename.lower().endswith(".csv")):
                try:
                    self.upload.seek(0)
                    df = pd.read_csv(self.upload)
                    logger.debug(f"Successfully read uploaded CSV file: {self.upload_filename}")
                    return df.to_dict(orient="records")
                except Exception as e:
                    logger.error(f"Failed to read uploaded CSV '{self.upload_filename}': {e}")
                    raise RuntimeError(f"Failed to read uploaded CSV '{self.upload_filename}': {e}")
            elif self.format == "json" or (self.upload_filename and self.upload_filename.lower().endswith(".json")):
                try:
                    self.upload.seek(0)
                    data = json.load(self.upload)
                    logger.debug(f"Successfully read uploaded JSON file: {self.upload_filename}")
                    if isinstance(data, list):
                        return data
                    if isinstance(data, dict):
                        return [data]
                    logger.error(f"Uploaded JSON file '{self.upload_filename}' does not contain a list or dict.")
                    raise RuntimeError(
                        f"Uploaded JSON file '{self.upload_filename}' does not contain a list or dict."
                    )
                except Exception as e:
                    logger.error(f"Failed to read uploaded JSON '{self.upload_filename}': {e}")
                    raise RuntimeError(f"Failed to read uploaded JSON '{self.upload_filename}': {e}")
            else:
                logger.error(f"Unsupported uploaded file extension for '{self.upload_filename}'. Only .csv and .json are supported.")
                raise ValueError(
                    f"Unsupported uploaded file extension for '{self.upload_filename}'. "
                    "Only .csv and .json are supported."
                )
        # Fallback to path-based loading
        p = (self.path or "").lower()
        logger.info(f"Attempting to fetch data from file: {self.path}")
        if p.endswith(".csv"):
            try:
                df = pd.read_csv(self.path)
                logger.debug(f"Successfully read CSV file: {self.path}")
                return df.to_dict(orient="records")
            except Exception as e:
                logger.error(f"Failed to read CSV '{self.path}': {e}")
                raise RuntimeError(f"Failed to read CSV '{self.path}': {e}")
        if p.endswith(".json"):
            try:
                with open(self.path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                logger.debug(f"Successfully read JSON file: {self.path}")
                if isinstance(data, list):
                    return data
                if isinstance(data, dict):
                    return [data]
                logger.error(f"JSON file '{self.path}' does not contain a list or dict.")
                raise RuntimeError(
                    f"JSON file '{self.path}' does not contain a list or dict."
                )
            except Exception as e:
                logger.error(f"Failed to read JSON '{self.path}': {e}")
                raise RuntimeError(f"Failed to read JSON '{self.path}': {e}")
        logger.error(f"Unsupported file extension for '{self.path}'. Only .csv and .json are supported.")
        raise ValueError(
            f"Unsupported file extension for '{self.path}'. "
            "Only .csv and .json are supported."
        )