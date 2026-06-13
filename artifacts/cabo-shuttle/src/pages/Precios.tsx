import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useListZones, useListVehicles, useListPricing } from "@workspace/api-client-react";
import { MapPin, Car, ArrowRight, Clock, Info } from "lucide-react";

export default function Precios() {
  const { data: zones } = useListZones();
  const { data: vehicles } = useListVehicles();

  const [originId, setOriginId] = useState("");
  const [destId, setDestId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const { data: pricingData, isLoading: isPricingLoading } = useListPricing(
    {
      originZoneId: originId ? parseInt(originId) : undefined,
      destinationZoneId: destId ? parseInt(destId) : undefined,
      vehicleId: vehicleId ? parseInt(vehicleId) : undefined,
    },
    { query: { enabled: !!originId && !!destId && !!vehicleId } }
  );

  const currentPrice = pricingData?.[0];

  const zoneTile = (id: string, active: boolean, onClick: () => void, accent?: boolean) => (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-2xl border-2 transition-all font-['Poppins'] ${
        active
          ? accent
            ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#1C1917]"
            : "border-[#D4AF37] bg-[#D4AF37]/8 text-[#1C1917]"
          : "border-slate-100 hover:border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      <div className="font-bold text-sm">{zones?.find((z) => z.id.toString() === id)?.name}</div>
    </button>
  );

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
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-white text-xs font-semibold uppercase tracking-wider">
              Precios Transparentes
            </span>
          </div>
          <h1 className="font-['Unbounded'] text-4xl md:text-5xl font-black text-white mb-5 uppercase tracking-tight">Cotiza tu Viaje</h1>
          <p className="text-white/70 text-lg">
            Sin sorpresas ni cargos ocultos. Selecciona tu ruta y vehiculo para ver la tarifa exacta.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="bg-[#FAFAF9] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Origin */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-[#1C1917] mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" /> Origen
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {zones?.map((zone) => (
                    <button
                      key={`origin-${zone.id}`}
                      onClick={() => setOriginId(zone.id.toString())}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        originId === zone.id.toString()
                          ? "border-[#D4AF37] bg-[#D4AF37]/8 text-[#1C1917]"
                          : "border-slate-100 hover:border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <div className="font-bold text-sm">{zone.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-[#1C1917] mb-5 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" /> Destino
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {zones?.map((zone) => (
                    <button
                      key={`dest-${zone.id}`}
                      onClick={() => setDestId(zone.id.toString())}
                      disabled={originId === zone.id.toString()}
                      className={`text-left p-4 rounded-2xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                        destId === zone.id.toString()
                          ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#1C1917]"
                          : "border-slate-100 hover:border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <div className="font-bold text-sm">{zone.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-[#1C1917] mb-5 flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#D4AF37]" /> Vehiculo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicles?.map((vehicle) => (
                    <button
                      key={`vehicle-${vehicle.id}`}
                      onClick={() => setVehicleId(vehicle.id.toString())}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        vehicleId === vehicle.id.toString()
                          ? "border-[#D4AF37] bg-[#D4AF37]/8"
                          : "border-slate-100 hover:border-slate-200 bg-white"
                      }`}
                    >
                      <div className="font-bold text-slate-900 mb-1">{vehicle.name}</div>
                      <div className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg inline-block">
                        Max {vehicle.capacity} pax
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="lg:col-span-1">
              <div
                className="text-white rounded-3xl p-8 sticky top-24 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
              >
                <h3 className="text-lg font-bold mb-6 text-white/90">Resumen de Tarifa</h3>

                <div className="space-y-4 mb-8">
                  {[
                    { label: "Origen", val: zones?.find((z) => z.id.toString() === originId)?.name },
                    { label: "Destino", val: zones?.find((z) => z.id.toString() === destId)?.name },
                    { label: "Vehiculo", val: vehicles?.find((v) => v.id.toString() === vehicleId)?.name },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-white/45 text-xs mb-0.5">{item.label}</span>
                      <span className="font-semibold text-sm">{item.val || "—"}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/15 pt-6 mb-8">
                  <span className="text-white/45 text-xs block mb-2">Precio Total (USD)</span>
                  {isPricingLoading ? (
                    <div className="h-12 flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
                    </div>
                  ) : currentPrice ? (
                    <>
                      <div className="text-5xl font-black text-[#D4AF37]">
                        ${currentPrice.priceUsd}
                      </div>
                      {currentPrice.durationMinutes && (
                        <div className="flex items-center gap-1.5 text-white/50 text-xs mt-3 bg-white/8 rounded-xl px-3 py-2">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {currentPrice.durationMinutes} min estimados
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-white/30">--</div>
                  )}
                </div>

                {currentPrice ? (
                  <Link
                    href={`/reservar?origin=${originId}&dest=${destId}&vehicle=${vehicleId}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-[0_0_24px_rgba(212,175,55,0.3)]"
                  >
                    Reservar Ahora <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full bg-white/10 text-white/35 font-bold py-4 rounded-2xl cursor-not-allowed"
                  >
                    Selecciona opciones
                  </button>
                )}

                <div className="mt-4 flex items-start gap-2 text-white/35 text-xs">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D4AF37]/60" />
                  Precio final. Sin cargos ocultos. Incluye impuestos y peajes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
