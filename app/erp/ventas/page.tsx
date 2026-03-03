import React from "react"
import Link from "next/link"

const ventas = [
  {
    tipo: "Presupuesto",
    numero: "PRES-0003-0123",
    fecha: "10/02/2026",
    cliente: "Obra Barrio Norte",
    sucursal: "Casa Central",
    total: "$ 128.900",
    estado: "Pendiente",
  },
  {
    tipo: "Pedido",
    numero: "PED-0003-0115",
    fecha: "10/02/2026",
    cliente: "Ferretería López",
    sucursal: "Depósito",
    total: "$ 45.320",
    estado: "En preparación",
  },
  {
    tipo: "Factura",
    numero: "FA-A-0003-0251",
    fecha: "09/02/2026",
    cliente: "Construcciones Roca",
    sucursal: "Casa Central",
    total: "$ 320.000",
    estado: "Cobrada parcial",
  },
]

export default function VentasPage() {
  return (
    <div className="space-y-5">
      {/* Encabezado + acciones */}
      <section className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold md:text-lg">Gestión de ventas</h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Pantalla demo para simular el flujo de presupuestos, pedidos y facturas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          <button className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground hover:bg-primary/90">
            Nueva venta
          </button>
          <button className="rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground hover:bg-secondary/90">
            Nuevo presupuesto
          </button>
        </div>
      </section>

      {/* Filtros simples */}
      <section className="grid gap-3 rounded-lg border bg-card p-3 text-xs shadow-sm md:grid-cols-4 md:p-4 md:text-sm">
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Sucursal</label>
          <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
            <option>Casa Central</option>
            <option>Depósito</option>
            <option>Todas</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Tipo</label>
          <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
            <option>Todos</option>
            <option>Presupuestos</option>
            <option>Pedidos</option>
            <option>Facturas</option>
            <option>Notas de crédito</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Estado</label>
          <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
            <option>Todos</option>
            <option>Pendiente</option>
            <option>En preparación</option>
            <option>Facturado</option>
            <option>Cobrado</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Buscar</label>
          <input
            className="w-full rounded-md border bg-background px-2.5 py-1.5"
            placeholder="Cliente, número, obra…"
          />
        </div>
      </section>

      {/* Grilla de ventas */}
      <section className="rounded-lg border bg-card p-3 shadow-sm md:p-4">
        <div className="flex items-center justify-between gap-3 pb-2">
          <h3 className="text-sm font-semibold md:text-base">Comprobantes</h3>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <button className="rounded-md border bg-background px-3 py-1.5 hover:bg-muted">Exportar Excel</button>
            <button className="rounded-md border bg-background px-3 py-1.5 hover:bg-muted">Exportar PDF</button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-md border bg-background">
          <table className="min-w-full text-left text-xs md:text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wide text-muted-foreground md:text-xs">
              <tr>
                <th className="px-3 py-2 font-medium">Tipo</th>
                <th className="px-3 py-2 font-medium">Número</th>
                <th className="px-3 py-2 font-medium">Fecha</th>
                <th className="px-3 py-2 font-medium">Cliente / Obra</th>
                <th className="px-3 py-2 font-medium">Sucursal</th>
                <th className="px-3 py-2 font-medium text-right">Total</th>
                <th className="px-3 py-2 font-medium">Estado</th>
                <th className="px-3 py-2 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.numero} className="border-t text-xs hover:bg-muted/40">
                  <td className="px-3 py-2 align-middle">
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                      {venta.tipo}
                    </span>
                  </td>
                  <td className="px-3 py-2 align-middle">{venta.numero}</td>
                  <td className="px-3 py-2 align-middle">{venta.fecha}</td>
                  <td className="px-3 py-2 align-middle">{venta.cliente}</td>
                  <td className="px-3 py-2 align-middle text-xs text-muted-foreground">{venta.sucursal}</td>
                  <td className="px-3 py-2 text-right align-middle font-medium">{venta.total}</td>
                  <td className="px-3 py-2 align-middle">
                    <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                      {venta.estado}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right align-middle">
                    <div className="inline-flex items-center gap-1 text-[11px]">
                      <button className="rounded-md border bg-background px-2 py-1 hover:bg-muted">Ver</button>
                      <button className="rounded-md border bg-background px-2 py-1 hover:bg-muted">Editar</button>
                      <button className="rounded-md border bg-background px-2 py-1 hover:bg-muted">Duplicar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground md:text-xs">
          Esta pantalla es solo de demostración visual. Todavía no está conectada a la base de datos ni API.
        </p>
      </section>

      <section className="text-[11px] text-muted-foreground md:text-xs">
        <p>
          Tip: podés usar esta vista para discutir campos, columnas y filtros que realmente necesitás antes de avanzar
          con el backend.
        </p>
        <p>
          Para volver al panel general, andá a{" "}
          <Link href="/erp" className="underline">
            /erp
          </Link>
          .
        </p>
      </section>
    </div>
  )
}

