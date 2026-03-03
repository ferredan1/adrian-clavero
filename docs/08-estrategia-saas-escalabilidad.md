# 8. Estrategia SaaS y escalabilidad

Estrategia para comercializar el ERP como producto SaaS, modelo de negocio, límites por plan, escalabilidad técnica y operativa, y consideraciones de seguridad y cumplimiento.

---

## 8.1 Posicionamiento y modelo SaaS

### 8.1.1 Propuesta de valor

- **Público objetivo:** Comercios minoristas y mayoristas (ferreterías, corralones, sanitarios, mayoristas, distribuidores) que buscan un sistema de gestión **simple, moderno y flexible**, sin la complejidad de ERPs tradicionales ni la rigidez de roles.
- **Diferenciadores frente a referencias (ej. [Dux Software](https://duxsoftware.com.ar/)):**
  - Más simple de usar (filtros inteligentes, menos pantallas densas, flujos claros).
  - UI más moderna (diseño actual, mobile first, PWA).
  - Permisos granulares por acción y por sucursal, sin roles rígidos.
  - Mejor preparado para automatización (API, webhooks, integraciones Google) y para futuras integraciones (AFIP/ARCA, e-commerce).
- **Entrega:** Software como servicio (SaaS) vía suscripción por tenant (organización/cuenta). Cada tenant tiene sus datos aislados (multi-tenant en una misma instancia o en instancias dedicadas según plan).

### 8.1.2 Modelo de suscripción (sugerido)

| Dimensión | Uso típico | Nota |
|-----------|------------|------|
| **Por tenant** | Una suscripción por organización (empresa que usa el sistema). | Base del precio. |
| **Por usuario** | Límite o precio según cantidad de usuarios activos por tenant. | Ej. Plan Base: 3 usuarios; Plan Pro: 10; Plan Empresa: ilimitado o por acuerdo. |
| **Por sucursal** | Opcional: planes que incluyen N sucursales; extra por sucursal adicional. | Refleja uso multisucursal. |
| **Almacenamiento** | Límite por tenant (ej. GB de documentos o registros). | Para adjuntos, exportaciones guardadas, etc. |
| **Integraciones** | Incluidas en plan superior o como add-on (Google, e-commerce, AFIP cuando exista). | Monetización de valor añadido. |

**Ejemplo de planes (solo referencia):**

- **Starter:** 1 sucursal, 2 usuarios, reportes básicos, sin integraciones. Precio mensual bajo.
- **Profesional:** N sucursales, N usuarios, reportes completos, exportación, integraciones Google opcionales. Precio medio.
- **Empresa:** Sin límite de usuarios/sucursales (o muy alto), API completa, soporte prioritario, SLA. Precio alto o custom.

La facturación puede ser mensual o anual (con descuento); cobro vía pasarela (Stripe, Mercado Pago, etc.) fuera del alcance del ERP en sí, pero el sistema debe **soportar** la noción de plan (límites de usuarios, sucursales, features) para aplicar restricciones en backend y en UI.

---

## 8.2 Límites y restricciones por plan

Para que el producto sea escalable y comercializable, se recomienda **no hardcodear** límites; definirlos por plan y leerlos desde configuración o BD.

| Límite | Dónde aplicarlo | Cómo implementar (concepto) |
|--------|------------------|-----------------------------|
| Nº de usuarios | Alta de usuario, activación | Al crear/usar usuario: verificar count(usuarios activos) &lt; límite del plan del tenant. |
| Nº de sucursales | Alta de sucursal | Al crear sucursal: count(sucursales) &lt; límite. |
| Integraciones | Conectar Google (u otras) | Plan debe incluir “integraciones” o “integraciones_google”; si no, bloquear o mostrar upgrade. |
| Exportación PDF/Excel | Botón exportar en reportes | Plan puede incluir “exportación”; si no, ocultar o limitar (ej. X exportaciones/mes). |
| API externa / Apps Script | Uso de API por terceros | Plan “API” o “empresa”; rate limit por tenant y por plan. |
| Almacenamiento | Adjuntos, Drive, comprobantes guardados | Límite en GB por tenant; verificar antes de subir. |

**Modelo de datos sugerido (conceptual):**

- **Plan:** id, code (starter, pro, empresa), name, limits (JSON: maxUsers, maxBranches, features[]), priceCents, billingInterval.
- **TenantSubscription o Tenant:** planId, currentPeriodStart, currentPeriodEnd, status (active, past_due, cancelled). Opcional: usage (usersCount, branchesCount, storageBytes) para facturación por uso o alertas.

Las comprobaciones de límites se hacen en servicios de negocio (users, branches, integrations) antes de persistir; si se excede, devolver error claro y mensaje de upgrade.

---

## 8.3 Escalabilidad técnica

### 8.3.1 Multi-tenant y datos

- **Modelo actual:** Un tenant = una organización; todas las tablas de negocio con `tenantId`; filtro obligatorio en todas las consultas. Un solo schema de BD; no mezcla de datos entre tenants.
- **Escalado de lectura:** PostgreSQL con réplicas de solo lectura para reportes y dashboards pesados; las escrituras van a la instancia primaria.
- **Escalado horizontal de API:** La API es stateless; se pueden levantar N instancias detrás de un balanceador. Sesión = JWT; no dependencia de memoria compartida.
- **Futuro (si un tenant crece mucho):** Posible sharding por tenant (un schema o BD por tenant) o tenant a instancia dedicada para planes “Empresa”. El diseño actual (tenantId en todo) permite migrar un tenant a otra BD sin cambiar la lógica de aplicación si se abstrae el acceso a datos por tenant.

### 8.3.2 Rendimiento

- **Índices:** Por tenantId y por (tenantId, branchId), (tenantId, date), (tenantId, status) en tablas grandes (ventas, compras, movimientos).
- **Paginación:** Todos los listados paginados (limit/offset o cursor); no devolver miles de filas en una respuesta.
- **Reportes pesados:** Generación asíncrona (job en cola) para reportes grandes; notificación o descarga cuando esté listo. Opcional: caché de resultados por parámetros (TTL corto).
- **Rate limiting:** Por tenant y por IP en la API para evitar abuso y repartir carga.

### 8.3.3 Infraestructura

- **Despliegue:** Contenedores (Docker); orquestación (Kubernetes, ECS o similar) para escalar API y workers.
- **BD:** PostgreSQL gestionado (RDS, Cloud SQL, etc.) con backups automáticos y restauración probada.
- **Archivos:** Adjuntos y comprobantes en almacenamiento objeto (S3, GCS) con clave que incluya tenantId para aislamiento lógico.
- **Colas:** Para jobs asíncronos (reportes, envíos masivos, integraciones); no bloquear requests HTTP.

---

## 8.4 Seguridad y cumplimiento (SaaS)

- **Aislamiento de datos:** Nunca devolver datos de un tenant a otro; validar en cada request que el recurso pertenece al tenant del usuario (y a una sucursal permitida).
- **Secrets:** Tokens de integración (Google, etc.) cifrados en reposo; claves en vault o variables de entorno; no en código ni en logs.
- **Auditoría:** Registro de acciones sensibles (altas, modificaciones, anulaciones, exportaciones) con usuario, tenant, fecha y recurso; retención según política (ej. 1 año).
- **Cumplimiento:** Según mercado objetivo (Argentina, LATAM): considerar GDPR-like para datos personales si hay clientes en UE; políticas de privacidad y términos de uso; posibilidad de exportar y borrar datos del tenant (baja del servicio).
- **Disponibilidad:** Objetivo de SLA (ej. 99,5 % uptime) para planes pagos; health checks y monitoreo; plan de respuesta ante incidentes.

---

## 8.5 Onboarding y operación

- **Onboarding:** Flujo de registro (crear tenant, primer usuario admin, primera sucursal); opcional: wizard guiado (datos de la empresa, carga inicial de productos o listas de precios).
- **Facturación:** Fuera del ERP; el ERP solo debe “saber” el plan del tenant (y sus límites) para aplicar restricciones. Integración con pasarela de pago vía webhooks (renovación, fallo de pago) para actualizar estado de suscripción (active, past_due, cancelled).
- **Soporte:** Base de conocimiento, guías de uso (como las que ofrece [Dux](https://duxsoftware.com.ar/) en su sitio); canal de contacto; para planes altos, soporte prioritario.
- **Actualizaciones:** Despliegues continuos o por versión; ventana de mantenimiento comunicada; migraciones de BD en cada release sin downtime cuando sea posible.

---

## 8.6 Resumen

| Tema | Enfoque |
|------|---------|
| **Modelo SaaS** | Suscripción por tenant; opcional por usuario/sucursal/plan; límites configurables. |
| **Límites** | Definidos por plan (usuarios, sucursales, features); comprobación en backend; sin hardcode. |
| **Escalabilidad** | Stateless API, multi-tenant por tenantId, índices y paginación, reportes asíncronos, réplicas de lectura; futuro sharding o instancia por tenant si hace falta. |
| **Seguridad** | Aislamiento por tenant, auditoría, secrets cifrados, políticas de privacidad y baja. |
| **Operación** | Onboarding claro, facturación externa con estado de plan en el sistema, soporte y actualizaciones planificadas. |

Con esta estrategia, el diseño del ERP liviano queda listo para ser desarrollado por fases (documento 07) y comercializado como producto SaaS profesional y escalable.
