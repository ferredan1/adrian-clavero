# 7. Plan de desarrollo por fases

Plan de implementación por etapas, con hitos entregables y dependencias. Cada fase entrega valor usable y permite validar con usuarios reales antes de avanzar.

---

## 7.1 Criterios de las fases

- **Fase = conjunto de módulos y funcionalidades** que se entregan juntos.
- Cada fase termina con **versión desplegable** (aunque sea staging) y **criterios de aceptación** definidos.
- Las fases **no incluyen código** en este documento; solo alcance, orden y dependencias para que el desarrollo por etapas sea coherente con el diseño.
- Se prioriza: primero base (auth, tenant, permisos), luego catálogos y stock, después operaciones (ventas/compras) y tesorería, y por último reportes e integraciones.

---

## 7.2 Fase 0: Fundación (infraestructura y diseño)

**Objetivo:** Repositorio, entorno de desarrollo, BD, esquema base y pipeline listos para construir sobre ellos.

| Entregable | Descripción |
|------------|-------------|
| Monorepo o repos | Estructura de carpetas (web + api) según documento 06. |
| Base de datos | PostgreSQL en Docker o gestionado; Prisma instalado; schema inicial con tablas de tenant, sucursales, usuarios, permisos (según documento 02). |
| Migraciones | Primera migración versionada; seed mínimo (opcional: permisos del sistema). |
| API base | NestJS con módulos vacíos o mínimos: auth (login/refresh), tenants, branches, users, permissions. Sin lógica completa aún. |
| Frontend base | Next.js App Router, layout (auth) y (dashboard), rutas de login y placeholder de dashboard; cliente API con interceptors; manejo de tokens. |
| Docker | docker-compose con API + PostgreSQL (y opcionalmente web) para desarrollo. |
| Variables de entorno | .env.example documentado; validación en backend. |

**Criterios de aceptación:** Un desarrollador puede clonar, levantar con Docker, hacer login mock o real contra la API y ver una pantalla de dashboard vacía. La BD acepta migraciones.

**Duración estimada:** 2–3 semanas (referencial).

---

## 7.3 Fase 1: Autenticación, tenant y permisos

**Objetivo:** Sistema multi-tenant con login real, gestión de sucursales y usuarios, y permisos granulares operativos.

| Entregable | Descripción |
|------------|-------------|
| Autenticación | Login (email/contraseña), JWT + refresh token, logout, cambio de contraseña. Middleware que inyecta tenant y usuario. |
| Tenant | CRUD de datos de la organización (nombre, documento, etc.); una cuenta por defecto en seed o registro inicial. |
| Sucursales | CRUD sucursales por tenant; al menos una sucursal por tenant. |
| Usuarios | CRUD usuarios del tenant; asignación de permisos (lista del documento 05) y de sucursales; sucursal por defecto. |
| Permisos | Catálogo de permisos en BD (seed); guard que verifica permiso por ruta/acción; filtro de datos por sucursales del usuario en todas las consultas que corresponda. |
| Frontend | Pantallas: Login, recuperar contraseña, selección de sucursal (si aplica), dashboard vacío o con mensaje de bienvenida. Configuración: ABM sucursales, ABM usuarios con pestañas Permisos y Sucursales. |
| Auditoría básica | Registro de login/logout y de cambios en usuarios/permisos (quién, cuándo). |

**Criterios de aceptación:** Un admin puede crear sucursales, crear otro usuario, asignarle permisos y sucursales; ese usuario solo ve lo permitido y solo datos de sus sucursales. Los tokens se renuevan correctamente.

**Dependencias:** Fase 0.

**Duración estimada:** 3–4 semanas.

---

## 7.4 Fase 2: Catálogos y productos

**Objetivo:** Catálogos base y módulo de productos operativo, sin ventas ni stock aún.

