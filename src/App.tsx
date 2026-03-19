import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import HistoriaClinica from "./pages/HistoriaClinica";
import Agenda from "./pages/Agenda";
import Telemedicina from "./pages/Telemedicina";
import PortalPaciente from "./pages/PortalPaciente";
import SalaEspera from "./pages/SalaEspera";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/historia-clinica" element={<HistoriaClinica />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/telemedicina" element={<Telemedicina />} />
          <Route path="/portal-paciente" element={<PortalPaciente />} />
          <Route path="/sala-espera" element={<SalaEspera />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
