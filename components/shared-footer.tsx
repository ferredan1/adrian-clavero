"use client"

import Link from "next/link"
import { MapPin, MessageCircle, Phone, Clock } from "lucide-react"

export function SharedFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              FERRETERÍA <span className="text-[#c62828]">DANY</span>
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Más de 30 años abasteciendo a profesionales y particulares en CABA y Gran Buenos Aires.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Enlaces</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#servicios" className="hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#proceso" className="hover:text-white transition-colors">
                  Proceso
                </Link>
              </li>
              <li>
                <a href="https://ferreteriadany.com.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Tienda Online
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="tel:+5491120345160" className="hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +54 9 11 2034-5160
                </a>
              </li>
              <li>
                <a href="https://wa.me/5491120345160" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/j1r7vBfPBVvvzZoM7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  CASA CENTRAL
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/pDaFAigma7ReP8Fi6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Sucursal
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Horarios</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Lun a Vie: 8:00 - 12:30
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Lun a Vie: 14:00 - 18:00
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Sábados: 8:00 - 13:00
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Domingos: Cerrado
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <span className="text-sm font-semibold text-gray-200 whitespace-nowrap">Medios de pago</span>
            
            {/* Payment Icons Container */}
            <div className="flex flex-wrap items-center gap-2">
              {/* VISA */}
              <div className="bg-white px-3 py-1.5 rounded flex items-center justify-center min-w-[60px] h-8">
                <span className="text-xs font-bold text-blue-600">VISA</span>
              </div>
              
              {/* Mastercard */}
              <div className="bg-white px-3 py-1.5 rounded flex items-center justify-center gap-1 min-w-[80px] h-8">
                <div className="relative w-6 h-4">
                  <div className="absolute left-0 top-0 w-3 h-4 bg-red-500 rounded-l-full"></div>
                  <div className="absolute right-0 top-0 w-3 h-4 bg-orange-500 rounded-r-full"></div>
                </div>
                <span className="text-xs font-semibold text-gray-900 lowercase">mastercard</span>
              </div>
              
              {/* American Express */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[120px] h-8">
                <span className="text-xs font-semibold text-white">AMERICAN EXPRESS</span>
              </div>
              
              {/* Diners Club */}
              <div className="bg-blue-600 px-3 py-1.5 rounded-full flex items-center justify-center min-w-[90px] h-8">
                <span className="text-xs font-semibold text-white">Diners Club</span>
              </div>
              
              {/* CABAL */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[60px] h-8">
                <span className="text-xs font-semibold text-white">CABAL</span>
              </div>
              
              {/* Naranja */}
              <div className="bg-red-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[70px] h-8">
                <span className="text-xs font-semibold text-white">Naranja</span>
              </div>
              
              {/* Mercado Pago */}
              <div className="bg-orange-500 px-3 py-1.5 rounded flex items-center justify-center min-w-[100px] h-8">
                <span className="text-xs font-semibold text-white">Mercado Pago</span>
              </div>
              
              {/* Tarjeta Shopping */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[130px] h-8">
                <span className="text-xs font-semibold text-yellow-400">TARJETA SHOPPING</span>
              </div>
              
              {/* Cencosud */}
              <div className="bg-red-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[80px] h-8">
                <span className="text-xs font-semibold text-white">Cencosud</span>
              </div>
              
              {/* Nativa */}
              <div className="bg-white px-3 py-1.5 rounded border border-gray-300 flex items-center justify-center min-w-[60px] h-8">
                <span className="text-xs font-semibold text-blue-600">nativa</span>
              </div>
              
              {/* Argencard */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[90px] h-8">
                <span className="text-xs font-semibold text-white">ARGENCARD</span>
              </div>
              
              {/* CMR Falabella */}
              <div className="bg-red-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[110px] h-8">
                <span className="text-xs font-semibold text-white">CMR Falabella</span>
              </div>
              
              {/* Credencial */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[80px] h-8">
                <span className="text-xs font-semibold text-white">Credencial</span>
              </div>
              
              {/* Provincia NET */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[100px] h-8">
                <span className="text-xs font-semibold text-white">Provincia NET</span>
              </div>
              
              {/* Pago Fácil */}
              <div className="bg-red-600 px-3 py-1.5 rounded-full flex items-center justify-center min-w-[90px] h-8">
                <span className="text-xs font-semibold text-white">Pago Fácil</span>
              </div>
              
              {/* RapiPago */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex items-center justify-center min-w-[80px] h-8">
                <span className="text-xs font-semibold text-white">RapiPago</span>
              </div>
              
              {/* VISA Débito */}
              <div className="bg-white px-3 py-1.5 rounded border border-gray-300 flex flex-col items-center justify-center min-w-[70px] h-8">
                <span className="text-xs font-bold text-blue-600 leading-tight">VISA</span>
                <span className="text-[10px] text-gray-600 leading-tight">Débito</span>
              </div>
              
              {/* Maestro */}
              <div className="bg-white px-3 py-1.5 rounded border border-gray-300 flex items-center justify-center gap-1 min-w-[70px] h-8">
                <div className="relative w-5 h-3">
                  <div className="absolute left-0 top-0 w-2.5 h-3 bg-red-500 rounded-l-full"></div>
                  <div className="absolute right-0 top-0 w-2.5 h-3 bg-blue-500 rounded-r-full"></div>
                </div>
                <span className="text-xs font-semibold text-gray-900">Maestro</span>
              </div>
              
              {/* CABAL Débito */}
              <div className="bg-blue-600 px-3 py-1.5 rounded flex flex-col items-center justify-center min-w-[70px] h-8">
                <span className="text-xs font-semibold text-white leading-tight">CABAL</span>
                <span className="text-[10px] text-gray-200 leading-tight">Débito</span>
              </div>
              
              {/* LINK */}
              <div className="bg-green-600 px-3 py-1.5 rounded-full flex items-center justify-center min-w-[50px] h-8">
                <span className="text-xs font-bold text-white">LINK</span>
              </div>
              
              {/* Pago24 */}
              <div className="bg-white px-3 py-1.5 rounded border border-gray-300 flex items-center justify-center min-w-[70px] h-8">
                <span className="text-xs font-semibold text-blue-600">Pago24</span>
              </div>
              
              {/* PIM */}
              <div className="bg-yellow-500 px-3 py-1.5 rounded flex items-center justify-center min-w-[50px] h-8">
                <span className="text-xs font-bold text-white">PIM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Ferretería Dany. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
