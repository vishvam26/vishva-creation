from pydantic import BaseModel, Field
from typing import Optional

class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = "paintings"
    price: float = Field(gt=0, description="Price in INR")
    image_url: Optional[str] = None
    status: Optional[str] = "published"

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    status: Optional[str] = None

class ProductResponse(ProductBase):
    id: str
    created_at: Optional[str] = None

    class Config:
        from_attributes = True
