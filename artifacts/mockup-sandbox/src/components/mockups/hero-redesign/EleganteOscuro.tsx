import React, { useState } from "react";
import { ChevronDown, MapPin, Car, ArrowRight, ShieldCheck, Clock, Map, Star, Menu } from "lucide-react";

export default function EleganteOscuro() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col font-['Poppins'] text-white overflow-x-hidden selection:bg-[#F5C842] selection:text-black" style={{ backgroundColor: "#0A0E1A" }}>
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, #1a2744 0%, #0A0E1A 70%)",
        }}
      >
        {/* Subtle diagonal stripe pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 10px)"
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full px-6 md:px-12 py-6 flex justify-between items-center border-b border-white/10 bg-[#0A0E1A]/40 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="text-2xl font-bold tracking-tight">
            Cabo <span style={{ color: "#F5C842" }}>Shuttle</span> Ride
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[15px] text-white/80 font-medium">
          <a href="#" className="hover:text-[#F5C842] transition-colors">Inicio</a>
          <a href="#" className="hover:text-[#F5C842] transition-colors">Servicios</a>
          <a href="#" className="hover:text-[#F5C842] transition-colors">Flota</a>
          <a href="#" className="hover:text-[#F5C842] transition-colors">Zonas</a>
          <a href="#" className="hover:text-[#F5C842] transition-colors">Contacto</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full font-semibold text-[#0A0E1A] transition-transform hover:scale-105" style={{ backgroundColor: "#F5C842" }}>
            Reservar Ahora
          </button>
          <button className="lg:hidden text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-12 md:py-20 max-w-7xl mx-auto w-full">
        
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C842]/30 bg-[#F5C842]/10 backdrop-blur-sm mb-8">
            <Star className="w-4 h-4" style={{ color: "#F5C842" }} fill="#F5C842" />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#F5C842" }}>
              Transporte Premium en Los Cabos
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
            Llegamos Donde <br />
            <span className="italic font-black" style={{ color: "#F5C842" }}>Los Demás No Llegan</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/65 max-w-2xl mb-12 leading-relaxed font-normal">
            Servicio privado de traslado con choferes certificados. 5 zonas de servicio, disponible las 24 horas.
          </p>

          {/* Booking Widget */}
          <div className="w-full max-w-5xl rounded-2xl border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              {/* Origin Dropdown */}
              <div className="relative group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Origen</label>
                <div className="flex items-center justify-between w-full p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-white/40" />
                    <span className="font-medium">Aeropuerto SJD</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Destination Dropdown */}
              <div className="relative group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Destino</label>
                <div className="flex items-center justify-between w-full p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-white/40" />
                    <span className="font-medium text-white/60">Seleccionar Zona</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Vehicle Dropdown */}
              <div className="relative group">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Vehículo</label>
                <div className="flex items-center justify-between w-full p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-white/40" />
                    <span className="font-medium text-white/60">Tipo de Servicio</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </div>

            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="text-white/60 font-medium">Tarifa estimada:</span>
                <span className="text-3xl font-bold" style={{ color: "#F5C842" }}>--</span>
              </div>
              <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-[#0A0E1A] transition-all hover:brightness-110 hover:scale-[1.02] shadow-[0_0_20px_rgba(245,200,66,0.3)]" style={{ backgroundColor: "#F5C842" }}>
                Continuar Reserva
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Trust Strip */}
      <div className="relative z-10 w-full mt-auto border-t border-white/10 bg-[#0A0E1A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          
          <div className="flex flex-col items-center justify-center text-center px-4">
            <Map className="w-6 h-6 mb-3 text-white/40" />
            <span className="text-3xl font-bold mb-1" style={{ color: "#F5C842" }}>5</span>
            <span className="text-sm font-medium text-white/65 uppercase tracking-wider">Zonas</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-4">
            <Car className="w-6 h-6 mb-3 text-white/40" />
            <span className="text-3xl font-bold mb-1" style={{ color: "#F5C842" }}>4</span>
            <span className="text-sm font-medium text-white/65 uppercase tracking-wider">Vehículos</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-4">
            <ShieldCheck className="w-6 h-6 mb-3 text-white/40" />
            <span className="text-3xl font-bold mb-1" style={{ color: "#F5C842" }}>+2,000</span>
            <span className="text-sm font-medium text-white/65 uppercase tracking-wider">Viajes</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center px-4">
            <Clock className="w-6 h-6 mb-3 text-white/40" />
            <span className="text-3xl font-bold mb-1" style={{ color: "#F5C842" }}>24/7</span>
            <span className="text-sm font-medium text-white/65 uppercase tracking-wider">Disponible</span>
          </div>

        </div>
      </div>

    </div>
  );
}
