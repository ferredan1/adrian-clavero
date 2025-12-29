import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Home, MessageCircle, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SharedHeader />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center py-12 sm:py-16">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Página no encontrada</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contacto">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contactar
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-black hover:bg-black/90 text-white"
            >
              <a href="tel:+5491154625634">
                <Phone className="mr-2 h-4 w-4" />
                Llamar ahora
              </a>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground mb-4">Páginas populares:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="ghost" size="sm">
                <Link href="/servicios">Servicios</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/trabajos">Trabajos</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/zonas">Zonas</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/preguntas">Preguntas</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SharedFooter />
    </div>
  )
}
