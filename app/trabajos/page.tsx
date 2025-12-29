"use client"

import { useState } from "react"
import { SharedHeader } from "@/components/shared-header"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar, MapPin, CheckCircle2 } from "lucide-react"
import { SharedFooter } from "@/components/shared-footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function TrabajosPage() {
  const [filter, setFilter] = useState("todos")

  const trabajos = [
    {
      id: 1,
      title: "Limpieza de Desagües con Hidro Jet",
      category: "hidrojet",
      location: "Palermo, CABA",
      date: "Febrero 2024",
      description:
        "Destapación de cañerías principales con equipo de alta presión. Raíces obstruían completamente el sistema.",
      image: "/drain-root-removal.jpg",
    },
    {
      id: 2,
      title: "Instalación de Calefón",
      category: "gas",
      location: "Villa Urquiza, CABA",
      date: "Enero 2024",
      description: "Instalación completa de calefón con certificación de gas y revisión de instalaciones existentes.",
      image: "/gas-water-heater-installation.jpg",
    },
    {
      id: 3,
      title: "Reparación de Cañerías en Baño",
      category: "plomeria",
      location: "Belgrano, CABA",
      date: "Enero 2024",
      description: "Renovación completa del sistema de cañerías del baño principal con materiales de primera calidad.",
      image: "/bathroom-pipe-repair.jpg",
    },
    {
      id: 4,
      title: "Renovación Completa de Cocina",
      category: "plomeria",
      location: "Recoleta, CABA",
      date: "Diciembre 2023",
      description: "Instalación de nuevas cañerías, desagües y grifería en renovación integral de cocina.",
      image: "/kitchen-plumbing-renovation.jpg",
    },
    {
      id: 5,
      title: "Revisión de Instalación de Gas",
      category: "gas",
      location: "Caballito, CABA",
      date: "Diciembre 2023",
      description: "Inspección completa de instalación de gas, detección de fuga menor y reparación certificada.",
      image: "/gas-leak-inspection.jpg",
    },
    {
      id: 6,
      title: "Destapación de Cocina",
      category: "hidrojet",
      location: "Núñez, CABA",
      date: "Noviembre 2023",
      description: "Limpieza profunda de desagüe de cocina obstruido por grasa acumulada durante años.",
      image: "/kitchen-drain-cleaning.jpg",
    },
  ]

  const filteredTrabajos = filter === "todos" ? trabajos : trabajos.filter((trabajo) => trabajo.category === filter)

  const handleWhatsAppClick = () => {
    const mensaje = "Hola Adrian, te consulto por ..."
    window.open("https://wa.me/5491154625634?text=" + encodeURIComponent(mensaje), "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />
      <Breadcrumbs items={[{ label: "Trabajos" }]} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-6 shadow-lg">
                <CheckCircle2 className="h-4 w-4" />
                Portafolio de Proyectos
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-balance">
                Nuestros Trabajos Realizados
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
                Más de 15 años de experiencia en plomería y gas. Cada trabajo refleja nuestro compromiso con la calidad
                y satisfacción del cliente.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 sm:py-12 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setFilter("todos")}
                style={filter === "todos" ? { backgroundColor: "#475569", color: "#ffffff" } : undefined}
                onMouseEnter={(e) => {
                  if (filter === "todos") {
                    e.currentTarget.style.backgroundColor = "#475569"
                    e.currentTarget.style.color = "#ffffff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter === "todos") {
                    e.currentTarget.style.backgroundColor = "#475569"
                    e.currentTarget.style.color = "#ffffff"
                  }
                }}
                className={`min-h-[44px] px-4 sm:px-6 transition-all duration-300 ${
                  filter === "todos" ? "shadow-lg border-0" : ""
                }`}
              >
                Todos los Trabajos
              </Button>
              <Button
                variant="outline"
                onClick={() => setFilter("hidrojet")}
                style={filter === "hidrojet" ? { backgroundColor: "var(--color-accent)", color: "var(--color-accent-foreground)" } : undefined}
                onMouseEnter={(e) => {
                  if (filter === "hidrojet") {
                    e.currentTarget.style.backgroundColor = "var(--color-accent)"
                    e.currentTarget.style.color = "var(--color-accent-foreground)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter === "hidrojet") {
                    e.currentTarget.style.backgroundColor = "var(--color-accent)"
                    e.currentTarget.style.color = "var(--color-accent-foreground)"
                  }
                }}
                className={`min-h-[44px] px-4 sm:px-6 transition-all duration-300 ${
                  filter === "hidrojet" ? "shadow-lg border-0" : ""
                }`}
              >
                Hidro Jet
              </Button>
              <Button
                variant="outline"
                onClick={() => setFilter("plomeria")}
                style={filter === "plomeria" ? { backgroundColor: "var(--color-primary)", color: "var(--color-primary-foreground)" } : undefined}
                onMouseEnter={(e) => {
                  if (filter === "plomeria") {
                    e.currentTarget.style.backgroundColor = "var(--color-primary)"
                    e.currentTarget.style.color = "var(--color-primary-foreground)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter === "plomeria") {
                    e.currentTarget.style.backgroundColor = "var(--color-primary)"
                    e.currentTarget.style.color = "var(--color-primary-foreground)"
                  }
                }}
                className={`min-h-[44px] px-4 sm:px-6 transition-all duration-300 ${
                  filter === "plomeria" ? "shadow-lg border-0" : ""
                }`}
              >
                Plomería
              </Button>
              <Button
                variant="outline"
                onClick={() => setFilter("gas")}
                style={filter === "gas" ? { backgroundColor: "#ef4444", color: "#ffffff" } : undefined}
                onMouseEnter={(e) => {
                  if (filter === "gas") {
                    e.currentTarget.style.backgroundColor = "#ef4444"
                    e.currentTarget.style.color = "#ffffff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter === "gas") {
                    e.currentTarget.style.backgroundColor = "#ef4444"
                    e.currentTarget.style.color = "#ffffff"
                  }
                }}
                className={`min-h-[44px] px-4 sm:px-6 transition-all duration-300 ${
                  filter === "gas" ? "shadow-lg border-0" : ""
                }`}
              >
                Gas
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-slate-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredTrabajos.map((trabajo, index) => (
                <Card
                  key={trabajo.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-slate-200 hover:border-primary/30"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <Image
                      src={trabajo.image || "/placeholder.svg"}
                      alt={trabajo.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="secondary"
                        className={
                          trabajo.category === "hidrojet"
                            ? "bg-accent/90 text-accent-foreground"
                            : trabajo.category === "gas"
                              ? "bg-red-500/90 text-white"
                              : "bg-primary/90 text-primary-foreground"
                        }
                      >
                        {trabajo.category === "hidrojet"
                          ? "Hidro Jet"
                          : trabajo.category === "gas"
                            ? "Gas"
                            : "Plomería"}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {trabajo.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trabajo.description}</p>
                    <div className="flex flex-col gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{trabajo.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{trabajo.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
      <FloatingWhatsApp />
    </div>
  )
}
