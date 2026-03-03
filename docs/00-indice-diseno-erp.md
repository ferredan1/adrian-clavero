# Diseño de producto: ERP liviano para comercios

Sistema de gestión comercial (ERP liviano) para comercios minoristas y mayoristas: ferreterías, corralones, sanitarios, mayoristas y distribuidores. Diseño profesional, escalable y comercializable como SaaS.

---

## Entregables del diseño

| # | Documento | Contenido |
|---|-----------|-----------|
| 1 | [01-arquitectura-sistema.md](./01-arquitectura-sistema.md) | Arquitectura completa: capas, componentes, integraciones, seguridad, multi-tenant |
| 2 | [02-modelo-datos.md](./02-modelo-datos.md) | Modelo de datos detallado (entidades, relaciones, reglas) |
| 3 | [03-modulos-funcionales.md](./03-modulos-funcionales.md) | Lista de módulos funcionales y alcance por módulo |
| 4 | [04-flujos-usuario.md](./04-flujos-usuario.md) | Flujos de usuario por módulo y casos de uso |
| 5 | [05-diseno-permisos.md](./05-diseno-permisos.md) | Diseño de permisos (granular, por acción, por sucursal) |
| 6 | [06-estructura-carpetas.md](./06-estructura-carpetas.md) | Estructura de carpetas frontend y backend |
| 7 | [07-plan-desarrollo-fases.md](./07-plan-desarrollo-fases.md) | Plan de desarrollo por fases e hitos |
| 8 | [08-estrategia-saas-escalabilidad.md](./08-estrategia-saas-escalabilidad.md) | Estrategia SaaS, facturación y escalabilidad |

---

## Referencia conceptual (Dux Software)

- **Dux Software** ([duxsoftware.com.ar](https://duxsoftware.com.ar/)) se usará **solo como referencia funcional** cuando el usuario proporcione información, capturas o requisitos derivados de Dux.
- Hasta recibir esa información, no se asume contenido específico de Dux; el diseño se basa en los requisitos escritos en este brief.
- **Uso permitido:** entender funcionamiento real de ERP comercial, identificar módulos necesarios, analizar UX del rubro, detectar buenas prácticas y limitaciones.
- **Prohibido:** copiar diseño, estructura, flujos exactos o branding.
- **Objetivo:** el sistema debe ser más simple de usar, más moderno visualmente, más flexible en permisos y mejor preparado para automatización e integraciones que la referencia.

---

## Stack tecnológico acordado

- **Frontend:** React, Next.js (App Router), TypeScript, PWA, mobile first.
- **Backend:** Node.js, NestJS, API REST, JWT + Refresh Tokens, multi-tenant.
- **Base de datos:** PostgreSQL, Prisma ORM, migraciones versionadas.
- **Infraestructura:** Docker, cloud ready.

---

*Documentación generada como base para el desarrollo por etapas. No incluye código; solo diseño de producto.*
