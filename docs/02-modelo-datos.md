# 2. Modelo de datos detallado

## 2.1 Convenciones

- **IDs:** UUID o bigint autoincremental según estándar del proyecto; se usa `id` como PK.
- **Tenant:** Todas las entidades de negocio incluyen `tenantId` salvo las globales (ej. lista de permisos del sistema).
- **Auditoría:** Donde aplique: `createdAt`, `updatedAt`, `createdById`, `updatedById`; opcional `deletedAt` para soft delete.
- **Moneda:** Se asume una moneda principal por tenant (configurable); campos monetarios en decimal con precisión fija.

---

## 2.2 Núcleo multi-tenant y usuarios

### Tenant (Organización / Cuenta)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | Identificador único |
| name | string | Nombre comercial |
| slug | string | Identificador URL-friendly (único) |
| documentType | enum | CUIT, DNI, etc. (preparado fiscal) |
| documentNumber | string | Número de documento |
| email | string | Email de contacto |
| phone | string | Opcional |
| address | string | Opcional |
| logoUrl | string | Opcional |
| settings | JSON | Configuración global: moneda, formato fecha, permisos por defecto, etc. |
| isActive | boolean | Cuenta activa/suspendida |
| createdAt, updatedAt | datetime | Auditoría |

### Sucursal
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| name | string | Ej. "Casa Central", "Depósito Norte" |
| code | string | Código corto único por tenant |
| address | string | Opcional |
| phone | string | Opcional |
| isActive | boolean | |
| createdAt, updatedAt | datetime | |

**Regla:** Stock y movimientos de venta/compra se asocian a sucursal. Un tenant tiene al menos una sucursal.

### Usuario
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | Usuario pertenece a un solo tenant |
| email | string | Único por tenant (login) |
| passwordHash | string | Nunca se expone |
| firstName | string | |
| lastName | string | |
| isActive | boolean | |
| lastLoginAt | datetime | Opcional |
| createdAt, updatedAt | datetime | |

### Usuario – Sucursal (N:M)
Un usuario puede tener acceso a una o varias sucursales. Si no tiene ninguna asignación, no ve datos de ninguna (según reglas de negocio).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| userId | FK → Usuario | |
| branchId | FK → Sucursal | |
| isDefault | boolean | Sucursal por defecto al iniciar sesión |
| createdAt | datetime | |

**Índice único:** (userId, branchId).

### Permiso (catálogo del sistema)
Lista maestra de acciones que existen en el sistema (independiente del tenant). Ejemplos: `ventas.create`, `ventas.read`, `stock.update`, `reportes.export`, etc.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| code | string | Único, ej. "ventas.create" |
| module | string | "ventas", "compras", "stock", ... |
| name | string | Nombre legible |
| description | string | Opcional |

### Usuario – Permiso (N:M por tenant)
Permisos asignados a un usuario dentro del tenant. Si un usuario no tiene un permiso, no puede ejecutar esa acción.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| userId | FK → Usuario | |
| permissionId | FK → Permiso | |
| tenantId | FK → Tenant | Redundante pero útil para consultas |
| grantedAt | datetime | Opcional |
| grantedById | FK → Usuario | Opcional |

**Índice único:** (userId, permissionId) por tenant. Consulta: usuario + tenant → lista de permissionId.

---

## 2.3 Clientes y obras

### Cliente
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | Sucursal de alta o "principal" (regla de negocio a definir) |
| code | string | Código interno opcional, único por tenant |
| name | string | Razón social o nombre |
| documentType | enum | CUIT, DNI, etc. |
| documentNumber | string | |
| email | string | |
| phone | string | |
| address | string | |
| notes | text | |
| isActive | boolean | |
| createdAt, updatedAt, createdById, updatedById | datetime/user | |

**Cuenta corriente:** Se deriva de movimientos (ventas, pagos, notas de crédito/débito); no es una tabla separada sino saldo calculado por cliente (y opcionalmente por obra).

### Obra / Proyecto
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| clientId | FK → Cliente | |
| name | string | Nombre de la obra |
| code | string | Código opcional |
| address | string | Opcional |
| status | enum | OPEN, ACTIVE, CLOSED |
| openedAt | datetime | |
| closedAt | datetime | Null hasta que se cierra |
| notes | text | |
| createdAt, updatedAt, createdById, updatedById | datetime/user | |

**Regla:** Un cliente puede tener varias obras. Las ventas y los pagos pueden asociarse a una obra o a la cuenta general del cliente.

---

## 2.4 Proveedores

### Proveedor
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| code | string | Código interno opcional |
| name | string | Razón social |
| documentType | enum | |
| documentNumber | string | |
| email | string | |
| phone | string | |
| address | string | |
| notes | text | |
| isActive | boolean | |
| createdAt, updatedAt, createdById, updatedById | datetime/user | |

