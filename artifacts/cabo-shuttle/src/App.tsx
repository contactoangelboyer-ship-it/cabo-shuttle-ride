import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Zonas from "./pages/Zonas";
import Flota from "./pages/Flota";
import Precios from "./pages/Precios";
import Reservar from "./pages/Reservar";
import MiReserva from "./pages/MiReserva";
import Admin from "./pages/Admin";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/zonas" component={Zonas} />
      <Route path="/flota" component={Flota} />
      <Route path="/precios" component={Precios} />
      <Route path="/reservar" component={Reservar} />
      <Route path="/mi-reserva" component={MiReserva} />
      <Route path="/nosotros" component={Nosotros} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/faq" component={FAQ} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
