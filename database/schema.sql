-- VISHVA CREATION POSTGRESQL DATABASE SCHEMA FOR SUPABASE

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Categories
INSERT INTO categories (name, slug, image_url) VALUES
('Original Paintings', 'paintings', 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'),
('Crochet Flowers', 'crochet-flowers', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'),
('Crochet Plushies', 'crochet-plushies', 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=600&q=80'),
('Custom Keychains', 'keychains', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (slug) DO NOTHING;

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    sale_price NUMERIC(10, 2),
    stock INT DEFAULT 1,
    material VARCHAR(255),
    size VARCHAR(255),
    crafting_time VARCHAR(255),
    is_customizable BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Product Images" ON product_images FOR SELECT USING (true);

-- Anon / Authenticated Insert & Update Policies for Admin Management
CREATE POLICY "Public Insert Products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Products" ON products FOR UPDATE USING (true);
CREATE POLICY "Public Delete Products" ON products FOR DELETE USING (true);

CREATE POLICY "Public Insert Product Images" ON product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Product Images" ON product_images FOR UPDATE USING (true);
CREATE POLICY "Public Delete Product Images" ON product_images FOR DELETE USING (true);
