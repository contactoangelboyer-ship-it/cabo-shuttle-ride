import React from "react";
import { Menu, ArrowRight, CheckCircle, MapPin, Car, Clock } from "lucide-react";

export default function VibranteGradiente() {
  return (
    <div className="min-h-screen font-['Poppins'] flex flex-col bg-[#F9FAFB]">
      {/* Google Font Import */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
      `}} />

      {/* Hero Section */}
      <div 
        className="relative flex flex-col min-h-[90vh] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #180040 0%, #0C1A6B 50%, #0A4D68 100%)' }}
      >
        {/* Subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
          <div className="flex items-center gap-4">
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <Menu size={24} />
            </button>
            <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Cabo <span className="text-[#38EFC8]">Shuttle</span> Ride
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/90 font-medium">
            <a href="#" className="hover:text-white transition-colors">Inicio</a>
            <a href="#" className="hover:text-white transition-colors">Destinos</a>
            <a href="#" className="hover:text-white transition-colors">Flota</a>
          </div>
          <button className="bg-[#38EFC8] hover:bg-[#2DD0AE] text-[#0A2640] font-bold py-2.5 px-6 rounded-full transition-all shadow-[0_0_20px_rgba(56,239,200,0.3)]">
            Reservar
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-12 max-w-7xl mx-auto w-full gap-12 py-12">
          
          {/* Left Column - Text */}
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-[#38EFC8] animate-pulse"></div>
              <span className="text-white text-sm font-semibold tracking-wide">Los Cabos #1 Traslado Privado</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[88px] font-black leading-[1.05] tracking-tight text-white mb-6">
              Tu Traslado,
              <br />
              <span className="text-[#38EFC8] drop-shadow-[0_0_30px_rgba(56,239,200,0.3)]">Sin Complicaciones.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/75 font-medium max-w-2xl">
              Reserva en 60 segundos. Llega relajado.
            </p>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-white text-2xl font-bold mb-6">Calcula tu Viaje</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Origen</label>
                  <select className="w-full bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[#38EFC8] transition-colors [&>option]:bg-[#0C1A6B] [&>option]:text-white">
                    <option>SJD Aeropuerto Internacional</option>
                    <option>Cabo San Lucas Centro</option>
                    <option>San José del Cabo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Destino</label>
                  <select className="w-full bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[#38EFC8] transition-colors [&>option]:bg-[#0C1A6B] [&>option]:text-white">
                    <option>Cabo San Lucas (Zona Hotelera)</option>
                    <option>Corredor Turístico</option>
                    <option>SJD Aeropuerto Internacional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">Pasajeros</label>
                  <select className="w-full bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-[#38EFC8] transition-colors [&>option]:bg-[#0C1A6B] [&>option]:text-white">
                    <option>1 - 4 Pasajeros (SUV)</option>
                    <option>5 - 10 Pasajeros (Van)</option>
                    <option>11 - 16 Pasajeros (Sprinter)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end justify-between mb-6">
                <div className="text-white/70 font-medium">Total Estimado</div>
                <div className="text-[#38EFC8] text-4xl font-black">$85<span className="text-lg text-[#38EFC8]/70 ml-1">USD</span></div>
              </div>

              <button className="w-full bg-[#38EFC8] hover:bg-[#2DD0AE] text-[#0A2640] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Reservar Ahora
                <ArrowRight size={20} className="stroke-[3]" />
              </button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Below Hero - Features */}
      <div className="relative z-20 -mt-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#0C1A6B]/10 flex items-center justify-center text-[#0C1A6B] mb-4">
              <CheckCircle size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Choferes Certificados</h4>
            <p className="text-gray-500 font-medium">Bilingües y altamente capacitados.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#38EFC8]/20 flex items-center justify-center text-[#0A4D68] mb-4">
              <MapPin size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">5 Zonas de Servicio</h4>
            <p className="text-gray-500 font-medium">Cubriendo todo Los Cabos.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] mb-4">
              <Car size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Vehículos de Lujo</h4>
            <p className="text-gray-500 font-medium">SUVs y Vans de modelo reciente.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#180040]/10 flex items-center justify-center text-[#180040] mb-4">
              <Clock size={32} strokeWidth={2.5} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Disponible 24/7</h4>
            <p className="text-gray-500 font-medium">Monitoreo de vuelos en tiempo real.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
