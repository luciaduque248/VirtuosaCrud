-- =========================================================
-- VIRTUOSA DATABASE SCHEMA
-- PostgreSQL
-- =========================================================

-- =========================================================
-- CATEGORIES
-- =========================================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- USERS
-- =========================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'admin',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- PRODUCTS
-- =========================================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    category_id INTEGER NOT NULL,
    subcategory VARCHAR(100),
    image_url TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

-- =========================================================
-- PRODUCT IMAGES
-- =========================================================
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_images_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================================================
-- ORDERS
-- Guest checkout. Customer accounts can be introduced later
-- without coupling them to the first checkout implementation.
-- =========================================================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(40) NOT NULL UNIQUE,

    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(180) NOT NULL,
    customer_phone VARCHAR(40) NOT NULL,

    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(120) NOT NULL,
    shipping_department VARCHAR(120),
    notes TEXT,

    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_cost NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
    total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),

    status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (
            status IN (
                'pending',
                'confirmed',
                'preparing',
                'shipped',
                'delivered',
                'cancelled'
            )
        ),

    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending'
        CHECK (
            payment_status IN (
                'pending',
                'paid',
                'failed',
                'refunded'
            )
        ),

    payment_method VARCHAR(50) NOT NULL DEFAULT 'pending',
    stripe_session_id VARCHAR(255) UNIQUE,
    payment_reference VARCHAR(255),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- ORDER ITEMS
-- Product data is snapshotted so historical orders remain
-- readable even when catalog information changes later.
-- =========================================================
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER,

    product_name VARCHAR(150) NOT NULL,
    product_image_url TEXT,
    size VARCHAR(20),

    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS stripe_session_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_reference VARCHAR(255);
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id) WHERE stripe_session_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(80) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(80),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- INDEXES
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_products_category
    ON products(category_id);

CREATE INDEX IF NOT EXISTS idx_products_subcategory
    ON products(subcategory);

CREATE INDEX IF NOT EXISTS idx_products_active
    ON products(active);

CREATE INDEX IF NOT EXISTS idx_products_featured
    ON products(featured);

CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email);

CREATE INDEX IF NOT EXISTS idx_users_active
    ON users(active);

CREATE INDEX IF NOT EXISTS idx_orders_reference
    ON orders(reference);

CREATE INDEX IF NOT EXISTS idx_orders_status
    ON orders(status);

CREATE INDEX IF NOT EXISTS idx_orders_created_at
    ON orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email
    ON orders(customer_email);

CREATE INDEX IF NOT EXISTS idx_order_items_order
    ON order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_product
    ON order_items(product_id);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user ON password_reset_tokens(user_id);

-- =========================================================
-- UPDATED_AT FUNCTION
-- =========================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================
-- PRODUCTS TRIGGER
-- =========================================================
DROP TRIGGER IF EXISTS products_set_updated_at ON products;

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- USERS TRIGGER
-- =========================================================
DROP TRIGGER IF EXISTS users_set_updated_at ON users;

CREATE TRIGGER users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =========================================================
-- ORDERS TRIGGER
-- =========================================================
DROP TRIGGER IF EXISTS orders_set_updated_at ON orders;

CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