| Entregable | Descripción |
|------------|-------------|
| Categorías / Rubros | CRUD; soporte jerárquico (padre/hijo) si se definió en modelo. |
| Marcas | CRUD. |
| Medios de pago | CRUD (Efectivo, Transferencia, Tarjeta, Cheque, etc.). |
| Tipos de comprobante | Catálogo y configuración de puntos de venta/numeración por sucursal (preparado AFIP; solo uso interno). |
| Productos | CRUD producto (código, nombre, categoría, marca, unidad, código de barras, atributos opcionales). Filtros por categoría, marca; filtro por proveedor cuando exista relación producto–proveedor. |
| Listas de precios | CRUD lista; precios por producto por lista; importación/exportación básica (CSV/Excel) si aplica. |
| Frontend | Pantallas de catálogos (categorías, marcas, medios de pago), productos (listado + alta/edición), listas de precios (listado + edición de precios). |
| Permisos | Aplicar permisos de documento 05 para catalog.*, products.*, price_lists.*. |

**Criterios de aceptación:** Se pueden dar de alta productos, categorías, marcas y al menos una lista de precios con precios por producto. Los filtros de productos funcionan por categoría y marca.

**Dependencias:** Fase 1.

**Duración estimada:** 2–3 semanas.

---

## 7.5 Fase 3: Stock y consulta de precios/stock

**Objetivo:** Stock por producto y sucursal, movimientos auditables, y pantalla única de consulta de precios y stock con acción a OC.

| Entregable | Descripción |
|------------|-------------|
| Stock | Modelo de stock por (producto, sucursal); movimientos (IN, OUT, ADJUSTMENT); ajuste manual con motivo y auditoría; historial de movimientos por producto/sucursal. |
| Reglas de stock | Permitir stock negativo; advertencia visible en UI (badge, color). Reserva opcional (para pedidos) en fase posterior. |
| Consulta precios y stock | Pantalla con filtros (producto, lista de precios, sucursal, categoría, marca, proveedor); resultados con precio, stock, costo; exportar. |
| Acción “Generar OC” | Desde consulta (por producto o selección), abrir alta de orden de compra con ítem(s) y proveedor precargados cuando exista. |
| Frontend | Pantallas: listado de stock por sucursal, detalle de producto con movimientos, ajuste de stock, consulta de precios y stock. Botón/acción “Generar orden de compra” en consulta. |
| Permisos | stock.*, stock_query.*. |

**Criterios de aceptación:** Al cargar stock inicial o hacer ajuste, se registran movimientos. La consulta muestra precios y stock por lista y sucursal; desde ahí se puede iniciar una OC con producto y proveedor cargados.

**Dependencias:** Fase 2 (productos, listas, sucursales). Proveedores y OC se implementan en Fase 4; “Generar OC” puede abrir formulario básico que se completará en Fase 4.

**Duración estimada:** 2–3 semanas.

---

## 7.6 Fase 4: Clientes, obras, proveedores

**Objetivo:** ABM de clientes y obras, ABM de proveedores, y relación producto–proveedor para filtrar y para OC.

| Entregable | Descripción |
|------------|-------------|
| Clientes | CRUD cliente (datos fiscales, contacto, sucursal de alta); listado con búsqueda; ficha con saldo de cuenta corriente (calculado; movimientos en Fase 5). |
| Obras | CRUD obra (cliente, nombre, estado OPEN/ACTIVE/CLOSED); listado por cliente; abrir/cerrar obra. |
| Proveedores | CRUD proveedor; listado con búsqueda; ficha con saldo (calculado). Relación producto–proveedor (uno o más proveedores por producto) para filtros y “Generar OC”. |
| Órdenes de compra | CRUD orden de compra (proveedor, sucursal, ítems con producto y cantidad); estados (borrador, enviada, pendiente recepción, recibida, cancelada). Sin impacto en stock aún (recepción en Fase 5). |
| Frontend | Pantallas: clientes (listado, alta/edición, ficha), obras (listado por cliente, alta/edición), proveedores (listado, alta/edición, ficha), órdenes de compra (listado, alta/edición). Completar flujo “Generar OC” desde consulta de precios/stock. |
| Permisos | clients.*, works.*, suppliers.*, purchase_orders.*. |

