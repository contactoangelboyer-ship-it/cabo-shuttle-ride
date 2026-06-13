import { Link } from "wouter";
import BookingWidget from "../components/BookingWidget";
import {
  Shield, Clock, Star, Globe, ArrowRight, CheckCircle2,
  MessageCircle, Users, Plane, MapPin, Car
} from "lucide-react";

const GOLD = "#C8971A";
const DARK = "#0B1628";

const HERO_IMG =
  "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=1920&q=85&auto=format&fit=crop";

const FLEET = [
  {
    name: "Sedán Ejecutivo",
    img: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80&auto=format&fit=crop",
    capacity: "1–3 pasajeros",
    luggage: "2 maletas",
    examples: "Toyota Camry, Nissan Altima",
    from: "45",
  },
  {
    name: "SUV de Lujo",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80&auto=format&fit=crop",
    capacity: "1–6 pasajeros",
    luggage: "4 maletas",
    examples: "Chevrolet Suburban, Ford Expedition",
    from: "65",
    featured: true,
  },
  {
    name: "Van / Sprinter",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80&auto=format&fit=crop",
    capacity: "7–14 pasajeros",
    luggage: "8+ maletas",
    examples: "Mercedes Sprinter, Transit",
    from: "95",
  },
];

const DESTINATIONS = [
  {
    name: "Aeropuerto SJD",
    desc: "Recepción en sala de llegadas con letrero personalizado",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop",
    time: "0 km",
  },
  {
    name: "Cabo San Lucas",
    desc: "El Arco, Marina, Médano, hoteles y centros nocturnos",
    img: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80&auto=format&fit=crop",
    time: "45 min",
  },
  {
    name: "San José del Cabo",
    desc: "Zona hotelera, centro histórico y galería de arte",
    img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80&auto=format&fit=crop",
    time: "20 min",
  },
  {
    name: "Corredor Turístico",
    desc: "Hoteles de lujo entre SJD y Cabo, playas privadas",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format&fit=crop",
    time: "30 min",
  },
];

const TRUST = [
  { icon: Shield, title: "Seguro y Verificado", desc: "Choferes con licencia federal, vehículos asegurados y GPS activo en todo momento." },
  { icon: Clock, title: "Puntualidad 100%", desc: "Monitoreamos tu vuelo en tiempo real. Ajustamos la llegada si hay retraso." },
  { icon: Globe, title: "Choferes Bilingües", desc: "Todo nuestro equipo habla inglés y español. Comunicación sin barreras." },
  { icon: Star, title: "4.9 ★ Calificación", desc: "Más de 3,000 traslados y cientos de reseñas de 5 estrellas en Google." },
];

const STEPS = [
  { n: "01", title: "Selecciona tu ruta", desc: "Elige origen, destino, fecha y tipo de vehículo. Sin registro, sin complicaciones." },
  { n: "02", title: "Confirma tu reserva", desc: "Recibe confirmación inmediata por correo y WhatsApp con todos los detalles." },
  { n: "03", title: "Disfruta tu llegada", desc: "Tu chofer te espera con letrero personalizado. Sin filas, sin estrés." },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    origin: "Los Ángeles, CA",
    text: "Perfectamente puntual. El chofer estaba esperando en sala de llegadas con nuestros nombres. El Suburban era impecable. Lo usaremos cada vez que visitemos Los Cabos.",
    stars: 5,
  },
  {
    name: "Carlos R.",
    origin: "Ciudad de México",
    text: "Reservé para un grupo de 8 personas con el Sprinter. Precio muy competitivo, vehículo limpio y el chofer super amable. Totalmente recomendado.",
    stars: 5,
  },
  {
    name: "Jennifer T.",
    origin: "Houston, TX",
    text: "Cuando nuestro vuelo llegó tarde, el chofer esperó sin problema. Comunicación excelente por WhatsApp todo el tiempo. Servicio de primera clase.",
    stars: 5,
  },
];

