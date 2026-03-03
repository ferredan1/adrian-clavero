# 4. Flujos de usuario

Flujos principales por módulo, pensados para UX simple y coherente con un ERP moderno. Incluyen variantes mobile y decisiones de diseño que nos diferencian de la referencia (Dux).

---

## 4.1 Flujos transversales

### 4.1.1 Primer acceso e inicio de sesión
1. Usuario abre la aplicación (web o PWA).
2. Si no hay sesión → redirige a **Login**.
3. Ingresa email y contraseña → POST auth/login.
4. Backend valida y devuelve access token + refresh token.
5. Frontend guarda tokens (httpOnly cookie o almacenamiento seguro), carga perfil (usuario, tenant, sucursales permitidas, permisos).
6. Si el usuario tiene **una sola sucursal** → se establece como sucursal activa y redirige al **Dashboard** o a la página por defecto configurada.
7. Si tiene **varias sucursales** → pantalla de **Selección de sucursal** (o selector en header); al elegir, se guarda sucursal activa y redirige.
8. En cada request subsiguiente se envía access token; si expira, se usa refresh token de forma transparente; si refresh falla → logout y volver a login.

**Mobile:** Misma secuencia; pantalla de login full-screen y teclado numérico/email según campo. Opción “Recordarme” según política de seguridad.

---

### 4.1.2 Navegación general
- **Desktop:** Sidebar fija o colapsable con módulos (Inicio, Ventas, Compras, Stock, Clientes, Proveedores, Tesorería, Reportes, Configuración). Header con sucursal activa, usuario, notificaciones.
- **Mobile:** Menú hamburguesa o barra inferior con iconos a secciones principales; selector de sucursal en header o en menú.
- **Breadcrumbs** en pantallas profundas (ej. Ventas → Listado → Detalle de venta).
- **Búsqueda global** (opcional): productos, clientes, proveedores desde cualquier pantalla.

**Diferencia con referencia:** Menú más simple y agrupado; menos ítems visibles a la vez; agrupación por “Ventas” (presupuestos, pedidos, ventas, NC/ND) en submenú.

---

## 4.2 Flujo: Consulta de precios y stock

**Objetivo:** Ver rápido precio y stock por producto/sucursal/lista y poder generar OC.

1. Usuario entra a **Consulta de precios y stock** (desde menú Stock o Catálogo).
2. Por defecto se muestran filtros esenciales: **Producto** (búsqueda), **Lista de precios**, **Sucursal/Depósito** (o la activa). Opción “Más filtros” para Rubro, Marca, Proveedor, Stock (con/sin stock, solo negativos).
3. Usuario aplica filtros y pulsa **Consultar** (o búsqueda en tiempo real si se implementa).
4. Resultados en tabla o cards: Código, Producto, Precio (según lista), Stock (según sucursal), Costo, Código de barras. Stock negativo resaltado (color/icono).
5. Acciones por fila o desde detalle: **Ver detalle**, **Generar orden de compra** (precarga producto y proveedor si existe).
6. **Generar orden de compra:** abre modal o pantalla de alta de OC con ítem y proveedor ya cargados; usuario completa cantidad, sucursal, y guarda.

**Mobile:** Filtros colapsables; resultados en cards apiladas; acción “OC” visible por ítem. Evitar tablas con muchas columnas; priorizar precio y stock.

---

## 4.3 Flujo: Nueva venta (desde cero)

1. Usuario entra a **Ventas** → **Nueva venta**.
2. Selecciona **Cliente** (búsqueda por nombre/CUIT). Opcional: **Obra** (si el cliente tiene obras).
3. Si hay lista de precios por defecto, se aplica; si no, el usuario elige lista.
4. Agrega ítems: búsqueda por código o nombre de producto; se completa precio desde lista y cantidad; puede editar precio manualmente si tiene permiso.
5. Opcional: descuento global o por ítem; impuestos si aplica.
6. Ve total en tiempo real. Opcional: medio de pago y pago parcial (para registrar cobro al instante).
7. **Guardar como borrador** o **Confirmar venta**.
8. Al confirmar: se genera número de comprobante, se descuenta stock (por sucursal activa), se registra movimiento en cuenta corriente del cliente (y obra si aplica). Pantalla de éxito con opciones: **Imprimir**, **Enviar por email**, **Nueva venta**.

**Variante desde presupuesto/pedido:** Desde listado de presupuestos o pedidos, acción “Convertir a venta”; se abre el formulario de venta con datos e ítems precargados.

**Mobile:** Formulario en pasos (Cliente → Ítems → Totales → Confirmar) o una sola vista con secciones colapsables. Búsqueda de productos con sugerencias.

---

## 4.4 Flujo: Pago de cliente (aplicación a facturas y/o obra)

1. Usuario entra a **Tesorería** → **Pagos de clientes** → **Nuevo pago** (o desde ficha del cliente).
2. Selecciona **Cliente**. Opcional: **Obra** (si el pago es para una obra) o “Cuenta general”.
3. Ingresa **Fecha** y **Monto total** del pago.
4. Desglose por **Medios de pago:** agrega uno o más (Efectivo, Transferencia, Tarjeta, Cheque) con monto y referencia si aplica; la suma debe coincidir con el total.
5. **Aplicación del pago:** 
   - Opción A: “A cuenta general” (el monto se descuenta del saldo global del cliente o de la obra elegida).
   - Opción B: “Aplicar a comprobantes”: se listan facturas con saldo pendiente; el usuario asigna monto a cada una (parcial o total) hasta completar el monto del pago.
