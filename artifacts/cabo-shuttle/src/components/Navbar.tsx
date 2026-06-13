import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, MapPin, Car, DollarSign, Users, MessageCircle, HelpCircle, Phone } from "lucide-react";

const GOLD = "#C8971A";

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
    const fn = () => setScrolled(window.scrollY > 40);
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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans"
      style={{
        background: transparent ? "transparent" : "rgba(255,255,255,0.97)",
        backdropFilter: transparent ? "none" : "blur(16px)",
        borderBottom: transparent ? "none" : "1px solid rgba(0,0,0,0.06)",
        boxShadow: transparent ? "none" : "0 1px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-0.5 font-bold tracking-tight flex-shrink-0"
          style={{ fontSize: "1.15rem" }}
        >
          <span style={{ color: transparent ? "#ffffff" : "#0B1628" }}>Cabo </span>
          <span style={{ color: GOLD }}>Shuttle</span>
          <span style={{ color: transparent ? "#ffffff" : "#0B1628" }}> Ride</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" ref={dropdownRef}>
          <Link
            href="/"
            className="text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#374151" }}
          >
            Inicio
          </Link>

          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                className="flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#374151" }}
              >
                {group.label}
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform duration-200"
                  style={{ transform: openDropdown === group.label ? "rotate(180deg)" : "none" }}
                />
              </button>

              {openDropdown === group.label && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl py-2 z-50"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                        style={{ background: "rgba(200,151,26,0.1)" }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: "#0B1628" }} />
                      </div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#111827" }}>{item.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            href="/mi-reserva"
            className="text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#374151" }}
          >
            Mi Reserva
          </Link>

          <a
            href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados%20en%20Los%20Cabos"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#374151" }}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/reservar"
            className="inline-block font-bold text-sm px-5 py-2.5 rounded-full transition-all"
            style={{
              background: GOLD,
              color: "#ffffff",
              boxShadow: "0 4px 16px rgba(200,151,26,0.35)",
            }}
          >
            Reservar Ahora
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-xl transition-colors"
          style={{ color: transparent ? "#ffffff" : "#374151" }}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t font-sans" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="px-5 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ color: "#374151" }}
            >
              Inicio
            </Link>

            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <button
                  onClick={() => setOpenMobileGroup(openMobileGroup === group.label ? null : group.label)}
                  className="w-full flex items-center justify-between font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ color: "#374151" }}
                >
                  {group.label}
                  <ChevronDown
                    className="w-4 h-4 transition-transform"
                    style={{ transform: openMobileGroup === group.label ? "rotate(180deg)" : "none" }}
                  />
                </button>
                {openMobileGroup === group.label && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l-2 pl-3" style={{ borderColor: `${GOLD}40` }}>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                        style={{ color: "#6B7280" }}
                      >
                        <item.icon className="w-4 h-4" style={{ color: GOLD }} />
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
              className="block font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ color: "#374151" }}
            >
              Mi Reserva
            </Link>

            <a
              href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados%20en%20Los%20Cabos"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 font-semibold text-sm px-3 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
              style={{ color: "#16A34A" }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <div className="px-5 pb-5">
            <Link
              href="/reservar"
              onClick={() => setOpen(false)}
              className="block w-full text-center font-bold text-sm px-6 py-3.5 rounded-full transition-all"
              style={{ background: GOLD, color: "#ffffff" }}
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
