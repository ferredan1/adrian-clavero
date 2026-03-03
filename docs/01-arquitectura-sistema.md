# 1. Arquitectura completa del sistema

## 1.1 Visión general

El sistema es una **plataforma web multi-tenant** que ofrece gestión comercial (ventas, compras, stock, clientes, proveedores, cuentas corrientes, obras, reportes y automatizaciones) para comercios minoristas y mayoristas. Se accede desde PC, tablet y celular mediante una aplicación responsive y PWA instalable.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE PRESENTACIÓN                               │
│  Next.js (App Router) · React · TypeScript · PWA · Mobile First             │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE API                                        │
│  NestJS · REST · JWT + Refresh · Middleware permisos · Rate limiting         │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
          ┌───────────────────────────┼───────────────────────────┐
          ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  Servicios      │         │  Servicios       │         │  Servicios       │
│  de negocio     │         │  multi-tenant    │         │  auditoría       │
│  (módulos)      │         │  y permisos      │         │  y logging       │
└─────────────────┘         └─────────────────┘         └─────────────────┘
          │                           │                           │
          └───────────────────────────┼───────────────────────────┘
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAPA DE DATOS                                      │
│  Prisma ORM · PostgreSQL · Transacciones · Migraciones versionadas          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1.2 Principios arquitectónicos

| Principio | Aplicación |
|-----------|------------|
| **Modularidad** | Módulos funcionales independientes (ventas, compras, stock, etc.) con fronteras claras. |
| **Multi-tenant por diseño** | Todas las consultas y escrituras están acotadas por `tenantId` (cuenta/organización). |
| **Seguridad por capas** | Autenticación (JWT), autorización (permisos por acción y sucursal), validación de entrada, auditoría. |
| **Escalabilidad horizontal** | Stateless API; sesión en tokens; base de datos preparada para réplicas de lectura. |
| **Configuración sobre código** | Reglas de negocio parametrizables (listas de precios, tipos de comprobante, medios de pago) sin hardcodear. |
| **Preparación para integraciones** | Servicios de integración aislados (Google, AFIP/ARCA futuros) con interfaces bien definidas. |

---

## 1.3 Capas del sistema

### 1.3.1 Capa de presentación (Frontend)

- **Framework:** Next.js 14+ con App Router.
- **Lenguaje:** TypeScript obligatorio.
- **UI:** Componentes reutilizables, diseño system (tokens), tema claro/oscuro opcional.
- **Estado:** Combinación de estado local, estado de servidor (React Query / SWR) y estado global mínimo (auth, tenant, sucursal activa).
- **PWA:** Service worker, manifest, instalable, soporte offline básico (cache de assets y datos críticos).
- **Responsive:** Mobile first; breakpoints definidos; tablas/cards adaptativas.
- **Accesibilidad:** ARIA, contraste, navegación por teclado.

**Responsabilidades:** Renderizado, navegación, formularios, validación de UI, llamadas a API, manejo de errores y loading.

### 1.3.2 Capa de API (Backend)

- **Framework:** NestJS.
- **Estilo:** REST; convenciones de rutas y códigos HTTP consistentes.
- **Autenticación:** JWT (access token corto) + refresh token (rotación), almacenamiento seguro en cliente.
- **Autorización:** Middleware que resuelve tenant, usuario y sucursales permitidas; verificación de permisos por recurso y acción antes de ejecutar lógica.
- **Multi-tenant:** Header o claim con `tenantId`; inyección de tenant en servicios y repositorios; sin datos cruzados entre tenants.
- **Validación:** DTOs con class-validator; sanitización de entradas.
- **Logging:** Request ID, usuario, tenant, módulo, nivel (info, warn, error).
- **Rate limiting:** Por tenant y por IP para evitar abuso.

**Responsabilidades:** Orquestar servicios de negocio, aplicar permisos, transformar DTOs, devolver respuestas normalizadas y códigos HTTP correctos.

### 1.3.3 Capa de servicios de negocio

- **Organización:** Un módulo NestJS por dominio (ventas, compras, stock, clientes, proveedores, tesorería, reportes, etc.).
- **Reglas de negocio:** Residen aquí; no en controladores ni en Prisma. Servicios consumen repositorios o Prisma directamente según convención del proyecto.
- **Transacciones:** Operaciones que afectan múltiples entidades (ej. venta + movimiento de stock + cuenta corriente) se ejecutan en transacciones Prisma.
- **Eventos internos:** Opcionalmente eventos de dominio (ej. “VentaCreada”) para desacoplar lógica (ej. notificaciones, integraciones) sin bloquear el flujo principal.
- **Integraciones:** Servicios dedicados (Google Sheets, Gmail, Drive, Calendar, Apps Script) detrás de interfaces; el core del ERP no depende de ellos.

**Responsabilidades:** Implementar casos de uso, garantizar consistencia y cumplir reglas de negocio.

