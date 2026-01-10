"use client"

import { HeroSection } from "@/components/landing/hero-section"
import { ServicesSection } from "@/components/landing/services-section"
import { ClientSegmentationSection } from "@/components/landing/client-segmentation-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { AboutSection } from "@/components/landing/about-section"
import { ProcessSection } from "@/components/landing/process-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FAQSection } from "@/components/landing/faq-section"
import { ContactSection } from "@/components/landing/contact-section"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <SharedHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ClientSegmentationSection />
        <AboutSection />
        <BenefitsSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <FloatingWhatsApp />
      <SharedFooter />
    </div>
  )
}
