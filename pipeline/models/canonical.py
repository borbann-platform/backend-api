# models/canonical.py (Create this new file)

from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Optional, List, Dict, Any, Literal
from datetime import datetime, timezone
from uuid import uuid4


class Address(BaseModel):
    street_address: Optional[str] = Field(None, description="Street name and number")
    city: Optional[str] = Field(None, description="City name")
    state_province: Optional[str] = Field(
        None, description="State or province abbreviation/name"
    )
    postal_code: Optional[str] = Field(None, description="Zip or postal code")
    country: Optional[str] = Field(
        "USA", description="Country code or name"
    )  # Example default


class PropertyFeatures(BaseModel):
    bedrooms: Optional[int] = Field(None, description="Number of bedrooms")
    bathrooms: Optional[float] = Field(
        None, description="Number of bathrooms (float for half baths)"
    )
    area_sqft: Optional[float] = Field(None, description="Total area in square feet")
    lot_size_sqft: Optional[float] = Field(None, description="Lot size in square feet")
    year_built: Optional[int] = Field(None, description="Year the property was built")
    property_type: Optional[str] = Field(
        None,
        description="e.g., Single Family House, Condo, Townhouse, Land, Multi-Family",
    )
    has_pool: Optional[bool] = None
    has_garage: Optional[bool] = None
    stories: Optional[int] = None


class ListingDetails(BaseModel):
    price: Optional[float] = Field(None, description="Listing price")
    currency: Optional[str] = Field("USD", description="Currency code")
    listing_status: Optional[
        Literal["For Sale", "For Rent", "Sold", "Pending", "Off Market", "Unknown"]
    ] = Field("Unknown", description="Current status of the listing")
    listing_type: Optional[Literal["Sale", "Rent"]] = Field(
        None, description="Whether the property is for sale or rent"
    )
    listed_date: Optional[datetime] = Field(
        None, description="Date the property was listed (UTC)"
    )
    last_updated_date: Optional[datetime] = Field(
        None, description="Date the listing was last updated (UTC)"
    )
    listing_url: Optional[HttpUrl] = Field(
        None, description="URL of the original listing"
    )
    mls_id: Optional[str] = Field(
        None, description="Multiple Listing Service ID, if available"
    )


class AgentContact(BaseModel):
    name: Optional[str] = Field(None, description="Listing agent or contact name")
    phone: Optional[str] = Field(None, description="Contact phone number")
    email: Optional[str] = Field(None, description="Contact email address")
    brokerage_name: Optional[str] = Field(
        None, description="Real estate brokerage name"
    )


class CanonicalRecord(BaseModel):
    """
    Represents a unified Real Estate Listing record after mapping.
    Target schema for the ML mapping model.
    """

    # --- Core Identifier & Provenance ---
    canonical_record_id: str = Field(
        default_factory=lambda: f"cre-{uuid4()}",
        description="Unique identifier for this canonical record.",
        examples=[f"cre-{uuid4()}"],
    )
    original_source_identifier: str = Field(
        ...,
        description="Identifier of the original source (e.g., URL, filename + row index).",
    )
    original_source_type: str = Field(
        ...,
        description="Type of the original source adapter ('api', 'file', 'scrape').",
    )
    entity_type: Literal["RealEstateListing", "NewsArticle", "Other"] = Field(
        "Other", description="Classification of the source entity."
    )
    mapping_model_version: Optional[str] = Field(
        None, description="Version identifier of the ML model used for mapping."
    )
    mapping_timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="Timestamp (UTC) when the mapping was performed.",
    )

    # --- Real Estate Specific Fields ---
    address: Optional[Address] = Field(
        default=None, description="Structured address details."
    )
    features: Optional[PropertyFeatures] = Field(
        default=None, description="Details about the property itself."
    )
    listing: Optional[ListingDetails] = Field(
        default=None, description="Information about the listing status and price."
    )
    agent: Optional[AgentContact] = Field(
        default=None, description="Listing agent or contact information."
    )
    description: Optional[str] = Field(
        None, description="Textual description from the listing."
    )
    image_urls: Optional[List[HttpUrl]] = Field(
        default=None, description="List of URLs for property images."
    )

    # --- Common Fields ---
    raw_source_data: Optional[Dict[str, Any]] = Field(  # Changed name for clarity
        default=None, description="Original source data record (JSON representation)."
    )

    @field_validator("listing", "features", "address", "agent")
    def check_fields_for_real_estate(cls, v, info):
        if info.data.get("entity_type") == "RealEstateListing" and v is None:
            # NOTE: Depending on strictness, might raise ValueError or just allow it
            # print(f"Warning: RealEstateListing has None for {info.field_name}")
            pass
        return v

    class Config:
        # Example for documentation
        schema_extra = {
            "example": {
                "canonical_record_id": f"cre-{uuid4()}",
                "original_source_identifier": "https://some.realestate.site/listing/123",
                "original_source_type": "scrape",
                "entity_type": "RealEstateListing",
                "mapping_model_version": "realestate-mapper-v1.0",
                "mapping_timestamp": "2025-04-29T12:00:00Z",
                "address": {
                    "street_address": "123 Main St",
                    "city": "Anytown",
                    "state_province": "CA",
                    "postal_code": "90210",
                    "country": "USA",
                },
                "features": {
                    "bedrooms": 3,
                    "bathrooms": 2.5,
                    "area_sqft": 1850.0,
                    "lot_size_sqft": 5500.0,
                    "year_built": 1995,
                    "property_type": "Single Family House",
                    "has_pool": True,
                    "has_garage": True,
                    "stories": 2,
                },
                "listing": {
                    "price": 750000.0,
                    "currency": "USD",
                    "listing_status": "For Sale",
                    "listing_type": "Sale",
                    "listed_date": "2025-04-15T00:00:00Z",
                    "last_updated_date": "2025-04-28T00:00:00Z",
                    "listing_url": "https://some.realestate.site/listing/123",
                    "mls_id": "MLS123456",
                },
                "agent": {
                    "name": "Jane Doe",
                    "phone": "555-123-4567",
                    "email": "jane.doe@email.com",
                    "brokerage_name": "Best Realty",
                },
                "description": "Beautiful 3 bed, 2.5 bath home in a great neighborhood. Recently updated kitchen, spacious backyard with pool.",
                "image_urls": [
                    "https://images.site/123/1.jpg",
                    "https://images.site/123/2.jpg",
                ],
                "raw_source_data": {
                    "title": "Charming Home For Sale",
                    "price_str": "$750,000",
                    "sqft": "1,850",
                    "...": "...",
                },
            }
        }
