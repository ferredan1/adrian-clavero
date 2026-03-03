# 5. Diseño de permisos

Sistema de permisos **granular, por acción y por alcance de datos (sucursal)**, sin roles rígidos. Cada usuario tiene un conjunto de permisos asignados y un conjunto de sucursales que puede ver/operar.

---

## 5.1 Principios

| Principio | Aplicación |
|-----------|------------|
| **Sin roles fijos** | No existen "Rol Vendedor" o "Rol Admin" como entidades que definan todo. Existen solo **permisos** y **asignaciones por usuario**. |
| **Permisos por acción** | Cada acción sensible (crear venta, anular comprobante, ver reportes, etc.) tiene un permiso. El usuario debe tener ese permiso para ejecutarla. |
| **Alcance por sucursal** | Un usuario solo puede ver y operar sobre datos de las **sucursales que tiene asignadas**. Si no tiene ninguna, no ve datos operativos (salvo lo que se defina para soporte). |
| **Configurables por usuario** | Un administrador asigna a cada usuario: (1) lista de permisos, (2) lista de sucursales. No hay herencia de "rol". |
| **Mínimo privilegio** | Por defecto un usuario nuevo no tiene permisos; se otorgan explícitamente. |
| **Auditoría** | Las acciones sensibles quedan registradas con usuario; los permisos no se guardan en cada registro pero el contexto del usuario (quién ejecutó) sí. |

---

## 5.2 Modelo de datos (resumen)

- **Permiso:** entidad de catálogo (sistema). Ejemplos: `ventas.create`, `ventas.read`, `ventas.update`, `ventas.delete`, `ventas.annul`, `stock.adjust`, `reportes.export`, etc. No es por tenant; es la lista maestra de “acciones que existen en el sistema”.
- **Usuario–Permiso (N:M):** por cada tenant, se guarda qué usuario tiene qué permiso. Tabla: userId, permissionId, tenantId (y opcional grantedAt, grantedById).
- **Usuario–Sucursal (N:M):** por cada usuario se guarda a qué sucursales tiene acceso. Tabla: userId, branchId, isDefault. Si un usuario no tiene ninguna fila, se considera que no tiene sucursales asignadas (y por política no ve datos de ventas/compras/stock de ninguna sucursal, salvo que se defina una excepción explícita para “ver todas” con un permiso especial).

Consultas de datos:
- Siempre se filtra por `tenantId` (del usuario).
- Para datos por sucursal (ventas, compras, stock, movimientos): además se filtra por `branchId IN (sucursales del usuario)`.
- Si el usuario tiene un permiso tipo `*.*.all_branches` o equivalente (ver todas las sucursales), se omite el filtro de sucursal en lectura; la asignación de sucursales puede seguir limitando escritura según reglas.

---

## 5.3 Lista de permisos sugerida (por módulo)

Cada permiso se identifica por **código** (ej. `ventas.create`). Se recomienda convención: `recurso.accion` o `modulo.accion`.

### Autenticación / Cuenta
| Código | Descripción |
|--------|-------------|
| auth.change_password | Cambiar propia contraseña |
| auth.impersonate | (Opcional) Iniciar sesión como otro usuario (solo soporte/admin) |

### Tenant y sucursales
| Código | Descripción |
|--------|-------------|
| tenant.read | Ver datos de la cuenta/organización |
| tenant.update | Editar datos de la cuenta |
| branches.read | Ver listado de sucursales |
| branches.create | Crear sucursal |
| branches.update | Editar sucursal |
| branches.delete | Desactivar/eliminar sucursal |

### Usuarios y permisos
| Código | Descripción |
|--------|-------------|
| users.read | Ver listado de usuarios |
| users.create | Crear usuario |
| users.update | Editar usuario (datos y permisos) |
| users.delete | Desactivar usuario |
| users.assign_permissions | Asignar o quitar permisos a usuarios |
| users.assign_branches | Asignar sucursales a usuarios |

