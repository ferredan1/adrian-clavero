"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Briefcase, Building2, MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5491120345160"

const segments = [
  {
    icon: Home,
    title: "Particular",
    description: "Productos para tu hogar, reparaciones y proyectos personales. Atención personalizada y asesoramiento para encontrar lo que necesitás.",
    whatsappMessage: "Hola, soy particular y necesito productos para mi hogar/proyecto personal"
  },
  {
    icon: Briefcase,
    title: "Profesional",
    description: "Herramientas y materiales profesionales para tu trabajo. Precios especiales, stock permanente y atención prioritaria para profesionales.",
    whatsappMessage: "Hola, soy profesional y necesito cotizar productos para mi trabajo"
  },
  {
    icon: Building2,
    title: "Empresa",
    description: "Soluciones integrales para empresas. Presupuestos personalizados, entregas programadas y condiciones especiales para grandes volúmenes.",
    whatsappMessage: "Hola, represento una empresa y necesito cotizar productos para nuestra operación"
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

export function ClientSegmentationSection() {
  const handleWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank")
  }

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#c62828]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Para cada tipo de cliente
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Soluciones adaptadas a tus necesidades, ya seas particular, profesional o empresa
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {segments.map((segment, index) => {
            const Icon = segment.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.4, type: "spring", stiffness: 200 } 
                }}
              >
                <Card className="border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white flex flex-col relative overflow-hidden group hover:border-[#c62828]/40">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c62828]/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-8 flex flex-col items-center text-center h-full relative z-10">
                    <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-red-50 group-hover:to-red-100/50 transition-all duration-300 transform group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-10 w-10 text-[#c62828] group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {segment.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-light mb-6 flex-grow">
                      {segment.description}
                    </p>
                    <Button
                      onClick={() => handleWhatsApp(segment.whatsappMessage)}
                      className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-semibold"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contactar por WhatsApp
                    </Button>
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

