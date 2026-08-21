-- =========================================================
-- VIRTUOSA DATABASE SEED
-- =========================================================


-- =========================================================
-- CATEGORIES
-- =========================================================

INSERT INTO categories (
    name,
    slug
)
VALUES
    ('Moda', 'moda'),
    ('Maquillaje', 'maquillaje')
ON CONFLICT (slug)
DO NOTHING;


-- =========================================================
-- PRODUCTS
-- =========================================================

INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Vestido Boho Lavanda',
    'Vestido midi con diseño femenino y silueta ligera, ideal para ocasiones casuales.',
    119900,
    c.id,
    'vestidos',
    'https://res.cloudinary.com/colombia/image/upload/v1650420080/kuepa/productos/2/22SWVK29_2000_4_citwlf.jpg',
    14,
    TRUE,
    TRUE
FROM categories c
WHERE c.slug = 'moda'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Vestido Boho Lavanda'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Vestido Floral Summer',
    'Vestido largo de inspiración bohemia con caída ligera y acabado floral.',
    139900,
    c.id,
    'vestidos',
    'https://res.cloudinary.com/colombia/image/upload/v1650423647/kuepa/productos/8/22SWVK30_8021_1_jdw3c7.jpg',
    9,
    TRUE,
    TRUE
FROM categories c
WHERE c.slug = 'moda'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Vestido Floral Summer'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Vestido Midi Elegance',
    'Vestido midi versátil diseñado para eventos, cenas y ocasiones especiales.',
    149900,
    c.id,
    'vestidos',
    'https://res.cloudinary.com/colombia/image/upload/v1650422327/kuepa/productos/5/22SWVK60_7041_2_tdvpke.jpg',
    11,
    FALSE,
    TRUE
FROM categories c
WHERE c.slug = 'moda'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Vestido Midi Elegance'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Vestido Rose Sale',
    'Vestido femenino de temporada perteneciente a la colección de descuentos.',
    89900,
    c.id,
    'descuentos',
    'https://res.cloudinary.com/colombia/image/upload/v1650501952/kuepa/descuentos/2/22SWVW76_9019_2_wlwdut.jpg',
    8,
    TRUE,
    TRUE
FROM categories c
WHERE c.slug = 'moda'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Vestido Rose Sale'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Vestido Violet Sale',
    'Vestido de colección seleccionado con precio promocional.',
    99900,
    c.id,
    'descuentos',
    'https://res.cloudinary.com/colombia/image/upload/v1654117323/kuepa/descuentos/3/22SWVKXC_7002_4_oeeevd.jpg',
    6,
    FALSE,
    TRUE
FROM categories c
WHERE c.slug = 'moda'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Vestido Violet Sale'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Vestido Classic Sale',
    'Diseño clásico de temporada con descuento especial.',
    109900,
    c.id,
    'descuentos',
    'https://res.cloudinary.com/colombia/image/upload/v1654117864/kuepa/descuentos/4/22SWVK46_2000_6_myvfip.jpg',
    12,
    FALSE,
    TRUE
FROM categories c
WHERE c.slug = 'moda'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Vestido Classic Sale'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Paleta Nude Essentials',
    'Paleta de sombras en tonos neutros para maquillaje diario y looks nocturnos.',
    74900,
    c.id,
    'ojos',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
    20,
    TRUE,
    TRUE
FROM categories c
WHERE c.slug = 'maquillaje'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Paleta Nude Essentials'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Máscara Intense Black',
    'Máscara de pestañas de acabado intenso y definición prolongada.',
    42900,
    c.id,
    'ojos',
    'https://images.unsplash.com/photo-1631214503851-a95f9eaf6a85?auto=format&fit=crop&w=900&q=80',
    18,
    FALSE,
    TRUE
FROM categories c
WHERE c.slug = 'maquillaje'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Máscara Intense Black'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Lipstick Velvet Rose',
    'Labial de acabado aterciopelado y color intenso.',
    38900,
    c.id,
    'labios',
    'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80',
    25,
    TRUE,
    TRUE
FROM categories c
WHERE c.slug = 'maquillaje'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Lipstick Velvet Rose'
);


INSERT INTO products (
    name,
    description,
    price,
    category_id,
    subcategory,
    image_url,
    stock,
    featured,
    active
)
SELECT
    'Skin Glow Serum',
    'Sérum facial hidratante para aportar luminosidad y suavidad a la piel.',
    62900,
    c.id,
    'piel',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    16,
    TRUE,
    TRUE
FROM categories c
WHERE c.slug = 'maquillaje'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE name = 'Skin Glow Serum'
);