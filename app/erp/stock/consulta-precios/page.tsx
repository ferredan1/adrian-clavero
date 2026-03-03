import React from "react"

const productos = [
  {
    codigo: "TUB-110-3M",
    descripcion: "Tubo PVC 110mm 3m",
    marca: "Tigre",
    rubro: "Desagües",
    stockCasaCentral: 24,
    stockDeposito: 80,
    costo: "$ 6.210",
    lista1: "$ 8.900",
    lista2: "$ 9.500",
  },
  {
    codigo: "LLV-1/2-ESF",
    descripcion: "Llave esférica 1/2\" pesada",
    marca: "FV",
    rubro: "Llaves y válvulas",
    stockCasaCentral: 5,
    stockDeposito: 15,
    costo: "$ 3.120",
    lista1: "$ 4.700",
    lista2: "$ 4.950",
  },
  {
    codigo: "CEM-50KG",
    descripcion: "Cemento Portland x50kg",
    marca: "Loma Negra",
    rubro: "Materiales básicos",
    stockCasaCentral: 12,
    stockDeposito: 120,
    costo: "$ 9.800",
    lista1: "$ 13.900",
    lista2: "$ 14.600",
  },
]

export default function ConsultaPreciosStockPage() {
  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <section className="flex flex-col gap-3 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold md:text-lg">Consulta de precios y stock</h2>
          <p className="text-xs text-muted-foreground md:text-sm">
            Pensada para mostrador: búsqueda rápida por código, descripción o proveedor.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs md:text-sm">
          <button className="rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground hover:bg-secondary/90">
            Generar orden de compra
          </button>
        </div>
      </section>

      {/* Buscador */}
      <section className="space-y-3 rounded-lg border bg-card p-3 text-xs shadow-sm md:p-4 md:text-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1 md:col-span-2">
            <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Buscar producto</label>
            <input
              className="w-full rounded-md border bg-background px-2.5 py-1.5"
              placeholder="Código, descripción, proveedor, marca…"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Sucursal</label>
            <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
              <option>Casa Central</option>
              <option>Depósito</option>
              <option>Todas</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Proveedor</label>
            <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
              <option>Todos</option>
              <option>Distribuidora Centro</option>
              <option>Mayorista Norte</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Marca</label>
            <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
              <option>Todas</option>
              <option>Tigre</option>
              <option>FV</option>
              <option>Loma Negra</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-muted-foreground md:text-xs">Rubro</label>
            <select className="w-full rounded-md border bg-background px-2.5 py-1.5">
              <option>Todos</option>
              <option>Desagües</option>
              <option>Llaves y válvulas</option>
              <option>Materiales básicos</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button className="flex-1 rounded-md border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted md:text-sm">
              Limpiar
            </button>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="rounded-lg border bg-card p-3 shadow-sm md:p-4">
        <header className="flex items-center justify-between gap-3 pb-2">
          <h3 className="text-sm font-semibold md:text-base">Resultados</h3>
          <span className="text-[11px] text-muted-foreground md:text-xs">
            {productos.length} productos simulados
          </span>
        </header>

        <div className="overflow-x-auto rounded-md border bg-background">
          <table className="min-w-full text-left text-xs md:text-sm">
            <thead className="bg-muted/60 text-[11px] uppercase tracking-wide text-muted-foreground md:text-xs">
              <tr>
                <th className="px-3 py-2 font-medium">Código</th>
                <th className="px-3 py-2 font-medium">Descripción</th>
                <th className="px-3 py-2 font-medium">Marca</th>
                <th className="px-3 py-2 font-medium">Rubro</th>
                <th className="px-3 py-2 font-medium text-right">Stock Casa Central</th>
                <th className="px-3 py-2 font-medium text-right">Stock Depósito</th>
                <th className="px-3 py-2 font-medium text-right">Costo</th>
                <th className="px-3 py-2 font-medium text-right">Lista 1</th>
                <th className="px-3 py-2 font-medium text-right">Lista 2</th>
                <th className="px-3 py-2 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.codigo} className="border-t text-xs hover:bg-muted/40">
                  <td className="px-3 py-2 align-middle font-medium">{p.codigo}</td>
                  <td className="px-3 py-2 align-middle">{p.descripcion}</td>
                  <td className="px-3 py-2 align-middle text-xs text-muted-foreground">{p.marca}</td>
                  <td className="px-3 py-2 align-middle text-xs text-muted-foreground">{p.rubro}</td>
                  <td className="px-3 py-2 text-right align-middle">{p.stockCasaCentral}</td>
                  <td className="px-3 py-2 text-right align-middle">{p.stockDeposito}</td>
                  <td className="px-3 py-2 text-right align-middle">{p.costo}</td>
                  <td className="px-3 py-2 text-right align-middle">{p.lista1}</td>
                  <td className="px-3 py-2 text-right align-middle">{p.lista2}</td>
                  <td className="px-3 py-2 text-right align-middle">
                    <button className="rounded-md border bg-background px-2 py-1 text-[11px] hover:bg-muted">
                      Agregar a venta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground md:text-xs">
          Desde esta pantalla, en la versión completa se podrá disparar ordenes de compra al proveedor según stock
          mínimo configurado.
        </p>
      </section>
    </div>
  )
}

