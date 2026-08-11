// UNIFIED FASTAPI BACKEND API CLIENT

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("FastAPI backend offline, fallback to local storage:", err);
  }
  return null;
}

export async function createProduct(productData) {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Failed to create product via FastAPI:", err);
  }
  return null;
}

export async function uploadProductImage(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE_URL}/uploads`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Failed to upload image via FastAPI:", err);
  }
  return null;
}
