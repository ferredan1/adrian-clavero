"use client"

import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplets, Wrench, Flame, CheckCircle, MessageCircle, Shield, Zap } from "lucide-react"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function ServiciosPage() {
  const whatsappNumber = "+5491154625634"
  const phoneNumber = "+54 9 11 5462-5634"

  const handleWhatsAppClickDestapaciones = () => {
    const mensaje = "Hola Adrian, te consulto por destapaciones con Hidro Jet..."
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleWhatsAppClickPlomeria = () => {
    const mensaje = "Hola Adrian, te consulto por plomería..."
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleWhatsAppClickGas = () => {
    const mensaje = "Hola Adrian, te consulto por instalación de gas..."
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <Breadcrumbs items={[{ label: "Servicios" }]} />

      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Shield className="h-4 w-4" />
              Plomería, Gas y Destapaciones
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
              Servicios Profesionales en Buenos Aires
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
              Más de 15 años de experiencia en plomería integral, instalación de gas y destapaciones con tecnología
              Hidro Jet. Garantía escrita en todos nuestros trabajos.
            </p>
          </div>
        </div>
      </section>

      {/* Hidro Jet Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-700 rounded-full text-sm font-semibold mb-4 shadow-sm">
                <Zap className="h-4 w-4" />
                Tecnología de Alta Presión
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Destapaciones con Hidro Jet</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Sistema de limpieza profesional con agua a alta presión (hasta 4000 PSI) para destapaciones efectivas de
                cañerías sin químicos ni daños. La solución más moderna y definitiva para cañerías tapadas.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-2xl transition-all duration-300 border-blue-100">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-4">
                    <Droplets className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">¿Qué es el Hidro Jet?</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    El Hidro Jet es la tecnología más avanzada para destapar cañerías. Utilizamos agua a alta presión
                    para eliminar obstrucciones severas, raíces, grasa acumulada y residuos sólidos sin dañar las
                    tuberías.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Sin roturas ni obras invasivas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Elimina raíces, grasa y obstrucciones severas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Limpieza profunda que previene futuros bloqueos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ecológico: solo usa agua, sin químicos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">¿Cuándo necesitás Hidro Jet?</h3>
                  <ul className="space-y-4">
                    <li>
                      <div className="font-semibold mb-1">Desagües lentos o tapados</div>
                      <p className="text-sm text-muted-foreground">
                        El agua tarda en bajar o se acumula en piletas, bañeras o inodoros
                      </p>
                    </li>
                    <li>
                      <div className="font-semibold mb-1">Obstrucciones recurrentes</div>
                      <p className="text-sm text-muted-foreground">
                        Las cañerías se tapan frecuentemente a pesar de destapaciones previas
                      </p>
                    </li>
                    <li>
                      <div className="font-semibold mb-1">Raíces en cañerías</div>
                      <p className="text-sm text-muted-foreground">
                        Árboles cercanos han infiltrado raíces en el sistema de desagüe
                      </p>
                    </li>
                    <li>
                      <div className="font-semibold mb-1">Grasa acumulada</div>
                      <p className="text-sm text-muted-foreground">
                        Especialmente en cocinas de restaurantes o uso intensivo doméstico
                      </p>
                    </li>
                    <li>
                      <div className="font-semibold mb-1">Malos olores persistentes</div>
                      <p className="text-sm text-muted-foreground">Olores que vienen de las cañerías o desagües</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleWhatsAppClickDestapaciones}
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chateá por WhatsApp - Destapaciones
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plomería Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Wrench className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Plomería Integral</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Soluciones completas de plomería para tu hogar o negocio. Reparamos pérdidas de agua, instalamos
                artefactos sanitarios nuevos, cambiamos cañerías y realizamos todo tipo de trabajos de plomería con
                garantía escrita.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: "Reparación de Pérdidas", desc: "Canillas, sanitarios, cañerías" },
                { title: "Instalaciones Nuevas", desc: "Baños, cocinas, lavaderos completos" },
                { title: "Cambio de Cañerías", desc: "Reemplazo de caños viejos u oxidados" },
                { title: "Destapaciones Manuales", desc: "Inodoros, piletas, desagües" },
                { title: "Termotanques Eléctricos", desc: "Instalación y reparación" },
                { title: "Grifería y Sanitarios", desc: "Instalación y cambio de artefactos" },
                { title: "Cloacas y Pluviales", desc: "Reparación y mantenimiento" },
                { title: "Trabajos de Albañilería", desc: "Complementarios a plomería" },
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Wrench className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleWhatsAppClickPlomeria}
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chateá por WhatsApp - Plomería
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gas Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
                <Shield className="h-4 w-4" />
                Gasista Matriculado
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Instalaciones de Gas</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Gasista matriculado para instalaciones seguras y certificadas. Instalamos y reparamos termotanques,
                calefones, estufas, cocinas y todo tipo de artefactos a gas con certificación oficial incluida.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: "Termotanques y Calefones", desc: "Instalación y reparación profesional" },
                { title: "Cocinas y Hornos a Gas", desc: "Conexión y habilitación segura" },
                { title: "Estufas y Calefactores", desc: "Instalación certificada" },
                { title: "Calefacción Central", desc: "Calderas y sistemas completos" },
                { title: "Certificaciones Oficiales", desc: "Habilitación municipal y de gas" },
                { title: "Reparación de Fugas", desc: "Detección y reparación segura" },
                { title: "Planos Conforme a Obra", desc: "Para trámites municipales" },
                { title: "Conversión Gas Natural/Envasado", desc: "Cambio seguro de sistema" },
              ].map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Flame className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center flex-shrink-0">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Seguridad Garantizada</h3>
                  <p className="text-muted-foreground mb-4">
                    Todas nuestras instalaciones de gas cumplen estrictamente con las normativas de seguridad vigentes e
                    incluyen certificado de habilitación oficial válido para trámites en la compañía de gas y
                    municipalidad.
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Materiales homologados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Prueba de hermeticidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Ventilación adecuada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Certificación oficial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleWhatsAppClickGas}
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chateá por WhatsApp - Gas
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SharedFooter />
      <FloatingWhatsApp />
    </div>
  )
}