**Criterios de aceptación:** Se pueden crear clientes, obras y proveedores; se pueden crear OC con ítems; desde la consulta de precios/stock se genera una OC con producto y proveedor cargados.

**Dependencias:** Fase 2 (productos), Fase 3 (consulta). Fase 1 (sucursales, permisos).

**Duración estimada:** 3–4 semanas.

---

## 7.7 Fase 5: Ventas y compras (documentos con impacto)

**Objetivo:** Ciclo de ventas y compras completo con impacto en stock y cuentas corrientes.

| Entregable | Descripción |
|------------|-------------|
| Presupuestos | CRUD presupuesto (cliente, obra opcional, ítems, totales); estados; convertir a pedido o venta. |
| Pedidos | CRUD pedido; opcional reserva de stock; convertir a venta. |
| Ventas | CRUD venta (cliente, obra opcional, sucursal, ítems); borrador → confirmada. Al confirmar: movimientos de stock (OUT), movimiento en cuenta corriente cliente (y obra si aplica). Numeración interna por punto de venta. |
| Notas de crédito / débito | Alta de NC/ND referenciando venta; impacto en stock (NC) y cuenta corriente. |
| Compras | CRUD compra (proveedor, sucursal, ítems); opcional vinculación a OC; al confirmar: movimientos de stock (IN), movimiento en cuenta corriente proveedor. |
| Gastos | CRUD gasto (proveedor opcional, monto); al confirmar: movimiento en cuenta proveedor. |
| Cuentas corrientes | Modelo de movimientos (cliente y proveedor); saldo calculado; vistas de detalle por cliente/obra y por proveedor. |
| Frontend | Pantallas: presupuestos (listado, alta/edición, convertir), pedidos (listado, alta/edición, convertir), ventas (listado, alta/edición, impresión), NC/ND, compras (listado, alta/edición, vincular OC), gastos. Vistas de cuenta corriente en ficha de cliente y proveedor. |
| Permisos | estimates.*, orders.*, sales.*, credit_debit_notes.*, purchases.*, expenses.*. |
| Deuda de mercadería | Si se implementa: campo o lógica para entrega parcial (cantidad facturada vs entregada); movimientos de stock solo por lo entregado. |

**Criterios de aceptación:** Una venta confirmada descuenta stock y genera deuda en cuenta cliente. Una compra confirmada aumenta stock y genera deuda en proveedor. Un pago (Fase 6) podrá aplicarse a esas deudas. NC/ND ajustan saldo y, si aplica, stock.

**Dependencias:** Fases 1–4 (clientes, obras, proveedores, productos, stock, OC).

**Duración estimada:** 4–5 semanas.

---

## 7.8 Fase 6: Pagos y tesorería

**Objetivo:** Pagos de clientes y pagos a proveedores con aplicación a facturas/obras y múltiples medios de pago.

| Entregable | Descripción |
|------------|-------------|
| Pagos de clientes | Alta de pago (cliente, obra opcional o cuenta general, monto, fecha); desglose por medios de pago; aplicación a comprobantes (parcial/total) o a cuenta general; al confirmar: movimientos en cuenta corriente. |
| Pagos a proveedores | Alta de pago (proveedor, monto, fecha); desglose por medios; aplicación a compras/gastos; movimientos en cuenta proveedor. |
| Vistas de tesorería | Listado de pagos (clientes y proveedores); filtros por fecha, cliente, proveedor. Cuentas corrientes: saldos y movimientos por cliente (general + por obra) y por proveedor. |
| Frontend | Pantallas: nuevo pago cliente (pasos: datos, medios, aplicación), nuevo pago proveedor, listados, detalle de pago. Mejoras en fichas de cliente/proveedor con saldo y últimos movimientos. |
| Permisos | client_payments.*, supplier_payments.*. |

