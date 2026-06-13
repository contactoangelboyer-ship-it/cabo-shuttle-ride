import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Award, Clock, Heart, ArrowRight, Users, Star, MapPin } from "lucide-react";

const TEAM = [
  {
    name: "Carlos Mendoza",
    role: "Fundador & CEO",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop&face",
    desc: "15 años de experiencia en transporte turístico de lujo en Los Cabos.",
  },
  {
    name: "Ana Ramírez",
    role: "Directora de Operaciones",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&auto=format&fit=crop&face",
    desc: "Especialista en logística y atención al cliente premium.",
  },
  {
    name: "Miguel Torres",
    role: "Jefe de Flota",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop&face",
    desc: "Garantiza que cada vehículo esté en condiciones perfectas.",
  },
];

const VALUES = [
  { icon: Shield, title: "Seguridad Primero", desc: "Todos nuestros choferes pasan verificaciones exhaustivas de antecedentes y están certificados." },
  { icon: Clock, title: "Puntualidad", desc: "Monitoreamos vuelos en tiempo real. Si tu vuelo se retrasa, nosotros esperamos sin costo adicional." },
  { icon: Heart, title: "Servicio Personalizado", desc: "Cada traslado es único. Nos adaptamos a tus necesidades para darte la mejor experiencia." },
  { icon: Award, title: "Experiencia", desc: "Más de 8 años operando en Los Cabos. Conocemos cada ruta, hotel y resort de la región." },
];

export default function Nosotros() {
  return (
    <div className="w-full font-sans">
      {/* Hero */}
      <div
        className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Nuestra Historia</span>
          </div>
          <h1 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
            Nosotros
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Somos el servicio de transporte privado de confianza en Los Cabos. Desde 2016, conectamos viajeros con destinos de ensueño.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">Nuestra Historia</p>
              <h2 className="font-['Unbounded'] text-2xl sm:text-3xl font-black text-[#1C1917] uppercase mb-5 sm:mb-6 leading-tight">
                Nacimos para Hacer<br />
                <span className="text-[#D4AF37]">Tu Viaje Perfecto</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Cabo Shuttle Ride nació en 2016 con una misión simple: ofrecer el transporte privado más confiable y cómodo de Los Cabos. Fundados por viajeros frustrados con las alternativas del mercado, decidimos crear el servicio que siempre quisimos encontrar.
                </p>
                <p>
                  Hoy contamos con una flota de vehículos de lujo, choferes certificados bilingues y más de 2,000 traslados realizados con éxito. Operamos los 365 días del año, las 24 horas del día, para que nunca tengas que preocuparte por tu traslado.
                </p>
                <p>
                  Nuestro compromiso es simple: llegar a tiempo, en un vehículo impecable, con un chofer profesional y amable. Sin complicaciones, sin sorpresas.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6">
                {[
                  { val: "2016", label: "Fundados" },
                  { val: "+2K", label: "Traslados" },
                  { val: "5★", label: "Calificación" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-[#D4AF37]">{s.val}</div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80&auto=format&fit=crop"
                  alt="Los Cabos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-white font-bold text-xs sm:text-sm">+500 reseñas 5 estrellas</p>
                <p className="text-white/50 text-xs">Google, TripAdvisor, Expedia</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">Lo Que Nos Define</p>
            <h2 className="font-['Unbounded'] text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1917] uppercase tracking-tight">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 flex gap-4 sm:gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#111111] flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1C1917] mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">Quiénes Somos</p>
            <h2 className="font-['Unbounded'] text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1917] uppercase tracking-tight">
              Nuestro Equipo
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-[#D4AF37]/20">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-bold text-[#1C1917] text-base sm:text-lg">{member.name}</h3>
                <p className="text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section
        className="py-14 sm:py-16"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 text-center">
          <h2 className="font-['Unbounded'] text-2xl sm:text-3xl font-black text-white uppercase mb-4">
            Cubrimos Todo <span className="text-[#D4AF37]">Los Cabos</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            {["Aeropuerto SJD", "Cabo San Lucas", "San José del Cabo", "Corredor Turístico", "Todos Santos"].map((z) => (
              <div key={z} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-white text-xs sm:text-sm font-medium">{z}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservar"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black px-8 py-4 rounded-2xl transition-all"
            >
              Reservar Ahora <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all"
            >
              <Users className="w-4 h-4" /> Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
