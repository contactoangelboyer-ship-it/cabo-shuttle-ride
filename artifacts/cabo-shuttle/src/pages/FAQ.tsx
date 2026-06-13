import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

const FAQS = [
  {
    category: "Reservas",
    items: [
      {
        q: "¿Con cuánta anticipación debo reservar?",
        a: "Recomendamos reservar con al menos 24 horas de anticipación para garantizar disponibilidad. Sin embargo, para grupos grandes o fechas de alta demanda (Semana Santa, Navidad, Año Nuevo), es mejor reservar con 1-2 semanas de anticipación. También aceptamos reservas de último momento sujetas a disponibilidad.",
      },
      {
        q: "¿Puedo modificar o cancelar mi reserva?",
        a: "Sí. Puedes modificar tu reserva con 12 horas de anticipación sin costo. Las cancelaciones realizadas con más de 24 horas de anticipación son totalmente gratuitas. Para cancelaciones de última hora, contáctanos directamente por WhatsApp.",
      },
      {
        q: "¿Cómo recibo mi confirmación de reserva?",
        a: "Al completar tu reserva recibirás un código de confirmación en pantalla. Guárdalo para consultar tu reserva en la sección 'Mi Reserva'. Te recomendamos enviarnos tu código por WhatsApp para que tengamos tu reserva registrada en nuestro sistema.",
      },
      {
        q: "¿Puedo hacer una reserva de ida y vuelta?",
        a: "Sí, en el formulario de reserva puedes seleccionar 'Ida y Vuelta' e indicar la fecha y hora del regreso. El precio de retorno se calcula por separado con la misma tarifa.",
      },
    ],
  },
  {
    category: "Traslados",
    items: [
      {
        q: "¿Qué pasa si mi vuelo se retrasa?",
        a: "Monitoreamos todos los vuelos en tiempo real a través del número de vuelo que proporcionas en tu reserva. Si tu vuelo se retrasa, ajustamos automáticamente el horario de recogida sin costo adicional. Tu chofer te esperará el tiempo necesario.",
      },
      {
        q: "¿El chofer me espera en el área de llegadas?",
        a: "Sí. Tu chofer te esperará en el área de llegadas del aeropuerto con un letrero con tu nombre. Para traslados desde hoteles o residencias, el chofer llegará puntualmente a la dirección indicada.",
      },
      {
        q: "¿Cuánto equipaje puedo llevar?",
        a: "Depende del vehículo: el Sedán admite 2 maletas grandes, el SUV 4 maletas, la Van hasta 8 maletas y el Sprinter hasta 12. Indícanos la cantidad en tu reserva para asignar el vehículo adecuado. Las maletas adicionales pueden tener un cargo extra.",
      },
      {
        q: "¿Hacen paradas durante el trayecto?",
        a: "Sí, podemos hacer paradas en supermercados, farmacias o puntos turísticos en el camino. Indícalo en 'Solicitudes Especiales' al hacer tu reserva. Las paradas largas (más de 15 min) tienen un costo adicional de $10 USD.",
      },
    ],
  },
  {
    category: "Pagos",
    items: [
      {
        q: "¿Cuáles son las formas de pago?",
        a: "Aceptamos efectivo en dólares americanos (USD) y pesos mexicanos (MXN), además de todas las principales tarjetas de crédito y débito (Visa, Mastercard, American Express). El pago se realiza directamente al chofer al llegar a tu destino.",
      },
      {
        q: "¿El precio incluye propina?",
        a: "La tarifa mostrada no incluye propina. Si el servicio fue de tu agrado, una propina del 10-15% es apreciada pero no obligatoria. Nuestros choferes están entrenados para dar un servicio de excelencia independientemente de la propina.",
      },
      {
        q: "¿Hay cargos ocultos?",
        a: "Absolutamente no. El precio que ves en nuestra calculadora es el precio final e incluye impuestos y peajes. No hay cargos por equipaje estándar, monitoreo de vuelos ni por esperar en el aeropuerto.",
      },
    ],
  },
  {
    category: "Vehículos y Choferes",
    items: [
      {
        q: "¿Los choferes hablan inglés?",
        a: "Sí, todos nuestros choferes son bilingues (español/inglés). Muchos también tienen nociones de francés y alemán. Si tienes algún requerimiento especial de idioma, indícalo en tu reserva.",
      },
      {
        q: "¿Los vehículos tienen aire acondicionado?",
        a: "Todos nuestros vehículos tienen aire acondicionado en perfectas condiciones. Además, llevamos agua fría a bordo para todos los pasajeros, incluida durante los traslados desde el aeropuerto.",
      },
      {
        q: "¿Tienen sillas para niños?",
        a: "Sí, contamos con sillas para bebé y asientos elevadores para niños sin costo adicional. Solo indícanos cuántos necesitas al hacer tu reserva. Los niños deben viajar seguros según la normativa mexicana.",
      },
      {
        q: "¿Puedo llevar mascotas?",
        a: "Aceptamos mascotas pequeñas en transportín cerrado. Para mascotas medianas o grandes, contáctanos antes de reservar para coordinar un vehículo adecuado. Puede aplicar un cargo adicional.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-[#1C1917] text-sm sm:text-base leading-snug pr-2">{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#D4AF37] flex-shrink-0 transition-transform duration-200 mt-0.5 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
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
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Respuestas Rápidas</span>
          </div>
          <h1 className="font-['Unbounded'] text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tight">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestro servicio de transporte en Los Cabos.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-20 bg-[#FAFAF9]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <div className="space-y-10 sm:space-y-12">
            {FAQS.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <h2 className="font-['Unbounded'] text-lg sm:text-xl font-black text-[#1C1917] uppercase mb-4 sm:mb-5 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#D4AF37] flex items-center justify-center text-[#111111] font-black text-xs">
                    {ci + 1}
                  </span>
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item, ii) => (
                    <FAQItem key={ii} q={item.q} a={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 sm:mt-16 text-center"
            style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)" }}
          >
            <div className="rounded-3xl p-8 sm:p-10 text-white">
              <h3 className="font-['Unbounded'] text-xl sm:text-2xl font-black uppercase mb-3">
                ¿No encontraste tu respuesta?
              </h3>
              <p className="text-white/65 mb-6 sm:mb-8 text-sm sm:text-base">
                Nuestro equipo está disponible 24/7. Escríbenos y te respondemos de inmediato.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="https://wa.me/526241234567?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20el%20servicio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#B4941F] text-[#111111] font-bold px-6 py-3.5 rounded-2xl transition-colors"
                >
                  Contacto <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
