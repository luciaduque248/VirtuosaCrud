# Despliegue de Virtuosa

## Arquitectura recomendada

- Frontend: Vercel, usando `vercel.json`.
- API y PostgreSQL: Render, usando `render.yaml` y `server/Dockerfile`.
- Correos: Resend.
- Pagos: Mercado Pago Checkout Pro.

## API y base de datos

1. En Render, crea un Blueprint desde este repositorio.
2. Completa `CLIENT_URL` y `CLIENT_URLS` con la URL pública del frontend.
3. Agrega `RESEND_API_KEY`, `EMAIL_FROM`, `MERCADO_PAGO_ACCESS_TOKEN` y `MERCADO_PAGO_WEBHOOK_SECRET` como secretos.
4. El arranque ejecuta el esquema idempotente antes de iniciar la API.
5. Crea el administrador con `npm run create-admin` desde la consola privada del servicio.

## Frontend

1. Importa el repositorio en Vercel y usa la raíz del proyecto.
2. Configura `REACT_APP_API_URL=https://TU-API.onrender.com/api`.
3. Despliega primero como Preview, prueba el flujo completo y luego promuévelo a producción.

## Webhooks

En Mercado Pago registra `https://TU-API.onrender.com/api/payments/webhook` como URL de Webhooks y activa el evento de pagos. Copia la firma secreta en `MERCADO_PAGO_WEBHOOK_SECRET`.

## Antes de producción

- Ejecuta `npm run build` en la raíz.
- Ejecuta `npm test` dentro de `server`.
- Ejecuta `npm run backup` dentro de `server` antes de migraciones importantes.
- Nunca subas archivos `.env`, respaldos ni claves privadas al repositorio.
