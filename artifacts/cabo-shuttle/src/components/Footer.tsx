import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="font-['Poppins'] text-white pt-16 pb-8"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <div className="text-xl font-bold mb-4">
            Cabo <span className="text-[#D4AF37]">Shuttle</span> Ride
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Transporte privado premium en Los Cabos. Tu concierge sobre ruedas desde el momento en que aterrizas.
          </p>
          <div className="mt-6 flex gap-3">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse mt-1.5" />
            <span className="text-[#D4AF37] text-sm font-semibold">Disponible 24/7</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-5">Navegación</h4>
          <ul className="space-y-3 text-sm text-white/65">
            {[
              { href: "/", label: "Inicio" },
              { href: "/zonas", label: "Zonas de Servicio" },
              { href: "/flota", label: "Nuestra Flota" },
              { href: "/precios", label: "Precios" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-5">Tu Reserva</h4>
          <ul className="space-y-3 text-sm text-white/65">
            {[
              { href: "/reservar", label: "Reservar Ahora" },
              { href: "/mi-reserva", label: "Buscar Reserva" },
              { href: "/admin", label: "Portal Admin" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-5">Contacto</h4>
          <ul className="space-y-4 text-sm text-white/65">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              info@caboshuttleride.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              +52 (624) 123-4567
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              Los Cabos, B.C.S., México
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