### 1.3.4 Capa de datos

- **ORM:** Prisma.
- **BD:** PostgreSQL.
- **Migraciones:** Versionadas y reversibles; ejecutadas en pipeline de despliegue.
- **Integridad:** Claves foráneas, índices por tenant y por fechas/estados según consultas frecuentes.
- **Auditoría:** Tablas o columnas de auditoría (createdAt, updatedAt, createdBy, etc.) según diseño de permisos y modelo de datos.
- **Sin lógica de negocio en BD:** Solo constraints y triggers mínimos si se justifican; lógica en servicios.

**Responsabilidades:** Persistencia, consistencia física, historial auditable.

---

## 1.4 Multi-tenant

- **Modelo:** Un tenant = una organización/cuenta (empresa que usa el sistema). Cada tenant tiene una o más sucursales.
- **Aislamiento:** Todas las tablas de negocio tienen `tenantId`. Las consultas siempre filtran por `tenantId` (inyectado desde el contexto del usuario autenticado).
- **Identificación del tenant:** En cada request, el backend obtiene el tenant desde el JWT o desde la relación usuario → cuenta. No se confía en headers manipulables para datos sensibles.
- **Recursos compartidos:** Códigos de producto, categorías, marcas pueden ser por tenant o globales según decisión de modelo de datos; la documentación de modelo lo definirá.
- **Escalabilidad futura:** Posible sharding por tenant si crece el volumen; esquema actual debe evitar consultas cross-tenant.

---

## 1.5 Seguridad

- **Autenticación:** Login con email/contraseña; JWT corto (ej. 15 min) + refresh token (días, en BD o cache revocable). Logout invalida refresh token.
- **HTTPS:** Obligatorio en producción.
- **Secrets:** Variables de entorno; nunca en código. Secrets de integraciones (Google, etc.) en vault o variables cifradas.
- **Permisos:** Granulares por recurso y acción (ver documento de permisos). Incluye alcance por sucursal (un usuario puede ver solo sucursales asignadas).
- **Auditoría:** Registro de acciones sensibles (altas, modificaciones, anulaciones) con usuario, fecha, tenant y datos mínimos necesarios para trazabilidad.
- **Preparación AFIP/ARCA:** Sin implementar; diseño de datos y de flujos debe permitir añadir tipos de comprobante, numeración y estados fiscales sin rehacer el core.

---

## 1.6 Integraciones (opcionales)

El sistema debe funcionar **sin** ninguna integración externa. Las integraciones son opcionales y aisladas:

| Integración | Uso | Ubicación en arquitectura |
|-------------|-----|----------------------------|
| Google Sheets | Exportar reportes, importar listas de precios | Servicio de integración; no en core. |
| Gmail | Envío de comprobantes, presupuestos, OC | Servicio de integración; cola o jobs. |
| Google Drive | Adjuntos, guardar comprobantes | Servicio de integración. |
| Google Calendar | Recordatorios, vencimientos, seguimiento pagos | Servicio de integración. |
| Apps Script | Automatizaciones externas | El ERP expone API o webhooks; la lógica vive fuera. |
| AFIP/ARCA | Futuro: fiscalidad | Módulo futuro; interfaz definida, no implementada. |

Todas se implementan como módulos o servicios que el core invoca; el core no conoce detalles de OAuth ni de APIs externas más allá de la interfaz propia.

---

## 1.7 Infraestructura y despliegue

- **Contenedores:** Docker para API y, si se desea, para front (Next.js puede ir a Vercel u otro).
- **Base de datos:** PostgreSQL gestionado (RDS, Cloud SQL, etc.) o en contenedor para desarrollo/staging.
- **Variables de entorno:** Por entorno (dev, staging, prod); secrets separados.
- **Logs:** Salida estándar; agregación externa (CloudWatch, Datadog, etc.) para producción.
- **Health checks:** Endpoint `/health` para BD y dependencias críticas.
- **Escalado:** API stateless; múltiples instancias detrás de balanceador; colas para jobs pesados (reportes, envíos masivos) si se requieren más adelante.

---

## 1.8 Resumen de decisiones

| Tema | Decisión |
|------|----------|
| Multi-tenant | Una BD, tenantId en tablas; aislamiento por filtro. |
| Autenticación | JWT + refresh token con rotación. |
| Permisos | Por acción y por sucursal; sin roles rígidos. |
| Reglas de negocio | En servicios backend; configurables donde aplique. |
| Integraciones | Opcionales; servicios aislados; sistema usable sin ellas. |
| Fiscalidad | Diseño preparado; implementación futura. |
| Frontend | Next.js App Router, TypeScript, PWA, mobile first. |
| Backend | NestJS, REST, Prisma, PostgreSQL. |

Este documento es la base para el modelo de datos, módulos funcionales, flujos, permisos, estructura de carpetas, plan de fases y estrategia SaaS que se detallan en el resto de la documentación.
