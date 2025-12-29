"use client"

import { Button } from "@/components/ui/button"

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por..."
    window.open("https://wa.me/5491154625634?text=" + encodeURIComponent(mensaje), "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white p-0 hover:scale-110 transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      {/* WhatsApp Official Logo SVG */}
      <svg viewBox="0 0 32 32" className="h-9 w-9" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.831.739 5.488 2.031 7.787L0 32l8.401-2.197A15.94 15.94 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333c-2.432 0-4.728-.648-6.703-1.787l-.48-.283-4.965 1.301 1.329-4.853-.312-.496A13.233 13.233 0 0 1 2.667 16c0-7.364 5.969-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.307-9.973c-.4-.2-2.369-1.169-2.735-1.301-.365-.133-.631-.2-.896.2-.265.4-1.031 1.301-1.265 1.567-.233.265-.467.299-.867.1-.4-.2-1.688-.623-3.215-1.984-1.188-1.061-1.991-2.371-2.224-2.771-.233-.4-.025-.616.176-.815.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.265.067-.499-.033-.7-.1-.2-.896-2.157-1.229-2.955-.324-.776-.652-.671-.896-.684-.233-.012-.499-.015-.765-.015s-.7.1-1.065.499c-.365.4-1.396 1.365-1.396 3.325 0 1.96 1.429 3.853 1.628 4.119.2.265 2.807 4.285 6.8 6.009.951.411 1.693.656 2.271.84.955.303 1.824.26 2.511.157.765-.115 2.369-.968 2.703-1.903.333-.935.333-1.735.233-1.903-.1-.167-.365-.267-.765-.467z" />
      </svg>
    </Button>
  )
}