**Criterios de aceptación:** Un pago de cliente se aplica a una o varias facturas o a cuenta general; el saldo del cliente y el estado de cobro de las facturas se actualizan. Igual para pagos a proveedores.

**Dependencias:** Fase 5 (ventas, compras, cuentas corrientes).

**Duración estimada:** 2–3 semanas.

---

## 7.9 Fase 7: Reportes y dashboards

**Objetivo:** Dashboard ejecutivo y reportes exportables (PDF/Excel).

| Entregable | Descripción |
|------------|-------------|
| Dashboard | Tarjetas/KPIs: ventas del período, compras del período, stock crítico (umbral configurable), saldos clientes, saldos proveedores, obras abiertas. Gráficos: facturación mensual, comparativa cobros vs pagos (según documento 04). Filtro por período y sucursal(es); respeto de permisos y alcance por sucursal. |
| Reportes | Ventas por período, compras por período, stock crítico, rentabilidad (ventas vs costos), saldos clientes, saldos proveedores, obras abiertas/cerradas, movimientos de cuenta, listado de productos con precios/stock. Parámetros: fechas, sucursal, formato. |
| Exportación | PDF y Excel para cada reporte; descarga desde la UI. |
| Frontend | Pantalla de inicio (dashboard) con widgets; sección Reportes con selector de tipo, parámetros y botón exportar. |
| Permisos | reports.read, reports.export, reports.all_branches. |

**Criterios de aceptación:** El dashboard muestra datos reales según permisos y sucursales. Cada reporte se genera con filtros y se exporta en PDF y Excel.

**Dependencias:** Fases 1–6.

**Duración estimada:** 2–3 semanas.

---

## 7.10 Fase 8: PWA, ajustes mobile y auditoría

**Objetivo:** PWA instalable, experiencia mobile pulida y auditoría consultable.

| Entregable | Descripción |
|------------|-------------|
| PWA | manifest.json, service worker (cache de assets y opcionalmente datos críticos), íconos; instalable en móvil y escritorio. |
| Mobile | Revisión de formularios largos (pasos o secciones), tablas en cards o listas, navegación (menú inferior o hamburguesa), touch targets. |
| Auditoría | Pantalla de consulta de auditoría (quién, cuándo, qué acción, sobre qué recurso) para usuarios con permiso audit.read; filtros por usuario, fecha, módulo. |
| Configuración | Pantalla de configuración general del tenant (moneda, formato de fecha, etc.) y enlace a usuarios/sucursales. |
| Permisos | audit.read; settings.*. |

**Criterios de aceptación:** La app es instalable como PWA; las pantallas principales son usables en móvil. Un admin puede consultar el registro de auditoría.

**Dependencias:** Fases 1–7.

**Duración estimada:** 1–2 semanas.

---

## 7.11 Fase 9: Integraciones opcionales (Google y preparación Apps Script)

**Objetivo:** Integraciones Google opcionales y punto de enganche para automatizaciones externas.

| Entregable | Descripción |
|------------|-------------|
| Google OAuth | Flujo de conexión (Sheets, Gmail, Drive, Calendar según alcance); guardar tokens cifrados por tenant; pantalla de configuración de integraciones. |
| Google Sheets | Exportar reportes a una hoja; importar listas de precios desde hoja (formato definido). |
| Gmail | Envío de comprobantes (venta, presupuesto) por email desde el sistema. |
| Drive | Subir comprobantes como PDF a una carpeta; adjuntar documentos a entidades (opcional). |
| Calendar | Recordatorios de vencimientos o seguimiento de pagos (eventos o recordatorios). |
| Apps Script / API | Endpoints o webhooks documentados para que scripts externos consuman datos o disparen acciones sin exponer lógica core; documentación de uso. |
| Frontend | Sección Configuración → Integraciones: conectar/desconectar Google; opciones de envío automático y exportación. |