### Catálogos (categorías, marcas, medios de pago, tipos de comprobante)
| Código | Descripción |
|--------|-------------|
| catalog.categories | CRUD categorías/rubros |
| catalog.brands | CRUD marcas |
| catalog.payment_methods | CRUD medios de pago |
| catalog.document_types | Ver y configurar tipos de comprobante y numeración |

### Productos
| Código | Descripción |
|--------|-------------|
| products.read | Ver listado y detalle de productos |
| products.create | Crear producto |
| products.update | Editar producto |
| products.delete | Desactivar producto |

### Listas de precios
| Código | Descripción |
|--------|-------------|
| price_lists.read | Ver listas y precios |
| price_lists.create | Crear lista de precios |
| price_lists.update | Editar lista y precios |
| price_lists.delete | Desactivar lista |

### Stock
| Código | Descripción |
|--------|-------------|
| stock.read | Ver stock y movimientos (según sucursales asignadas) |
| stock.adjust | Realizar ajustes de stock |
| stock.transfer | Realizar transferencias entre sucursales (si existe el módulo) |

### Consulta precios y stock
| Código | Descripción |
|--------|-------------|
| stock_query.read | Acceso a la consulta de precios y stock |
| stock_query.create_purchase_order | Generar orden de compra desde la consulta |

### Clientes
| Código | Descripción |
|--------|-------------|
| clients.read | Ver listado y ficha de clientes |
| clients.create | Crear cliente |
| clients.update | Editar cliente |
| clients.delete | Desactivar cliente |

### Obras
| Código | Descripción |
|--------|-------------|
| works.read | Ver listado y detalle de obras |
| works.create | Crear obra |
| works.update | Editar obra (incl. abrir/cerrar) |
| works.delete | (Opcional) Eliminar o archivar obra |

### Proveedores
| Código | Descripción |
|--------|-------------|
| suppliers.read | Ver listado y ficha de proveedores |
| suppliers.create | Crear proveedor |
| suppliers.update | Editar proveedor |
| suppliers.delete | Desactivar proveedor |

### Presupuestos
| Código | Descripción |
|--------|-------------|
| estimates.read | Ver presupuestos |
| estimates.create | Crear presupuesto |
| estimates.update | Editar presupuesto |
| estimates.delete | Anular presupuesto |
| estimates.convert | Convertir a pedido o venta |

### Pedidos
| Código | Descripción |
|--------|-------------|
| orders.read | Ver pedidos |
| orders.create | Crear pedido |
| orders.update | Editar pedido |
| orders.delete | Anular pedido |
| orders.convert | Convertir a venta |

### Ventas (comprobantes de venta)
| Código | Descripción |
|--------|-------------|
| sales.read | Ver ventas |
| sales.create | Crear venta (borrador y confirmar) |
| sales.update | Editar venta en borrador |
| sales.annul | Anular venta confirmada |
| sales.send_email | Enviar por email (si hay integración) |

### Notas de crédito / débito
| Código | Descripción |
|--------|-------------|
| credit_debit_notes.read | Ver NC/ND |
| credit_debit_notes.create | Crear NC/ND |
| credit_debit_notes.annul | Anular NC/ND |

### Órdenes de compra
| Código | Descripción |
|--------|-------------|
| purchase_orders.read | Ver órdenes de compra |
| purchase_orders.create | Crear OC |
| purchase_orders.update | Editar OC |
| purchase_orders.delete | Anular OC |

### Compras
| Código | Descripción |
|--------|-------------|
| purchases.read | Ver compras |
| purchases.create | Crear compra (y recibir) |
| purchases.update | Editar compra en borrador |
| purchases.annul | Anular compra |

### Gastos
| Código | Descripción |
|--------|-------------|
| expenses.read | Ver gastos |
| expenses.create | Crear gasto |
| expenses.update | Editar gasto |
| expenses.delete | Anular gasto |

### Pagos (clientes)
| Código | Descripción |
|--------|-------------|
| client_payments.read | Ver pagos de clientes |
| client_payments.create | Registrar pago y aplicar |
| client_payments.update | Editar pago (borrador) |
| client_payments.delete | Anular pago |

