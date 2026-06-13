import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetReservation, useCancelReservation, getGetReservationQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Search, MapPin, Car, Users, Calendar, Plane, FileText,
  CheckCircle, XCircle, AlertTriangle, Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
    confirmed: { label: "Confirmada", cls: "bg-[#D4AF37]/15 text-[#1C1917] border-[#D4AF37]/30", icon: CheckCircle },
    cancelled: { label: "Cancelada", cls: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
    pending: { label: "Pendiente", cls: "bg-amber-50 text-amber-700 border-amber-200", icon: AlertTriangle },
  };
  const info = map[status] ?? { label: status, cls: "bg-slate-50 text-slate-700 border-slate-200", icon: AlertTriangle };
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-bold ${info.cls}`}>
      <Icon className="w-3.5 h-3.5" /> {info.label}
    </span>
  );
}

function formatDateTime(dt: string) {
  try {
    return new Date(dt).toLocaleString("es-MX", {
      weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch { return dt; }
}

export default function MiReserva() {
  const [inputCode, setInputCode] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const queryClient = useQueryClient();

  const { data: reservation, isLoading, isError } = useGetReservation(
    searchCode,
    { query: { enabled: !!searchCode, queryKey: getGetReservationQueryKey(searchCode) } }
  );
  const cancelReservation = useCancelReservation();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchCode(inputCode.trim().toUpperCase());
  }

  function handleCancel() {
    if (!reservation) return;
    cancelReservation.mutate(
      { confirmationCode: reservation.confirmationCode },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetReservationQueryKey(searchCode) }) }
    );
  }

  return (
    <div className="w-full min-h-screen font-['Poppins']">
      {/* Header */}
      <div
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h1 className="font-['Unbounded'] text-4xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight">Mi Reserva</h1>
          <p className="text-white/65 text-lg">Consulta el estado de tu traslado con tu código de confirmación</p>
        </div>
      </div>

      <div className="bg-[#FAFAF9] py-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSearch}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8"
          >
            <label className="block text-sm font-bold text-[#1C1917] mb-3">
              Código de Confirmación
            </label>
            <div className="flex gap-3">
              <Input
                data-testid="input-confirmation-code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Ej. CSR-DEMO1"
                className="h-13 font-mono tracking-wider text-lg flex-1 rounded-2xl border-slate-200 focus:border-[#D4AF37]"
              />
              <button
                data-testid="btn-search-reservation"
                type="submit"
                disabled={!inputCode.trim()}
                className="flex items-center gap-2 bg-[#111111] hover:bg-[#1C1917] text-white font-bold px-6 py-3.5 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4" /> Buscar
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-3">Formato: CSR-XXXXXX (recibido al confirmar tu reserva)</p>
          </motion.form>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-16">
                <Loader2 className="w-10 h-10 text-[#D4AF37] animate-spin" />
              </motion.div>
            )}

            {isError && !isLoading && (
              <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center"
              >
                <XCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <h3 className="font-black text-red-700 text-xl mb-1">Reserva no encontrada</h3>
                <p className="text-red-500 text-sm">Verifica tu código de confirmación e intenta nuevamente.</p>
              </motion.div>
            )}

            {reservation && !isLoading && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  {/* Top */}
                  <div
                    className="text-white px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
                  >
                    <div>
                      <p className="text-white/45 text-xs uppercase tracking-widest mb-1">Código de Confirmación</p>
                      <p data-testid="result-confirmation-code" className="font-mono font-black text-3xl text-[#D4AF37] tracking-widest">
                        {reservation.confirmationCode}
                      </p>
                    </div>
                    <StatusBadge status={reservation.status} />
                  </div>

                  <div className="p-8 space-y-6">
                    {/* Route */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "ORIGEN", zone: reservation.originZone, addr: reservation.pickupAddress, color: "text-[#1C1917]" },
                        { label: "DESTINO", zone: reservation.destinationZone, addr: reservation.dropoffAddress, color: "text-[#D4AF37]" },
                      ].map((item) => (
                        <div key={item.label} className="bg-slate-50 rounded-2xl p-4">
                          <div className={`flex items-center gap-1.5 text-xs font-bold mb-2 ${item.color}`}>
                            <MapPin className="w-3 h-3" /> {item.label}
                          </div>
                          <div className="font-bold text-slate-900 text-sm">{item.zone?.name ?? "—"}</div>
                          <div className="text-slate-400 text-xs mt-1 line-clamp-2">{item.addr}</div>
                        </div>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {[
                        { icon: Calendar, label: "Fecha y Hora", val: formatDateTime(reservation.pickupDatetime) },
                        { icon: Car, label: "Vehículo", val: reservation.vehicle?.name },
                        { icon: Users, label: "Pasajeros", val: reservation.passengerCount },
                        ...(reservation.flightNumber ? [{ icon: Plane, label: "Vuelo", val: reservation.flightNumber }] : []),
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-3">
                          <item.icon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-slate-400 text-xs">{item.label}</div>
                            <div className="font-bold text-slate-900">{item.val}</div>
                          </div>
                        </div>
                      ))}
                      {reservation.specialRequests && (
                        <div className="flex items-start gap-3 sm:col-span-2">
                          <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <div className="text-slate-400 text-xs">Solicitudes</div>
                            <div className="font-medium text-slate-900">{reservation.specialRequests}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Passenger */}
                    <div className="bg-slate-50 rounded-2xl p-5">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Pasajero Principal</div>
                      <div className="font-black text-slate-900">{reservation.passengerName}</div>
                      <div className="text-slate-500 text-sm mt-0.5">{reservation.passengerEmail} · {reservation.passengerPhone}</div>
                    </div>

                    {/* Price & Cancel */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                      <div>
                        <div className="text-slate-400 text-xs mb-1">Total a pagar al chofer</div>
                        <div data-testid="result-total-price" className="text-4xl font-black text-[#1C1917]">
                          ${reservation.totalPriceUsd} <span className="text-sm text-slate-400 font-normal">USD</span>
                        </div>
                      </div>

                      {reservation.status === "confirmed" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button data-testid="btn-cancel-reservation" className="flex items-center gap-2 border-2 border-red-200 text-red-600 hover:bg-red-50 font-bold px-5 py-3 rounded-2xl transition-colors text-sm">
                              <XCircle className="w-4 h-4" /> Cancelar Reserva
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-3xl font-['Poppins']">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-black text-[#1C1917]">Cancelar Reserva</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción es irreversible. Tu traslado {reservation.confirmationCode} será cancelado. ¿Deseas continuar?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl">No, conservar</AlertDialogCancel>
                              <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700 rounded-xl">
                                {cancelReservation.isPending ? "Cancelando..." : "Confirmar Cancelación"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
