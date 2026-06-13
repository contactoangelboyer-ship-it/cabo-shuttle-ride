import { Link } from "wouter";
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="font-sans text-white pt-16 pb-8"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="text-xl font-bold mb-4">
            Cabo <span className="text-[#D4AF37]">Shuttle</span> Ride
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
            Transporte privado premium en Los Cabos. Tu concierge sobre ruedas desde el momento en que aterrizas. Disponible 24/7, los 365 días del año.
          </p>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#D4AF37] text-sm font-semibold">Disponible 24/7</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-green-600 hover:bg-green-500 transition-colors flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.instagram.com/caboshuttleride"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/caboshuttleride"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4AF37] mb-5">Servicios</h4>
          <ul className="space-y-3 text-sm text-white/65">
            {[
              { href: "/zonas", label: "Zonas de Servicio" },
              { href: "/flota", label: "Nuestra Flota" },
              { href: "/precios", label: "Precios y Tarifas" },
              { href: "/reservar", label: "Reservar Ahora" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4AF37] mb-5">Compañía</h4>
          <ul className="space-y-3 text-sm text-white/65">
            {[
              { href: "/nosotros", label: "Nosotros" },
              { href: "/faq", label: "Preguntas Frecuentes" },
              { href: "/contacto", label: "Contacto" },
              { href: "/mi-reserva", label: "Mi Reserva" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4AF37] mb-5">Contacto</h4>
          <ul className="space-y-4 text-sm text-white/65">
            <li>
              <a
                href="mailto:info@caboshuttleride.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                info@caboshuttleride.com
              </a>
            </li>
            <li>
              <a
                href="tel:+526241234567"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                +52 (624) 123-4567
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>Los Cabos, B.C.S., México</span>
            </li>
            <li>
              <a
                href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold text-xs px-4 py-2 rounded-full transition-colors mt-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Escríbenos por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
        <span>&copy; {new Date().getFullYear()} Cabo Shuttle Ride. Todos los derechos reservados.</span>
        <span>Los Cabos, Baja California Sur, México</span>
      </div>
    </footer>
  );
}
