import React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const siteUrl = "https://ferreteria-dany.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ferretería Dany - Materiales de Construcción, Herramientas y Más | CABA y GBA",
    template: "%s | Ferretería Dany",
  },
  description:
    "Ferretería Dany: más de 30 años en CABA y GBA. Stock permanente, precios competitivos y asesoramiento personalizado. Materiales de construcción, herramientas, electricidad, plomería, pinturas y más. Envíos rápidos y 2 sucursales físicas.",
  keywords: [
    "ferretería",
    "materiales de construcción",
    "herramientas",
    "ferretería CABA",
    "ferretería Buenos Aires",
    "ferretería GBA",
    "herramientas eléctricas",
    "herramientas manuales",
    "materiales construcción",
    "cemento",
    "ladrillos",
    "hierros",
    "electricidad",
    "plomería",
    "pinturas",
    "fijaciones",
    "herrajes",
    "seguridad",
    "jardín",
    "exterior",
    "accesorios vehículos",
    "stock permanente",
    "envíos rápidos",
    "presupuestos",
    "cotización",
    "WhatsApp",
    "tienda online",
  ],
  authors: [{ name: "Ferretería Dany" }],
  creator: "Ferretería Dany",
  publisher: "Ferretería Dany",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Ferretería Dany",
    title: "Ferretería Dany - Materiales de Construcción, Herramientas y Más | CABA y GBA",
    description:
      "Más de 30 años en CABA y GBA. Stock permanente, precios competitivos y asesoramiento personalizado. Materiales de construcción, herramientas, electricidad, plomería, pinturas y más.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ferretería Dany - Materiales de Construcción y Herramientas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferretería Dany - Materiales de Construcción, Herramientas y Más | CABA y GBA",
    description:
      "Más de 30 años en CABA y GBA. Stock permanente, precios competitivos y asesoramiento personalizado.",
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
    "@type": "HardwareStore",
    name: "Ferretería Dany",
    image: `${siteUrl}/og-image.jpg`,
    "@id": siteUrl,
    url: siteUrl,
    telephone: "+5491120345160",
    email: "ferreteria-dany@hotmail.com",
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "CABA",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "GBA",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "12:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "13:00",
      },
    ],
    priceRange: "$$",
    description:
      "Ferretería Dany: más de 30 años en CABA y GBA. Stock permanente, precios competitivos y asesoramiento personalizado. Materiales de construcción, herramientas, electricidad, plomería, pinturas y más.",
    areaServed: [
      {
        "@type": "City",
        name: "CABA",
      },
      {
        "@type": "City",
        name: "Gran Buenos Aires",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Productos de Ferretería",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Materiales de construcción",
            description: "Cemento, ladrillos, hierros, maderas y más",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Herramientas",
            description: "Herramientas manuales y eléctricas para profesionales y particulares",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Electricidad",
            description: "Cables, interruptores, llaves, portalámparas y más",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Plomería y Sanitarios",
            description: "Bombas, caños, conexiones, grifería, sanitarios y accesorios para instalaciones sanitarias",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Pinturas y Acabados",
            description: "Pinturas látex, esmaltes, impermeabilizantes, barnices y preparación de superficies",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Fijaciones y Herrajes",
            description: "Tornillos, clavos, bulones, bisagras, cerraduras y herrajes para construcción",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Seguridad Laboral",
            description: "Equipos de protección personal, guantes, cascos y elementos de seguridad para obras",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Accesorios para Vehículos",
            description: "Herramientas para baterías, elevación, extracción, infladores y lubricantes para vehículos",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Jardín y Exterior",
            description: "Mangueras, regaderas, herramientas de jardín y más",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Accesorios para Vehículos",
            description: "Productos para el mantenimiento y cuidado de vehículos",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
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
