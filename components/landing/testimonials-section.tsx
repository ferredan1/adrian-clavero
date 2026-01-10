"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    text: "Excelente variedad de productos, entrega a domicilio, seriedad y responsabilidad, muchos años en el barrio, la ferreteria mas surtida de san martin y alrededores, gente con ganas de trabajar y avanzar, los felicito, da gusto comprar en negocios asi, sigan asi y siguiran progresando aun mas!!!",
    author: "Luis Steneri",
    location: "Local Guide",
    rating: 5
  },
  {
    text: "La gente te da un excelente trato y si no tienen lo que buscas te ayudan a resolver... Tipico del negocio que es atendido por sus propios dueños y que le Importan sus clientes.... Recomendados...",
    author: "Skorkiz A. Duarte",
    location: "Local Guide",
    rating: 5
  },
  {
    text: "Exelente disposición de las preguntas he inquietudes que llevamos los consumidores. Gente muy buena. Una ferretería totalmente completa en todos los rubros para el consumo. Los precios son muy accesibles y tienen varias formas de pago. Lo recomiendo con garantía!",
    author: "Sebastian Brandan",
    location: "Local Guide",
    rating: 5
  },
  {
    text: "Unos genios, siempre dando una solución a las inquietudes referente al rubro, precios accesibles",
    author: "Gabriel Livio",
    location: "Local Guide",
    rating: 5
  },
  {
    text: "Atención al cliente 10 puntos, variedad en artículos de ferretería y demás cosas...te solucionan todo...son los mejores de la zona.",
    author: "maty peña",
    location: "Local Guide",
    rating: 5
  },
  {
    text: "Muy buena atención y calidad de sus productos y gran variedad",
    author: "Claudio Gross",
    location: "Gasista matriculado · Local Guide",
    rating: 5
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / itemsPerView))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  )

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / itemsPerView)) % Math.ceil(testimonials.length / itemsPerView))
  }

  return (
    <section id="opiniones" className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/grid-pattern.svg')] bg-[length:40px_40px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Opiniones
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light mb-6">
            Palabras de nuestros clientes
          </p>
          <a
            href="https://www.google.com/maps/place/Ferreteria+Dany/@-34.5456044,-58.6097841,13z/data=!4m12!1m2!2m1!1sgoogle+maps+ferreteria+dany!3m8!1s0x95bcba21b7eba617:0x81dc5e2c9406a612!8m2!3d-34.5511455!4d-58.5787635!9m1!1b1!15sChtnb29nbGUgbWFwcyBmZXJyZXRlcmlhIGRhbnkiA4gBAVodIhtnb29nbGUgbWFwcyBmZXJyZETERIA+DANYmSAQ5oYXJkd2FyZV9zdG9yZZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSQ09UWjVZVlZCRUFF4AEA-gEECC0QDA!16s%2Fg%2F11c1th57nx?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c62828] hover:text-[#b71c1c] font-semibold transition-colors"
          >
            Ver todas las opiniones en Google Maps →
          </a>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <Card className="border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white hover:border-[#c62828]/30">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-[#c62828] text-[#c62828]" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 leading-relaxed font-light flex-grow italic text-lg">
                        "{testimonial.text}"
                      </p>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="font-bold text-gray-900 text-lg">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-3 rounded-full bg-white shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Reseña anterior"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-3 rounded-full bg-white shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="Reseña siguiente"
          >
            <ChevronRight className="h-6 w-6 text-gray-900" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "w-8 bg-[#c62828]" : "w-2 bg-gray-300"
                }`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