**Regla:** Una sola cuenta corriente por proveedor; saldo derivado de compras, gastos y pagos.

---

## 2.5 Productos y listas de precios

### Categoría / Rubro
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| name | string | |
| code | string | Opcional |
| parentId | FK → Categoría | Null para raíz; permite árbol |
| isActive | boolean | |
| createdAt, updatedAt | datetime | |

### Marca
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| name | string | |
| isActive | boolean | |
| createdAt, updatedAt | datetime | |

### Producto
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| code | string | Código interno único por tenant |
| barcode | string | Código de barras, opcional |
| name | string | Descripción |
| description | text | Opcional |
| categoryId | FK → Categoría | Opcional |
| brandId | FK → Marca | Opcional |
| unit | string | UN, KG, M, etc. (catálogo o libre) |
| isActive | boolean | |
| attributes | JSON | Talle, color, etc. configurables |
| createdAt, updatedAt, updatedById | datetime/user | |

### Producto – Proveedor (N:M)
Permite filtrar productos por proveedor y asociar un proveedor principal para “Generar orden de compra” desde consulta de precios/stock.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| productId | FK → Producto | |
| supplierId | FK → Proveedor | |
| isPrimary | boolean | Proveedor principal para OC automática (uno por producto) |
| supplierCode | string | Código del producto en el proveedor (opcional) |
| lastPurchaseCost | decimal | Último costo de compra desde este proveedor (opcional) |
| createdAt, updatedAt | datetime | |

**Índice único:** (productId, supplierId) por tenant. Regla: si existe al menos un proveedor para el producto, se recomienda marcar uno como isPrimary para la acción “Generar OC”.

### Lista de precios (cabecera)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| name | string | Ej. "Lista minorista", "Lista mayorista" |
| code | string | Único por tenant |
| currency | string | Moneda |
| validFrom | date | Opcional |
| validTo | date | Opcional |
| isDefault | boolean | Una sola por tenant puede ser default |
| isActive | boolean | |
| createdAt, updatedAt | datetime | |

### Precio por producto y lista
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| productId | FK → Producto | |
| priceListId | FK → Lista de precios | |
| price | decimal | Precio de venta |
| cost | decimal | Costo opcional (para rentabilidad) |
| minQuantity | decimal | Descuento por cantidad (opcional) |
| updatedAt | datetime | |

**Índice único:** (productId, priceListId) por tenant. Permite múltiples listas y cálculos automáticos.

---

## 2.6 Stock

### Stock por producto y sucursal
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| productId | FK → Producto | |
| branchId | FK → Sucursal | |
| quantity | decimal | Puede ser negativo (permitido con advertencia) |
| reservedQuantity | decimal | Reservado para pedidos/presupuestos (opcional) |
| updatedAt | datetime | |
| updatedById | FK → Usuario | Opcional |

**Índice único:** (productId, branchId) por tenant.

### Movimiento de stock
Cada entrada/salida/ajuste se registra para auditoría e historial.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | |
| productId | FK → Producto | |
| type | enum | IN, OUT, ADJUSTMENT, TRANSFER (origen/destino en detalle) |
| quantity | decimal | Positivo = entrada, negativo = salida (o por tipo) |
| quantityAfter | decimal | Stock resultante (opcional, para consistencia) |
| referenceType | string | "sale", "purchase", "order", "adjustment", "transfer" |
| referenceId | string/UUID | ID del documento que originó el movimiento |
| notes | text | |
| createdAt | datetime | |
| createdById | FK → Usuario | |

**Regla:** Movimientos inmutables; correcciones con nuevo movimiento de ajuste.

---

## 2.7 Tipos de comprobante y configuración fiscal (preparado AFIP/ARCA)

Catálogos que permiten luego integrar numeración y estados fiscales sin cambiar el modelo core.

### Tipo de comprobante (catálogo)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| code | string | Ej. "FACTURA_B", "NOTA_CREDITO", "PRESUPUESTO" |
| name | string | |
| kind | enum | SALE, SALE_ADJUSTMENT, PURCHASE, etc. |
| affectsStock | boolean | |
| affectsAccount | boolean | Afecta cuenta corriente |

### Punto de venta / Numeración (por tenant y sucursal)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | |
| documentTypeId | FK → Tipo de comprobante | |
| pointOfSale | string | Punto de venta (ej. "0001") |
| lastNumber | int | Último número usado (para numeración interna) |
| fiscalState | enum | INTERNAL, PENDING_AFIP, etc. (futuro) |
| createdAt, updatedAt | datetime | |

---

## 2.8 Ventas (documentos)

