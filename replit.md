# Cabo Shuttle Ride

Sitio web de transporte privado premium en Los Cabos, México — con 5 zonas de servicio, precios en tiempo real y sistema completo de reservas.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/cabo-shuttle run dev` — run the frontend (port 19592)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (already provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Framer Motion, shadcn/ui, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (zod/v4), drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/index.ts` — DB schema (zones, vehicles, pricing, reservations)
- `artifacts/cabo-shuttle/src/pages/` — All frontend pages
- `artifacts/cabo-shuttle/src/components/` — Navbar, Footer, BookingWidget
- `artifacts/api-server/src/routes/` — zones.ts, vehicles.ts, pricing.ts, reservations.ts

## Architecture decisions

- Contract-first: OpenAPI spec gates codegen which gates the frontend; never hand-write types
- PostgreSQL numeric columns return as strings from Drizzle — always call Number() before Zod parse
- Pricing is a full matrix: 5 zones × 5 zones × 4 vehicles = 80 pricing rows seeded
- Confirmation codes generated server-side with CSR-XXXXXX format
- All UI text in Mexican Spanish; no emojis

## Product

Cabo Shuttle Ride tiene 7 páginas:
- `/` — Landing con hero cinematográfico, widget de reserva en tiempo real
- `/zonas` — Las 5 zonas de Los Cabos con imagen y highlights
- `/flota` — 4 vehículos (Sedán, SUV, Van, Sprinter VIP) con amenidades
- `/precios` — Calculadora interactiva de precios en tiempo real
- `/reservar` — Formulario de 3 pasos con confirmación
- `/mi-reserva` — Consulta y cancelación de reservas por código
- `/admin` — Dashboard con estadísticas y tabla de reservas

## 5 Zonas de Servicio

1. Aeropuerto Internacional de Los Cabos (SJD)
2. San José del Cabo
3. Corredor Turístico
4. Cabo San Lucas
5. Todos Santos / Pacífico

## Gotchas

- After OpenAPI spec changes, always run `pnpm --filter @workspace/api-spec run codegen` before touching backend or frontend
- Drizzle `numeric` columns return as strings — coerce to Number() before Zod parse in all routes
- Do not run `pnpm dev` at workspace root — run via workflows or per-artifact filters

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
