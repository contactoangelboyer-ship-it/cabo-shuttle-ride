import { useState } from "react";
import { useLocation } from "wouter";
import { useListZones, useListVehicles, useListPricing } from "@workspace/api-client-react";
import { ArrowRight, MapPin, Car, Clock } from "lucide-react";

const GOLD = "#C8971A";

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
    "w-full border text-white rounded-xl px-4 py-3.5 text-sm font-medium appearance-none focus:outline-none transition-colors font-sans";

  const selectStyle = {
    background: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.18)",
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-2xl p-5 md:p-7 font-sans"
      style={{
        background: "rgba(11,22,40,0.75)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} /> Origen
          </label>
          <select
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="" style={{ background: "#0B1628" }}>¿Dónde te recogemos?</option>
            {zones?.map((z) => (
              <option key={z.id} value={z.id.toString()} style={{ background: "#0B1628" }}>{z.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>
            <MapPin className="w-3.5 h-3.5" style={{ color: GOLD }} /> Destino
          </label>
          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="" style={{ background: "#0B1628" }}>¿A dónde vas?</option>
            {zones?.map((z) => (
              <option key={z.id} value={z.id.toString()} style={{ background: "#0B1628" }}>{z.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Car className="w-3.5 h-3.5" style={{ color: GOLD }} /> Vehículo
          </label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className={selectCls}
            style={selectStyle}
          >
            <option value="" style={{ background: "#0B1628" }}>Elige tu transporte</option>
            {vehicles?.map((v) => (
              <option key={v.id} value={v.id.toString()} style={{ background: "#0B1628" }}>
                {v.name} (Máx {v.capacity})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="min-h-[52px]">
          {currentPrice ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                Tarifa Estimada
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold" style={{ color: GOLD }}>
                  ${currentPrice.priceUsd}
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>USD</span>
              </div>
              {currentPrice.durationMinutes && (
                <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <Clock className="w-3 h-3" />
                  {currentPrice.durationMinutes} min de viaje
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Selecciona origen, destino y vehículo</p>
              <p className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.2)" }}>para ver la tarifa</p>
            </div>
          )}
        </div>

        <button
          onClick={handleBook}
          disabled={!originId || !destId || !vehicleId}
          className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: GOLD,
            color: "#ffffff",
            boxShadow: "0 4px 20px rgba(200,151,26,0.35)",
          }}
        >
          Continuar Reserva <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
