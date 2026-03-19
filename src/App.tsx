import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>} />
            <Route path="/historia-clinica" element={<ProtectedRoute allowedRoles={["medico"]}><HistoriaClinica /></ProtectedRoute>} />
            <Route path="/agenda" element={<ProtectedRoute allowedRoles={["admin"]}><Agenda /></ProtectedRoute>} />
            <Route path="/telemedicina" element={<ProtectedRoute allowedRoles={["medico", "paciente"]}><Telemedicina /></ProtectedRoute>} />
            <Route path="/portal-paciente" element={<ProtectedRoute allowedRoles={["paciente"]}><PortalPaciente /></ProtectedRoute>} />
            <Route path="/sala-espera" element={<ProtectedRoute allowedRoles={["admin"]}><SalaEspera /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
