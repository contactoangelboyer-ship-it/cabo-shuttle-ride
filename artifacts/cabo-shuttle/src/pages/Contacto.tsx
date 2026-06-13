import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const inputCls = "h-12 rounded-xl border-slate-200 focus:border-[#D4AF37] font-sans text-sm";

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

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
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Estamos Aquí Para Ti</span>
          </div>
          <h1 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
            Contacto
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre tu traslado? Nuestro equipo está disponible 24/7 para ayudarte.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-['Unbounded'] text-xl sm:text-2xl font-black text-[#1C1917] uppercase mb-6">
                  Información de Contacto
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: MessageCircle,
                      label: "WhatsApp",
                      value: "+52 (624) 123-4567",
                      sub: "Respuesta inmediata",
                      href: "https://wa.me/526241234567",
                      color: "bg-green-600",
                    },
                    {
                      icon: Phone,
                      label: "Teléfono",
                      value: "+52 (624) 123-4567",
                      sub: "Lun–Dom · 24/7",
                      href: "tel:+526241234567",
                      color: "bg-[#111111]",
                    },
                    {
                      icon: Mail,
                      label: "Correo",
                      value: "info@caboshuttleride.com",
                      sub: "Respuesta en < 1 hora",
                      href: "mailto:info@caboshuttleride.com",
                      color: "bg-[#1C1917]",
                    },
                    {
                      icon: MapPin,
                      label: "Ubicación",
                      value: "Los Cabos, B.C.S.",
                      sub: "Baja California Sur, México",
                      href: null,
                      color: "bg-[#D4AF37]",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                            className="font-bold text-[#1C1917] hover:text-[#D4AF37] transition-colors text-sm sm:text-base"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-bold text-[#1C1917] text-sm sm:text-base">{item.value}</p>
                        )}
                        <p className="text-xs text-slate-400">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 sm:mt-8 rounded-3xl p-5 sm:p-6 text-white"
                  style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-bold text-sm">Horario de Servicio</span>
                  </div>
                  <p className="text-white/70 text-sm">Los 365 días del año</p>
                  <p className="text-[#D4AF37] font-bold text-xl mt-1">24 horas / 7 días</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-semibold">Disponible ahora mismo</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100"
              >
                {sent ? (
                  <div className="text-center py-8 sm:py-10">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-black text-[#1C1917] text-xl sm:text-2xl mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-slate-500 text-sm sm:text-base">Te responderemos en menos de 1 hora por correo o WhatsApp.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-[#D4AF37] font-semibold text-sm hover:underline">
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <h2 className="font-bold text-[#1C1917] text-lg sm:text-xl mb-1">Envíanos un Mensaje</h2>
                    <p className="text-slate-500 text-sm">Cuéntanos sobre tu traslado y te ayudamos.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Nombre *</Label>
                        <Input
                          required placeholder="Tu nombre completo"
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Correo *</Label>
                        <Input
                          required type="email" placeholder="correo@ejemplo.com"
                          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Teléfono / WhatsApp</Label>
                        <Input
                          placeholder="+1 (555) 123 4567"
                          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs sm:text-sm">Asunto *</Label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className="w-full h-12 rounded-xl border border-slate-200 focus:border-[#D4AF37] focus:outline-none px-3 font-sans text-sm bg-white text-slate-900"
                        >
                          <option value="">Selecciona un tema</option>
                          <option value="reserva">Nueva Reserva</option>
                          <option value="cotizacion">Cotización</option>
                          <option value="modificar">Modificar Reserva</option>
                          <option value="grupo">Viaje Grupal</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs sm:text-sm">Mensaje *</Label>
                      <Textarea
                        required rows={4}
                        placeholder="Cuéntanos sobre tu traslado: fecha, número de pasajeros, origen y destino..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="rounded-xl font-sans text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-black py-3.5 sm:py-4 rounded-2xl transition-all hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Mensaje
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      ¿Prefieres respuesta inmediata?{" "}
                      <a
                        href="https://wa.me/526241234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-semibold hover:underline"
                      >
                        Escríbenos por WhatsApp
                      </a>
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
