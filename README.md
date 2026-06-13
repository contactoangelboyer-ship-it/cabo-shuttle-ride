# Cabo Shuttle Ride

Sitio web de transporte privado premium en Los Cabos, México — con 5 zonas de servicio, precios en tiempo real y sistema completo de reservas.

## Stack

- **Frontend**: React + Vite, Framer Motion, shadcn/ui, TanStack Query
- **API**: Express 5 (Node.js serverless on Vercel)
- **DB**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, drizzle-zod
- **Fonts**: Unbounded (headings) + Poppins (body)

## Despliegue en Vercel

1. Conecta el repo en [vercel.com](https://vercel.com)
2. Vercel detecta `vercel.json` automáticamente — no cambies nada
3. Agrega la variable de entorno `DATABASE_URL` con tu cadena de conexión PostgreSQL
4. Deploy

## Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Cadena de conexión PostgreSQL (ej. `postgresql://user:pass@host/db`) |

## Desarrollo local

```bash
pnpm install
pnpm --filter @workspace/api-server run dev   # API en puerto 8080
pnpm --filter @workspace/cabo-shuttle run dev  # Frontend en puerto 19592
```

Requiere `PORT`, `BASE_PATH` y `DATABASE_URL` como variables de entorno para desarrollo.

## 5 Zonas de Servicio

1. Aeropuerto Internacional de Los Cabos (SJD)
2. San José del Cabo
3. Corredor Turístico
4. Cabo San Lucas
5. Todos Santos / Pacífico

## Páginas

- `/` — Landing con hero cinematográfico y widget de reserva
- `/zonas` — Las 5 zonas de servicio con imágenes
- `/flota` — 4 vehículos (Sedán, SUV, Van, Sprinter VIP)
- `/precios` — Calculadora interactiva de precios
- `/reservar` — Formulario de reserva en 3 pasos
- `/mi-reserva` — Consulta y cancelación por código
- `/admin` — Dashboard de administración
