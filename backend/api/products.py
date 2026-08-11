from fastapi import APIRouter, HTTPException, status
from typing import List
from schemas.product import ProductCreate, ProductResponse
from services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse])
async def get_products():
    """Fetch all active products from Supabase PostgreSQL Database"""
    return await ProductService.get_all_products()

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductCreate):
    """Add new product directly to Supabase Database"""
    return await ProductService.create_product(product)

@router.delete("/{product_id}")
async def delete_product(product_id: str):
    """Delete product from database"""
    success = await ProductService.delete_product(product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
