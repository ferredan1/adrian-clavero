"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
  Sprout,
  ShoppingBag,
  Car,
  HardHat,
  Nut,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Car,
    title: "Accesorios para Vehículos",
    description: "Herramientas para baterías, elevación, extracción, infladores, medición, limpieza y lubricantes para vehículos",
    url: "https://ferreteriadany.com.ar/accesorios-para-vehiculos/"
  },
  {
    icon: Zap,
    title: "Electricidad",
    description: "Medición y diagnóstico eléctrico, cables, interruptores, llaves, portalámparas y todo para instalaciones eléctricas",
    url: "https://ferreteriadany.com.ar/construccion/electricidad/"
  },
  {
    icon: Nut,
    title: "Fijaciones y Herrajes",
    description: "Tornillos, clavos, bulones, bisagras, cerraduras y herrajes para construcción",
    url: "https://ferreteriadany.com.ar/"
  },
  {
    icon: Wrench,
    title: "Herramientas",
    description: "Herramientas eléctricas y manuales: amoladoras, taladros, destornilladores, llaves, kits y más para profesionales",
    url: "https://ferreteriadany.com.ar/herramientas/"
  },
  {
    icon: Sprout,
    title: "Jardín y Exterior",
    description: "Mangueras, regaderas, herramientas de jardín, productos para exteriores y mantenimiento de espacios verdes",
    url: "https://ferreteriadany.com.ar/jardin-y-exterior/"
  },
  {
    icon: Package,
    title: "Materiales de construcción",
    description: "Todo lo necesario para tu obra: cemento, ladrillos, hierros, maderas, carros, carretillas y más",
    url: "https://ferreteriadany.com.ar/"
  },
  {
    icon: Paintbrush,
    title: "Pinturas y Acabados",
    description: "Pinturas látex, esmaltes, impermeabilizantes, barnices, preparación de superficies y todo para acabados profesionales",
    url: "https://ferreteriadany.com.ar/"
  },
  {
    icon: Droplets,
    title: "Plomería y Sanitarios",
    description: "Bombas, caños, conexiones, grifería, sanitarios y accesorios para instalaciones sanitarias y sistemas de agua",
    url: "https://ferreteriadany.com.ar/construccion/plomeria-y-sanitarios/"
  },
  {
    icon: HardHat,
    title: "Seguridad Laboral",
    description: "Equipos de protección personal, guantes, cascos y elementos de seguridad para obras y trabajos profesionales",
    url: "https://ferreteriadany.com.ar/construccion/seguridad-laboral/"
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

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden" itemScope itemType="https://schema.org/Service">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight" itemProp="name">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light" itemProp="description">
            Amplio catálogo de productos para construcción, hogar e industria en CABA y GBA
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mt-2 font-light">
            Más de 10.000 productos disponibles con stock permanente y entrega inmediata
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            const isFeatured = index === 0 || index === 4 // Destacar algunas cards
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={isFeatured ? "md:col-span-2 lg:col-span-1" : ""}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 } 
                }}
              >
                <Card className={`border-2 ${isFeatured ? 'border-[#c62828]/40 bg-gradient-to-br from-white to-red-50/20' : 'border-gray-200'} rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 h-full bg-white group cursor-pointer relative overflow-hidden`} itemScope itemType="https://schema.org/Service">
                  {/* Accent line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c62828] via-red-400 to-[#c62828] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <Link href={service.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className={`mb-6 p-5 rounded-2xl ${isFeatured ? 'bg-gradient-to-br from-red-50 to-red-100/50' : 'bg-gray-50'} group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-red-100/50 transition-all duration-300 transform group-hover:rotate-3`} aria-hidden="true">
                      <Icon className={`h-10 w-10 ${isFeatured ? 'text-[#c62828]' : 'text-[#c62828]'} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} strokeWidth={isFeatured ? 2 : 1.5} />
                    </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#c62828] transition-colors" itemProp="name">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light mb-4 flex-grow" itemProp="description">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-[#c62828] font-semibold text-sm mt-auto">
                        <span>Ver productos</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Catalog Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => window.open("https://ferreteriadany.com.ar/", "_blank")}
            size="lg"
            variant="outline"
            className="border-2 border-gray-900 text-gray-900 px-8 py-6 text-lg font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Ver catálogo completo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

