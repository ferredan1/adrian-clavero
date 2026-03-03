# 6. Estructura de carpetas

Estructura propuesta para **frontend** (Next.js) y **backend** (NestJS), y opcionalmente **monorepo** o repos separados. Sin incluir código; solo organización de carpetas y responsabilidad de cada parte.

---

## 6.1 Repositorios

**Opción A – Monorepo**
```
erp-liviano/
├── apps/
│   ├── web/          # Next.js (frontend)
│   └── api/          # NestJS (backend)
├── packages/         # (opcional) código compartido (tipos, constantes)
├── docker/
├── docs/
└── package.json      # workspaces
```

**Opción B – Repos separados**
- `erp-liviano-web` (Next.js)
- `erp-liviano-api` (NestJS)
- Contratos (tipos, DTOs) compartidos vía paquete npm privado o copiados.

Se recomienda **monorepo** para mantener sincronizados tipos y versiones en las primeras fases.

---

## 6.2 Frontend (Next.js – App Router)

```
apps/web/
├── app/
│   ├── layout.tsx              # Layout raíz, providers
│   ├── page.tsx                # Ruta / (redirect o dashboard)
│   ├── globals.css
│   ├── (auth)/                 # Grupo de rutas: login, recuperar contraseña
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── recuperar-password/
│   │       └── page.tsx
│   ├── (dashboard)/            # Rutas tras login (layout con sidebar/header)
│   │   ├── layout.tsx          # Layout con sidebar, header, selector sucursal
│   │   ├── page.tsx            # Dashboard / inicio
│   │   ├── ventas/
│   │   │   ├── page.tsx        # Listado ventas
│   │   │   ├── nueva/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── presupuestos/
│   │   ├── pedidos/
│   │   ├── compras/
│   │   ├── ordenes-compra/
│   │   ├── stock/
│   │   │   ├── page.tsx
│   │   │   ├── consulta-precios-stock/
│   │   │   └── movimientos/
│   │   ├── clientes/
│   │   ├── obras/
│   │   ├── proveedores/
│   │   ├── tesoreria/
│   │   │   ├── pagos-clientes/
│   │   │   └── pagos-proveedores/
│   │   ├── reportes/
│   │   └── configuracion/
│   │       ├── page.tsx
│   │       ├── sucursales/
│   │       ├── usuarios/
│   │       └── ...
│   └── api/                    # (opcional) route handlers para proxy o server actions
├── components/
│   ├── ui/                     # Componentes base (Button, Input, Card, Table, Modal)
│   ├── layout/                 # Header, Sidebar, Breadcrumbs, SucursalSelector
│   ├── forms/                  # Formularios reutilizables (ClienteForm, ProductSearch)
│   ├── tables/                 # DataTable, columnas por módulo
│   └── shared/                 # Loading, ErrorBoundary, EmptyState
├── features/                   # (opcional) por módulo/feature
│   ├── ventas/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api.ts
│   ├── stock/
│   └── ...
├── hooks/                      # useAuth, useSucursal, usePermissions
├── lib/
│   ├── api-client.ts           # Cliente HTTP (fetch/axios) con interceptors
│   ├── auth.ts                 # Tokens, refresh
│   └── utils.ts
├── stores/                     # (si se usa Zustand/otro) auth, sucursal
├── types/                      # Tipos TS (alineados con API)
├── public/
│   ├── manifest.json           # PWA
│   └── icons/
├── next.config.js
├── tsconfig.json
└── package.json
```

**Responsabilidad de carpetas**
- **app:** Rutas y layouts; mínima lógica; delegar a components y hooks.
- **components/ui:** Diseño system; sin lógica de negocio.
- **components/layout:** Navegación y shell de la app.
- **components/forms, tables:** Reutilizables por módulo.
- **features:** Agrupa por dominio (ventas, stock) si se adopta feature-based structure.
- **hooks:** Lógica reutilizable (auth, permisos, datos).
- **lib:** Cliente API, helpers, auth.
- **types:** Contratos con backend.

---

## 6.3 Backend (NestJS)

