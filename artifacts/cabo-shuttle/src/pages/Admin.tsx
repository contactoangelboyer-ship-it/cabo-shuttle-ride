import { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetReservationStats, useListReservations, getListReservationsQueryKey,
} from "@workspace/api-client-react";
import {
  BarChart3, DollarSign, CheckCircle, XCircle, Calendar,
  TrendingUp, MapPin, Car, Users, Clock, Loader2,
} from "lucide-react";

type StatusFilter = "all" | "confirmed" | "cancelled" | "pending";

function StatCard({ label, value, sub, icon: Icon, gradient }: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:-translate-y-0.5 transition-transform"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${gradient}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="text-3xl font-black text-[#1C1917] mb-1">{value}</div>
      <div className="text-slate-500 text-sm font-medium">{label}</div>
      {sub && <div className="text-slate-400 text-xs mt-1">{sub}</div>}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-[#D4AF37]/15 text-[#1C1917]",
    cancelled: "bg-red-50 text-red-700",
    pending: "bg-amber-50 text-amber-700",
  };
  const labels: Record<string, string> = {
    confirmed: "Confirmada", cancelled: "Cancelada", pending: "Pendiente",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${map[status] ?? "bg-slate-100 text-slate-600"}`}>
      {labels[status] ?? status}
    </span>
  );
}

function formatDate(dt: string) {
  try {
    return new Date(dt).toLocaleString("es-MX", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch { return dt; }
}

export default function Admin() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const { data: stats, isLoading: statsLoading } = useGetReservationStats();
  const { data: reservations, isLoading: resLoading } = useListReservations(
    statusFilter !== "all" ? { status: statusFilter } : {},
    { query: { queryKey: getListReservationsQueryKey(statusFilter !== "all" ? { status: statusFilter } : {}) } }
  );

  const filters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "confirmed", label: "Confirmadas" },
    { key: "cancelled", label: "Canceladas" },
    { key: "pending", label: "Pendientes" },
  ];

  return (
    <div className="w-full min-h-screen font-['Poppins']">
      {/* Header */}
      <div
        className="relative pt-32 pb-16 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-white text-xs font-semibold">Panel Administrativo</span>
          </div>
          <h1 className="font-['Unbounded'] text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">Panel de Administracion</h1>
          <p className="text-white/60">Resumen de reservas y actividad de Cabo Shuttle Ride</p>
        </div>
      </div>

      <div className="bg-[#FAFAF9] py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Stats */}
          {statsLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" /></div>
          ) : stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              <StatCard label="Total Reservas" value={stats.total} icon={BarChart3} gradient="bg-[#111111]" />
              <StatCard label="Confirmadas" value={stats.confirmed} icon={CheckCircle} gradient="bg-[#1C1917]" />
              <StatCard label="Canceladas" value={stats.cancelled} icon={XCircle} gradient="bg-red-500" />
              <StatCard label="Hoy" value={stats.todayBookings} sub="Reservas del día" icon={Calendar} gradient="bg-amber-500" />
              <StatCard
                label="Ingresos Totales"
                value={`$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0 })} USD`}
                icon={DollarSign}
                gradient="bg-emerald-600"
              />
              {stats.popularRoute && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="text-white rounded-3xl p-6 col-span-2 md:col-span-2 lg:col-span-3"
                  style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Ruta Más Popular</span>
                  </div>
                  <div className="text-xl font-black text-[#D4AF37]">{stats.popularRoute}</div>
                </motion.div>
              )}
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-7 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-black text-[#1C1917] text-lg">Reservas</h2>
              <div className="flex gap-2 flex-wrap">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    data-testid={`filter-${f.key}`}
                    onClick={() => setStatusFilter(f.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                      statusFilter === f.key
                        ? "bg-[#111111] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {resLoading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" /></div>
            ) : !reservations || reservations.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <div className="font-bold">Sin reservas</div>
                <div className="text-sm">No hay reservas con este filtro</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <th className="px-5 py-3.5 text-left">Código</th>
                      <th className="px-5 py-3.5 text-left">Pasajero</th>
                      <th className="px-5 py-3.5 text-left hidden lg:table-cell">Ruta</th>
                      <th className="px-5 py-3.5 text-left hidden md:table-cell">Vehículo</th>
                      <th className="px-5 py-3.5 text-left hidden xl:table-cell">Fecha</th>
                      <th className="px-5 py-3.5 text-left">Estado</th>
                      <th className="px-5 py-3.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {reservations?.map((r, i) => (
                      <motion.tr
                        key={r.id}
                        data-testid={`reservation-row-${r.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="px-5 py-4 font-mono font-black text-[#D4AF37] text-xs bg-[#D4AF37]/6 rounded-l">
                          {r.confirmationCode}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{r.passengerName}</div>
                          <div className="text-slate-400 text-xs">{r.passengerEmail}</div>
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-slate-500 text-xs">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" />
                            <span className="max-w-24 truncate">{r.originZone?.name}</span>
                            <span className="text-slate-300 mx-1">→</span>
                            <span className="max-w-24 truncate">{r.destinationZone?.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-1 text-slate-500 text-xs">
                            <Car className="w-3 h-3" /> {r.vehicle?.name}
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                            <Users className="w-3 h-3" /> {r.passengerCount} pax
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden xl:table-cell">
                          <div className="flex items-center gap-1 text-slate-500 text-xs">
                            <Clock className="w-3 h-3" /> {formatDate(r.pickupDatetime)}
                          </div>
                        </td>
                        <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
                        <td className="px-5 py-4 text-right font-black text-[#1C1917]">${r.totalPriceUsd}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
