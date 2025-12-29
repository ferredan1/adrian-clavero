"use client"

import React, { useState, useEffect } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageCircle,
  Droplets,
  Wrench,
  Flame,
  AlertCircle,
  Shield,
  Zap,
  FileCheck,
  Clock,
  Star,
  MapPin,
  CheckCircle,
  Award,
  CreditCard,
} from "lucide-react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [portfolioFilter, setPortfolioFilter] = useState("all")
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    description: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const [isFormSuccess, setIsFormSuccess] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType = entry.target.getAttribute("data-animation")

          if (animationType) {
            entry.target.classList.add(`animate-${animationType}`)
          }

          entry.target.classList.remove("opacity-0")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".stagger-item")
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-fade-in-up")
                item.classList.remove("opacity-0")
              }, index * 100)
            })
            staggerObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const staggerContainers = document.querySelectorAll(".stagger-container")
    staggerContainers.forEach((container) => staggerObserver.observe(container))

    return () => staggerObserver.disconnect()
  }, [portfolioFilter])

  const whatsappNumber = "+5491154625634"
  const phoneNumber = "+54 9 11 5462-5634"

  const handleWhatsAppClickDestapaciones = () => {
    const mensaje = "Hola Adrian, necesito un servicio de destapación con Hidro Jet"
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleWhatsAppClickPlomeria = () => {
    const mensaje = "Hola Adrian, necesito un servicio de plomería"
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleWhatsAppClickGas = () => {
    const mensaje = "Hola Adrian, necesito un servicio de gas"
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por ..."
    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(mensaje)}`, "_blank")
  }

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido"
    }

    if (!formData.phone.trim()) {
      errors.phone = "El teléfono es requerido"
    } else if (!/^\d{8,}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      errors.phone = "Ingresa un teléfono válido"
    }

    if (!formData.service) {
      errors.service = "Selecciona un servicio"
    }

    if (!formData.description.trim()) {
      errors.description = "Describe tu problema"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsFormSubmitting(true)

    const message = encodeURIComponent(
      `Hola! Mi nombre es ${formData.name}.\n\n` +
        `Servicio: ${formData.service}\n` +
        `Descripción: ${formData.description}\n\n` +
        `Mi teléfono: ${formData.phone}`,
    )

    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${message}`, "_blank")
      setIsFormSubmitting(false)
      setIsFormSuccess(true)
      setFormErrors({})
      setTimeout(() => {
        setFormData({ name: "", phone: "", service: "", description: "" })
        setIsFormSuccess(false)
      }, 3000)
    }, 500)
  }

  const servicesData = [
    {
      icon: Wrench,
      title: "Plomería General",
      description: "Reparación de pérdidas, cambio de canillas, instalación de sanitarios, y más",
      link: "/servicios",
    },
    {
      icon: Droplets,
      title: "Destapaciones Hidro Jet",
      description: "Limpieza de cañerías con alta presión. Sin roturas, sin químicos",
      link: "/servicios",
    },
    {
      icon: Flame,
      title: "Instalaciones de Gas",
      description: "Termotanques, cocinas, estufas. Con certificado de habilitación",
      link: "/servicios",
    },
    {
      icon: AlertCircle,
      title: "Emergencias 24/7",
      description: "Atención inmediata para pérdidas y problemas urgentes",
      link: "/contacto",
    },
    {
      icon: FileCheck,
      title: "Planos y Certificaciones",
      description: "Planos conforme a obra y certificados de gas para trámites",
      link: "/servicios",
    },
    {
      icon: Shield,
      title: "Mantenimiento Preventivo",
      description: "Revisiones programadas para evitar problemas futuros",
      link: "/contacto",
    },
  ]

  const portfolioItems = [
    {
      category: "plomeria",
      title: "Reparación de Cañería en Palermo",
      description: "Se solucionó una pérdida importante sin necesidad de romper azulejos.",
      image: "/bathroom-pipe-repair.jpg",
      location: "Palermo, CABA",
    },
    {
      category: "gas",
      title: "Instalación de Termotanque en Caballito",
      description: "Instalación segura y certificada de nuevo termotanque a gas.",
      image: "/gas-water-heater-installation.jpg",
      location: "Caballito, CABA",
    },
    {
      category: "hidrojet",
      title: "Destapación Cocina con Hidro Jet en Belgrano",
      description: "Obstrucción severa por grasa. Limpieza profunda con equipo de alta presión.",
      image: "/kitchen-drain-cleaning.jpg",
      location: "Belgrano, CABA",
    },
    {
      category: "hidrojet",
      title: "Destapación Pluvial en Flores",
      description: "Raíces y sedimentos bloqueando el desagüe principal. Despejado con Hidro Jet.",
      image: "/drain-root-removal.jpg",
      location: "Flores, CABA",
    },
    {
      category: "plomeria",
      title: "Renovación de Plomería en Cocina - Núñez",
      description: "Reemplazo completo de cañerías y grifería en cocina.",
      image: "/kitchen-plumbing-renovation.jpg",
      location: "Núñez, CABA",
    },
    {
      category: "gas",
      title: "Revisión y Reparación de Cañería de Gas - Villa Urquiza",
      description: "Detectada y reparada una fuga en la instalación de gas natural.",
      image: "/gas-leak-inspection.jpg",
      location: "Villa Urquiza, CABA",
    },
  ]

  const testimonialsData = [
    {
      name: "María González",
      location: "Villa Urquiza, CABA",
      text: "Excelente servicio. Vino el mismo día que llamé por una pérdida grave. Trabajo prolijo y precio justo.",
      rating: 5,
    },
    {
      name: "Roberto Fernández",
      location: "San Isidro, GBA Norte",
      text: "Necesitaba certificado de gas urgente. Adrián lo hizo en 24hs. Muy profesional y bien explicado todo.",
      rating: 5,
    },
    {
      name: "Laura Martínez",
      location: "Flores, CABA",
      text: "El Hidro Jet funcionó perfecto. Tenía las cañerías tapadas hace meses y lo solucionó sin romper nada. Recomendado 100%.",
      rating: 5,
    },
  ]

  const faqsData = [
    {
      q: "¿Cuánto demoran en venir?",
      a: "Para emergencias, llegamos en 1-2 horas en CABA y GBA. Para trabajos programados, coordinamos según tu disponibilidad.",
    },
    {
      q: "¿Qué zonas cubren?",
      a: "Trabajamos en toda CABA y Gran Buenos Aires (Zona Norte, Oeste y Sur).",
    },
    {
      q: "¿Dan garantía por escrito?",
      a: "Sí, todos nuestros trabajos incluyen garantía escrita. Los detalles varían según el tipo de servicio.",
    },
    {
      q: "¿Cuánto cuesta el Hidro Jet?",
      a: "El precio depende del tipo de cañería y la gravedad del bloqueo. Pedí una cotización sin compromiso por WhatsApp.",
    },
    {
      q: "¿Hacen instalaciones de gas?",
      a: "Sí, estamos matriculados para todo tipo de instalaciones de gas: termotanques, cocinas, estufas, calefactores. Entregamos certificado oficial.",
    },
    {
      q: "¿Qué formas de pago aceptan?",
      a: "Aceptamos efectivo, transferencia bancaria y Mercado Pago. Para trabajos grandes, aceptamos pagos en cuotas.",
    },
  ]

  const zones = [
    "CABA (todos los barrios)",
    "Vicente López",
    "San Isidro",
    "San Fernando",
    "Tigre",
    "San Martin",
    "Caseros",
    "Tres de Febrero",
    "Villa Adelina",
    "Hurlingham",
    "Martinez",
    "Villa Ballester",
    "Ciudad Jardin",
    "Olivos",
    "Devoto",
    "Munro",
    "Acassuso",
    "San Andres",
    "Carapachay",
    "Loma Hermosa",
    "Villa Bosch",
  ]

  const filteredPortfolio =
    portfolioFilter === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === portfolioFilter)

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="text-white animate-on-scroll opacity-0" data-animation="fade-in-left">
                <div className="inline-flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-accent text-accent-foreground rounded-full text-sm sm:text-base md:text-lg font-semibold mb-4 sm:mb-6 shadow-lg">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  Matriculado · Habilitado · Asegurado
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-balance">
                  Plomería, Gas y
                  <br />
                  <span className="text-accent">Destapaciones con Hidro Jet</span>
                  <br />
                  en Buenos Aires
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
                  Soluciones profesionales de plomería y gas con{" "}
                  <span className="text-accent font-bold">garantía escrita</span>. Especialistas en destapaciones con
                  tecnología Hidro Jet de alta presión para cañerías en CABA y GBA Norte.
                </p>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">Garantía escrita</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">+15 años</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">24/7 Urgencias</span>
                  </div>
                </div>
              </div>

              <div className="animate-on-scroll opacity-0" data-animation="zoom-in">
                <Card className="shadow-2xl border-4 border-accent/20 backdrop-blur-sm bg-card/95">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-green-600">Disponible ahora</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-primary">Cotización Rápida</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                      Respuesta en menos de 2 horas
                    </p>

                    <form onSubmit={handleQuoteSubmit} className="space-y-3 sm:space-y-4">
                      <div>
                        <Input
                          placeholder="Tu nombre"
                          className={`text-base py-6 transition-all ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value })
                            if (formErrors.name) setFormErrors({ ...formErrors, name: "" })
                          }}
                        />
                        {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                      </div>

                      <div>
                        <Input
                          type="tel"
                          placeholder="Teléfono (ej: 11 1234-5678)"
                          className={`text-base py-6 transition-all ${formErrors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value })
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: "" })
                          }}
                        />
                        {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => {
                            setFormData({ ...formData, service: value })
                            if (formErrors.service) setFormErrors({ ...formErrors, service: "" })
                          }}
                        >
                          <SelectTrigger
                            className={`text-base py-6 ${formErrors.service ? "border-red-500 focus:ring-red-500" : ""}`}
                          >
                            <SelectValue placeholder="Selecciona el servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="plomeria">Plomería General</SelectItem>
                            <SelectItem value="hidrojet">Destapación Hidro Jet</SelectItem>
                            <SelectItem value="gas">Instalación de Gas</SelectItem>
                            <SelectItem value="emergencia">Emergencia 24/7</SelectItem>
                            <SelectItem value="certificado">Certificación Gas</SelectItem>
                            <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors.service && <p className="text-xs text-red-500 mt-1">{formErrors.service}</p>}
                      </div>

                      <div>
                        <Textarea
                          placeholder="Describe tu problema o necesidad..."
                          className={`min-h-[100px] text-base resize-none transition-all ${formErrors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                          value={formData.description}
                          onChange={(e) => {
                            setFormData({ ...formData, description: e.target.value })
                            if (formErrors.description) setFormErrors({ ...formErrors, description: "" })
                          }}
                        />
                        {formErrors.description && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.description}</p>
                        )}
                      </div>

                      {isFormSuccess && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-5 w-5 flex-shrink-0" />
                          <p className="text-sm">¡Consulta enviada! Te redirigimos a WhatsApp.</p>
                        </div>
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2 py-6 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-xl"
                        disabled={isFormSubmitting}
                      >
                        {isFormSubmitting ? (
                          <>
                            <span>Enviando...</span>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Enviar por WhatsApp
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div
              className="text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll opacity-0"
              data-animation="fade-in-up"
            >
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4 sm:mb-6 hover:bg-primary/20 transition-colors"
              >
                <Zap className="h-4 w-4" />
                Ver todos los servicios
              </Link>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Nuestros Servicios</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Soluciones integrales de plomería, gas e instalaciones sanitarias en CABA y GBA
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary animate-on-scroll opacity-0 stagger-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Droplets className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Destapaciones Hidro Jet</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Sistema de limpieza profesional con agua a alta presión para destapaciones efectivas de cañerías,
                    desagües pluviales, eliminación de raíces y residuos sólidos. Solución definitiva sin químicos ni
                    daños.
                  </p>
                  <Button
                    onClick={handleWhatsAppClickDestapaciones}
                    variant="outline"
                    className="w-full bg-transparent hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                  >
                    Consultar Destapación
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary animate-on-scroll opacity-0 stagger-2">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Plomería Integral</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Reparación de pérdidas de agua, cambio de cañerías, instalación de artefactos sanitarios, grifería,
                    vanitorys, inodoros, y todo tipo de trabajos de plomería para tu hogar o negocio.
                  </p>
                  <Button
                    onClick={handleWhatsAppClickPlomeria}
                    variant="outline"
                    className="w-full bg-transparent hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                  >
                    Consultar Plomería
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary animate-on-scroll opacity-0 stagger-3">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Flame className="h-8 w-8 text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Instalación de Gas</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Gasista matriculado para instalación y reparación de calefones, termotanques, estufas, cocinas.
                    Certificaciones oficiales, conversión de gas natural a envasado y trabajos con garantía.
                  </p>
                  <Button
                    onClick={handleWhatsAppClickGas}
                    variant="outline"
                    className="w-full bg-transparent hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
                  >
                    Consultar Gas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Hidro Jet Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll opacity-0" data-animation="slide-in-left">
                <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hydrojet-high-pressure-water-drain-cleaning-equipm.jpg"
                    alt="Sistema Hidro Jet Profesional"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                </div>
              </div>

              <div className="animate-on-scroll opacity-0" data-animation="slide-in-right">
                <div className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6">
                  Tecnología Hidro Jet
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Destapaciones con Alta Presión</h2>
                <p className="text-lg mb-6 text-primary-foreground/90">
                  El Hidro Jet es la solución más efectiva para desbloquear cañerías. Utilizamos agua a alta presión
                  para eliminar obstrucciones sin dañar las tuberías.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Sin roturas ni obras invasivas",
                    "Elimina raíces, grasa y obstrucciones severas",
                    "Más efectivo que métodos tradicionales",
                    "Limpieza profunda que previene futuros bloqueos",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  onClick={handleWhatsAppClickDestapaciones}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consultar por Hidro Jet
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="trabajos" className="py-16 md:py-24 relative">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-on-scroll opacity-0" data-animation="fade-in-up">
              <div className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Portfolio
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Trabajos Realizados</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Casos reales de clientes satisfechos en AMBA
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { 
                    value: "all", 
                    label: "Todos", 
                    icon: null, 
                    color: "bg-slate-600 text-white",
                    hoverColor: "hover:!bg-slate-600 hover:!text-white"
                  },
                  { 
                    value: "plomeria", 
                    label: "Plomería", 
                    icon: Wrench, 
                    color: "bg-primary text-primary-foreground",
                    hoverColor: "hover:!bg-primary hover:!text-primary-foreground"
                  },
                  { 
                    value: "gas", 
                    label: "Gas", 
                    icon: Flame, 
                    color: "bg-red-500 text-white",
                    hoverColor: "hover:!bg-red-500 hover:!text-white"
                  },
                  { 
                    value: "hidrojet", 
                    label: "Hidro Jet", 
                    icon: Droplets, 
                    color: "bg-accent text-accent-foreground",
                    hoverColor: "hover:!bg-accent hover:!text-accent-foreground"
                  },
                ].map((filter) => {
                  const getHoverStyle = () => {
                    if (portfolioFilter !== filter.value) return {}
                    switch (filter.value) {
                      case "all":
                        return { backgroundColor: "#475569", color: "#ffffff" }
                      case "plomeria":
                        return { backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" }
                      case "gas":
                        return { backgroundColor: "#ef4444", color: "#ffffff" }
                      case "hidrojet":
                        return { backgroundColor: "var(--color-accent)", color: "var(--color-accent-foreground)" }
                      default:
                        return {}
                    }
                  }
                  return (
                    <Button
                      key={filter.value}
                      variant="outline"
                      onClick={() => setPortfolioFilter(filter.value)}
                      data-filter-active={portfolioFilter === filter.value ? filter.value : undefined}
                      data-filter-color={portfolioFilter === filter.value ? filter.value : undefined}
                      style={getHoverStyle()}
                      onMouseEnter={(e) => {
                        if (portfolioFilter === filter.value) {
                          const style = getHoverStyle()
                          e.currentTarget.style.setProperty('background-color', style.backgroundColor || '', 'important')
                          e.currentTarget.style.setProperty('color', style.color || '', 'important')
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (portfolioFilter === filter.value) {
                          const style = getHoverStyle()
                          e.currentTarget.style.setProperty('background-color', style.backgroundColor || '', 'important')
                          e.currentTarget.style.setProperty('color', style.color || '', 'important')
                        }
                      }}
                      className={`transition-all duration-300 hover:scale-105 ${
                        portfolioFilter === filter.value
                          ? `${filter.color} shadow-lg border-0`
                          : "hover:border-accent/50"
                      }`}
                    >
                      {filter.icon && <filter.icon className="h-4 w-4 mr-2" />}
                      {filter.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
              {filteredPortfolio.map((item, index) => (
                <Card
                  key={index}
                  className="stagger-item opacity-0 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group bg-card/80 backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden h-64">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold shadow-lg ${
                          item.category === "hidrojet"
                            ? "bg-accent text-accent-foreground"
                            : item.category === "gas"
                              ? "bg-red-500 text-white"
                              : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {item.category === "plomeria" ? "Plomería" : item.category === "gas" ? "Gas" : "Hidro Jet"}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-on-scroll opacity-0" data-animation="zoom-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Clientes Satisfechos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                La opinión de quienes confían en nuestro servicio
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 stagger-container">
              {testimonialsData.map((testimonial, index) => (
                <Card
                  key={index}
                  className="stagger-item opacity-0 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:rotate-1"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 fill-accent" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-semibold text-primary">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-on-scroll opacity-0" data-animation="fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Por qué elegirnos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tu tranquilidad es nuestra prioridad. Confiá en profesionales experimentados y comprometidos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
              {[
                {
                  icon: MapPin,
                  title: "Llegamos Rápido",
                  description: "Servicio en toda CABA y zona norte. Atención de emergencias 24/7.",
                },
                {
                  icon: CheckCircle,
                  title: "Puntualidad",
                  description: "Respetamos tu tiempo. Coordinamos horarios que se adaptan a tu agenda.",
                },
                {
                  icon: Shield,
                  title: "Garantía",
                  description: "Todos nuestros trabajos incluyen garantía y seguimiento post-servicio.",
                },
                {
                  icon: Wrench,
                  title: "Equipamiento",
                  description: "Tecnología de punta: Hidro Jet, cámaras de inspección y herramientas modernas.",
                },
                {
                  icon: Award,
                  title: "Matriculado",
                  description: "Gasista matriculado. Certificaciones oficiales en todos los trabajos.",
                },
                {
                  icon: CreditCard,
                  title: "Facilidades",
                  description: "Múltiples formas de pago. Planes de financiación para trabajos grandes.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="stagger-item opacity-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 group border-slate-200"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-8 w-8 text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12 animate-on-scroll opacity-0" data-animation="bounce-in">
              <div className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Dudas frecuentes
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Preguntas Frecuentes</h2>
              <p className="text-lg text-muted-foreground">Respuestas claras a las dudas más comunes</p>
            </div>

            <div className="animate-on-scroll opacity-0" data-animation="fade-in">
              <Accordion type="single" collapsible className="space-y-4">
                {faqsData.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card/80 backdrop-blur-sm border-2 rounded-lg px-6 hover:border-accent/50 hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent transition-colors py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Zones Section */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12 animate-on-scroll opacity-0" data-animation="fade-in-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-balance">
                Zonas de Cobertura
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
                Servicio profesional en toda el Área Metropolitana de Buenos Aires
              </p>
            </div>

            <div className="max-w-5xl mx-auto animate-on-scroll opacity-0" data-animation="fade-in-up">
              <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {zones.map((zone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 rounded-lg border-2 border-border bg-card/80 backdrop-blur-sm p-3 sm:p-4 hover:bg-accent/10 hover:border-accent/50 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                      <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium group-hover:text-accent transition-colors">
                      {zone}
                    </span>
                  </div>
                ))}
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