**Criterios de aceptación:** El sistema sigue funcionando sin conectar Google. Con Google conectado, se puede exportar un reporte a Sheets, enviar una factura por Gmail y, si aplica, crear evento en Calendar. La documentación permite a un desarrollador usar la API o webhooks para automatizaciones externas.

**Dependencias:** Fases 1–8.

**Duración estimada:** 3–4 semanas (depende del alcance de cada integración).

---

## 7.12 Fase 10: Preparación AFIP/ARCA (solo diseño y extensibilidad)

**Objetivo:** No implementar integración fiscal; asegurar que el modelo y los flujos permitan añadirla después.

| Entregable | Descripción |
|------------|-------------|
| Modelo y numeración | Tipos de comprobante y puntos de venta ya existen (Fase 2). Revisar que campos fiscalNumber, fiscalState, etc. estén en el modelo o se puedan añadir sin romper ventas/compras. |
| Documentación | Nota de diseño: dónde y cómo se integraría AFIP/ARCA (servicio de facturación electrónica, actualización de estados); no código. |
| Opcional | Pantalla o campos “solo lectura” o placeholder para estado fiscal en comprobantes, sin lógica real. |

**Criterios de aceptación:** Un desarrollador futuro puede leer la documentación y el modelo de datos y saber dónde conectar la integración fiscal sin rehacer el core de ventas/compras.

**Dependencias:** Fases 1–7.

**Duración estimada:** 0.5–1 semana (solo diseño y revisión).

---

## 7.13 Resumen de fases y orden

| Fase | Nombre | Duración ref. | Entregable clave |
|------|--------|----------------|------------------|
| 0 | Fundación | 2–3 sem | Repo, BD, API/front base, Docker |
| 1 | Auth, tenant, permisos | 3–4 sem | Login, usuarios, permisos, sucursales |
| 2 | Catálogos y productos | 2–3 sem | Productos, listas de precios, tipos comprobante |
| 3 | Stock y consulta | 2–3 sem | Stock, movimientos, consulta precios/stock, “Generar OC” |
| 4 | Clientes, obras, proveedores, OC | 3–4 sem | ABM clientes/obras/proveedores, OC completo |
| 5 | Ventas y compras | 4–5 sem | Presupuestos, pedidos, ventas, NC/ND, compras, gastos, CC |
| 6 | Pagos y tesorería | 2–3 sem | Pagos clientes/proveedores, aplicación, vistas CC |
| 7 | Reportes y dashboards | 2–3 sem | Dashboard, reportes, export PDF/Excel |
| 8 | PWA, mobile, auditoría | 1–2 sem | PWA, UX mobile, consulta auditoría |
| 9 | Integraciones Google | 3–4 sem | Sheets, Gmail, Drive, Calendar, API/webhooks |
| 10 | Prep. AFIP/ARCA | 0.5–1 sem | Diseño y documentación, sin implementar |

**Tiempo total estimado (referencial):** del orden de 24–35 semanas, según ritmo y alcance de cada fase. Se puede acortar solapando tareas o reduciendo alcance en Fase 9.

---

## 7.14 Criterios de priorización

- **Crítico para MVP:** Fases 0–7 (hasta reportes y dashboards con exportación). Con eso el ERP es usable de punta a punta para un comercio.
- **Importante para producto comercial:** Fase 8 (PWA y mobile) y Fase 1 bien hecha (permisos y multi-tenant).
- **Diferenciador:** Fase 9 (integraciones) y diseño de permisos (Fase 1).
- **Futuro:** Fase 10 y cualquier integración fiscal real.

Este plan permite desarrollar por etapas sin generar código hasta que cada fase esté acotada según este diseño de producto.
