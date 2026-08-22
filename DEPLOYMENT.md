# Despliegue de Virtuosa

## Arquitectura

- Frontend y API Express: Vercel, usando `vercel.json` y `api/index.js`.
- PostgreSQL: Supabase mediante Shared Pooler (puerto 6543).
- Correos: Resend.
- Pagos: Mercado Pago Checkout Pro.

## Base de datos y API en Vercel

Configura estas variables en Vercel para Production, Preview y Development según corresponda:

- `DATABASE_URL`: URI completa del Shared Pooler de Supabase, con la contraseña reemplazando `[YOUR-PASSWORD]`.
- `DB_POOL_MAX=5`.
- `JWT_SECRET`: conserva exactamente el mismo secreto usado por la API anterior para no invalidar sesiones vigentes.
- `CLIENT_URL=https://virtuosa-crud.vercel.app/VirtuosaCrud`.
- `CLIENT_URLS=https://virtuosa-crud.vercel.app`.
- `API_PUBLIC_URL=https://virtuosa-crud.vercel.app`.
- `RESEND_API_KEY`, `EMAIL_FROM`, `MERCADO_PAGO_ACCESS_TOKEN` y `MERCADO_PAGO_WEBHOOK_SECRET`.

No agregues secretos con el prefijo `REACT_APP_`: Create React App incorpora esas variables dentro del JavaScript público.

## Frontend

1. Importa el repositorio en Vercel y usa la raíz del proyecto.
2. Elimina la antigua variable `REACT_APP_API_URL` que apunta a Render. En producción el frontend usa `/api` en el mismo dominio.
3. Despliega primero como Preview, prueba el flujo completo y luego promuévelo a producción.

## Webhooks

En Mercado Pago registra `https://virtuosa-crud.vercel.app/api/payments/webhook` como URL de Webhooks y activa el evento de pagos. Copia la firma secreta en `MERCADO_PAGO_WEBHOOK_SECRET`.

## Antes de producción

- Ejecuta `npm run build` en la raíz.
- Ejecuta `npm test` dentro de `server`.
- Conserva un respaldo externo antes de migraciones importantes.
- Nunca subas archivos `.env`, respaldos ni claves privadas al repositorio.
