"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { MapPin, MessageCircle, Clock, CheckCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5491120345160"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.service) newErrors.service = "Selecciona un rubro"
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido"
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    
    const whatsappMessage = `Hola, mi nombre es ${formData.name}.\n\nRubro: ${formData.service}\nTeléfono: ${formData.phone}\n\nMensaje: ${formData.message}`
    
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
      setIsSubmitting(false)
      setIsSuccess(true)
      setFormData({ name: "", phone: "", service: "", message: "" })
      setErrors({})
      
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 500)
  }

  return (
    <section id="contacto" className="py-24 md:py-32 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden" itemScope itemType="https://schema.org/ContactPage">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c62828]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight" itemProp="name">
            Contacto
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light" itemProp="description">
            ¿Tenés alguna pregunta? Contactanos por WhatsApp, teléfono o visitá nuestras sucursales en Buenos Aires
          </p>
        </motion.div>

        {/* Contact Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-[#c62828]/30 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#c62828]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">CASA CENTRAL</h3>
              <p className="text-gray-600 mb-2 font-light text-sm">Villa Ballester, Buenos Aires</p>
              <a
                href="https://maps.app.goo.gl/j1r7vBfPBVvvzZoM7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c62828] hover:text-[#b71c1c] transition-colors text-sm font-semibold"
              >
                Ver en Maps →
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-[#c62828]/30 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[#c62828]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Sucursal</h3>
              <p className="text-gray-600 mb-2 font-light text-sm">José León Suárez, Buenos Aires</p>
              <a
                href="https://maps.app.goo.gl/pDaFAigma7ReP8Fi6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c62828] hover:text-[#b71c1c] transition-colors text-sm font-semibold"
              >
                Ver en Maps →
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-[#25d366]/30 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-[#25d366]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25d366] hover:text-[#20ba5a] transition-colors text-sm font-semibold"
              >
                +54 9 11 2034-5160
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl hover:border-[#c62828]/30 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[#c62828]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Horario</h3>
              <p className="text-gray-600 font-light text-sm">
                Lun-Vie: 8-12:30, 14-18<br />
                Sáb: 8-13
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
            <Card className="border-2 border-gray-200 rounded-2xl shadow-xl bg-white hover:border-[#c62828]/30 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enviar consulta</h3>
                <p className="text-gray-600 mb-6 font-light">
                  Completá el formulario y te respondemos por WhatsApp al instante
                </p>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">¡Consulta enviada!</h4>
                    <p className="text-gray-600 mb-4">
                      Se abrió WhatsApp con tu consulta. Si no se abrió automáticamente, hacé clic en el botón de abajo.
                    </p>
                    <Button
                      onClick={() => {
                        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")
                      }}
                      className="bg-[#25d366] hover:bg-[#20ba5a] text-white"
                    >
                      Abrir WhatsApp
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 font-semibold">
                        Nombre completo *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: "" })
                        }}
                        className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                        placeholder="Tu nombre"
                      />
                      {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-semibold">
                        Teléfono / WhatsApp *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value })
                          if (errors.phone) setErrors({ ...errors, phone: "" })
                        }}
                        className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                        placeholder="Ej: 11 5555 5555"
                      />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-gray-900 font-semibold">
                        Rubro *
                      </Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => {
                          setFormData({ ...formData, service: value })
                          if (errors.service) setErrors({ ...errors, service: "" })
                        }}
                      >
                        <SelectTrigger className={`mt-1 ${errors.service ? "border-red-500" : ""}`}>
                          <SelectValue placeholder="Seleccioná un rubro" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Herramientas">Herramientas</SelectItem>
                          <SelectItem value="Materiales de construcción">Materiales de construcción</SelectItem>
                          <SelectItem value="Electricidad">Electricidad</SelectItem>
                          <SelectItem value="Plomería">Plomería</SelectItem>
                          <SelectItem value="Pinturería">Pinturería</SelectItem>
                          <SelectItem value="Jardín">Jardín</SelectItem>
                          <SelectItem value="Otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="text-sm text-red-500 mt-1">{errors.service}</p>}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-900 font-semibold">
                        Mensaje *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value })
                          if (errors.message) setErrors({ ...errors, message: "" })
                        }}
                        className={`mt-1 min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                        placeholder="Detallá qué productos necesitás"
                      />
                      {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white py-6 text-lg font-semibold"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar por WhatsApp"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
      </div>
    </section>
  )
}

