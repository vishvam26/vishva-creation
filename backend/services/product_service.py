import uuid
import logging
import requests
from typing import List
from config.settings import settings
from schemas.product import ProductCreate

logger = logging.getLogger("uvicorn")

# Default Artisanal Products Catalog matching exact Supabase Non-Nullable Schema Constraints
DEFAULT_PRODUCTS = [
    {
        "id": "p1",
        "title": "Village Landscape Oil Painting",
        "description": "Authentic oil canvas painting capturing rural Indian heritage & golden sunset vibes by Vishva.",
        "price": 5999.0,
        "category": "paintings",
        "image_url": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
        "image_path": "paintings/p1.jpg",
        "status": "published",
        "stock": 1
    },
    {
        "id": "p2",
        "title": "Handcrafted Radha Krishna Canvas",
        "description": "Bespoke spiritual oil painting with metallic gold leaf highlights.",
        "price": 8999.0,
        "category": "paintings",
        "image_url": "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
        "image_path": "paintings/p2.jpg",
        "status": "published",
        "stock": 1
    },
    {
        "id": "p3",
        "title": "Everlasting Crochet Tulip Bouquet",
        "description": "100% handmade soft milk cotton crochet flowers bouquet in pastel pink.",
        "price": 1499.0,
        "category": "crochet-flowers",
        "image_url": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
        "image_path": "crochet/p3.jpg",
        "status": "published",
        "stock": 1
    },
    {
        "id": "p4",
        "title": "Cute Amigurumi Teddy Plushie",
        "description": "Hand-stitched hypoallergenic plush toy perfect for gifting.",
        "price": 999.0,
        "category": "crochet-plushies",
        "image_url": "https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=600&q=80",
        "image_path": "crochet/p4.jpg",
        "status": "published",
        "stock": 1
    }
]

class ProductService:
    @staticmethod
    def _get_headers() -> dict:
        return {
            "apikey": settings.SUPABASE_KEY,
            "Authorization": f"Bearer {settings.SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    @staticmethod
    async def get_all_products() -> List[dict]:
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            try:
                headers = ProductService._get_headers()
                url = f"{settings.SUPABASE_URL}/rest/v1/products?select=*"
                res = requests.get(url, headers=headers, timeout=5)
                
                if res.status_code == 200:
                    data = res.json()
                    if isinstance(data, list) and len(data) > 0:
                        return data
                    else:
                        # Auto-seed initial catalog into Supabase Table
                        logger.info("Supabase table empty. Auto-seeding initial catalog via REST...")
                        for p in DEFAULT_PRODUCTS:
                            try:
                                payload = {
                                    "title": p["title"],
                                    "description": p["description"],
                                    "price": p["price"],
                                    "category": p["category"],
                                    "image_url": p["image_url"],
                                    "image_path": p["image_path"],
                                    "status": "published",
                                    "stock": p["stock"]
                                }
                                requests.post(f"{settings.SUPABASE_URL}/rest/v1/products", headers=headers, json=payload, timeout=5)
                            except Exception as seed_err:
                                logger.error(f"Error seeding product {p['title']}: {seed_err}")
                        
                        seeded_res = requests.get(url, headers=headers, timeout=5)
                        if seeded_res.status_code == 200:
                            seeded_data = seeded_res.json()
                            if isinstance(seeded_data, list) and len(seeded_data) > 0:
                                return seeded_data
                else:
                    logger.error(f"Supabase REST returned status {res.status_code}: {res.text}")
            except Exception as e:
                logger.error(f"Error fetching products from Supabase REST: {e}")
        
        return DEFAULT_PRODUCTS

    @staticmethod
    async def create_product(product_data: ProductCreate) -> dict:
        new_product = product_data.model_dump()
        
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            try:
                headers = ProductService._get_headers()
                payload = {
                    "title": new_product["title"],
                    "description": new_product.get("description", ""),
                    "price": new_product["price"],
                    "category": new_product.get("category", "paintings"),
                    "image_url": new_product.get("image_url", ""),
                    "image_path": new_product.get("image_path", "paintings/default.jpg"),
                    "status": "published",
                    "stock": new_product.get("stock", 1)
                }
                res = requests.post(f"{settings.SUPABASE_URL}/rest/v1/products", headers=headers, json=payload, timeout=5)
                if res.status_code in [200, 201]:
                    data = res.json()
                    if isinstance(data, list) and len(data) > 0:
                        return data[0]
                else:
                    logger.error(f"Supabase REST insert error {res.status_code}: {res.text}")
            except Exception as e:
                logger.error(f"Error inserting product to Supabase REST: {e}")

        # Add to local catalog fallback
        new_product["id"] = str(uuid.uuid4())
        DEFAULT_PRODUCTS.append(new_product)
        return new_product

    @staticmethod
    async def delete_product(product_id: str) -> bool:
        if settings.SUPABASE_URL and settings.SUPABASE_KEY:
            try:
                headers = ProductService._get_headers()
                res = requests.delete(f"{settings.SUPABASE_URL}/rest/v1/products?id=eq.{product_id}", headers=headers, timeout=5)
                if res.status_code in [200, 204]:
                    return True
            except Exception as e:
                logger.error(f"Error deleting product from Supabase REST: {e}")
        
        global DEFAULT_PRODUCTS
        DEFAULT_PRODUCTS = [p for p in DEFAULT_PRODUCTS if p["id"] != product_id]
        return True