```
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/                 # Código compartido
│   │   ├── decorators/          # @TenantId(), @CurrentUser()
│   │   ├── filters/            # Exception filters
│   │   ├── guards/             # JwtAuthGuard, PermissionsGuard
│   │   ├── interceptors/       # Logging, transform
│   │   ├── pipes/              # ValidationPipe config, etc.
│   │   └── middleware/         # Tenant, etc.
│   ├── config/                 # ConfigModule, env validation
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/         # JWT, refresh
│   │   └── dto/
│   ├── tenants/
│   │   ├── tenants.module.ts
│   │   ├── tenants.controller.ts
│   │   ├── tenants.service.ts
│   │   └── entities/
│   ├── branches/               # Sucursales
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   └── dto/
│   ├── permissions/
│   │   ├── permissions.module.ts
│   │   ├── permissions.service.ts
│   │   └── entities/           # Permiso, UserPermission
│   ├── catalog/                # Categorías, marcas, medios de pago (o módulos separados)
│   │   ├── categories/
│   │   ├── brands/
│   │   └── payment-methods/
│   ├── products/
│   ├── price-lists/
│   ├── stock/
│   │   ├── stock.module.ts
│   │   ├── stock.service.ts
│   │   ├── movements/
│   │   └── entities/
│   ├── clients/
│   ├── works/                  # Obras
│   ├── suppliers/
│   ├── sales/                  # Ventas (presupuestos, pedidos, ventas, NC/ND)
│   │   ├── sales.module.ts
│   │   ├── sales.controller.ts
│   │   ├── sales.service.ts
│   │   ├── estimates/
│   │   ├── orders/
│   │   ├── invoices/           # Comprobantes venta
│   │   └── credit-debit-notes/
│   ├── purchases/              # OC, compras, gastos
│   │   ├── purchase-orders/
│   │   ├── purchases/
│   │   └── expenses/
│   ├── treasury/               # Pagos clientes, pagos proveedores
│   │   ├── client-payments/
│   │   └── supplier-payments/
│   ├── reports/
│   │   ├── reports.module.ts
│   │   ├── reports.controller.ts
│   │   └── services/           # Por tipo de reporte
│   ├── audit/                  # Registro y consulta de auditoría
│   └── integrations/          # (Opcional) Google, etc.
│       ├── integrations.module.ts
│       └── google/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts                 # (Opcional) datos iniciales, permisos del sistema
├── test/
├── Dockerfile
├── nest-cli.json
├── tsconfig.json
└── package.json
```

**Responsabilidad**
- **common:** Guards, decoradores, filtros, interceptors; uso en todos los módulos.
- **auth:** Login, refresh, validación JWT; no contiene lógica de permisos por recurso (eso va en guards que usan **permissions**).
- **Cada módulo de negocio:** controller (REST), service (reglas), entities (o solo Prisma), dto. Los servicios inyectan PrismaService y opcionalmente otros servicios.
- **prisma:** Un solo schema; migraciones versionadas; seed para permisos y datos de prueba.

---

## 6.4 Docker e infraestructura

```
docker/
├── Dockerfile.api
├── Dockerfile.web             # (opcional si se construye en CI)
docker-compose.yml             # api + postgres (+ web si se sirve desde mismo stack)
docker-compose.dev.yml         # para desarrollo local
```

```
erp-liviano/
├── .github/
│   └── workflows/             # CI: lint, test, build; CD según estrategia
├── .env.example
└── README.md
```

---

## 6.5 Documentación

```
docs/
├── 00-indice-diseno-erp.md
├── 01-arquitectura-sistema.md
├── 02-modelo-datos.md
├── 03-modulos-funcionales.md
├── 04-flujos-usuario.md
├── 05-diseno-permisos.md
├── 06-estructura-carpetas.md
├── 07-plan-desarrollo-fases.md
└── 08-estrategia-saas-escalabilidad.md
```

---

## 6.6 Resumen

| Capa | Raíz | Organización |
|------|------|--------------|
| Frontend | app/ (rutas), components/, features/, hooks/, lib/, types/ | App Router por sección; componentes por tipo y por feature |
| Backend | src/ por dominio (auth, users, sales, stock, …) | Un módulo NestJS por dominio; common para compartido |
| Datos | prisma/ | Un schema; migraciones en prisma/migrations |
| Infra | docker/, .github/ | Contenedores y CI/CD |

Esta estructura soporta escalabilidad y desarrollo por fases sin reorganizaciones grandes.
