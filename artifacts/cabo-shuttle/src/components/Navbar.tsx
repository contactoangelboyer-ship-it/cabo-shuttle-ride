import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkCls = isHome && !scrolled
    ? "text-white/90 hover:text-white"
    : "text-slate-700 hover:text-[#1C1917]";

  const bg = isHome && !scrolled
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-['Poppins'] ${bg}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className={isHome && !scrolled ? "text-white" : "text-[#1C1917]"}>
            Cabo{" "}
          </span>
          <span className="text-[#D4AF37]">Shuttle</span>
          <span className={isHome && !scrolled ? "text-white" : "text-[#1C1917]"}>
            {" "}Ride
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "/zonas", label: "Zonas" },
            { href: "/flota", label: "Flota" },
            { href: "/precios", label: "Precios" },
            { href: "/mi-reserva", label: "Mi Reserva" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors ${linkCls}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/reservar"
            className="bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-bold text-sm px-6 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)]"
          >
            Reservar Ahora
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden p-2 rounded-xl transition-colors ${isHome && !scrolled ? "text-white" : "text-slate-700"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4 font-['Poppins']">
          {[
            { href: "/zonas", label: "Zonas" },
            { href: "/flota", label: "Flota" },
            { href: "/precios", label: "Precios" },
            { href: "/mi-reserva", label: "Mi Reserva" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-slate-700 font-semibold text-sm"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/reservar"
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-[#D4AF37] text-[#111111] font-bold text-sm px-6 py-3 rounded-full"
          >
            Reservar Ahora
          </Link>
        </div>
      )}
    </header>
  );
}
