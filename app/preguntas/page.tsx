"use client"

import { SharedHeader } from "@/components/shared-header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SharedFooter } from "@/components/shared-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, Wrench, Droplets, Flame, CircleDollarSign } from "lucide-react"

export default function PreguntasPage() {
  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por ..."
    window.open("https://wa.me/5491154625634?text=" + encodeURIComponent(mensaje), "_blank")
  }

  const handleCallClick = () => {
    window.location.href = "tel:+5491154625634"
  }

  const faqCategories = [
    {
      title: "Servicios de Plomería",
      icon: Wrench,
      faqs: [
        {
          question: "¿Qué incluye el servicio de plomería?",
          answer:
            "Nuestro servicio de plomería incluye reparación y reemplazo de cañerías, instalación de artefactos sanitarios, reparación de pérdidas, destapaciones, y mantenimiento preventivo de todo el sistema de agua y desagües de tu propiedad.",
        },
        {
          question: "¿Realizan trabajos de emergencia?",
          answer:
            "Sí, atendemos emergencias las 24 horas. Si tenés una pérdida importante, caño roto o cualquier problema urgente de plomería, contactanos inmediatamente y te daremos prioridad para solucionar el problema lo antes posible.",
        },
        {
          question: "¿Cuánto tiempo tarda una reparación típica?",
          answer:
            "El tiempo varía según la complejidad del trabajo. Reparaciones simples pueden tomar 1-2 horas, mientras que trabajos más complejos como reemplazo de cañerías pueden llevar varios días. Te daremos un estimado preciso después de la evaluación inicial.",
        },
        {
          question: "¿Ofrecen garantía en los trabajos?",
          answer:
            "Sí, todos nuestros trabajos incluyen garantía. La duración depende del tipo de servicio realizado, pero generalmente ofrecemos 6 meses en reparaciones y hasta 1 año en instalaciones nuevas. Usamos materiales de primera calidad para asegurar durabilidad.",
        },
      ],
    },
    {
      title: "Servicio Hidro Jet",
      icon: Droplets,
      faqs: [
        {
          question: "¿Qué es el Hidro Jet?",
          answer:
            "El Hidro Jet es un sistema de limpieza de cañerías mediante agua a alta presión. Es el método más efectivo para eliminar obstrucciones severas, raíces, grasa acumulada y residuos sólidos sin dañar las cañerías.",
        },
        {
          question: "¿Cuándo se recomienda usar Hidro Jet?",
          answer:
            "Se recomienda cuando hay obstrucciones recurrentes, malos olores persistentes, cañerías tapadas por raíces de árboles, acumulación severa de grasa, o como mantenimiento preventivo en sistemas antiguos. Es más efectivo que las destapaciones tradicionales.",
        },
        {
          question: "¿El Hidro Jet daña las cañerías?",
          answer:
            "No, el Hidro Jet es seguro para todo tipo de cañerías cuando lo realiza un profesional capacitado. El equipo se regula según el tipo de tubería y utilizamos cámaras de inspección para verificar el estado de las cañerías antes y después del servicio.",
        },
      ],
    },
    {
      title: "Instalación de Gas",
      icon: Flame,
      faqs: [
        {
          question: "¿Están matriculados para trabajos de gas?",
          answer:
            "Sí, somos gasistas matriculados con habilitación vigente. Todos nuestros trabajos cumplen con las normativas de Metrogas y otras distribuidoras, e incluyen la certificación correspondiente requerida por ley.",
        },
        {
          question: "¿Qué trabajos de gas realizan?",
          answer:
            "Realizamos instalación de gas completa en viviendas y comercios, instalación y reparación de artefactos (calefones, termotanques, estufas, cocinas), conversión de gas natural a envasado y viceversa, reparación de pérdidas, y certificaciones anuales.",
        },
        {
          question: "¿Cuánto demora una instalación de calefón?",
          answer:
            "Una instalación estándar de calefón suele tomar entre 3 y 6 horas, incluyendo la colocación del artefacto, conexión de gas, ventilación, y prueba de funcionamiento. Si requiere modificaciones adicionales en la instalación, puede tomar más tiempo.",
        },
        {
          question: "¿Entregan certificado de gas?",
          answer:
            "Sí, emitimos factura por todos nuestros servicios. Somos monotributistas inscriptos y cumplimos con todas las obligaciones fiscales.",
        },
      ],
    },
    {
      title: "Presupuestos y Pagos",
      icon: CircleDollarSign,
      faqs: [
        {
          question: "¿Cobran por la visita o presupuesto?",
          answer:
            "El presupuesto inicial es sin cargo en AMBA. Visitamos tu propiedad, evaluamos el trabajo necesario y te damos un presupuesto detallado sin compromiso. Solo cobramos si decidís contratar el servicio.",
        },
        {
          question: "¿Qué formas de pago aceptan?",
          answer:
            "Aceptamos efectivo, transferencia bancaria, y tarjetas de débito/crédito. Para trabajos grandes ofrecemos planes de pago en cuotas. Pedí el 50% al comenzar el trabajo y el resto al finalizar.",
        },
        {
          question: "¿El presupuesto incluye materiales?",
          answer:
            "Sí, nuestros presupuestos son completos e incluyen mano de obra y materiales necesarios. No hay costos ocultos. Si durante el trabajo surge algún imprevisto, te consultamos antes de proceder con cualquier costo adicional.",
        },
        {
          question: "¿Dan factura por los trabajos?",
          answer:
            "Sí, emitimos factura por todos nuestros servicios. Somos monotributistas inscriptos y cumplimos con todas las obligaciones fiscales.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <Breadcrumbs items={[{ label: "Preguntas Frecuentes" }]} />
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 shadow-lg">
                <MessageCircle className="h-4 w-4" />
                Centro de Ayuda
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Preguntas Frecuentes
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
                Encontrá respuestas a las preguntas más comunes sobre nuestros servicios de plomería, gas e Hidro Jet.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-slate-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">{category.title}</h2>
                  </div>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border border-slate-200 rounded-xl px-4 sm:px-6 hover:border-primary/30 transition-colors bg-slate-50/50"
                      >
                        <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:text-primary py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SharedFooter />
      <FloatingWhatsApp />
    </div>
  )
}
