import responses
import pytest
from ingestion.adapters.api_adapter import ApiAdapter
import httpx


@pytest.fixture
def single_product():
    return "https://dummyjson.com/products/1"

@pytest.fixture
def multiple_product():
    return "https://dummyjson.com/products"

@pytest.fixture
def auth_endpoint():
    return "https://dummyjson.com/auth/login"

@pytest.fixture
def auth_require_endpoint():
    return "https://dummyjson.com/auth/me"


def test_fetch_dict_response(single_product):
    """Test fetching a single record from a JSON API endpoint."""
    response = httpx.get(single_product, timeout=10)
    response.raise_for_status()
    expected_data = response.json()
    assert isinstance(expected_data, dict)

    adapter = ApiAdapter(url=single_product)
    adapter_result = adapter.fetch()

    assert isinstance(adapter_result, list)
    assert adapter_result[0] == expected_data


def test_fetch_list_response(multiple_product):
    """Test fetching a list of records from a JSON API endpoint."""
    response = httpx.get(multiple_product, timeout=10)
    response.raise_for_status()
    expected_data = response.json()

    adapter = ApiAdapter(url=multiple_product)
    adapter_result = adapter.fetch()

    assert adapter_result[0] == expected_data


@responses.activate
def test_fetch_http_error(single_product):
    """Test handling HTTP errors and validate graceful failure."""
    for _ in range(4):
        responses.add(responses.GET, single_product, status=500)

    adapter = ApiAdapter(url=single_product)

    with pytest.raises(RuntimeError) as exc_info:
        adapter.fetch()

    assert "API request failed" in str(exc_info.value)

@responses.activate
def test_fetch_json_decode_error(single_product):
    """Test handling JSON decode errors."""
    responses.add(responses.GET, single_product, body="not-a-json", status=200)

    adapter = ApiAdapter(url=single_product)

    with pytest.raises(RuntimeError) as exc_info:
        adapter.fetch()

    assert "Failed to parse JSON response" in str(exc_info.value)


def test_token_header_injection(auth_endpoint, auth_require_endpoint):
    """Test that the token is injected into the Authorization header."""
    payload = {
        "username": "emilys",
        "password": "emilyspass",
        "expiresInMins": 30
    }

    response = httpx.post(
        auth_endpoint,
        timeout=10,
        headers={"Content-Type": "application/json"},
        json=payload
    )

    response.raise_for_status()

    assert response.status_code == 200

    token = response.json().get("accessToken")

    adapter = ApiAdapter(url=auth_require_endpoint, token=token)
    adapter_result = adapter.fetch()

    assert isinstance(adapter_result, list)
    assert adapter_result[0].get("username") == "emilys"


def test_custom_headers_are_used(single_product):
    """Test that custom headers are used."""
    headers = {"X-Custom-Header": "test-value"}
    adapter = ApiAdapter(url=single_product, headers=headers)

    assert adapter.headers.get("X-Custom-Header") == "test-value"