### Pagos (proveedores)
| Código | Descripción |
|--------|-------------|
| supplier_payments.read | Ver pagos a proveedores |
| supplier_payments.create | Registrar pago y aplicar |
| supplier_payments.update | Editar pago (borrador) |
| supplier_payments.delete | Anular pago |

### Reportes y dashboards
| Código | Descripción |
|--------|-------------|
| reports.read | Ver dashboards y reportes (respetando sucursales) |
| reports.export | Exportar a PDF/Excel |
| reports.all_branches | Ver reportes consolidados de todas las sucursales (ignora filtro sucursal en lectura de reportes) |

### Configuración e integraciones
| Código | Descripción |
|--------|-------------|
| settings.read | Ver configuración general |
| settings.update | Modificar configuración |
| integrations.manage | Gestionar conexiones (Google, etc.) |

### Auditoría
| Código | Descripción |
|--------|-------------|
| audit.read | Ver registro de auditoría |

---

## 5.4 Alcance por sucursal

- **Asignación:** Cada usuario tiene un conjunto de sucursales. Se guarda en Usuario–Sucursal.
- **Efecto en lectura:** Para listados y reportes de ventas, compras, stock, movimientos de cuenta por sucursal, solo se devuelven datos de esas sucursales. Si el usuario no tiene sucursales asignadas, no ve datos operativos (o se muestra vacío según política).
- **Efecto en escritura:** Al crear/editar una venta, compra, OC, pago, etc., el usuario solo puede elegir sucursales que tiene asignadas. No puede guardar una venta en una sucursal que no tiene.
- **Reportes consolidados:** El permiso `reports.all_branches` permite ver dashboards y reportes con datos de todas las sucursales del tenant; el resto de permisos (ej. ventas.read) siguen limitados por sucursales asignadas.
- **Sucursal por defecto:** Una de las sucursales del usuario puede marcarse como "por defecto"; al iniciar sesión o al abrir la app se preselecciona esa sucursal activa.

---

## 5.5 Flujo de verificación en backend

1. **Autenticación:** Middleware valida JWT y carga usuario + tenant.
2. **Cargar contexto:** Se obtienen los permissionIds del usuario para ese tenant y las branchIds asignadas (y si tiene permiso all_branches para reportes).
3. **Por cada request a un recurso protegido:**
   - Identificar la **acción** (ej. crear venta = `sales.create`).
   - Comprobar que el usuario tiene ese **permiso**. Si no, responder 403.
   - Si el recurso es por sucursal (venta, compra, etc.), comprobar que la sucursal del recurso (o la que se quiere usar) está en las **sucursales del usuario**. Si no, 403.
4. **Consultas de listados:** El servicio aplica filtro `branchId IN (sucursales del usuario)` además de tenantId. No se delega al frontend.

---

## 5.6 UI de asignación de permisos

- **Por usuario:** Pantalla de edición de usuario con:
  - **Permisos:** Listado por módulo (agrupado); checkbox por permiso. Opcional: “Seleccionar todo el módulo” para agilizar, sin crear un rol.
  - **Sucursales:** Listado de sucursales del tenant; checkbox por sucursal; una marcada como “por defecto”.
- **Plantillas (opcional):** Conjuntos nombrados de permisos (ej. “Vendedor estándar”, “Depósito”) que al elegirse marcan en bloque los checkboxes; el usuario sigue siendo “lista de permisos + sucursales”, no un rol que herede permisos. Si se elimina la plantilla, los usuarios conservan los permisos ya asignados.

---

## 5.7 Resumen

| Aspecto | Diseño |
|---------|--------|
| Roles | No se usan roles rígidos; solo permisos y sucursales por usuario. |
| Permisos | Lista maestra por código; asignación usuario–permiso por tenant. |
| Sucursales | Asignación usuario–sucursal; filtro obligatorio en datos operativos. |
| Verificación | En backend en cada request; no confiar en ocultar botones en frontend. |
| Escalabilidad | Añadir nuevos permisos = nuevo registro en catálogo + asignación; no cambia modelo. |

Este diseño permite mayor flexibilidad que un modelo de roles fijos y prepara el sistema para comercialización a terceros con distintos niveles de acceso por cliente.
