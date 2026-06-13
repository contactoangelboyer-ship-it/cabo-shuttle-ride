import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Shield, Clock, Star, ChevronRight, MapPin,
  MessageCircle, CheckCircle, Quote
} from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import { useListZones } from "@workspace/api-client-react";

const ZONE_IMAGES: Record<string, string> = {
  "aeropuerto": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&auto=format&fit=crop",
  "san-jose-del-cabo": "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=900&q=80&auto=format&fit=crop",
  "corredor-turistico": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop",
  "cabo-san-lucas": "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=900&q=80&auto=format&fit=crop",
  "todos-santos": "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=900&q=80&auto=format&fit=crop",
};

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    origin: "San Diego, CA",
    text: "El chofer llegó justo a tiempo al aeropuerto, el auto estaba impecable y con agua fría. Fue la mejor forma de empezar nuestras vacaciones en Los Cabos.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    origin: "Ciudad de México",
    text: "Reservé un Sprinter para toda la familia. El servicio fue puntual, profesional y el chofer conocía perfectamente todas las rutas. Los recomiendo al 100%.",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    origin: "Houston, TX",
    text: "Usé Cabo Shuttle Ride tres veces durante mi semana en Los Cabos. Siempre puntuales, siempre amables. Sin duda es la opción premium de transporte en la zona.",
    rating: 5,
  },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80&auto=format&fit=crop",
    label: "El Arco de Cabo San Lucas",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop",
    label: "Playa Médano",
  },
  {
    src: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80&auto=format&fit=crop",
    label: "El Corredor Turístico",
  },
  {
    src: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80&auto=format&fit=crop",
    label: "Centro de San José del Cabo",
  },
  {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&auto=format&fit=crop",
    label: "Aeropuerto Internacional SJD",
  },
  {
    src: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80&auto=format&fit=crop",
    label: "Todos Santos",
  },
];

export default function Home() {
  const { data: zones } = useListZones();

  return (
    <div className="w-full font-sans">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 55%, #1C1917 100%)" }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=85&auto=format&fit=crop"
            alt="Los Cabos"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(17,17,17,0.80) 55%, rgba(28,25,23,0.76) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="h-20" />

        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 max-w-7xl mx-auto w-full py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-wide uppercase">
                Los Cabos #1 Traslado Privado
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-['Unbounded'] font-black leading-[1.05] tracking-tight text-white mb-5 uppercase">
              Tu Traslado,{" "}
              <br />
              <span
                className="text-[#D4AF37]"
                style={{ textShadow: "0 0 40px rgba(212,175,55,0.35)" }}
              >
                Sin Complicaciones.
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/75 font-medium leading-relaxed max-w-xl">
              Choferes certificados, vehículos de lujo y puntualidad garantizada. Reserva en 60 segundos y llega relajado a tu destino.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BookingWidget />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-3 pb-8 sm:pb-10 px-5"
        >
          {["Choferes Bilingues", "Vehículos Asegurados", "Monitoreo de Vuelos", "Sin Cargos Ocultos"].map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 bg-white/8 border border-white/15 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full"
            >
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span className="text-white/80 text-xs font-medium">{t}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 sm:py-24 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
              Por Qué Elegirnos
            </p>
            <h2 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1917] leading-tight uppercase tracking-tight">
              La Diferencia <span className="text-[#D4AF37]">Cabo Shuttle</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: "Viaje Seguro",
                desc: "Choferes bilingues certificados, vehículos asegurados y monitoreo en tiempo real para tu tranquilidad total.",
              },
              {
                icon: Clock,
                title: "Puntualidad Perfecta",
                desc: "Monitoreamos tu vuelo. Si se retrasa o adelanta, ajustamos el horario. Siempre te estaremos esperando.",
              },
              {
                icon: Star,
                title: "Servicio Premium",
                desc: "Vehículos inmaculados, aire acondicionado perfecto y agua fría a bordo. Relájate desde el primer momento.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#111111] flex items-center justify-center mb-5 sm:mb-6">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-14 sm:py-16"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { val: "5", label: "Zonas de Servicio" },
            { val: "4", label: "Vehículos de Lujo" },
            { val: "+2,000", label: "Viajes Realizados" },
            { val: "24/7", label: "Disponibilidad" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">{s.val}</div>
              <div className="text-white/65 text-xs sm:text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ZONES PREVIEW ── */}
      <section className="py-20 sm:py-24 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
                Destinos
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1C1917]">Cubrimos Todo Los Cabos</h2>
            </div>
            <Link
              href="/zonas"
              className="inline-flex items-center gap-2 text-[#1C1917] font-bold text-sm hover:text-[#D4AF37] transition-colors group"
            >
              Ver todas las zonas{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {zones?.slice(0, 4).map((zone, i) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img
                  src={ZONE_IMAGES[zone.slug] || zone.coverImage || ""}
                  alt={zone.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#111111]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h4 className="text-white font-bold text-base sm:text-lg leading-tight mb-2">{zone.name}</h4>
                  <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <MapPin className="w-3.5 h-3.5" /> Ver detalles
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
              Los Cabos
            </p>
            <h2 className="font-['Unbounded'] text-3xl sm:text-4xl font-black text-[#1C1917] uppercase tracking-tight">
              Descubre el Paraíso
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Playas vírgenes, el icónico Arco de Cabo San Lucas, resorts de lujo y el encantador pueblo de Todos Santos. Te llevamos a donde quieras.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl group ${
                  i === 0 ? "row-span-2" : ""
                }`}
                style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-xs sm:text-sm font-semibold">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 sm:py-24 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
              Testimonios
            </p>
            <h2 className="font-['Unbounded'] text-3xl sm:text-4xl font-black text-[#1C1917] uppercase tracking-tight">
              Lo Que Dicen Nuestros{" "}
              <span className="text-[#D4AF37]">Clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/60 border border-slate-100 flex flex-col"
              >
                <Quote className="w-8 h-8 text-[#D4AF37]/40 mb-4" />
                <p className="text-slate-600 leading-relaxed mb-6 flex-1 text-sm sm:text-base">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1C1917]">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.origin}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 sm:py-20 text-center"
        style={{ background: "linear-gradient(135deg, #111111 0%, #1C1917 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-5 sm:px-6">
          <h2 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 uppercase tracking-tight">
            Listo para tu{" "}
            <span className="text-[#D4AF37]">Traslado Perfecto?</span>
          </h2>
          <p className="text-white/65 text-base sm:text-lg mb-8 sm:mb-10">
            Reserva en 60 segundos o escríbenos por WhatsApp. Sin complicaciones, sin cargos ocultos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all hover:scale-[1.03] shadow-[0_0_40px_rgba(212,175,55,0.35)]"
            >
              Reservar Ahora <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>
            <a
              href="https://wa.me/526241234567?text=Hola%2C%20quiero%20información%20sobre%20traslados%20en%20Los%20Cabos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
