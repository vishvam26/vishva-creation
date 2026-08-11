import logging
from supabase import create_client, Client
from config.settings import settings

logger = logging.getLogger("uvicorn")

supabase: Client = None

try:
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        logger.info("Successfully connected to Supabase Client")
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {e}")
