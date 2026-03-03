# 3. Lista de módulos funcionales

Lista de módulos del ERP liviano con alcance, pantallas principales y dependencias. La prioridad y el orden de implementación se definen en el plan de fases.

---

## 3.1 Módulos transversales (core)

### 3.1.1 Autenticación y sesión
**Objetivo:** Login, logout, refresh token, recuperación de contraseña y contexto de usuario/tenant/sucursal.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Login, recuperar contraseña, selección de sucursal (si tiene varias). |
| Funciones | Login (email/contraseña), refresh token, logout, cambio de contraseña (post-login). |
| Contexto global | Tenant, usuario, sucursales permitidas, sucursal activa, permisos cargados. |
| Dependencias | Ninguna (es la base). |

---

### 3.1.2 Administración de tenant y sucursales
**Objetivo:** Dar de alta y editar la organización y sus sucursales (para cuentas con permiso).

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Configuración de cuenta (nombre, datos fiscales, logo), listado y ABM de sucursales. |
| Funciones | CRUD sucursal, activar/desactivar, definir sucursal por defecto. |
| Reglas | Al menos una sucursal activa. Stock y operaciones se asocian a sucursal. |
| Dependencias | Autenticación. |

---

### 3.1.3 Usuarios y permisos
**Objetivo:** Gestionar usuarios del tenant y asignar permisos granulares y sucursales visibles.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado de usuarios, alta/edición de usuario, asignación de permisos, asignación de sucursales. |
| Funciones | CRUD usuario, asignar/revocar permisos por acción, asignar sucursales (alcance de datos). |
| Reglas | Sin roles rígidos; permisos por acción (ver documento 05-diseno-permisos). Un usuario solo ve datos de sucursales asignadas. |
| Dependencias | Autenticación, tenant. |

---

## 3.2 Catálogos base

### 3.2.1 Categorías / Rubros
**Objetivo:** Clasificar productos (árbol de categorías si aplica).

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado, alta/edición, orden o jerarquía. |
| Funciones | CRUD categoría, activar/desactivar. |
| Dependencias | Tenant. |

---

### 3.2.2 Marcas
**Objetivo:** Atributo de producto para filtros y listados.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado, alta/edición. |
| Funciones | CRUD marca. |
| Dependencias | Tenant. |

---

### 3.2.3 Medios de pago
**Objetivo:** Catálogo por tenant (Efectivo, Transferencia, Tarjeta, Cheque, etc.) para ventas y pagos.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado, alta/edición. |
| Funciones | CRUD medio de pago, activar/desactivar. |
| Dependencias | Tenant. |

---

### 3.2.4 Tipos de comprobante (configuración)
**Objetivo:** Definir tipos usados en ventas/compras (Presupuesto, Pedido, Factura, NC, ND, etc.) y preparar numeración.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado de tipos (puede ser solo lectura inicial), configuración de puntos de venta y numeración por sucursal. |
| Funciones | Lectura de tipos, CRUD de punto de venta / numeración por sucursal y tipo. |
| Dependencias | Tenant, sucursales. |

---

## 3.3 Productos y precios

### 3.3.1 Productos
**Objetivo:** Mantener el catálogo de productos (código, nombre, categoría, marca, unidad, atributos, código de barras).

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con filtros (código, nombre, proveedor, marca, categoría), alta/edición, búsqueda rápida. |
| Funciones | CRUD producto, filtros por proveedor/marca/categoría, atributos configurables (talle, color, etc.). |
| Reglas | Código único por tenant. |
| Dependencias | Categorías, marcas, tenant. |

---

### 3.3.2 Listas de precios
**Objetivo:** Múltiples listas de precios por tenant con precios y costos por producto.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado de listas, alta/edición de lista, carga masiva de precios (por producto o importación). |
| Funciones | CRUD lista, CRUD precio por producto, importar/exportar (ej. Excel/Google Sheets). |
| Reglas | Una lista puede marcarse como default. Preparado para cálculos automáticos (márgenes, etc.). |
| Dependencias | Productos, tenant. |

---

