from fastapi import APIRouter, UploadFile, File
from services.storage_service import StorageService

router = APIRouter(prefix="/uploads", tags=["Uploads"])

@router.post("")
async def upload_file(file: UploadFile = File(...)):
    """Upload product image file directly to Supabase Storage Bucket"""
    return await StorageService.upload_product_image(file)
