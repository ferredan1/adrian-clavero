"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Shield, Truck, Store, Package, CheckCircle } from "lucide-react"

const benefits = [
  {
    icon: CreditCard,
    title: "Facilidades de pago y financiación",
    description: "Múltiples formas de pago y planes de financiación disponibles"
  },
  {
    icon: Shield,
    title: "Garantía",
    description: "Todos nuestros productos cuentan con garantía"
  },
  {
    icon: Truck,
    title: "Envíos y retiros",
    description: "Servicio de envío a domicilio y retiro en nuestras sucursales"
  },
  {
    icon: Store,
    title: "2 sucursales físicas y tienda online",
    description: "CASA CENTRAL, Sucursal y tienda online para tu comodidad"
  },
  {
    icon: Package,
    title: "Amplio y variado catálogo",
    description: "Más de 10.000 productos disponibles para tu obra o proyecto"
  },
  {
    icon: CheckCircle,
    title: "Disponibilidad y stock permanente",
    description: "Stock constante para entrega inmediata"
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

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-24 md:py-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c62828]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Por qué elegirnos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Razones para confiar en Ferretería Dany: más de 30 años de experiencia, stock permanente y atención personalizada
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const isHighlighted = index === 0 || index === 3 // Destacar algunas
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  rotate: index % 2 === 0 ? 1 : -1,
                  transition: { duration: 0.4, type: "spring" } 
                }}
              >
                <Card className={`border-2 ${isHighlighted ? 'border-[#c62828]/30 bg-gradient-to-br from-white to-red-50/30' : 'border-gray-200'} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white relative overflow-hidden group`}>
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c62828]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
                    <div className={`mb-6 p-5 rounded-2xl ${isHighlighted ? 'bg-gradient-to-br from-red-100 to-red-50' : 'bg-gray-50'} group-hover:bg-gradient-to-br group-hover:from-red-100 group-hover:to-red-50 transition-all duration-300 transform group-hover:scale-110`}>
                      <Icon className={`h-10 w-10 text-[#c62828] group-hover:rotate-12 transition-transform duration-300`} strokeWidth={isHighlighted ? 2 : 1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light" itemProp="description">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

