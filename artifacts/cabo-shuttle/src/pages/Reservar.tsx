import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useListZones, useListVehicles, useListPricing,
  useCreateReservation, getListReservationsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  MapPin, Car, User, CheckCircle, ArrowRight, ArrowLeft,
  Clock, Phone, Mail, Plane, FileText, Users, AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const step2Schema = z.object({
  pickupAddress: z.string().min(5, "Ingresa una dirección de recogida válida"),
  dropoffAddress: z.string().min(5, "Ingresa una dirección de destino válida"),
  pickupDatetime: z.string().min(1, "Selecciona fecha y hora"),
  passengerCount: z.number().min(1).max(20),
  flightNumber: z.string().optional(),
  specialRequests: z.string().optional(),
});

const step3Schema = z.object({
  passengerName: z.string().min(2, "Ingresa tu nombre completo"),
  passengerEmail: z.string().email("Correo electrónico inválido"),
  passengerPhone: z.string().min(7, "Teléfono inválido"),
});

type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const inputCls = "h-12 rounded-xl border-slate-200 focus:border-[#D4AF37] focus:ring-[#111111]/20 font-['Poppins']";

export default function Reservar() {
  const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [originId, setOriginId] = useState(urlParams.get("origin") || "");
  const [destId, setDestId] = useState(urlParams.get("dest") || "");
  const [vehicleId, setVehicleId] = useState(urlParams.get("vehicle") || "");
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [confirmed, setConfirmed] = useState<{ code: string; price: number } | null>(null);

  const queryClient = useQueryClient();
  const { data: zones } = useListZones();
  const { data: vehicles } = useListVehicles();
  const { data: pricingData } = useListPricing(
    { originZoneId: originId ? Number(originId) : undefined, destinationZoneId: destId ? Number(destId) : undefined, vehicleId: vehicleId ? Number(vehicleId) : undefined },
    { query: { enabled: !!originId && !!destId && !!vehicleId } }
  );

  const currentPrice = pricingData?.[0];
  const createReservation = useCreateReservation();
  const form2 = useForm<Step2Data>({ resolver: zodResolver(step2Schema), defaultValues: { passengerCount: 1 } });
  const form3 = useForm<Step3Data>({ resolver: zodResolver(step3Schema), defaultValues: { passengerName: "", passengerEmail: "", passengerPhone: "" } });

  const selectedOrigin = zones?.find((z) => z.id.toString() === originId);
  const selectedDest = zones?.find((z) => z.id.toString() === destId);
  const selectedVehicle = vehicles?.find((v) => v.id.toString() === vehicleId);

  const goNext = () => { setDir(1); setStep((s) => s + 1); };
  const goBack = () => { setDir(-1); setStep((s) => s - 1); };

  async function onStep3Submit(data: Step3Data) {
    if (!step2Data || !currentPrice) return;
    createReservation.mutate(
      { data: { ...data, ...step2Data, originZoneId: Number(originId), destinationZoneId: Number(destId), vehicleId: Number(vehicleId), passengerCount: step2Data.passengerCount } },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: getListReservationsQueryKey() });
          setConfirmed({ code: res.confirmationCode, price: res.totalPriceUsd });
          setDir(1); setStep(4);
        },
      }
    );
  }

  const steps = [
    { num: 1, label: "Ruta y Vehiculo", icon: MapPin },
    { num: 2, label: "Detalles del Viaje", icon: Car },
    { num: 3, label: "Datos del Pasajero", icon: User },
  ];

  // Shared summary card
  const SummaryCard = ({ extra }: { extra?: React.ReactNode }) => (
    <div
      className="text-white rounded-3xl p-7 sticky top-24 shadow-2xl font-['Poppins']"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
    >
      <h3 className="font-bold text-base mb-5 text-white/80">Tu Seleccion</h3>
      <div className="space-y-3 text-sm mb-6">
        {[
          { label: "De", val: selectedOrigin?.name },
          { label: "A", val: selectedDest?.name },
          { label: "Vehiculo", val: selectedVehicle?.name },
        ].map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-white/45 text-xs">{item.label}</span>
            <span className="font-semibold">{item.val || "—"}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15 pt-5 mb-6">
        {currentPrice ? (
          <div className="text-4xl font-black text-[#D4AF37]">
            ${currentPrice.priceUsd} <span className="text-sm text-white/45 font-normal">USD</span>
          </div>
        ) : (
          <div className="text-white/30 text-xl font-bold">Selecciona ruta</div>
        )}
      </div>
      {extra}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#FAFAF9] font-['Poppins']">
      {/* Header */}
      <div
        className="relative pt-32 pb-16 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-['Unbounded'] text-4xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight">Reserva tu Traslado</h1>
          <p className="text-white/65 text-lg">Proceso rapido y seguro en 3 pasos</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        {/* Progress Steps */}
        {step < 4 && (
          <div className="flex items-center justify-center py-10 gap-0">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                  step === s.num ? "bg-[#111111] text-white shadow-lg" :
                  step > s.num ? "bg-[#D4AF37] text-[#111111]" :
                  "bg-white text-slate-400 border border-slate-200"
                }`}>
                  <s.icon className="w-4 h-4" />
                  <span className="text-sm font-bold hidden sm:block">{s.label}</span>
                  <span className="text-sm font-bold sm:hidden">{s.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ${step > s.num ? "bg-[#D4AF37]" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {[
                    { label: "Zona de Origen", state: originId, setter: setOriginId, accent: false },
                    { label: "Zona de Destino", state: destId, setter: setDestId, accent: true },
                  ].map(({ label, state, setter, accent }) => (
                    <div key={label} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                      <h3 className="font-bold text-[#1C1917] mb-4 flex items-center gap-2">
                        <MapPin className={`w-5 h-5 ${accent ? "text-[#D4AF37]" : "text-[#1C1917]"}`} /> {label}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {zones?.map((zone) => (
                          <button key={zone.id} onClick={() => setter(zone.id.toString())}
                            disabled={accent && originId === zone.id.toString()}
                            className={`text-left p-4 rounded-2xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                              state === zone.id.toString()
                                ? accent ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#1C1917]" : "border-[#D4AF37] bg-[#D4AF37]/8"
                                : "border-slate-100 hover:border-slate-200"
                            }`}>
                            <div className="font-semibold text-slate-900 text-sm">{zone.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-[#1C1917] mb-4 flex items-center gap-2">
                      <Car className="w-5 h-5 text-[#1C1917]" /> Vehiculo
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {vehicles?.map((v) => (
                        <button key={v.id} onClick={() => setVehicleId(v.id.toString())}
                          className={`text-left p-4 rounded-2xl border-2 transition-all ${
                            vehicleId === v.id.toString() ? "border-[#D4AF37] bg-[#D4AF37]/8" : "border-slate-100 hover:border-slate-200"
                          }`}>
                          <div className="font-bold text-slate-900">{v.name}</div>
                          <div className="text-slate-400 text-xs mt-1 flex items-center gap-1">
                            <Users className="w-3 h-3" /> Hasta {v.capacity} pasajeros
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <SummaryCard extra={
                  <button data-testid="btn-next-step1" disabled={!currentPrice} onClick={goNext}
                    className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black py-4 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Continuar <ArrowRight className="w-4 h-4" />
                  </button>
                } />
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div key="step2" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <form onSubmit={form2.handleSubmit((d) => { setStep2Data(d); goNext(); })}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-5">
                      <h3 className="font-bold text-[#1C1917] text-lg">Detalles del Traslado</h3>

                      <div className="space-y-2">
                        <Label>Dirección de Recogida *</Label>
                        <Input placeholder="Ej. Aeropuerto Int. Los Cabos, Terminal 1" {...form2.register("pickupAddress")} className={inputCls} />
                        {form2.formState.errors.pickupAddress && <p className="text-red-500 text-xs">{form2.formState.errors.pickupAddress.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label>Dirección de Entrega *</Label>
                        <Input placeholder="Ej. Hotel Cabo Villas, Blvd. Marina 32" {...form2.register("dropoffAddress")} className={inputCls} />
                        {form2.formState.errors.dropoffAddress && <p className="text-red-500 text-xs">{form2.formState.errors.dropoffAddress.message}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Fecha y Hora *</Label>
                          <Input type="datetime-local" {...form2.register("pickupDatetime")} className={inputCls} />
                          {form2.formState.errors.pickupDatetime && <p className="text-red-500 text-xs">{form2.formState.errors.pickupDatetime.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label>Pasajeros *</Label>
                          <Input type="number" min={1} max={selectedVehicle?.capacity ?? 20} {...form2.register("passengerCount", { valueAsNumber: true })} className={inputCls} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1"><Plane className="w-3 h-3" /> Número de Vuelo <span className="text-slate-400 text-xs">(opcional)</span></Label>
                        <Input placeholder="Ej. AM 456" {...form2.register("flightNumber")} className={inputCls} />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1"><FileText className="w-3 h-3" /> Solicitudes Especiales <span className="text-slate-400 text-xs">(opcional)</span></Label>
                        <Textarea placeholder="Ej. Silla para bebé, parada adicional..." {...form2.register("specialRequests")} rows={3} className="rounded-xl font-['Poppins']" />
                      </div>
                    </div>
                  </div>

                  <SummaryCard extra={
                    <div className="flex gap-2">
                      <button type="button" onClick={goBack} className="flex-1 flex items-center justify-center bg-white/10 border border-white/20 text-white py-3.5 rounded-2xl hover:bg-white/15 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button data-testid="btn-next-step2" type="submit" className="flex-1 flex items-center justify-center gap-1 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black py-3.5 rounded-2xl transition-all">
                        Continuar <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  } />
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div key="step3" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <form onSubmit={form3.handleSubmit(onStep3Submit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-5">
                      <h3 className="font-bold text-[#1C1917] text-lg">Datos del Pasajero Principal</h3>

                      <div className="space-y-2">
                        <Label>Nombre Completo *</Label>
                        <Input data-testid="input-passenger-name" placeholder="Juan García López" {...form3.register("passengerName")} className={inputCls} />
                        {form3.formState.errors.passengerName && <p className="text-red-500 text-xs">{form3.formState.errors.passengerName.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1"><Mail className="w-3 h-3" /> Correo Electrónico *</Label>
                        <Input data-testid="input-passenger-email" type="email" placeholder="correo@ejemplo.com" {...form3.register("passengerEmail")} className={inputCls} />
                        {form3.formState.errors.passengerEmail && <p className="text-red-500 text-xs">{form3.formState.errors.passengerEmail.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1"><Phone className="w-3 h-3" /> Teléfono *</Label>
                        <Input data-testid="input-passenger-phone" placeholder="+52 624 123 4567" {...form3.register("passengerPhone")} className={inputCls} />
                        {form3.formState.errors.passengerPhone && <p className="text-red-500 text-xs">{form3.formState.errors.passengerPhone.message}</p>}
                      </div>

                      {createReservation.isError && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          Ocurrió un error al procesar tu reserva. Intenta nuevamente.
                        </div>
                      )}
                    </div>
                  </div>

                  <SummaryCard extra={
                    <div className="flex gap-2">
                      <button type="button" onClick={goBack} className="flex-1 flex items-center justify-center bg-white/10 border border-white/20 text-white py-3.5 rounded-2xl hover:bg-white/15 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button data-testid="btn-submit-reservation" type="submit" disabled={createReservation.isPending}
                        className="flex-1 flex items-center justify-center gap-1 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black py-3.5 rounded-2xl transition-all disabled:opacity-60">
                        {createReservation.isPending ? "Procesando..." : <><CheckCircle className="w-4 h-4" /> Confirmar</>}
                      </button>
                    </div>
                  } />
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4 – Confirmation */}
          {step === 4 && confirmed && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="max-w-xl mx-auto text-center">
                <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h2 className="text-4xl font-black text-[#1C1917] mb-4">Reserva Confirmada</h2>
                <p className="text-slate-500 text-lg mb-8">Tu traslado ha sido reservado exitosamente.</p>

                <div
                  className="text-white rounded-3xl p-8 mb-8 text-center"
                  style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
                >
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Código de Confirmación</p>
                  <p className="font-mono font-black text-4xl text-[#D4AF37] tracking-widest mb-4">{confirmed.code}</p>
                  <p className="text-white/50 text-sm mb-1">Total a pagar al chofer</p>
                  <p className="text-5xl font-black text-white">${confirmed.price} <span className="text-lg text-white/45 font-normal">USD</span></p>
                </div>

                <p className="text-slate-500 text-sm mb-8">Guarda tu código. Lo necesitarás para consultar o cancelar tu reserva en Mi Reserva.</p>

                <div className="flex gap-4 justify-center">
                  <Link href="/" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3.5 rounded-2xl transition-colors">
                    Volver al Inicio
                  </Link>
                  <Link href="/mi-reserva" className="flex items-center gap-2 bg-[#111111] hover:bg-[#1C1917] text-white font-bold px-6 py-3.5 rounded-2xl transition-colors">
                    Ver Mi Reserva <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
