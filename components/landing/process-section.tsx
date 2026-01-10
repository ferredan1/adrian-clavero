"use client"

import { motion } from "framer-motion"
import { MessageSquare, Users, Truck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Nos escribís",
    description: "Contactanos por WhatsApp o completá el formulario con tu consulta"
  },
  {
    number: "02",
    icon: Users,
    title: "Te asesoramos",
    description: "Nuestro equipo te ayuda a elegir los productos adecuados para tu proyecto"
  },
  {
    number: "03",
    icon: Truck,
    title: "Retirás o enviamos",
    description: "Podés retirar en nuestras sucursales o te lo enviamos a tu obra"
  }
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c62828]/5 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Cómo trabajamos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Un proceso simple y eficiente en 3 pasos
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 top-16 bottom-16" />

          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -top-4 w-4 h-4 bg-[#c62828] rounded-full border-4 border-white shadow-lg z-10" />
                  
                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden group hover:border-[#c62828]/30">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c62828]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100/50 group-hover:from-red-100 group-hover:to-red-200/50 transition-all duration-300 flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110">
                          <Icon className="h-8 w-8 text-[#c62828] group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
                        </div>
                        <span className="text-5xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent group-hover:from-[#c62828] group-hover:to-red-500 transition-all duration-300">{step.number}</span>
                      </div>
                    
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#c62828] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

