import React from "react"
import Link from "next/link"
import { clsx } from "clsx"

type Props = {
  children: React.ReactNode
}

const navItems = [
  { href: "/erp", label: "Inicio" },
  { href: "/erp/ventas", label: "Ventas" },
  { href: "/erp/compras", label: "Compras" },
  { href: "/erp/stock/consulta-precios", label: "Stock" },
  { href: "/erp/tesoreria", label: "Tesorería" },
  { href: "/erp/reportes", label: "Reportes" },
  { href: "/erp/configuracion", label: "Configuración" },
]

export default function ErpLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <div className="flex h-screen max-h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
          <div className="px-5 py-4 border-b">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              ERP liviano
            </div>
            <div className="mt-1 text-lg font-bold">Comercios</div>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "block rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-3 border-t text-xs text-muted-foreground">
            Demo UI · Sin backend aún
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:px-6">
            <div className="space-y-0.5">
              <div className="text-xs text-muted-foreground">ERP / Demo</div>
              <h1 className="text-lg font-semibold md:text-xl">Panel de gestión comercial</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-xs text-right text-muted-foreground">
                <span>Cuenta demo</span>
                <span className="font-medium text-foreground">Sucursal: Casa Central</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                AC
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto bg-muted/40">
            <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}

