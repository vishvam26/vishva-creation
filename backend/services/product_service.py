import uuid
import logging
from typing import List, Optional
from db.supabase import supabase
from schemas.product import ProductCreate, ProductUpdate

logger = logging.getLogger("uvicorn")

# Default Artisanal Products Catalog
DEFAULT_PRODUCTS = [
    {
        "id": "p1",
        "name": "Village Landscape Oil Painting",
        "slug": "village-landscape-oil-painting",
        "description": "Authentic oil canvas painting capturing rural Indian heritage & golden sunset vibes by Vishva.",
        "price": 5999.0,
        "category_id": "paintings",
        "image_url": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
        "is_featured": True,
        "is_active": True
    },
    {
        "id": "p2",
        "name": "Handcrafted Radha Krishna Canvas",
        "slug": "handcrafted-radha-krishna-canvas",
        "description": "Bespoke spiritual oil painting with metallic gold leaf highlights.",
        "price": 8999.0,
        "category_id": "paintings",
        "image_url": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
        "is_featured": True,
        "is_active": True
    },
    {
        "id": "p3",
        "name": "Everlasting Crochet Tulip Bouquet",
        "slug": "everlasting-crochet-tulip-bouquet",
        "description": "100% handmade soft milk cotton crochet flowers bouquet in pastel pink.",
        "price": 1499.0,
        "category_id": "crochet-flowers",
        "image_url": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        "is_featured": True,
        "is_active": True
    },
    {
        "id": "p4",
        "name": "Cute Amigurumi Teddy Plushie",
        "slug": "cute-amigurumi-teddy-plushie",
        "description": "Hand-stitched hypoallergenic plush toy perfect for gifting.",
        "price": 999.0,
        "category_id": "crochet-plushies",
        "image_url": "https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=600&q=80",
        "is_featured": True,
        "is_active": True
    }
]

class ProductService:
    @staticmethod
    async def get_all_products() -> List[dict]:
        if supabase:
            try:
                response = supabase.table("products").select("*").eq("is_active", True).execute()
                if response.data and len(response.data) > 0:
                    return response.data
            except Exception as e:
                logger.error(f"Error fetching products from Supabase: {e}")
        
        return DEFAULT_PRODUCTS

    @staticmethod
    async def create_product(product_data: ProductCreate) -> dict:
        new_product = product_data.model_dump()
        new_product["id"] = str(uuid.uuid4())
        
        if supabase:
            try:
                response = supabase.table("products").insert(new_product).execute()
                if response.data and len(response.data) > 0:
                    return response.data[0]
            except Exception as e:
                logger.error(f"Error inserting product to Supabase: {e}")

        # Add to local catalog fallback
        DEFAULT_PRODUCTS.append(new_product)
        return new_product

    @staticmethod
    async def delete_product(product_id: str) -> bool:
        if supabase:
            try:
                supabase.table("products").delete().eq("id", product_id).execute()
                return True
            except Exception as e:
                logger.error(f"Error deleting product from Supabase: {e}")
        
        global DEFAULT_PRODUCTS
        DEFAULT_PRODUCTS = [p for p in DEFAULT_PRODUCTS if p["id"] != product_id]
        return True