Documentos de venta comparten estructura similar: cabecera (cliente, sucursal, fechas, totales) + líneas (producto, cantidad, precio, subtotal).

### Documento de venta (cabecera común)
Tabla base o tabla por tipo según preferencia. Aquí se plantea una tabla por tipo para claridad.

**Campos comunes a Presupuesto, Pedido, Venta, NotaCrédito, NotaDébito:**

- id, tenantId, branchId
- documentNumber (número interno o fiscal)
- documentTypeId (FK a tipo comprobante)
- clientId, workId (obra, opcional)
- date, dueDate (opcional)
- status: DRAFT, CONFIRMED, CANCELLED, etc.
- subtotal, discountAmount, taxAmount, total
- currency
- notes
- createdById, updatedById, createdAt, updatedAt
- parentId (para NC/ND que referencian una factura)

Para **Venta** además: pointOfSaleId, fiscalNumber (futuro), sentByEmail (boolean), etc.

### Línea de documento de venta
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| documentId | FK → Documento (venta/presupuesto/pedido) | |
| productId | FK → Producto | |
| quantity | decimal | |
| unitPrice | decimal | |
| discountPercent | decimal | Opcional |
| discountAmount | decimal | Opcional |
| taxPercent | decimal | Opcional |
| subtotal | decimal | |
| sortOrder | int | Orden de línea |

**Regla:** Al confirmar una venta, se generan movimientos de stock (OUT) y se actualiza la cuenta corriente del cliente (y obra si aplica). Presupuestos y pedidos pueden reservar stock (reservedQuantity) según regla de negocio.

### Deuda de mercadería
Si se permite “venta con deuda de mercadería” (entrega parcial), se puede modelar como:
- Estado del documento: PARTIAL_DELIVERY, o
- Líneas con cantidad entregada vs cantidad facturada (cantidadPendienteEntrega).

Se recomienda una tabla o campos que distingan **cantidad facturada** y **cantidad entregada** por línea, y movimientos de stock solo por lo entregado.

---

## 2.9 Compras y gastos

### Orden de compra
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | |
| supplierId | FK → Proveedor | |
| number | string | Número interno |
| date | date | |
| expectedDeliveryDate | date | Opcional |
| status | enum | DRAFT, SENT, PARTIAL_RECEIVED, RECEIVED, CANCELLED |
| subtotal, discount, tax, total | decimal | |
| currency | string | |
| notes | text | |
| createdById, updatedById, createdAt, updatedAt | datetime/user | |

### Línea de orden de compra
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| orderId | FK → Orden de compra | |
| productId | FK → Producto | |
| quantity | decimal | |
| unitCost | decimal | |
| receivedQuantity | decimal | Acumulado recibido |
| subtotal | decimal | |
| sortOrder | int | |

### Compra (recepción / factura de compra)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | |
| supplierId | FK → Proveedor | |
| purchaseOrderId | FK → Orden de compra | Opcional |
| number | string | Número de factura del proveedor |
| date | date | |
| status | enum | DRAFT, CONFIRMED, CANCELLED |
| subtotal, tax, total | decimal | |
| currency | string | |
| notes | text | |
| createdById, updatedById, createdAt, updatedAt | datetime/user | |

### Línea de compra
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| purchaseId | FK → Compra | |
| productId | FK → Producto | |
| quantity | decimal | |
| unitCost | decimal | |
| subtotal | decimal | |
| sortOrder | int | |

**Regla:** Al confirmar una compra, se generan movimientos de stock (IN) y se actualiza la cuenta corriente del proveedor. Opcionalmente se actualiza costo en lista de precios o en producto.

### Gasto (asociado a proveedor o genérico)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | |
| supplierId | FK → Proveedor | Opcional |
| number | string | Opcional |
| date | date | |
| concept | string | |
| amount | decimal | |
| currency | string | |
| status | enum | DRAFT, CONFIRMED, CANCELLED |
| createdById, updatedById, createdAt, updatedAt | datetime/user | |

---

## 2.10 Cuentas corrientes y pagos

### Movimiento de cuenta corriente (cliente)
Registro inmutable de cada hecho que afecta el saldo del cliente (general o por obra).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| clientId | FK → Cliente | |
| workId | FK → Obra | Null = cuenta general |
| type | enum | SALE, PAYMENT, CREDIT_NOTE, DEBIT_NOTE, ADJUSTMENT |
| amount | decimal | Positivo = a favor del cliente (NC, devolución), negativo = deuda (venta, ND) |
| balanceAfter | decimal | Saldo después del movimiento (opcional) |
| referenceType | string | "sale", "payment", "credit_note", etc. |
| referenceId | string/UUID | ID del documento |
| date | date | |
| description | string | Opcional |
| createdAt | datetime | |
| createdById | FK → Usuario | |

