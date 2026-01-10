"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, FileText, ChevronLeft, ChevronRight } from "lucide-react"

const WHATSAPP_NUMBER = "5491120345160"

const slides = [
  {
    title: "Soluciones para tu obra, hogar e industria",
    subtitle: "Más de 30 años abasteciendo a profesionales y particulares en CABA y Gran Buenos Aires"
  },
  {
    title: "Stock permanente y precios competitivos",
    subtitle: "Consultamos disponibilidad en tiempo real y te respondemos al instante"
  },
  {
    title: "Asesoramiento personalizado y respuesta inmediata",
    subtitle: "Te ayudamos a elegir exactamente lo que necesitás para tu proyecto"
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero cotizar productos para mi obra")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank")
  }

  const handlePresupuesto = () => {
    const formSection = document.getElementById("contacto")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCall = () => {
    window.location.href = "tel:+5491120345160"
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100" itemScope itemType="https://schema.org/Organization">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] bg-[length:40px_40px]" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Slider */}
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight" itemProp="name">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 font-light tracking-wide max-w-3xl" itemProp="description">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <Button
              onClick={handleCall}
              size="lg"
              className="bg-[#c62828] hover:bg-[#b71c1c] text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Llamar ahora
            </Button>
            
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-[#25d366] hover:bg-[#20ba5a] text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Cotizar por WhatsApp
            </Button>
          </motion.div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-8 bg-[#c62828]" : "w-2 bg-gray-300"
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Slide siguiente"
          >
            <ChevronRight className="h-6 w-6 text-gray-900" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

