import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, MapPin, Car, DollarSign, Users, MessageCircle, HelpCircle, Phone } from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Servicios",
    items: [
      { href: "/zonas", label: "Zonas de Servicio", icon: MapPin, desc: "5 destinos en Los Cabos" },
      { href: "/flota", label: "Nuestra Flota", icon: Car, desc: "Sedán, SUV, Van, Sprinter" },
      { href: "/precios", label: "Precios", icon: DollarSign, desc: "Tarifas sin cargos ocultos" },
    ],
  },
  {
    label: "Compañía",
    items: [
      { href: "/nosotros", label: "Nosotros", icon: Users, desc: "Quiénes somos" },
      { href: "/faq", label: "FAQ", icon: HelpCircle, desc: "Preguntas frecuentes" },
      { href: "/contacto", label: "Contacto", icon: Phone, desc: "Estamos para ayudarte" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const transparent = isHome && !scrolled;

  const linkCls = transparent
    ? "text-white/90 hover:text-white"
    : "text-slate-700 hover:text-[#1C1917]";

  const bg = transparent
    ? "bg-transparent"
    : "bg-white/97 backdrop-blur-md border-b border-slate-100 shadow-sm";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${bg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-1 text-xl font-bold tracking-tight flex-shrink-0">
          <span className={transparent ? "text-white" : "text-[#1C1917]"}>Cabo </span>
          <span className="text-[#D4AF37]">Shuttle</span>
          <span className={transparent ? "text-white" : "text-[#1C1917]"}> Ride</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
          <Link
            href="/"
            className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${linkCls}`}
          >
            Inicio
          </Link>

          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${linkCls}`}
              >
                {group.label}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === group.label ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === group.label && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#D4AF37]/20 transition-colors">
                        <item.icon className="w-4 h-4 text-[#1C1917]" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#1C1917]">{item.label}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/mi-reserva"
            className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${linkCls}`}
          >
            Mi Reserva
          </Link>

          <a
            href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados%20en%20Los%20Cabos"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${linkCls}`}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/reservar"
            className="bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)]"
          >
            Reservar Ahora
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${transparent ? "text-white" : "text-slate-700"}`}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 font-sans">
          <div className="px-5 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block text-slate-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Inicio
            </Link>

            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  onClick={() => setOpenMobileGroup(openMobileGroup === group.label ? null : group.label)}
                  className="w-full flex items-center justify-between text-slate-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-slate-50"
                >
                  {group.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${openMobileGroup === group.label ? "rotate-180" : ""}`} />
                </button>
                {openMobileGroup === group.label && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-[#D4AF37]/30 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 text-slate-600 text-sm px-3 py-2.5 rounded-xl hover:bg-slate-50"
                      >
                        <item.icon className="w-4 h-4 text-[#D4AF37]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/mi-reserva"
              onClick={() => setOpen(false)}
              className="block text-slate-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Mi Reserva
            </Link>

            <a
              href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados%20en%20Los%20Cabos"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-green-700 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-green-50"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <div className="px-5 pb-5">
            <Link
              href="/reservar"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-[#D4AF37] text-[#111111] font-bold text-sm px-6 py-3.5 rounded-full"
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
