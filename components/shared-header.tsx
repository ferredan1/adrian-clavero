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

  const whatsappNumber = "+5491120345160"
  const phoneNumber = "+54 9 11 2034-5160"

  const handleWhatsAppClick = () => {
    const mensaje = "Hola, quiero cotizar productos para mi obra"
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
        <div className="flex h-14 sm:h-16 items-center">
          <Link
            href="/"
            className="text-base sm:text-lg md:text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            aria-label="Ferretería Dany - Inicio"
          >
            FERRETERÍA <span className="text-[#c62828]">DANY</span>
          </Link>

          {/* Desktop Menu - Centered */}
          <nav className="hidden items-center gap-4 xl:gap-5 lg:flex flex-1 justify-center" aria-label="Navegación principal">
            <Link
              href="#servicios"
              className="text-sm font-medium hover:text-[#c62828] transition-colors whitespace-nowrap"
              aria-label="Ver servicios"
            >
              SERVICIOS
            </Link>
            <Link
              href="https://ferreteriadany.com.ar/"
              target="_blank"
              className="text-sm font-medium hover:text-[#c62828] transition-colors whitespace-nowrap"
              aria-label="Tienda Online"
            >
              TIENDA ONLINE
            </Link>
            <Link
              href="#nosotros"
              className="text-sm font-medium hover:text-[#c62828] transition-colors whitespace-nowrap"
              aria-label="Quiénes somos"
            >
              NOSOTROS
            </Link>
            <Link
              href="#opiniones"
              className="text-sm font-medium hover:text-[#c62828] transition-colors whitespace-nowrap"
              aria-label="Opiniones"
            >
              OPINIONES
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-[#c62828] transition-colors whitespace-nowrap"
              aria-label="FAQ"
            >
              FAQ
            </Link>
            <Link
              href="#contacto"
              className="text-sm font-medium hover:text-[#c62828] transition-colors whitespace-nowrap"
              aria-label="Contacto"
            >
              CONTACTO
            </Link>
          </nav>

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
                href="#servicios"
                className="text-sm font-medium hover:text-[#c62828] transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                SERVICIOS
              </Link>
              <Link
                href="https://ferreteriadany.com.ar/"
                target="_blank"
                className="text-sm font-medium hover:text-[#c62828] transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                TIENDA ONLINE
              </Link>
              <Link
                href="#nosotros"
                className="text-sm font-medium hover:text-[#c62828] transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                NOSOTROS
              </Link>
              <Link
                href="#opiniones"
                className="text-sm font-medium hover:text-[#c62828] transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                OPINIONES
              </Link>
              <Link
                href="#faq"
                className="text-sm font-medium hover:text-[#c62828] transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#contacto"
                className="text-sm font-medium hover:text-[#c62828] transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACTO
              </Link>
            </nav>
          </div>
        )}
        </div>
      </header>
    </>
  )
}

