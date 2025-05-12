import io
import pytest
from fastapi import UploadFile
from ingestion.adapters.file_adapter import FileAdapter


def make_upload_file(content: str, filename: str) -> UploadFile:
    return UploadFile(
        filename=filename,
        file=io.BytesIO(content.encode("utf-8")),
    )


def test_file_adapter_csv():
    csv_content = "id,name,price\n001,Apple,12\n002,Orange,10\n003,Banana,8"
    upload = make_upload_file(csv_content, "test.csv")
    adapter = FileAdapter(upload)
    records = adapter.fetch()

    assert len(records) == 3
    assert records[0].data["name"] == "Apple"
    assert records[1].data["price"] == 10
    assert records[2].data["id"] == 3


def test_file_adapter_json():
    json_content = """
    [{"id": "001", "name": "Apple", "price": 12},
     {"id": "002", "name": "Orange", "price": 10},
     {"id": "003", "name": "Banana", "price": 8}]
    """
    upload = make_upload_file(json_content, "test.json")
    adapter = FileAdapter(upload)
    records = adapter.fetch()

    assert len(records) == 3
    assert records[0].data["name"] == "Apple"
    assert records[1].data["price"] == 10
    assert records[2].data["id"] == 3


def test_file_adapter_missing_filename():
    upload = UploadFile(
        filename="",
        file=io.BytesIO("id,name,price\n001,Apple,12".encode("utf-8")),
    )
    adapter = FileAdapter(upload)

    with pytest.raises(ValueError) as excinfo:
        adapter.fetch()

    assert "File name is required" in str(excinfo.value)
