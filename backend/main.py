import sys
import os
from pathlib import Path

# Add project root and backend dir to Python sys.path
backend_dir = Path(__file__).resolve().parent
project_root = backend_dir.parent
sys.path.insert(0, str(project_root))
sys.path.insert(0, str(backend_dir))

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.settings import settings
from api.products import router as products_router
from api.uploads import router as uploads_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")

app = FastAPI(
    title="Vishva Creation Artisan API",
    description="Production REST API for Vishva Creation Handmade Studio",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Versioned API Routes (/api/v1)
app.include_router(products_router, prefix="/api/v1")
app.include_router(uploads_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Vishva Creation Production API",
        "docs": "/docs",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