export default function Home() {
  return (
    <main className="font-sans overflow-x-hidden" style={{ color: "#111827" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-end"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(11,22,40,0.92) 0%, rgba(11,22,40,0.72) 55%, rgba(11,22,40,0.40) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 pt-32 pb-12 sm:pb-16">
          <div className="max-w-xl mb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "rgba(200,151,26,0.18)",
                border: "1px solid rgba(200,151,26,0.40)",
                color: GOLD,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
              Traslados Privados · Los Cabos
            </div>

            <h1
              className="font-extrabold text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Tu llegada a Los Cabos,{" "}
              <span style={{ color: GOLD }}>perfecta.</span>
            </h1>

            <p
              className="leading-relaxed mb-8"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.72)" }}
            >
              Choferes certificados, vehículos premium y puntualidad garantizada.
              Disponible 24/7 en aeropuerto SJD y toda la Riviera de Los Cabos.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/reservar"
                className="inline-flex items-center gap-2 font-bold rounded-full px-6 py-3 transition-all"
                style={{
                  background: GOLD,
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 24px rgba(200,151,26,0.40)",
                }}
              >
                Reservar Ahora <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/526241234567?text=Hola%2C%20quisiera%20información%20sobre%20traslados%20en%20Los%20Cabos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold rounded-full px-6 py-3 transition-all"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>

          <BookingWidget />

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
            {["Sin Cargos Ocultos", "Choferes Bilingües", "Monitoreo de Vuelos", "Vehículos Asegurados"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start gap-4">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(200,151,26,0.10)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color: "#111827" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: "#F8F7F3" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
              Cómo Funciona
            </p>
            <h2
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#111827", letterSpacing: "-0.02em" }}
            >
              Tu traslado en 3 pasos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.n}>
                <div
                  className="text-7xl font-extrabold mb-4 leading-none select-none"
                  style={{ color: "rgba(200,151,26,0.14)" }}
                >
                  {step.n}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET ────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                Nuestra Flota
              </p>
              <h2
                className="font-extrabold leading-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#111827", letterSpacing: "-0.02em" }}
              >
                Vehículos para cada grupo
              </h2>
            </div>
            <Link
              href="/flota"
              className="inline-flex items-center gap-2 text-sm font-bold flex-shrink-0 transition-opacity hover:opacity-70"
              style={{ color: GOLD }}
            >
              Ver flota completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FLEET.map((v) => (
              <div
                key={v.name}
                className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: v.featured ? `2px solid ${GOLD}` : "1px solid #E5E7EB",
                  boxShadow: v.featured
                    ? "0 8px 32px rgba(200,151,26,0.16)"
                    : "0 2px 16px rgba(0,0,0,0.05)",
                }}
              >
                {v.featured && (
                  <div
                    className="absolute top-3 right-3 z-10 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: GOLD, color: "#fff" }}
                  >
                    Más popular
                  </div>
                )}
                <div className="h-48 overflow-hidden">
                  <img
                    src={v.img}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1" style={{ color: "#111827" }}>{v.name}</h3>
                  <p className="text-xs mb-4" style={{ color: "#9CA3AF" }}>{v.examples}</p>
                  <div className="flex flex-wrap gap-4 mb-5">
                    <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#6B7280" }}>
                      <Users className="w-3.5 h-3.5" /> {v.capacity}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "#6B7280" }}>
                      <Car className="w-3.5 h-3.5" /> {v.luggage}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>Desde</span>
                    <span className="text-2xl font-extrabold" style={{ color: GOLD }}>${v.from}</span>
                    <span className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>USD</span>
                  </div>
                  <Link
                    href="/reservar"
                    className="block w-full text-center text-sm font-bold py-3 rounded-xl transition-all"
                    style={{
                      background: v.featured ? GOLD : "transparent",
                      color: v.featured ? "#fff" : GOLD,
                      border: `1.5px solid ${GOLD}`,
                    }}
                  >
                    Reservar este vehículo
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
                Zonas de Servicio
              </p>
              <h2
                className="font-extrabold text-white leading-tight"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
              >
                Cubrimos toda la Riviera
              </h2>
            </div>
            <Link
              href="/zonas"
              className="inline-flex items-center gap-2 text-sm font-bold flex-shrink-0 transition-opacity hover:opacity-70"
              style={{ color: GOLD }}
            >
              Ver todas las zonas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.name}
                href="/zonas"
                className="group relative rounded-2xl overflow-hidden block"
                style={{ height: "300px" }}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,22,40,0.92) 0%, rgba(11,22,40,0.30) 60%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: GOLD }} />
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: GOLD }}>
                      {d.time}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{d.name}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.60)" }}>{d.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "3,000+", label: "Traslados completados" },
              { value: "4.9★", label: "Calificación promedio" },
              { value: "24/7", label: "Disponibilidad garantizada" },
              { value: "$0", label: "Cargos ocultos" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="font-extrabold leading-none mb-2"
                  style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: GOLD }}
                >
                  {value}
                </div>
                <div className="text-sm font-medium" style={{ color: "#6B7280" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: "#F8F7F3" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GOLD }}>
              Opiniones Verificadas
            </p>
            <h2
              className="font-extrabold leading-tight"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#111827", letterSpacing: "-0.02em" }}
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-7 flex flex-col gap-5"
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: GOLD }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#374151" }}>
                  "{t.text}"
                </p>
                <div>
                  <div className="font-bold text-sm" style={{ color: "#111827" }}>{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{t.origin}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: DARK }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
            style={{ background: "rgba(200,151,26,0.15)", border: "1px solid rgba(200,151,26,0.35)", color: GOLD }}
          >
            <Plane className="w-3.5 h-3.5" />
            ¿Próximo viaje a Los Cabos?
          </div>
          <h2
            className="font-extrabold text-white leading-tight mb-5 mx-auto"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
              maxWidth: "600px",
            }}
          >
            Reserva tu traslado hoy y viaja sin preocupaciones
          </h2>
          <p
            className="mb-10 mx-auto"
            style={{ fontSize: "1rem", color: "rgba(255,255,255,0.55)", maxWidth: "440px" }}
          >
            Confirmación inmediata. Sin registro obligatorio. Cancelación flexible.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-3.5 transition-all"
              style={{
                background: GOLD,
                color: "#fff",
                boxShadow: "0 4px 24px rgba(200,151,26,0.40)",
                fontSize: "0.95rem",
              }}
            >
              Reservar Ahora <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold rounded-full px-8 py-3.5 transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.20)",
                color: "#fff",
                fontSize: "0.95rem",
              }}
            >
              <MessageCircle className="w-4 h-4" /> Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
