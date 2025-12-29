import React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const siteUrl = "https://adrianclavero.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adrián Clavero - Plomería y Gas Matriculado | Hidro Jet AMBA",
    template: "%s | Adrián Clavero",
  },
  description:
    "Plomero y Gasista Matriculado en Buenos Aires. Especialista en destapaciones con Hidro Jet. Atención rápida 24/7 en CABA y AMBA. Presupuestos sin cargo. Más de 15 años de experiencia.",
  keywords: [
    "plomero",
    "gasista",
    "matriculado",
    "hidro jet",
    "destapaciones",
    "Buenos Aires",
    "CABA",
    "AMBA",
    "Villa Ballester",
    "San Isidro",
    "Vicente López",
    "emergencias 24/7",
    "plomería",
    "instalación de gas",
    "reparación de cañerías",
  ],
  authors: [{ name: "Adrián Clavero" }],
  creator: "Adrián Clavero",
  publisher: "Adrián Clavero",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Adrián Clavero - Plomería y Gas",
    title: "Adrián Clavero - Plomería y Gas Matriculado | Hidro Jet AMBA",
    description:
      "Plomero y Gasista Matriculado en Buenos Aires. Especialista en destapaciones con Hidro Jet. Atención rápida 24/7 en CABA y AMBA.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adrián Clavero - Plomería y Gas Matriculado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrián Clavero - Plomería y Gas Matriculado | Hidro Jet AMBA",
    description:
      "Plomero y Gasista Matriculado en Buenos Aires. Especialista en destapaciones con Hidro Jet. Atención rápida 24/7.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  verification: {},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Adrián Clavero - Plomería y Gas",
    image: `${siteUrl}/og-image.jpg`,
    "@id": siteUrl,
    url: siteUrl,
    telephone: "+5491154625634",
    email: "contacto@adrianclavero.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Belgrano 5746",
      addressLocality: "Villa Ballester",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.5470788,
      longitude: -58.5673942,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    description:
      "Plomero y Gasista Matriculado en Buenos Aires. Especialista en destapaciones con Hidro Jet. Atención rápida 24/7 en CABA y AMBA.",
    areaServed: [
      "CABA",
      "Vicente López",
      "San Isidro",
      "San Fernando",
      "Tigre",
      "San Martín",
      "Tres de Febrero",
      "Villa Ballester",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Plomería y Gas",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Destapaciones con Hidro Jet",
            description: "Sistema de limpieza profesional con agua a alta presión",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Plomería Integral",
            description: "Reparación e instalación de sistemas de plomería",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Instalación de Gas",
            description: "Gasista matriculado para instalación y reparación",
          },
        },
      ],
    },
  }

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
      </body>
    </html>
  )
}