### Pago de cliente
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| branchId | FK → Sucursal | |
| clientId | FK → Cliente | |
| workId | FK → Obra | Null = pago a cuenta general |
| date | date | |
| amount | decimal | Total del pago |
| currency | string | |
| notes | text | |
| status | enum | DRAFT, CONFIRMED, CANCELLED |
| createdById, updatedById, createdAt, updatedAt | datetime/user | |

### Detalle de aplicación del pago (a qué se aplica)
Un pago puede distribuirse en varias aplicaciones (parciales a distintas facturas o a cuenta general).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| paymentId | FK → Pago de cliente | |
| referenceType | string | "sale", "credit_note" (para reducir saldo de una factura) |
| referenceId | string/UUID | ID del documento |
| amount | decimal | Monto aplicado a este documento |
| createdAt | datetime | |

### Medio de pago (catálogo por tenant)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| code | string | EFECTIVO, TRANSFERENCIA, TARJETA, CHEQUE, etc. |
| name | string | |
| isActive | boolean | |

### Pago de cliente – Medio de pago (N:M con monto)
Un pago puede desglosarse en varios medios (ej. parte efectivo, parte transferencia).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| paymentId | FK → Pago de cliente | |
| paymentMethodId | FK → Medio de pago | |
| amount | decimal | |
| reference | string | Número de cheque, ref. transferencia, etc. |

### Movimiento de cuenta corriente (proveedor)
Análogo al de cliente: COMPRA, PAYMENT, EXPENSE, ADJUSTMENT. referenceType/referenceId apuntan a compra, pago o gasto.

### Pago a proveedor
Estructura similar a pago de cliente: cabecera (proveedor, fecha, total, sucursal) + aplicaciones a compras/gastos + medios de pago.

---

## 2.11 Reportes y exportaciones

No se modelan tablas específicas para “reportes”; los reportes son consultas y agregaciones sobre las entidades anteriores. Opcionalmente:

- **Reporte programado / caché:** Si se desea guardar resultados para dashboards o envíos automáticos: tabla con tipo de reporte, parámetros (JSON), resultado (JSON o referencia a archivo), generadoAt, tenantId.

---

## 2.12 Integraciones (opcional)

### Conexión de integración (por tenant)
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | PK | |
| tenantId | FK → Tenant | |
| provider | string | "google", "afip", etc. |
| status | enum | PENDING, CONNECTED, ERROR, REVOKED |
| accessTokenEncrypted | text | Cifrado |
| refreshTokenEncrypted | text | Cifrado |
| expiresAt | datetime | |
| scopes | string/JSON | Permisos concedidos |
| lastError | text | Último error (para diagnóstico) |
| updatedAt | datetime | |

Solo si se implementan integraciones OAuth; no es obligatorio en Fase 1.

---

## 2.13 Diagrama de relaciones (resumen)

```
Tenant ──┬── Sucursal
         ├── Usuario ── UsuarioSucursal ── Sucursal
         ├── Usuario ── UsuarioPermiso ── Permiso
         ├── Cliente ── Obra
         ├── Proveedor
         ├── Producto (Categoría, Marca) ── ProductoProveedor ── Proveedor
         ├── ListaPrecios ── Precio (Producto)
         ├── Stock (Producto, Sucursal)
         ├── MovimientoStock (Producto, Sucursal)
         ├── DocumentoVenta (Cliente, Obra, Sucursal) ── LineaDocumentoVenta (Producto)
         ├── OrdenCompra (Proveedor, Sucursal) ── LineaOrdenCompra (Producto)
         ├── Compra (Proveedor, Sucursal) ── LineaCompra (Producto)
         ├── Gasto (Proveedor?, Sucursal)
         ├── PagoCliente (Cliente, Obra?, Sucursal) ── AplicacionPago, PagoMedioPago
         ├── PagoProveedor (Proveedor, Sucursal) ── AplicacionPagoProveedor, PagoMedioPago
         ├── MovimientoCuentaCliente (Cliente, Obra?)
         └── MovimientoCuentaProveedor (Proveedor)
```

---

## 2.14 Índices recomendados (resumen)

- Todas las tablas: índice por `tenantId`.
- Consultas frecuentes: (tenantId, branchId), (tenantId, date), (tenantId, status).
- Unicidad: (tenantId, code) donde aplique (producto, cliente, lista de precios, etc.).
- Foreign keys: índices en FKs usados en JOINs y filtros.

Este modelo permite implementar las reglas de negocio descritas en el requerimiento y preparar tipos de comprobante y numeración para AFIP/ARCA sin reestructurar el core.
