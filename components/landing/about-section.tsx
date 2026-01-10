"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const tabs = [
  {
    id: "mision",
    label: "Nuestra Misión",
    content: "Brindar a familias, profesionales y empresas una experiencia de compra ágil, personalizada y cercana, ofreciendo atención y asesoramiento para que cada cliente encuentre exactamente lo que necesita. Trabajamos permanentemente en ampliar nuestro catálogo, mantener un stock constante y ofrecer precios competitivos."
  },
  {
    id: "vision",
    label: "Nuestra Visión",
    content: "Ser la ferretería de confianza a la que siempre podés acudir cuando necesitás una solución rápida y efectiva, manteniendo el trato cercano y el asesoramiento personalizado propio de una ferretería de barrio, con la estructura y el servicio de una empresa moderna."
  },
  {
    id: "historia",
    label: "Nuestra Historia",
    content: "Empresa familiar fundada en 1994, dedicada a la comercialización de productos para la construcción, el hogar y la industria. A lo largo de estos años ampliamos nuestro surtido para ofrecer una amplia variedad de productos que acompañen cada proyecto, obra o reparación. Crecimos de la mano de nuestros clientes, manteniendo siempre el trato cercano y el asesoramiento personalizado."
  }
]

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("mision")

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden" itemScope itemType="https://schema.org/Organization">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/grid-pattern.svg')] bg-[length:50px_50px]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight" itemProp="name">
            Quiénes somos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light" itemProp="description">
            Más de 30 años trabajando para vos en CABA y GBA
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#c62828] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg"
          >
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {tabs.find(t => t.id === activeTab)?.content}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

