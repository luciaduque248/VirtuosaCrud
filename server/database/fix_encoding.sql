-- =========================================================
-- VIRTUOSA - REPARACION DE TEXTO UTF-8 / MOJIBAKE
-- =========================================================
-- Corrige textos que fueron almacenados como UTF-8 interpretado
-- previamente como Latin-1/Windows-1252, por ejemplo:
--   inspiraciÃ³n -> inspiración
--   caÃ­da       -> caída
--
-- La migración solo toca filas que contienen los marcadores "Ã" o "Â".
-- Puede ejecutarse más de una vez: una vez corregida una fila deja de
-- cumplir la condición y no vuelve a transformarse.
-- =========================================================

BEGIN;

-- El archivo está guardado en UTF-8 y declaramos explícitamente la
-- codificación esperada para esta sesión de migración.
SET LOCAL client_encoding = 'UTF8';

-- =========================================================
-- PRODUCTS
-- =========================================================
UPDATE products
SET
    name = CASE
        WHEN name ~ '[ÃÂ]'
            THEN convert_from(convert_to(name, 'LATIN1'), 'UTF8')
        ELSE name
    END,
    description = CASE
        WHEN description IS NOT NULL
             AND description ~ '[ÃÂ]'
            THEN convert_from(convert_to(description, 'LATIN1'), 'UTF8')
        ELSE description
    END
WHERE
    name ~ '[ÃÂ]'
    OR (
        description IS NOT NULL
        AND description ~ '[ÃÂ]'
    );

-- =========================================================
-- ORDER ITEM SNAPSHOTS
-- =========================================================
-- Los pedidos conservan el nombre histórico del producto. Si algún
-- pedido fue creado mientras el producto estaba corrupto, lo reparamos.
UPDATE order_items
SET
    product_name = convert_from(
        convert_to(product_name, 'LATIN1'),
        'UTF8'
    )
WHERE
    product_name ~ '[ÃÂ]';

COMMIT;

-- =========================================================
-- VERIFICACION
-- =========================================================
-- Si la migración terminó correctamente, estas consultas deberían
-- devolver 0 filas.
SELECT
    id,
    name,
    description
FROM products
WHERE
    name ~ '[ÃÂ]'
    OR (
        description IS NOT NULL
        AND description ~ '[ÃÂ]'
    )
ORDER BY id;

SELECT
    id,
    order_id,
    product_name
FROM order_items
WHERE product_name ~ '[ÃÂ]'
ORDER BY id;
