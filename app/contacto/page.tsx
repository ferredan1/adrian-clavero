"use client"

import React, { useState } from "react"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone, Mail, MapPin, Clock, CheckCircle2, CheckCircle } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicio: "",
    mensaje: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por ..."
    window.open("https://wa.me/5491154625634?text=" + encodeURIComponent(mensaje), "_blank")
  }

  const handleCallClick = () => {
    window.location.href = "tel:+5491154625634"
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:contacto@adrianclavero.com"
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    } else if (!/^[0-9\s\-+()]{8,}$/.test(formData.telefono)) {
      newErrors.telefono = "Ingresá un teléfono válido"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresá un email válido"
    }

    if (!formData.servicio) {
      newErrors.servicio = "Seleccioná un servicio"
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "Describí brevemente tu consulta"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setIsSuccess(false)

    setTimeout(() => {
      const mensaje = `Hola, mi nombre es ${formData.nombre}. Necesito: ${formData.servicio}. ${formData.mensaje}`
      window.open(`https://wa.me/5491154625634?text=${encodeURIComponent(mensaje)}`, "_blank")
      setIsSubmitting(false)
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({
          nombre: "",
          telefono: "",
          email: "",
          servicio: "",
          mensaje: "",
        })
        setErrors({})
        setIsSuccess(false)
      }, 3000)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <Breadcrumbs items={[{ label: "Contacto" }]} />
      <main>
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 shadow-lg">
                <MessageCircle className="h-4 w-4" />
                Hablemos
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Contactanos
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
                Estamos disponibles para responder todas tus consultas. Elegí el medio que prefieras para comunicarte
                con nosotros.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-slate-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
                <Card
                  className="p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group border-slate-200 hover:border-green-300 hover:-translate-y-1"
                  onClick={handleWhatsAppClick}
                >
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-2">Respuesta inmediata</p>
                  <p className="text-xs text-primary">+54 9 11 5462-5634</p>
                </Card>

                <Card
                  className="p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group border-slate-200 hover:border-primary/30 hover:-translate-y-1"
                  onClick={handleCallClick}
                >
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Teléfono</h3>
                  <p className="text-sm text-muted-foreground mb-2">Llamá directo</p>
                  <p className="text-xs text-primary">+54 9 11 5462-5634</p>
                </Card>

                <Card
                  className="p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group border-slate-200 hover:border-primary/30 hover:-translate-y-1"
                  onClick={handleEmailClick}
                >
                  <div className="flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-2">Consultas por correo</p>
                  <p className="text-xs text-primary break-all">contacto@adrianclavero.com</p>
                </Card>

                <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border-slate-200">
                  <div className="flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Horarios</h3>
                  <p className="text-sm text-muted-foreground mb-2">Lun a Sáb: 8-20hs</p>
                  <p className="text-xs text-primary">Emergencias 24/7</p>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Formulario de Contacto</h2>
                  <Card className="p-6 sm:p-8 shadow-xl border-slate-200">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <Label htmlFor="nombre" className="text-sm font-medium">
                          Nombre completo *
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className={`mt-1.5 h-11 ${errors.nombre ? "border-red-500" : ""}`}
                          placeholder="Tu nombre"
                        />
                        {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                      </div>

                      <div>
                        <Label htmlFor="telefono" className="text-sm font-medium">
                          Teléfono *
                        </Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className={`mt-1.5 h-11 ${errors.telefono ? "border-red-500" : ""}`}
                          placeholder="11 XXXX-XXXX"
                        />
                        {errors.telefono && <p className="text-xs text-red-500 mt-1">{errors.telefono}</p>}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email (opcional)
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`mt-1.5 h-11 ${errors.email ? "border-red-500" : ""}`}
                          placeholder="tu@email.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <Label htmlFor="servicio" className="text-sm font-medium">
                          Servicio requerido *
                        </Label>
                        <select
                          id="servicio"
                          value={formData.servicio}
                          onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                          className={`w-full mt-1.5 h-11 px-3 rounded-md border bg-background ${errors.servicio ? "border-red-500" : "border-input"}`}
                        >
                          <option value="">Seleccioná un servicio</option>
                          <option value="Destapación Hidro Jet">Destapación Hidro Jet</option>
                          <option value="Plomería general">Plomería general</option>
                          <option value="Instalación de gas">Instalación de gas</option>
                          <option value="Reparación de pérdida">Reparación de pérdida</option>
                          <option value="Cambio de cañerías">Cambio de cañerías</option>
                          <option value="Emergencia">Emergencia</option>
                          <option value="Otro">Otro</option>
                        </select>
                        {errors.servicio && <p className="text-xs text-red-500 mt-1">{errors.servicio}</p>}
                      </div>

                      <div>
                        <Label htmlFor="mensaje" className="text-sm font-medium">
                          Mensaje *
                        </Label>
                        <Textarea
                          id="mensaje"
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          className={`mt-1.5 min-h-[100px] ${errors.mensaje ? "border-red-500" : ""}`}
                          placeholder="Contanos sobre tu problema o consulta..."
                        />
                        {errors.mensaje && <p className="text-xs text-red-500 mt-1">{errors.mensaje}</p>}
                      </div>

                      {isSuccess && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-800">
                          <CheckCircle className="h-5 w-5 flex-shrink-0" />
                          <p className="text-sm">¡Consulta enviada! Te redirigimos a WhatsApp.</p>
                        </div>
                      )}
                      <Button type="submit" size="lg" className="w-full h-12 bg-green-600 hover:bg-green-700 text-white" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="mr-2">Enviando...</span>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </>
                        ) : (
                          "Enviar Consulta"
                        )}
                      </Button>
                    </form>
                  </Card>
                </div>

                {/* Info Section */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">Información</h2>
                  <div className="space-y-6">
                    <Card className="p-8 shadow-xl border-slate-200">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-10 w-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Área de Cobertura</h3>
                          <p className="text-sm text-muted-foreground">
                            CABA y Zona Norte GBA: Vicente López, San Isidro, San Fernando, Tigre y más.
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8 shadow-xl border-slate-200">
                      <h3 className="font-semibold mb-5 text-lg">¿Por qué elegirnos?</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">15+ años de experiencia</p>
                            <p className="text-xs text-muted-foreground">Profesionales capacitados y confiables</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Presupuesto sin cargo</p>
                            <p className="text-xs text-muted-foreground">Visitamos tu propiedad gratis en AMBA</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Garantía en todos los trabajos</p>
                            <p className="text-xs text-muted-foreground">Respaldamos nuestra calidad de servicio</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Emergencias 24/7</p>
                            <p className="text-xs text-muted-foreground">Disponibles cuando más nos necesitás</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Gasista matriculado</p>
                            <p className="text-xs text-muted-foreground">Certificaciones oficiales incluidas</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-8 shadow-xl border-slate-200 bg-primary/5">
                      <h3 className="font-semibold mb-3">Método Preferido</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Para una respuesta más rápida, te recomendamos contactarnos por WhatsApp. ¡Respondemos en
                        minutos!
                      </p>
                      <Button
                        onClick={handleWhatsAppClick}
                        className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                        size="lg"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Abrir WhatsApp
                      </Button>
                    </Card>
                  </div>
                </div>
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
