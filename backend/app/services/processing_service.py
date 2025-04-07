from datetime import datetime
import logging
from typing import Any, Dict, List, Optional
import pandas as pd
import asyncio
import random
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, models, schemas  # Import necessary types

logger = logging.getLogger(__name__)


class ProcessingError(Exception):
    """Custom exception for processing errors."""

    pass


class ProcessingService:
    """Service layer for handling data processing logic within a pipeline run."""

    def __init__(self, db_session: Optional[AsyncSession] = None):
        # Allow injecting session for testing or specific use cases,
        # but typically services might not interact directly with db session.
        # They usually call CRUD functions.
        pass

    async def process_pipeline_results(
        self, raw_results: List[List[Dict] | Dict | Exception], pipeline_config: Dict[str, Any]
    ) -> pd.DataFrame:
        """
        DUMMY: Orchestrates the processing of raw results from source tasks.

        Args:
            raw_results: A list containing results (dicts or lists of dicts)
                         or Exceptions from individual source tasks.
            pipeline_config: Configuration for the pipeline affecting processing.

        Returns:
            A processed Pandas DataFrame.

        Raises:
            ProcessingError: If a critical processing step fails.
        """
        logger.info("DUMMY Service: Starting process_pipeline_results simulation")

        # 1. Aggregate valid data (handle errors from tasks)
        valid_data = []
        errors_encountered = 0
        for i, result in enumerate(raw_results):
            if isinstance(result, Exception):
                errors_encountered += 1
                logger.warning(f"Task {i} resulted in error: {result}")
                # Decide if errors should halt processing or just be logged
            elif isinstance(result, list):
                valid_data.extend(result)
            elif isinstance(result, dict) and 'error' not in result:
                valid_data.append(result)
            # Ignore 'error' dicts or None results silently for this dummy example

        if not valid_data and errors_encountered > 0:
            raise ProcessingError("No valid data received, only errors from source tasks.")
        if not valid_data:
            logger.warning("No valid data found to process.")
            return pd.DataFrame()  # Return empty DataFrame

        logger.info(f"Aggregated {len(valid_data)} raw records. Encountered {errors_encountered} errors.")

        # 2. Convert to DataFrame (simulate potential error)
        try:
            df = pd.DataFrame(valid_data).fillna("<dummy_missing>")  # Handle potential missing keys
            logger.info(f"Created initial DataFrame with shape: {df.shape}")
        except Exception as e:
            logger.error(f"Error creating DataFrame: {e}", exc_info=True)
            raise ProcessingError("Failed to create DataFrame from aggregated results.") from e

        # 3. Simulate Processing Steps (using dummy functions)
        await asyncio.sleep(random.uniform(0.01, 0.05))  # Simulate time
        df = self._dummy_normalize(df, pipeline_config)
        await asyncio.sleep(random.uniform(0.01, 0.05))
        df = self._dummy_deduplicate(df, pipeline_config)
        await asyncio.sleep(random.uniform(0.01, 0.05))
        df = self._dummy_transform(df, pipeline_config)

        logger.info(f"DUMMY Service: Finished processing. Final DataFrame shape: {df.shape}")
        return df

    def _dummy_normalize(self, df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
        """DUMMY: Simulate schema normalization."""
        logger.debug(f"Simulating schema normalization on shape {df.shape}")
        # Rename 'api_field' if it exists
        if 'api_field' in df.columns:
            df = df.rename(columns={'api_field': 'normalized_field'})
        return df.copy()

    def _dummy_deduplicate(self, df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
        """DUMMY: Simulate deduplication."""
        logger.debug(f"Simulating deduplication on shape {df.shape}")
        if df.empty:
            return df
        # Deduplicate based on a dummy 'source_url' or 'url' if present
        key = 'source_url' if 'source_url' in df.columns else ('url' if 'url' in df.columns else None)
        if key:
            initial_count = len(df)
            df_dedup = df.drop_duplicates(subset=[key], keep='first')
            logger.debug(f"Dropped {initial_count - len(df_dedup)} duplicates based on '{key}'")
            return df_dedup
        return df.drop_duplicates(keep='first')  # Fallback

    def _dummy_transform(self, df: pd.DataFrame, config: Dict[str, Any]) -> pd.DataFrame:
        """DUMMY: Simulate data transformation."""
        logger.debug(f"Simulating transformations on shape {df.shape}")
        # Add a dummy derived column if possible
        if 'value' in df.columns:
            # Ensure 'value' is numeric, coercing errors to NaN, then fillna
            df['value'] = pd.to_numeric(df['value'], errors='coerce').fillna(0)
            df['transformed_value'] = df['value'] * random.uniform(1.1, 1.5)
        df['processing_timestamp'] = datetime.utcnow().isoformat()
        return df


# Instantiate the service for potential use elsewhere (dependency injection)
processing_service = ProcessingService()
