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
  Luggage, Baby, RotateCcw, MessageCircle, Copy,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const step2Schema = z.object({
  tripType: z.enum(["one_way", "round_trip"]),
  pickupAddress: z.string().min(5, "Ingresa una dirección de recogida válida"),
  dropoffAddress: z.string().min(5, "Ingresa una dirección de destino válida"),
  pickupDatetime: z.string().min(1, "Selecciona fecha y hora"),
  returnDatetime: z.string().optional(),
  passengerCount: z.number().min(1).max(20),
  luggageCount: z.number().min(0).max(20),
  childSeats: z.number().min(0).max(5),
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

const inputCls = "h-12 rounded-xl border-slate-200 focus:border-[#D4AF37] focus:ring-[#111111]/20 font-sans text-sm";

export default function Reservar() {
  const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [originId, setOriginId] = useState(urlParams.get("origin") || "");
  const [destId, setDestId] = useState(urlParams.get("dest") || "");
  const [vehicleId, setVehicleId] = useState(urlParams.get("vehicle") || "");
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [confirmed, setConfirmed] = useState<{ code: string; price: number; name: string } | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const queryClient = useQueryClient();
  const { data: zones } = useListZones();
  const { data: vehicles } = useListVehicles();
  const { data: pricingData } = useListPricing(
    { originZoneId: originId ? Number(originId) : undefined, destinationZoneId: destId ? Number(destId) : undefined, vehicleId: vehicleId ? Number(vehicleId) : undefined },
    { query: { enabled: !!originId && !!destId && !!vehicleId } }
  );

  const currentPrice = pricingData?.[0];
  const createReservation = useCreateReservation();
  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { passengerCount: 1, luggageCount: 1, childSeats: 0, tripType: "one_way" },
  });
  const form3 = useForm<Step3Data>({ resolver: zodResolver(step3Schema) });

  const selectedOrigin = zones?.find((z) => z.id.toString() === originId);
  const selectedDest = zones?.find((z) => z.id.toString() === destId);
  const selectedVehicle = vehicles?.find((v) => v.id.toString() === vehicleId);
  const tripType = form2.watch("tripType");

  const goNext = () => { setDir(1); setStep((s) => s + 1); };
  const goBack = () => { setDir(-1); setStep((s) => s - 1); };

  async function onStep3Submit(data: Step3Data) {
    if (!step2Data || !currentPrice) return;
    createReservation.mutate(
      {
        data: {
          ...data,
          ...step2Data,
          originZoneId: Number(originId),
          destinationZoneId: Number(destId),
          vehicleId: Number(vehicleId),
          passengerCount: step2Data.passengerCount,
        },
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: getListReservationsQueryKey() });
          setConfirmed({ code: res.confirmationCode, price: res.totalPriceUsd, name: data.passengerName });
          setDir(1); setStep(4);
        },
      }
    );
  }

  function copyCode() {
    if (confirmed) {
      navigator.clipboard.writeText(confirmed.code).then(() => {
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
      });
    }
  }

  const steps = [
    { num: 1, label: "Ruta y Vehículo", icon: MapPin },
    { num: 2, label: "Detalles del Viaje", icon: Car },
    { num: 3, label: "Datos del Pasajero", icon: User },
  ];

  const SummaryCard = ({ extra }: { extra?: React.ReactNode }) => (
    <div
      className="text-white rounded-3xl p-6 sm:p-7 sticky top-24 shadow-2xl font-sans"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
    >
      <h3 className="font-bold text-sm mb-4 sm:mb-5 text-white/80">Tu Selección</h3>
      <div className="space-y-3 text-sm mb-5 sm:mb-6">
        {[
          { label: "De", val: selectedOrigin?.name },
          { label: "A", val: selectedDest?.name },
          { label: "Vehículo", val: selectedVehicle?.name },
        ].map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-white/45 text-xs">{item.label}</span>
            <span className="font-semibold">{item.val || "—"}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/15 pt-4 sm:pt-5 mb-5 sm:mb-6">
        {currentPrice ? (
          <>
            <div className="text-3xl sm:text-4xl font-black text-[#D4AF37]">
              ${currentPrice.priceUsd} <span className="text-sm text-white/45 font-normal">USD</span>
            </div>
            {currentPrice.durationMinutes && (
              <div className="flex items-center gap-1.5 text-white/45 text-xs mt-2">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                {currentPrice.durationMinutes} min estimados
              </div>
            )}
          </>
        ) : (
          <div className="text-white/30 text-xl font-bold">Selecciona ruta</div>
        )}
      </div>
      {extra}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#FAFAF9] font-sans">
      <div
        className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 px-5 sm:px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight">
            Reserva tu Traslado
          </h1>
          <p className="text-white/65 text-base sm:text-lg">Proceso rápido y seguro en 3 pasos</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
        {step < 4 && (
          <div className="flex items-center justify-center py-8 sm:py-10 gap-0">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all ${
                  step === s.num ? "bg-[#111111] text-white shadow-lg" :
                  step > s.num ? "bg-[#D4AF37] text-[#111111]" :
                  "bg-white text-slate-400 border border-slate-200"
                }`}>
                  <s.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm font-bold hidden xs:block sm:block">{s.label}</span>
                  <span className="text-xs sm:text-sm font-bold xs:hidden sm:hidden">{s.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-5 sm:w-8 h-0.5 ${step > s.num ? "bg-[#D4AF37]" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step1" custom={dir} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                  {[
                    { label: "Zona de Origen", state: originId, setter: setOriginId, accent: false },
                    { label: "Zona de Destino", state: destId, setter: setDestId, accent: true },
                  ].map(({ label, state, setter, accent }) => (
                    <div key={label} className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100">
                      <h3 className="font-bold text-[#1C1917] mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                        <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 ${accent ? "text-[#D4AF37]" : "text-[#1C1917]"}`} /> {label}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {zones?.map((zone) => (
                          <button key={zone.id} onClick={() => setter(zone.id.toString())}
                            disabled={accent && originId === zone.id.toString()}
                            className={`text-left p-3 sm:p-4 rounded-2xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
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

                  <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-[#1C1917] mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                      <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C1917]" /> Vehículo
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {vehicles?.map((v) => (
                        <button key={v.id} onClick={() => setVehicleId(v.id.toString())}
                          className={`text-left p-3 sm:p-4 rounded-2xl border-2 transition-all ${
                            vehicleId === v.id.toString() ? "border-[#D4AF37] bg-[#D4AF37]/8" : "border-slate-100 hover:border-slate-200"
                          }`}>
                          <div className="font-bold text-slate-900 text-sm">{v.name}</div>
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
                    className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black py-3.5 sm:py-4 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                    {/* Trip type */}
                    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100">
                      <h3 className="font-bold text-[#1C1917] text-sm sm:text-base mb-4">Tipo de Viaje</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: "one_way", label: "Solo Ida", icon: ArrowRight },
                          { val: "round_trip", label: "Ida y Vuelta", icon: RotateCcw },
                        ].map((opt) => (
                          <label
                            key={opt.val}
                            className={`flex items-center gap-3 p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                              tripType === opt.val ? "border-[#D4AF37] bg-[#D4AF37]/8" : "border-slate-100 hover:border-slate-200"
                            }`}
                          >
                            <input type="radio" value={opt.val} {...form2.register("tripType")} className="sr-only" />
                            <opt.icon className={`w-4 h-4 ${tripType === opt.val ? "text-[#D4AF37]" : "text-slate-400"}`} />
                            <span className="font-semibold text-slate-900 text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Addresses & datetime */}
                    <div className="bg-white rounded-3xl p-5 sm:p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4 sm:space-y-5">
                      <h3 className="font-bold text-[#1C1917] text-sm sm:text-base">Detalles del Traslado</h3>

                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Dirección de Recogida *</Label>
                        <Input placeholder="Ej. Aeropuerto Int. Los Cabos, Terminal 1" {...form2.register("pickupAddress")} className={inputCls} />
                        {form2.formState.errors.pickupAddress && <p className="text-red-500 text-xs">{form2.formState.errors.pickupAddress.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Dirección de Entrega *</Label>
                        <Input placeholder="Ej. Hotel Cabo Villas, Blvd. Marina 32" {...form2.register("dropoffAddress")} className={inputCls} />
                        {form2.formState.errors.dropoffAddress && <p className="text-red-500 text-xs">{form2.formState.errors.dropoffAddress.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm">Fecha y Hora de Recogida *</Label>
                          <Input type="datetime-local" {...form2.register("pickupDatetime")} className={inputCls} />
                          {form2.formState.errors.pickupDatetime && <p className="text-red-500 text-xs">{form2.formState.errors.pickupDatetime.message}</p>}
                        </div>
                        {tripType === "round_trip" && (
                          <div className="space-y-2">
                            <Label className="text-xs sm:text-sm">Fecha y Hora de Regreso *</Label>
                            <Input type="datetime-local" {...form2.register("returnDatetime")} className={inputCls} />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1 text-xs sm:text-sm">
                            <Users className="w-3 h-3" /> Pasajeros
                          </Label>
                          <Input
                            type="number" min={1}
                            max={selectedVehicle?.capacity ?? 20}
                            {...form2.register("passengerCount", { valueAsNumber: true })}
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1 text-xs sm:text-sm">
                            <Luggage className="w-3 h-3" /> Maletas
                          </Label>
                          <Input
                            type="number" min={0} max={20}
                            {...form2.register("luggageCount", { valueAsNumber: true })}
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center gap-1 text-xs sm:text-sm">
                            <Baby className="w-3 h-3" /> Sillas Bebé
                          </Label>
                          <Input
                            type="number" min={0} max={5}
                            {...form2.register("childSeats", { valueAsNumber: true })}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1 text-xs sm:text-sm">
                          <Plane className="w-3 h-3" /> Número de Vuelo <span className="text-slate-400 text-xs">(opcional)</span>
                        </Label>
                        <Input placeholder="Ej. AM 456" {...form2.register("flightNumber")} className={inputCls} />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1 text-xs sm:text-sm">
                          <FileText className="w-3 h-3" /> Solicitudes Especiales <span className="text-slate-400 text-xs">(opcional)</span>
                        </Label>
                        <Textarea
                          placeholder="Ej. Silla para bebé, parada adicional, agua con gas, decoración de aniversario..."
                          {...form2.register("specialRequests")}
                          rows={3}
                          className="rounded-xl font-sans text-sm"
                        />
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4 sm:space-y-5">
                      <h3 className="font-bold text-[#1C1917] text-sm sm:text-base">Datos del Pasajero Principal</h3>

                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Nombre Completo *</Label>
                        <Input data-testid="input-passenger-name" placeholder="Juan García López" {...form3.register("passengerName")} className={inputCls} />
                        {form3.formState.errors.passengerName && <p className="text-red-500 text-xs">{form3.formState.errors.passengerName.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1 text-xs sm:text-sm"><Mail className="w-3 h-3" /> Correo Electrónico *</Label>
                        <Input data-testid="input-passenger-email" type="email" placeholder="correo@ejemplo.com" {...form3.register("passengerEmail")} className={inputCls} />
                        {form3.formState.errors.passengerEmail && <p className="text-red-500 text-xs">{form3.formState.errors.passengerEmail.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1 text-xs sm:text-sm"><Phone className="w-3 h-3" /> Teléfono / WhatsApp *</Label>
                        <Input data-testid="input-passenger-phone" placeholder="+52 624 123 4567" {...form3.register("passengerPhone")} className={inputCls} />
                        {form3.formState.errors.passengerPhone && <p className="text-red-500 text-xs">{form3.formState.errors.passengerPhone.message}</p>}
                      </div>

                      <div className="bg-[#D4AF37]/8 border border-[#D4AF37]/20 rounded-2xl p-4 text-sm text-slate-600">
                        <p className="font-semibold text-[#1C1917] mb-1">💳 Pago al Chofer</p>
                        <p className="text-xs leading-relaxed">El pago se realiza directamente al chofer al llegar a tu destino. Aceptamos efectivo (USD o MXN) y tarjeta de crédito/débito.</p>
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
              <div className="max-w-xl mx-auto text-center pt-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1C1917] mb-3 sm:mb-4">¡Reserva Confirmada!</h2>
                <p className="text-slate-500 text-base sm:text-lg mb-6 sm:mb-8">
                  Hola {confirmed.name}, tu traslado ha sido reservado exitosamente. Te contactaremos pronto para confirmar los detalles.
                </p>

                <div
                  className="text-white rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8"
                  style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #1C1917 100%)" }}
                >
                  <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Código de Confirmación</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <p className="font-mono font-black text-3xl sm:text-4xl text-[#D4AF37] tracking-widest">{confirmed.code}</p>
                    <button
                      onClick={copyCode}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                      title="Copiar código"
                    >
                      {codeCopied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
                    </button>
                  </div>
                  <p className="text-white/50 text-sm mb-1">Total a pagar al chofer</p>
                  <p className="text-4xl sm:text-5xl font-black text-white">
                    ${confirmed.price} <span className="text-base sm:text-lg text-white/45 font-normal">USD</span>
                  </p>
                </div>

                <p className="text-slate-500 text-sm mb-6 sm:mb-8">
                  Guarda tu código de confirmación. Lo necesitarás para consultar o modificar tu reserva.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href={`https://wa.me/526241234567?text=Hola%2C%20tengo%20una%20reserva%20confirmada.%20Mi%20código%20es%20${confirmed.code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Confirmar por WhatsApp
                  </a>
                  <Link href="/mi-reserva" className="flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#1C1917] text-white font-bold px-6 py-3.5 rounded-2xl transition-colors">
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