### 3.3.3 Consulta de precios y stock
**Objetivo:** Una sola pantalla para ver precios y stock por producto/sucursal/lista, con acciones rápidas.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Filtros (producto, categoría, marca, proveedor, lista de precios, depósito/sucursal), tabla/cards de resultados (precio, stock, costo), advertencia de stock negativo. |
| Funciones | Búsqueda y filtrado, ordenar por columnas, exportar. Acción: “Generar orden de compra” asociada al proveedor del producto (o proveedor principal). |
| Reglas | Stock por sucursal; múltiples listas; stock negativo permitido con advertencia visible. |
| Dependencias | Productos, listas de precios, stock, sucursales. |

**Mejora respecto a referencia (Dux):** Menos filtros visibles por defecto, agrupación colapsable, diseño mobile friendly y acción directa a OC desde la misma pantalla.

---

## 3.4 Stock

### 3.4.1 Stock e inventario
**Objetivo:** Ver y ajustar stock por producto y sucursal; historial de movimientos.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado de stock por sucursal (producto, cantidad, reservado, alertas), detalle de producto con historial de movimientos, pantalla de ajuste manual. |
| Funciones | Consulta por sucursal/producto, ajuste de stock (con motivo y auditoría), historial de movimientos (entradas, salidas, ajustes, transferencias). |
| Reglas | Stock independiente por sucursal; movimientos inmutables; permitir stock negativo con advertencia. |
| Dependencias | Productos, sucursales, movimientos de stock. |

---

### 3.4.2 Transferencias entre sucursales (opcional en Fase 1)
**Objetivo:** Mover stock de una sucursal a otra con trazabilidad.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Alta de transferencia (origen, destino, ítems), listado de transferencias, detalle. |
| Funciones | Crear transferencia, confirmar recepción; genera movimientos OUT en origen e IN en destino. |
| Dependencias | Stock, sucursales. |

---

## 3.5 Clientes y obras

### 3.5.1 Clientes
**Objetivo:** ABM de clientes y vista de cuenta corriente general.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con búsqueda/filtros, alta/edición de cliente, ficha de cliente con saldo y movimientos recientes. |
| Funciones | CRUD cliente, ver saldo y movimientos de cuenta general. |
| Reglas | Cuenta corriente general por cliente (saldo calculado). |
| Dependencias | Tenant, sucursales. |

---

### 3.5.2 Obras / Proyectos
**Objetivo:** Asociar obras a clientes y opcionalmente ventas y pagos por obra.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado de obras por cliente (o global), alta/edición de obra, estados (abierta, activa, cerrada). |
| Funciones | CRUD obra, abrir/cerrar obra, filtrar ventas y pagos por obra. |
| Reglas | Obras opcionales; un cliente puede tener varias; ventas y pagos pueden asociarse a obra o a cuenta general. |
| Dependencias | Clientes. |

---

## 3.6 Ventas (facturación)

### 3.6.1 Presupuestos
**Objetivo:** Crear y gestionar presupuestos; opcionalmente convertirlos en pedido o venta.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con filtros (fecha, cliente, estado), alta/edición de presupuesto (cliente, obra, ítems, totales), detalle e impresión. |
| Funciones | CRUD presupuesto, duplicar, convertir a pedido o venta, enviar por email (si integración Gmail). |
| Reglas | Estados: borrador, enviado, aprobado, rechazado, vencido (según reglas de negocio). |
| Dependencias | Clientes, obras, productos, listas de precios, stock (para reserva opcional). |

---

### 3.6.2 Pedidos
**Objetivo:** Pedidos de venta con posibilidad de reserva de stock y conversión a venta.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con filtros, alta/edición de pedido, detalle, conversión a venta. |
| Funciones | CRUD pedido, reservar stock (opcional), convertir a venta. |
| Dependencias | Clientes, obras, productos, stock. |

---

### 3.6.3 Ventas (comprobantes de venta)
**Objetivo:** Registrar ventas; descontar stock y actualizar cuenta corriente.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con filtros (fecha, cliente, sucursal, estado), alta/edición de venta, detalle, impresión, envío por email. |
| Funciones | CRUD venta (borrador → confirmada), anular, imprimir, enviar. Al confirmar: movimientos de stock (OUT), movimiento de cuenta corriente (deuda). |
| Reglas | Sucursal obligatoria; cliente obligatorio; opcional obra; permitir deuda de mercadería (entrega parcial) si se define en reglas. |
| Dependencias | Clientes, obras, productos, stock, listas de precios, medios de pago, tipos de comprobante. |