6. Guarda; se registran movimientos de cuenta corriente (negativo = pago) y se actualiza estado de cobro de las facturas aplicadas.
7. Pantalla de confirmación con detalle del pago y aplicaciones.

**Mobile:** Mismo flujo en pantallas secuenciales; selector de facturas con checkbox y monto editable por fila.

---

## 4.5 Flujo: Orden de compra desde stock bajo o desde consulta

**Caso A – Desde consulta de precios y stock**
1. En **Consulta de precios y stock**, usuario filtra y ve productos con stock bajo o cero.
2. Por producto (o selección múltiple) elige **Generar orden de compra**.
3. Se abre alta de OC con **Proveedor** precargado (proveedor principal del producto o selección si hay varios) e **ítem(s)** con cantidad sugerida (ej. punto de reposición o cantidad mínima si existe).
4. Usuario ajusta cantidades, agrega ítems si quiere, elige sucursal y guarda OC (borrador o enviada).

**Caso B – Desde listado de productos o reporte de stock crítico**
1. Usuario entra a **Stock crítico** (reporte o dashboard) o listado de productos con filtro “stock bajo”.
2. Selecciona uno o más productos y acción **Generar orden de compra**.
3. Mismo paso 3–4 que en Caso A.

**Diferencia con referencia:** Un solo flujo claro desde consulta y desde reportes; proveedor asociado automáticamente cuando exista relación producto–proveedor.

---

## 4.6 Flujo: Recepción de compra (vinculada a OC)

1. Usuario entra a **Compras** → **Compras** → **Nueva compra** (o desde OC: “Recibir”).
2. Si viene desde OC: selecciona **Orden de compra**; se cargan proveedor, sucursal e ítems con cantidades pendientes.
3. Usuario ingresa número de factura del proveedor, fecha, y cantidades recibidas por ítem (por defecto igual a pendiente).
4. Puede ajustar precios/costos si difieren de la OC (auditoría).
5. Confirma compra: se generan movimientos de stock (IN) por sucursal y movimiento en cuenta corriente del proveedor (deuda).
6. Estado de la OC se actualiza (parcialmente recibida / recibida) según cantidades.

**Mobile:** Formulario por pasos; listado de ítems con input de cantidad recibida por línea.

---

## 4.7 Flujo: Alta de cliente y obra

1. **Clientes** → **Nuevo cliente**.
2. Completa datos obligatorios: nombre, tipo y número de documento, al menos un contacto (email o teléfono). Opcional: dirección, notas, código.
3. Guarda; el cliente queda con cuenta corriente en cero.
4. **Obra (opcional):** desde ficha del cliente, **Nueva obra**. Nombre, dirección opcional, estado (abierta). Al guardar, la obra queda disponible para asociar a ventas y pagos.

**Regla:** Las ventas y pagos pueden ir a “Cuenta general” o a una obra; el usuario elige en cada documento.

---

## 4.8 Flujo: Reporte y exportación

1. Usuario entra a **Reportes** (o al dashboard con enlace a reportes).
2. Elige tipo de reporte (ej. Ventas por período, Stock crítico, Saldos clientes).
3. Configura parámetros: rango de fechas, sucursal(es), formato (pantalla, PDF, Excel).
4. **Ver** → se muestra vista previa en pantalla (respetando permisos de sucursal).
5. **Exportar** → descarga PDF o Excel según eligió.
6. (Futuro) **Enviar por email** o **Exportar a Google Sheets** si hay integración.

**Mobile:** Misma selección de reporte y parámetros; vista previa simplificada; exportar abre descarga o comparte archivo.

---

## 4.9 Flujo: Asignación de permisos a usuario

1. Usuario admin entra a **Configuración** → **Usuarios**.
2. Selecciona un usuario (o crea uno nuevo).
3. Pestaña **Permisos:** ve listado de permisos por módulo (ej. ventas.crear, ventas.ver, ventas.anular). Marca/desmarca por acción.
4. Pestaña **Sucursales:** marca las sucursales a las que el usuario puede acceder; opcionalmente una por defecto.
5. Guarda; en el próximo login del usuario se aplican permisos y alcance de sucursales.

**Regla:** Sin roles predefinidos; solo conjuntos de permisos y sucursales por usuario. Opcionalmente “plantillas” de permisos (conjuntos nombrados) para asignar de golpe, sin ser roles rígidos.

---

## 4.10 Resumen de decisiones de UX

| Tema | Decisión |
|------|----------|
| Filtros | Esenciales visibles; “Más filtros” para el resto; mobile colapsable. |
| Tablas | Ordenables, con acciones por fila; en mobile priorizar cards o lista simplificada. |
| Formularios largos | Pasos o secciones colapsables en mobile. |
| Acciones cruzadas | Desde consulta de stock → OC; desde presupuesto/pedido → venta; desde OC → compra. |
| Feedback | Confirmación tras guardar; mensajes claros de error y validación. |
| Navegación | Sidebar/bottom bar según dispositivo; breadcrumbs en profundidad. |
| Sucursal | Siempre visible en header; cambio sin salir de la app. |

Estos flujos sirven como base para wireframes, prototipos y luego implementación por fases.
