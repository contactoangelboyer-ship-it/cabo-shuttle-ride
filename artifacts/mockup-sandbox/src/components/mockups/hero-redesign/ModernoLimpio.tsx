import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Shield, Clock, MapPin, Map, CreditCard } from "lucide-react";

export default function ModernoLimpio() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Poppins'] flex flex-col overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
      `}</style>
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#E2E8F0] bg-white sticky top-0 z-50">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-[#0A0A14] font-bold text-2xl tracking-tight">Cabo</span>
          <span className="text-[#0057FF] font-bold text-2xl tracking-tight">Shuttle</span>
          <span className="text-[#0A0A14] font-bold text-2xl tracking-tight">Ride</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[#64748B] font-medium text-sm">
          <a href="#" className="hover:text-[#0057FF] transition-colors">Servicios</a>
          <a href="#" className="hover:text-[#0057FF] transition-colors">Flota</a>
          <a href="#" className="hover:text-[#0057FF] transition-colors">Zonas</a>
          <a href="#" className="hover:text-[#0057FF] transition-colors">Contacto</a>
        </div>
        
        <Button className="bg-[#0057FF] hover:bg-[#0041CC] text-white rounded-full px-6 py-5 font-semibold shadow-sm shadow-[#0057FF]/20">
          Reservar Ahora
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col relative bg-[#F8FAFF]">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EFF4FF] rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-8 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start max-w-2xl">
            <span className="bg-[#EFF4FF] text-[#0057FF] px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-8 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0057FF] animate-pulse" />
              Transporte Privado Premium
            </span>
            
            <h1 className="text-[#0A0A14] font-extrabold text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-tight mb-4">
              El Traslado Perfecto <br />
              <span className="text-[#0057FF]">en Los Cabos</span>
            </h1>
            
            <p className="text-[#64748B] text-lg md:text-xl font-normal leading-relaxed mb-10 max-w-xl">
              Choferes certificados, vehículos de lujo y puntualidad garantizada. Reserva en segundos.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
              <Button className="bg-[#0057FF] hover:bg-[#0041CC] text-white rounded-full px-8 py-6 text-lg font-semibold w-full sm:w-auto shadow-lg shadow-[#0057FF]/20">
                Reservar Ahora
              </Button>
              <Button variant="outline" className="border-2 border-[#0057FF] text-[#0057FF] hover:bg-[#EFF4FF] rounded-full px-8 py-6 text-lg font-semibold w-full sm:w-auto bg-transparent">
                Ver Precios
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-[#0A0A14] font-medium text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0057FF]" />
                <span>Verificado</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0057FF]" />
                <span>Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0057FF]" />
                <span>24/7</span>
              </div>
            </div>
          </div>
          
          {/* Right Illustration (CSS only) */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-[500px] h-[400px]">
              {/* Abstract vehicle shapes */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[240px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-[#E2E8F0] overflow-hidden z-20 flex flex-col justify-between p-6">
                <div className="w-24 h-4 bg-[#EFF4FF] rounded-full" />
                
                <div className="relative w-full h-32 mt-auto">
                  {/* Vehicle silhouette */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-gradient-to-r from-[#0057FF] to-[#0041CC] rounded-t-2xl rounded-b-lg">
                    {/* Windows */}
                    <div className="absolute top-2 left-4 right-16 h-6 bg-white/20 rounded-md backdrop-blur-sm" />
                    {/* Wheels */}
                    <div className="absolute -bottom-3 left-6 w-8 h-8 rounded-full border-4 border-white bg-[#0A0A14] shadow-sm" />
                    <div className="absolute -bottom-3 right-6 w-8 h-8 rounded-full border-4 border-white bg-[#0A0A14] shadow-sm" />
                  </div>
                  {/* Speed lines */}
                  <div className="absolute top-8 -right-4 w-12 h-1 bg-[#E2E8F0] rounded-full" />
                  <div className="absolute top-14 -right-8 w-16 h-1 bg-[#E2E8F0] rounded-full" />
                </div>
              </div>

              {/* Decorative background elements */}
              <div className="absolute top-[10%] -left-[10%] w-32 h-32 bg-[#EFF4FF] rounded-full z-10" />
              <div className="absolute bottom-[20%] -right-[5%] w-24 h-24 border-[8px] border-[#EFF4FF] rounded-full z-10" />
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-12 bg-white p-5 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,87,255,0.15)] border border-[#E2E8F0] z-30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0057FF] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-[#64748B] text-xs font-medium uppercase tracking-wider mb-1">Destino</div>
                  <div className="text-[#0A0A14] font-bold text-sm">Zona Hotelera</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Booking Widget (Overlapping hero and trust strip) */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8 z-40">
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[#E2E8F0] border-t-4 border-t-[#0057FF] p-4 flex flex-col md:flex-row items-center gap-4">
            
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select defaultValue="sjd">
                <SelectTrigger className="h-14 border-[#E2E8F0] rounded-xl text-base text-[#0A0A14] font-medium shadow-none focus:ring-[#0057FF]">
                  <div className="flex items-center gap-2">
                    <Map className="w-5 h-5 text-[#64748B]" />
                    <SelectValue placeholder="Origen" />
                  </div>
                </SelectTrigger>
                <SelectContent className="font-['Poppins']">
                  <SelectItem value="sjd">Aeropuerto SJD</SelectItem>
                  <SelectItem value="csl">Cabo San Lucas</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="hotel">
                <SelectTrigger className="h-14 border-[#E2E8F0] rounded-xl text-base text-[#0A0A14] font-medium shadow-none focus:ring-[#0057FF]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#64748B]" />
                    <SelectValue placeholder="Destino" />
                  </div>
                </SelectTrigger>
                <SelectContent className="font-['Poppins']">
                  <SelectItem value="hotel">Zona Hotelera</SelectItem>
                  <SelectItem value="marina">Marina</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="suv">
                <SelectTrigger className="h-14 border-[#E2E8F0] rounded-xl text-base text-[#0A0A14] font-medium shadow-none focus:ring-[#0057FF]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#64748B]" />
                    <SelectValue placeholder="Vehículo" />
                  </div>
                </SelectTrigger>
                <SelectContent className="font-['Poppins']">
                  <SelectItem value="suv">Premium SUV</SelectItem>
                  <SelectItem value="van">Sprinter Van</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-px h-12 bg-[#E2E8F0] hidden md:block" />

            <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto px-2">
              <div className="flex flex-col items-center md:items-start w-full md:w-auto">
                <span className="text-[#64748B] text-xs font-semibold uppercase tracking-wider">Precio Est.</span>
                <span className="text-[#0A0A14] font-bold text-2xl">$85<span className="text-[#64748B] text-base font-medium"> USD</span></span>
              </div>
              <Button className="w-full md:w-auto bg-[#0057FF] hover:bg-[#0041CC] text-white rounded-xl px-8 h-14 text-base font-semibold">
                Continuar
              </Button>
            </div>

          </div>
        </div>
      </main>

      {/* Trust Stats Strip */}
      <section className="bg-[#F0F5FF] pt-24 pb-12 px-8 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <span className="text-[#0057FF] font-extrabold text-4xl lg:text-5xl tracking-tight mb-2">15k+</span>
              <span className="text-[#64748B] font-medium text-sm">Viajes Completados</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[#0057FF] font-extrabold text-4xl lg:text-5xl tracking-tight mb-2">4.9</span>
              <span className="text-[#64748B] font-medium text-sm">Estrellas de Rating</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[#0057FF] font-extrabold text-4xl lg:text-5xl tracking-tight mb-2">50+</span>
              <span className="text-[#64748B] font-medium text-sm">Vehículos de Lujo</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[#0057FF] font-extrabold text-4xl lg:text-5xl tracking-tight mb-2">24/7</span>
              <span className="text-[#64748B] font-medium text-sm">Soporte Dedicado</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
