"""
API adapter to fetch JSON data from HTTP endpoints.
"""

from typing import List, Dict, Any, Optional

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from .base import DataSourceAdapter


class ApiAdapter(DataSourceAdapter):
    """
    Adapter for fetching data from a REST API endpoint.
    """

    def __init__(
        self,
        url: str,
        headers: Optional[Dict[str, str]] = None,
        timeout: float = 30
    ):
        """
        Initialize the API adapter.

        Args:
            url: Endpoint URL to fetch.
            headers: Optional HTTP headers.
            timeout: Timeout in seconds for the request.
        """
        self.url = url
        self.headers = headers or {}
        self.timeout = timeout
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
            allowed_methods=["GET"]
        )
        adapter = HTTPAdapter(max_retries=retries)
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        return session

    def fetch(self) -> List[Dict[str, Any]]:
        """
        Perform a GET request and return JSON data as a list of records.

        Returns:
            List of dicts from the JSON response.

        Raises:
            RuntimeError: On network error, HTTP error, or JSON parse error.
        """
        try:
            response = self.session.get(
                self.url, headers=self.headers, timeout=self.timeout
            )
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"API request failed: {e}")

        try:
            data = response.json()
        except ValueError as e:
            raise RuntimeError(f"Failed to parse JSON response: {e}")

        if isinstance(data, list):
            return data
        if isinstance(data, dict):
            return [data]
        raise RuntimeError("Unexpected JSON structure: expected list or dict.")