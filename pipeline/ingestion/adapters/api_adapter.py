"""
API adapter to fetch JSON data from HTTP endpoints.
"""

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from config import settings

from models.ingestion import AdapterRecord

from .base import DataSourceAdapter
from loguru import logger


class ApiAdapter(DataSourceAdapter):
    """
    Adapter for fetching data from a REST API endpoint.
    """

    def __init__(
        self,
        url: str,
        headers: dict[str, str] | None = None,
        timeout: float = settings.DEFAULT_API_TIMEOUT,
        token: str | None = None,
    ):
        """
        Initialize the API adapter.

        Args:
            url: Endpoint URL to fetch.
            headers: Optional HTTP headers.
            timeout: Timeout in seconds for the request.
            token: Optional bearer token for Authorization header.
        """
        self.url = url
        self.headers = headers or {}
        if token:
            self.headers["Authorization"] = f"Bearer {token}"
        self.timeout = timeout
        logger.info(
            f"Initializing ApiAdapter for URL: {url} with timeout: {self.timeout}s"
        )
        self.session = self._init_session()

    def _init_session(self) -> requests.Session:
        """
        Initialize a requests.Session with retry logic.
        """
        session = requests.Session()
        retries = Retry(
            total=3,
            backoff_factor=0.3,
            status_forcelist=[500, 502, 503, 504],
            allowed_methods=["GET"],
        )
        adapter = HTTPAdapter(max_retries=retries)
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        logger.debug("HTTP session initialized with retry strategy.")
        return session

    async def fetch(self) -> list[AdapterRecord]:
        """
        Perform a GET request and return JSON data as a list of records.

        Returns:
            List of dicts from the JSON response.

        Raises:
            RuntimeError: On network error, HTTP error, or JSON parse error.
        """
        logger.info(f"Fetching data from API: {self.url}")
        try:
            response = self.session.get(
                self.url, headers=self.headers, timeout=self.timeout
            )
            response.raise_for_status()
            logger.debug(f"Received response with status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {e}")
            raise RuntimeError(f"API request failed: {e}")

        try:
            data = response.json()
            logger.debug(f"Successfully parsed JSON response from {self.url}")
        except ValueError as e:
            logger.error(f"Failed to parse JSON response: {e}")
            raise RuntimeError(f"Failed to parse JSON response: {e}")

        if isinstance(data, list):
            return [AdapterRecord(source=self.url, data=item) for item in data]
        if isinstance(data, dict):
            return [AdapterRecord(source=self.url, data=data)]
        logger.error("Unexpected JSON structure: expected list or dict.")
        raise RuntimeError("Unexpected JSON structure: expected list or dict.")
