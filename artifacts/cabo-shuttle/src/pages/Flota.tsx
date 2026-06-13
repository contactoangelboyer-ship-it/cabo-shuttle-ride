import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, Wifi, Wind, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useListVehicles } from "@workspace/api-client-react";

const VEHICLE_IMAGES: Record<string, string> = {
  "sedan": "/images/vehiculo-sedan.png",
  "suv": "/images/vehiculo-suv.png",
  "van": "/images/vehiculo-van.png",
  "sprinter": "/images/vehiculo-sprinter.png",
};

const AMENITY_ICONS: Record<string, React.ElementType> = {
  WiFi: Wifi,
  "A/C": Wind,
  Seguro: Shield,
};

export default function Flota() {
  const { data: vehicles, isLoading } = useListVehicles();

  return (
    <div className="w-full font-['Poppins']">
      {/* Header */}
      <div
        className="relative pt-32 pb-20 px-6 overflow-hidden"
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
              4 Vehiculos Disponibles
            </span>
          </div>
          <h1 className="font-['Unbounded'] text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">Nuestra Flota</h1>
          <p className="text-xl text-white/70 max-w-xl mx-auto">
            Vehiculos premium de ultimo modelo. Mantenidos meticulosamente para tu comodidad y seguridad.
          </p>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="bg-[#FAFAF9] py-20">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div
                className="w-12 h-12 rounded-full border-4 animate-spin"
                style={{ borderTopColor: "#D4AF37", borderColor: "rgba(212,175,55,0.2)", borderTopStyle: "solid" }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {vehicles?.map((vehicle, i) => {
                const imgKey = Object.keys(VEHICLE_IMAGES).find((k) =>
                  vehicle.slug?.includes(k) || vehicle.name.toLowerCase().includes(k)
                );
                const imgSrc = imgKey ? VEHICLE_IMAGES[imgKey] : vehicle.imageUrl;

                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300 group"
                  >
                    <div className="relative h-56 md:h-72 overflow-hidden bg-slate-100">
                      <img
                        src={imgSrc || ""}
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Capacity badge */}
                      <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#111111] px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg">
                        <Users className="w-3.5 h-3.5" />
                        Hasta {vehicle.capacity} pax
                      </div>
                      {/* Gradient overlay at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
                    </div>

                    <div className="p-8">
                      <h2 className="text-2xl font-black text-[#1C1917] mb-2">{vehicle.name}</h2>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{vehicle.description}</p>

                      {vehicle.amenities && vehicle.amenities.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {vehicle.amenities.map((amenity, j) => {
                            const Icon = AMENITY_ICONS[amenity] || CheckCircle;
                            return (
                              <div
                                key={j}
                                className="flex items-center gap-2 text-sm text-slate-600 font-medium"
                              >
                                <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-3.5 h-3.5 text-[#1C1917]" />
                                </div>
                                {amenity}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <Link
                        href={`/reservar?vehicle=${vehicle.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-[#111111] hover:bg-[#1C1917] text-white font-bold py-4 rounded-2xl transition-colors group/btn"
                      >
                        Reservar {vehicle.name}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
