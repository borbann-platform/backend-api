"""
File adapter to load data from CSV or JSON files.
"""

import pandas as pd
from loguru import logger
from fastapi import UploadFile

from .base import DataSourceAdapter
from models.ingestion import AdapterRecord


class FileAdapter(DataSourceAdapter):
    """
    Adapter for reading data from local files (CSV or JSON), or from uploaded file-like objects.
    """

    def __init__(
        self,
        upload: UploadFile,
    ):
        """
        Initialize the file adapter.

        Args:
            upload: File uploaded from user.
        """
        self.upload = upload
        logger.info(
            f"Initialized FileAdapter for upload: {upload.filename}, format: {upload.content_type}"
        )

    def fetch(self) -> list[AdapterRecord]:
        """
        Read and parse the file, returning a list of records.
        Supports both path-based and uploaded file-like inputs.

        Returns:
            List of AdapterRecord objects.
        """
        records: list[AdapterRecord] = []

        if not self.upload.filename:
            raise ValueError("File name is required")

        filetype = self.upload.filename.split(".")[-1].lower()

        if filetype == "csv":
            df = pd.read_csv(self.upload.file)
        elif filetype == "json":
            df = pd.read_json(self.upload.file)
        else:
            raise ValueError(f"Unsupported file type: {filetype}")

        for _, row in df.iterrows():
            record_data = row.to_dict()
            record = AdapterRecord(source=self.upload.filename, data=record_data)
            records.append(record)

        return records
