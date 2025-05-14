from pydantic import BaseModel, Field


class HouseSchema(BaseModel):
    url: str | None = Field(None, description="House URL")
    title: str | None = Field(None, description="House title")
    price: str | None = Field(None, description="House price")
    address: str | None = Field(None, description="House address")
    city: str | None = Field(None, description="House city")
    state: str | None = Field(None, description="House state")
    postal_code: str | None = Field(None, description="House postal code")
    description: str | None = Field(None, description="House description")
    features: str | None = Field(None, description="House features")
    beds: int | None = Field(None, description="House beds")
    baths: float | None = Field(None, description="House baths")
    sqft: int | None = Field(None, description="House sqft")
    lot_size: str | None = Field(None, description="House lot size")
    year_built: int | None = Field(None, description="House year built")
    type: str | None = Field(None, description="House type")
    provider: str | None = Field(None, description="House provider")
    image_url: str | None = Field(None, description="House image URL")
    details: str | None = Field(None, description="House details")
