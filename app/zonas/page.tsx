"use client"

import { SharedHeader } from "@/components/shared-header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SharedFooter } from "@/components/shared-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { MapPin, CheckCircle, Wrench, Shield, Award, CreditCard } from "lucide-react"

export default function ZonasPage() {
  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por ..."
    window.open("https://wa.me/5491154625634?text=" + encodeURIComponent(mensaje), "_blank")
  }

  const zonasCABA = [
    "Palermo",
    "Belgrano",
    "Recoleta",
    "Villa Urquiza",
    "Caballito",
    "Núñez",
    "Colegiales",
    "Villa Crespo",
    "Almagro",
    "Flores",
    "Villa Devoto",
    "Saavedra",
    "Barrio Norte",
    "San Telmo",
    "Retiro",
    "Puerto Madero",
  ]

  const zonasGBA = [
    "Vicente López",
    "San Isidro",
    "San Fernando",
    "Tigre",
    "Olivos",
    "Martínez",
    "Acassuso",
    "Beccar",
    "Victoria",
    "San Martín",
    "Tres de Febrero",
    "Hurlingham",
    "Villa Ballester",
    "Ciudad Jardín",
    "Caseros",
    "Munro",
    "Villa Adelina",
    "Carapachay",
    "San Andrés",
    "Boulogne",
    "Florida",
    "Loma Hermosa",
    "Villa Bosch",
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <Breadcrumbs items={[{ label: "Zonas" }]} />
      <main>
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 shadow-lg">
                <MapPin className="h-4 w-4" />
                Servicio en AMBA
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Zonas de Cobertura
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
                Servicio profesional de plomería, gas e Hidro Jet en toda CABA y zona norte del Gran Buenos Aires.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="relative h-72 sm:h-80 md:h-[28rem] rounded-3xl overflow-hidden shadow-2xl mb-8 sm:mb-12 border-4 border-white">
                <Image src="/buenos-aires.jpg" alt="Mapa de Buenos Aires" fill className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                    Atendemos toda el Área Metropolitana de Buenos Aires
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <Card className="p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-slate-200">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center justify-center">
                      <MapPin className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Ciudad de Buenos Aires</h2>
                      <p className="text-sm text-muted-foreground">Todos los barrios</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {zonasCABA.map((zona) => (
                      <div key={zona} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{zona}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-slate-200">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center justify-center">
                      <MapPin className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Zona Norte GBA</h2>
                      <p className="text-sm text-muted-foreground">Principales localidades</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {zonasGBA.map((zona) => (
                      <div key={zona} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{zona}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center text-balance">
                ¿Por qué elegirnos?
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Llegamos Rápido</h3>
                  <p className="text-sm text-muted-foreground">
                    Servicio en toda CABA y zona norte. Atención de emergencias 24/7.
                  </p>
                </Card>
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Puntualidad</h3>
                  <p className="text-sm text-muted-foreground">
                    Respetamos tu tiempo. Coordinamos horarios que se adaptan a tu agenda.
                  </p>
                </Card>
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Garantía</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos nuestros trabajos incluyen garantía y seguimiento post-servicio.
                  </p>
                </Card>
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Equipamiento</h3>
                  <p className="text-sm text-muted-foreground">
                    Tecnología de punta: Hidro Jet, cámaras de inspección y herramientas modernas.
                  </p>
                </Card>
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Matriculado</h3>
                  <p className="text-sm text-muted-foreground">
                    Gasista matriculado. Certificaciones oficiales en todos los trabajos.
                  </p>
                </Card>
                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CreditCard className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Facilidades</h3>
                  <p className="text-sm text-muted-foreground">
                    Múltiples formas de pago. Planes de financiación para trabajos grandes.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <FloatingWhatsApp />
    </div>
  )
}
