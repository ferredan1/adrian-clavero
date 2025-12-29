export function SharedFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AC | Adrián Clavero</h3>
            <p className="text-sm text-slate-300 mb-4">
              Más de 15 años brindando servicios profesionales de plomería, gas e Hidro Jet en CABA y GBA.
            </p>
            <p className="text-sm text-slate-400">Gasista Matriculado</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Servicios</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Destapaciones Hidro Jet</li>
              <li>Plomería Integral</li>
              <li>Instalación de Gas</li>
              <li>Emergencias 24/7</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/servicios" className="hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="/trabajos" className="hover:text-white transition-colors">
                  Trabajos Realizados
                </a>
              </li>
              <li>
                <a href="/zonas" className="hover:text-white transition-colors">
                  Zonas de Cobertura
                </a>
              </li>
              <li>
                <a href="/preguntas" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Contacto</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href="tel:+5491154625634" className="hover:text-white transition-colors">
                  +54 9 11 5462-5634
                </a>
              </li>
              <li>
                <a href="mailto:contacto@adrianclavero.com" className="hover:text-white transition-colors">
                  contacto@adrianclavero.com
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-slate-400">Lunes a Sábado: 8:00 - 20:00</p>
                <p className="text-xs text-slate-400">Emergencias: 24/7</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-6 text-center">
          <p className="text-sm text-slate-400">
            © 2025 Adrián Clavero - Plomería y Gas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

