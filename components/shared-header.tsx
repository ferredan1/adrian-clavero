"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Menu, X } from "lucide-react"
import { TopBanner } from "@/components/top-banner"

export function SharedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const whatsappNumber = "+5491154625634"
  const phoneNumber = "+54 9 11 5462-5634"

  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por ..."
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <>
      <TopBanner />
      <header
        className={`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link
            href="/"
            className="text-base sm:text-lg md:text-xl font-bold text-primary hover:text-primary/80 transition-colors truncate max-w-[150px] sm:max-w-none"
          >
            AC | Adrián Clavero
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Navegación principal">
            <Link
              href="/servicios"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              aria-label="Ver servicios de plomería y gas"
            >
              SERVICIOS
            </Link>
            <Link
              href="/trabajos"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              aria-label="Ver trabajos realizados"
            >
              CLIENTES
            </Link>
            <Link
              href="/zonas"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              aria-label="Ver zonas de cobertura"
            >
              ZONAS
            </Link>
            <Link
              href="/preguntas"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              aria-label="Ver preguntas frecuentes"
            >
              PREGUNTAS
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              aria-label="Contactar con Adrián Clavero"
            >
              CONTACTO
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              onClick={handleWhatsAppClick}
              className="gap-2 text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </Button>
            <Button
              onClick={handleCallClick}
              className="gap-2 bg-black hover:bg-black/90 text-white text-sm px-4 py-2"
              aria-label="Llamar por teléfono"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Llamar
            </Button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 hover:bg-accent/10 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border py-4 lg:hidden animate-fade-in-down">
            <nav className="flex flex-col gap-3" aria-label="Menú móvil">
              <Link
                href="/servicios"
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                SERVICIOS
              </Link>
              <Link
                href="/trabajos"
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                CLIENTES
              </Link>
              <Link
                href="/zonas"
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                ZONAS
              </Link>
              <Link
                href="/preguntas"
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                PREGUNTAS
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-accent/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACTO
              </Link>
              <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-border">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full gap-2 h-11 bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  onClick={handleCallClick}
                  className="w-full gap-2 bg-black hover:bg-black/90 text-white h-11"
                  size="lg"
                >
                  <Phone className="h-4 w-4" />
                  Llamar
                </Button>
              </div>
            </nav>
          </div>
        )}
        </div>
      </header>
    </>
  )
}