---

### 3.6.4 Notas de crédito y débito
**Objetivo:** Ajustes sobre ventas (devoluciones, recargos).

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado, alta de NC/ND referenciando factura, detalle. |
| Funciones | Crear NC/ND vinculada a venta; afectar stock (NC devolución) y cuenta corriente. |
| Dependencias | Ventas, productos, stock. |

---

## 3.7 Compras

### 3.7.1 Órdenes de compra
**Objetivo:** Crear y gestionar órdenes de compra a proveedores; opcionalmente generarlas desde consulta de stock/precios.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con filtros (fecha, proveedor, estado), alta/edición de OC, detalle, envío por email. |
| Funciones | CRUD orden de compra, duplicar, recibir parcial/total (vinculado a compra o recepción). Generar desde consulta de precios/stock con proveedor preseleccionado. |
| Reglas | Estados: borrador, enviada, parcialmente recibida, recibida, cancelada. |
| Dependencias | Proveedores, productos, sucursales. |

---

### 3.7.2 Compras (recepción / factura de compra)
**Objetivo:** Registrar compras; dar de alta stock y actualizar cuenta corriente del proveedor.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con filtros, alta/edición de compra (con o sin OC vinculada), detalle. |
| Funciones | CRUD compra; al confirmar: movimientos de stock (IN), movimiento de cuenta corriente proveedor. Vincular a OC y actualizar cantidades recibidas. |
| Dependencias | Proveedores, productos, órdenes de compra, sucursales. |

---

### 3.7.3 Gastos (asociados a proveedor)
**Objetivo:** Registrar gastos que afectan la cuenta del proveedor.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado, alta/edición de gasto (proveedor opcional), detalle. |
| Funciones | CRUD gasto; al confirmar: movimiento en cuenta corriente proveedor. |
| Dependencias | Proveedores, sucursales. |

---

## 3.8 Proveedores

### 3.8.1 Proveedores
**Objetivo:** ABM de proveedores y vista de cuenta corriente.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado con búsqueda, alta/edición de proveedor, ficha con saldo y movimientos. |
| Funciones | CRUD proveedor, ver saldo y movimientos (compras, gastos, pagos). |
| Reglas | Una sola cuenta corriente por proveedor. |
| Dependencias | Tenant. |

---

## 3.9 Tesorería / Cuentas corrientes

### 3.9.1 Pagos de clientes
**Objetivo:** Registrar pagos y aplicarlos a cuenta general o a obra; soporte de pagos parciales y múltiples medios.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado de pagos, alta/edición de pago (cliente, obra opcional, monto, aplicación a facturas o cuenta general, desglose por medio de pago), detalle. |
| Funciones | CRUD pago, aplicar a uno o varios comprobantes (parcial o total), varios medios de pago en un mismo pago. |
| Reglas | Pago puede ser a cuenta general o a obra; aplicaciones suman el total del pago. |
| Dependencias | Clientes, obras, medios de pago, ventas (para aplicación). |

---

### 3.9.2 Pagos a proveedores
**Objetivo:** Registrar pagos a proveedores y aplicarlos a compras/gastos.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Listado, alta/edición de pago (proveedor, monto, aplicación a compras/gastos, medios de pago), detalle. |
| Funciones | CRUD pago, aplicar a compras/gastos, múltiples medios. |
| Dependencias | Proveedores, compras, gastos, medios de pago. |

---

### 3.9.3 Cuentas corrientes (vistas consolidadas)
**Objetivo:** Ver saldos y movimientos de clientes y proveedores en vistas dedicadas.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Vista por cliente (cuenta general + por obra), vista por proveedor, filtros por fecha y estado. |
| Funciones | Listado de saldos, detalle de movimientos, exportar. |
| Dependencias | Clientes, obras, proveedores, ventas, compras, pagos. |

---

## 3.10 Reportes y dashboards

