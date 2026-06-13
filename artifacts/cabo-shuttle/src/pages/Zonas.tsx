import { motion } from "framer-motion";
import { MapPin, Sun, Waves, Camera, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import { useListZones } from "@workspace/api-client-react";

const ZONE_IMAGES: Record<string, string> = {
  "aeropuerto": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&auto=format&fit=crop",
  "san-jose-del-cabo": "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=900&q=80&auto=format&fit=crop",
  "corredor-turistico": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80&auto=format&fit=crop",
  "cabo-san-lucas": "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=900&q=80&auto=format&fit=crop",
  "todos-santos": "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=900&q=80&auto=format&fit=crop",
};

const HIGHLIGHT_ICONS = [Sun, Waves, Camera, MapPin, Clock];

export default function Zonas() {
  const { data: zones, isLoading } = useListZones();

  return (
    <div className="w-full font-sans">
      <div
        className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-white text-xs font-semibold uppercase tracking-wider">
              5 Zonas Disponibles
            </span>
          </div>
          <h1 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
            Zonas de Servicio
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Cubrimos los destinos más exclusivos de Baja California Sur. Desde el aeropuerto SJD hasta tu resort favorito.
          </p>
        </div>
      </div>

      <div className="bg-[#FAFAF9] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div
                className="w-12 h-12 rounded-full border-4 border-transparent animate-spin"
                style={{ borderTopColor: "#D4AF37", borderRightColor: "rgba(212,175,55,0.3)" }}
              />
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-12">
              {zones?.map((zone, i) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${
                    i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                  } bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100`}
                >
                  <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-80 relative overflow-hidden">
                    <img
                      src={ZONE_IMAGES[zone.slug] || zone.coverImage || ""}
                      alt={zone.name}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent md:hidden" />
                    <h2 className="absolute bottom-5 left-5 text-xl sm:text-2xl font-black text-white md:hidden">
                      {zone.name}
                    </h2>
                    <div className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#D4AF37] flex items-center justify-center">
                      <span className="text-[#111111] font-black text-sm">{i + 1}</span>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
                      <MapPin className="w-4 h-4" />
                      Zona {i + 1}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] mb-4 sm:mb-5 hidden md:block">
                      {zone.name}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{zone.description}</p>

                    {zone.highlights && zone.highlights.length > 0 && (
                      <div className="mb-6 sm:mb-8">
                        <h4 className="font-bold text-[#1C1917] text-xs uppercase tracking-widest mb-3 sm:mb-4">
                          Destacados
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {zone.highlights.map((h, j) => {
                            const Icon = HIGHLIGHT_ICONS[j % HIGHLIGHT_ICONS.length];
                            return (
                              <li key={j} className="flex items-start gap-3 text-slate-700 text-sm">
                                <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Icon className="w-3.5 h-3.5 text-[#1C1917]" />
                                </div>
                                {h}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    <Link
                      href="/reservar"
                      className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#1C1917] text-white font-bold text-sm px-5 sm:px-6 py-3 rounded-2xl transition-colors w-fit"
                    >
                      Reservar desde aquí <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
