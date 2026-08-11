from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[str] = None
    price: float = Field(gt=0, description="Price in INR")
    sale_price: Optional[float] = None
    stock: int = Field(default=1, ge=0)
    material: Optional[str] = None
    size: Optional[str] = None
    crafting_time: Optional[str] = None
    is_customizable: bool = False
    is_featured: bool = True
    is_active: bool = True
    image_url: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    sale_price: Optional[float] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None
    image_url: Optional[str] = None

class ProductResponse(ProductBase):
    id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
