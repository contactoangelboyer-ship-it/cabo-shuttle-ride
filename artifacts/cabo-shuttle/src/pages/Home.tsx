import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Shield, Clock, Star, ChevronRight, MapPin } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import { useListZones } from "@workspace/api-client-react";

const ZONE_IMAGES: Record<string, string> = {
  "aeropuerto": "/images/zona-aeropuerto.png",
  "san-jose-del-cabo": "/images/zona-sanjose.png",
  "corredor-turistico": "/images/zona-corredor.png",
  "cabo-san-lucas": "/images/zona-cabosanlucas.png",
  "todos-santos": "/images/zona-todossantos.png",
};

export default function Home() {
  const { data: zones } = useListZones();

  return (
    <div className="w-full font-['Poppins']">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 55%, #1C1917 100%)" }}
      >
        {/* Background photo with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Los Cabos"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.90) 0%, rgba(17,17,17,0.82) 55%, rgba(28,25,23,0.78) 100%)",
            }}
          />
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Navbar spacer */}
        <div className="h-20" />

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-wide uppercase">
                Los Cabos #1 Traslado Privado
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-['Unbounded'] font-black leading-[1.05] tracking-tight text-white mb-6 uppercase">
              Tu Traslado,{" "}
              <br />
              <span
                className="text-[#D4AF37]"
                style={{ textShadow: "0 0 40px rgba(212,175,55,0.35)" }}
              >
                Sin Complicaciones.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 font-medium leading-relaxed max-w-xl">
              Choferes certificados, vehículos de lujo y puntualidad garantizada. Reserva en 60 segundos y llega relajado.
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

        {/* Floating trust chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 flex flex-wrap justify-center gap-3 pb-10 px-6"
        >
          {["Choferes Bilingues", "Vehiculos Asegurados", "Monitoreo de Vuelos", "Sin Cargos Ocultos"].map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 bg-white/8 border border-white/15 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-white/80 text-xs font-medium">{t}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
              Por Que Elegirnos
            </p>
            <h2 className="font-['Unbounded'] text-4xl md:text-5xl font-black text-[#1C1917] leading-tight uppercase tracking-tight">
              La Diferencia{" "}
              <span className="text-[#1C1917]">Cabo Shuttle</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Viaje Seguro",
                desc: "Choferes bilingues certificados, vehiculos asegurados y monitoreo en tiempo real para tu tranquilidad.",
                color: "bg-[#111111]",
              },
              {
                icon: Clock,
                title: "Puntualidad Perfecta",
                desc: "Monitoreamos tu vuelo. Si se retrasa o adelanta, ajustamos el horario. Siempre te estaremos esperando.",
                color: "bg-[#1C1917]",
              },
              {
                icon: Star,
                title: "Servicio Premium",
                desc: "Vehiculos inmaculados, aire acondicionado perfecto y amenidades para que te relajes en el camino.",
                color: "bg-[#0a0a0a]",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 hover:-translate-y-1 transition-transform duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6`}
                >
                  <item.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1C1917] mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "5", label: "Zonas de Servicio" },
            { val: "4", label: "Vehiculos de Lujo" },
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
              <div className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-2">{s.val}</div>
              <div className="text-white/65 text-sm font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ZONES PREVIEW ── */}
      <section className="py-24 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">
                Destinos
              </p>
              <h2 className="text-4xl font-black text-[#1C1917]">Cubrimos Todo Los Cabos</h2>
            </div>
            <Link
              href="/zonas"
              className="inline-flex items-center gap-2 text-[#1C1917] font-bold text-sm hover:text-[#1C1917] transition-colors mt-4 md:mt-0 group"
            >
              Ver todas las zonas{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#111111]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-lg leading-tight mb-2">{zone.name}</h4>
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

      {/* ── CTA ── */}
      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #111111 0%, #1C1917 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-['Unbounded'] text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            Listo para tu{" "}
            <span className="text-[#D4AF37]">Traslado Perfecto?</span>
          </h2>
          <p className="text-white/65 text-lg mb-10">
            Reserva en 60 segundos. Sin complicaciones, sin cargos ocultos.
          </p>
          <Link
            href="/reservar"
            className="inline-flex items-center gap-3 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black text-lg px-10 py-5 rounded-2xl transition-all hover:scale-[1.03] shadow-[0_0_40px_rgba(212,175,55,0.35)]"
          >
            Reservar Ahora <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