### 3.10.1 Dashboards
**Objetivo:** Resumen ejecutivo con KPIs y gráficos en tiempo (casi) real.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Panel principal: ventas por período, compras por período, stock crítico, saldos clientes/proveedores, obras abiertas, comparativa cobros/pagos (opcional). |
| Funciones | Filtro por período y sucursal; gráficos (barras, líneas); tarjetas de totales. |
| Reglas | Respetar permisos de sucursal; reportes consolidados o por sucursal según permiso. |
| Dependencias | Ventas, compras, stock, cuentas corrientes, obras. |

---

### 3.10.2 Reportes
**Objetivo:** Reportes detallados exportables (PDF, Excel).

| Elemento | Descripción |
|----------|-------------|
| Reportes | Ventas por período, compras por período, stock crítico, rentabilidad (ventas vs costos), saldos clientes, saldos proveedores, obras abiertas/cerradas, movimientos de cuenta, listado de productos con precios/stock. |
| Pantallas | Selección de reporte, parámetros (fechas, sucursal, formato), vista previa o descarga. |
| Funciones | Generar reporte, exportar PDF/Excel; opcional: envío programado o integración Google Sheets. |
| Dependencias | Todos los módulos de datos. |

---

## 3.11 Automatizaciones (preparación)

### 3.11.1 Automatizaciones y integraciones
**Objetivo:** No implementar lógica core en este módulo; preparar hooks y configuración para Apps Script e integraciones Google.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Configuración de conexiones (Google), parámetros de envío (Gmail, Drive), recordatorios (Calendar). No implementar en Fase 1 si no está en el plan. |
| Funciones | OAuth Google (opcional), guardar tokens, disparar envíos desde el ERP; API o webhooks para Apps Script. |
| Reglas | El sistema funciona sin integraciones; son opcionales. |
| Dependencias | Módulos de ventas, compras, reportes. |

---

## 3.12 Configuración y auditoría

### 3.12.1 Configuración general
**Objetivo:** Parámetros del tenant (moneda, formato de fecha, impresión, etc.).

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Pantalla de configuración por secciones (general, facturación, integraciones). |
| Dependencias | Tenant. |

---

### 3.12.2 Auditoría y logs
**Objetivo:** Trazabilidad de operaciones sensibles.

| Elemento | Descripción |
|----------|-------------|
| Pantallas | Consulta de auditoría (quién, cuándo, qué) para admins; filtros por usuario, fecha, módulo. |
| Funciones | Registro en BD o log de acciones (alta, modificación, anulación) con usuario y datos mínimos. |
| Dependencias | Todos los módulos. |

---

## 3.13 Resumen de módulos

| # | Módulo | Prioridad sugerida | Dependencias principales |
|---|--------|--------------------|---------------------------|
| 1 | Autenticación y sesión | 1 | - |
| 2 | Tenant y sucursales | 2 | Auth |
| 3 | Usuarios y permisos | 3 | Auth, Tenant |
| 4 | Categorías, Marcas, Medios de pago, Tipos comprobante | 4 | Tenant |
| 5 | Productos | 5 | Catálogos |
| 6 | Listas de precios | 6 | Productos |
| 7 | Stock | 7 | Productos, Sucursales |
| 8 | Consulta precios y stock | 8 | Productos, Listas, Stock |
| 9 | Clientes | 9 | Tenant |
| 10 | Obras | 10 | Clientes |
| 11 | Proveedores | 11 | Tenant |
| 12 | Presupuestos | 12 | Clientes, Productos, Listas |
| 13 | Pedidos | 13 | Clientes, Productos, Stock |
| 14 | Ventas | 14 | Clientes, Productos, Stock, Cuenta corriente |
| 15 | NC/ND | 15 | Ventas |
| 16 | Órdenes de compra | 16 | Proveedores, Productos |
| 17 | Compras | 17 | Proveedores, Stock, OC |
| 18 | Gastos | 18 | Proveedores |
| 19 | Pagos clientes | 19 | Clientes, Obras, Ventas |
| 20 | Pagos proveedores | 20 | Proveedores, Compras, Gastos |
| 21 | Dashboards | 21 | Ventas, Compras, Stock, Cuentas |
| 22 | Reportes y exportación | 22 | Todos |
| 23 | Configuración y auditoría | 23 | Tenant |

La prioridad detallada y el orden por fases se definen en el documento **07-plan-desarrollo-fases.md**.
