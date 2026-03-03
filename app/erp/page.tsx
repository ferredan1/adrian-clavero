import React from "react"

const cards = [
  {
    title: "Ventas de hoy",
    value: "$ 253.480",
    sub: "+18% vs. ayer",
  },
  {
    title: "Compras del mes",
    value: "$ 1.120.300",
    sub: "-4% vs. mes pasado",
  },
  {
    title: "Clientes con deuda",
    value: "37",
    sub: "12 con riesgo alto",
  },
  {
    title: "Productos con stock crítico",
    value: "24",
    sub: "Revisar ordenes de compra",
  },
]

const ultimosMovimientos = [
  {
    tipo: "Venta",
    doc: "Factura A-0003-0251",
    cliente: "Ferretería López",
    sucursal: "Casa Central",
    total: "$ 45.320",
    fecha: "10/02 11:24",
  },
  {
    tipo: "Pedido",
    doc: "Pedido 0005-0142",
    cliente: "Obra Barrio Norte",
    sucursal: "Sucursal Deposito",
    total: "$ 128.900",
    fecha: "10/02 10:18",
  },
  {
    tipo: "Pago",
    doc: "Recibo 0001-0893",
    cliente: "Construcciones Roca",
    sucursal: "Casa Central",
    total: "$ 320.000",
    fecha: "09/02 18:02",
  },
]

export default function ErpDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Filtros principales */}
      <section className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold md:text-lg">Visión general</h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Datos simulados para probar la experiencia del ERP.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          <select className="rounded-md border bg-background px-2.5 py-1.5 text-xs md:text-sm">
            <option>Sucursal: Casa Central</option>
            <option>Sucursal: Depósito</option>
            <option>Todas las sucursales</option>
          </select>
          <select className="rounded-md border bg-background px-2.5 py-1.5 text-xs md:text-sm">
            <option>Hoy</option>
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Mes actual</option>
          </select>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col justify-between rounded-lg border bg-card p-3 text-xs shadow-sm md:p-4 md:text-sm"
          >
            <div className="text-muted-foreground">{card.title}</div>
            <div className="mt-2 text-lg font-semibold md:text-xl">{card.value}</div>
            <div className="mt-1 text-[11px] text-emerald-600 md:text-xs">{card.sub}</div>
          </article>
        ))}
      </section>

      {/* Grillas principales */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* Últimos movimientos */}
        <div className="lg:col-span-2 rounded-lg border bg-card p-4 shadow-sm">
          <header className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold md:text-base">Últimos movimientos</h3>
              <p className="text-[11px] text-muted-foreground md:text-xs">
                Ventas, pedidos y pagos más recientes.
              </p>
            </div>
            <button className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
              Ver todo
            </button>
          </header>
          <div className="mt-3 overflow-x-auto rounded-md border bg-background">
            <table className="min-w-full text-left text-xs md:text-sm">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wide text-muted-foreground md:text-xs">
                <tr>
                  <th className="px-3 py-2 font-medium">Tipo</th>
                  <th className="px-3 py-2 font-medium">Documento</th>
                  <th className="px-3 py-2 font-medium">Cliente / Proveedor</th>
                  <th className="px-3 py-2 font-medium">Sucursal</th>
                  <th className="px-3 py-2 font-medium text-right">Total</th>
                  <th className="px-3 py-2 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ultimosMovimientos.map((mov) => (
                  <tr key={mov.doc} className="border-t text-xs hover:bg-muted/40">
                    <td className="px-3 py-2 align-middle">
                      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-middle">{mov.doc}</td>
                    <td className="px-3 py-2 align-middle">{mov.cliente}</td>
                    <td className="px-3 py-2 align-middle text-xs text-muted-foreground">{mov.sucursal}</td>
                    <td className="px-3 py-2 text-right align-middle font-medium">{mov.total}</td>
                    <td className="px-3 py-2 align-middle text-xs text-muted-foreground">{mov.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="text-sm font-semibold md:text-base">Atajos rápidos</h3>
            <p className="mt-1 text-[11px] text-muted-foreground md:text-xs">
              Acciones diarias más usadas.
            </p>
            <div className="mt-3 grid gap-2 text-xs md:text-sm">
              <button className="w-full rounded-md bg-primary px-3 py-2 text-left font-medium text-primary-foreground hover:bg-primary/90">
                Nueva venta (F2)
              </button>
              <button className="w-full rounded-md bg-secondary px-3 py-2 text-left font-medium text-secondary-foreground hover:bg-secondary/90">
                Consulta precios y stock
              </button>
              <button className="w-full rounded-md bg-muted px-3 py-2 text-left font-medium hover:bg-muted/80">
                Registrar pago de cliente
              </button>
              <button className="w-full rounded-md bg-muted px-3 py-2 text-left font-medium hover:bg-muted/80">
                Cargar compra / gasto
              </button>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="text-sm font-semibold md:text-base">Estado de caja</h3>
            <dl className="mt-2 space-y-2 text-xs md:text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Caja efectivo</dt>
                <dd className="font-medium">$ 183.200</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Bancos</dt>
                <dd className="font-medium">$ 947.500</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Cheques por cobrar</dt>
                <dd className="font-medium">$ 210.000</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}

