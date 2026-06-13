import { useState } from "react";
import { useLocation } from "wouter";
import { useListZones, useListVehicles, useListPricing } from "@workspace/api-client-react";
import { ArrowRight, MapPin, Car, Clock } from "lucide-react";

export default function BookingWidget() {
  const [, setLocation] = useLocation();
  const { data: zones } = useListZones();
  const { data: vehicles } = useListVehicles();

  const [originId, setOriginId] = useState("");
  const [destId, setDestId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  const { data: pricingData } = useListPricing(
    {
      originZoneId: originId ? parseInt(originId) : undefined,
      destinationZoneId: destId ? parseInt(destId) : undefined,
      vehicleId: vehicleId ? parseInt(vehicleId) : undefined,
    },
    { query: { enabled: !!originId && !!destId && !!vehicleId } }
  );

  const currentPrice = pricingData?.[0];

  const handleBook = () => {
    const params = new URLSearchParams();
    if (originId) params.append("origin", originId);
    if (destId) params.append("dest", destId);
    if (vehicleId) params.append("vehicle", vehicleId);
    setLocation(`/reservar?${params.toString()}`);
  };

  const selectCls =
    "w-full bg-white/8 border border-white/20 text-white rounded-2xl px-4 py-3.5 text-sm font-medium appearance-none focus:outline-none focus:border-[#D4AF37] transition-colors";

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-3xl p-6 md:p-8 font-['Poppins']"
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Origen
          </label>
          <div className="relative">
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className={selectCls}
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <option value="" style={{ background: "#111111" }}>
                ¿Dónde te recogemos?
              </option>
              {zones?.map((z) => (
                <option key={z.id} value={z.id.toString()} style={{ background: "#111111" }}>
                  {z.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Destino
          </label>
          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className={selectCls}
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <option value="" style={{ background: "#111111" }}>
              ¿A dónde vas?
            </option>
            {zones?.map((z) => (
              <option key={z.id} value={z.id.toString()} style={{ background: "#111111" }}>
                {z.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
            <Car className="w-3.5 h-3.5 text-[#D4AF37]" /> Vehículo
          </label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className={selectCls}
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <option value="" style={{ background: "#111111" }}>
              Elige tu transporte
            </option>
            {vehicles?.map((v) => (
              <option key={v.id} value={v.id.toString()} style={{ background: "#111111" }}>
                {v.name} (Máx {v.capacity})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/10">
        <div>
          {currentPrice ? (
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">
                Tarifa Estimada
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#D4AF37]">
                  ${currentPrice.priceUsd}
                </span>
                <span className="text-white/50 text-sm">USD</span>
              </div>
              {currentPrice.durationMinutes && (
                <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentPrice.durationMinutes} min de viaje
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-white/50 text-sm">Selecciona origen, destino y vehículo</p>
              <p className="text-white/25 text-lg font-semibold">para ver la tarifa</p>
            </div>
          )}
        </div>

        <button
          onClick={handleBook}
          disabled={!originId || !destId || !vehicleId}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-bold text-base px-8 py-4 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] shadow-[0_0_24px_rgba(212,175,55,0.3)]"
        >
          Continuar Reserva <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
