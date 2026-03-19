import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, ROLE_ROUTES } from "@/contexts/AuthContext";
import { Brain, LogIn, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const err = login(email, password);
    if (err) {
      setError(err);
    } else {
      // Get user from session to determine role
      const saved = sessionStorage.getItem("neurocare_user");
      if (saved) {
        const user = JSON.parse(saved);
        const routes = ROLE_ROUTES[user.role as keyof typeof ROLE_ROUTES];
        navigate(routes[0].path);
      }
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--gradient-primary)" }}>
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-primary-foreground max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
              <Brain className="h-7 w-7 text-accent-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">Neuro Care 360</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-tight">
            Plataforma integral de neurorrehabilitación
          </h1>
          <p className="mt-4 opacity-70 leading-relaxed">
            Gestión clínica, administrativa y terapéutica para Neurotrauma Center.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card rounded-2xl shadow-elevated p-8"
        >
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Neuro Care 360</span>
          </div>

          <h2 className="font-display text-2xl font-bold">Iniciar Sesión</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Ingresa con tus credenciales</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="correo@neurocare.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full h-10 rounded-lg text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{ background: "var(--gradient-primary)" }}
            >
              <LogIn className="h-4 w-4" />
              Ingresar
            </button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-muted-foreground font-medium mb-3">Usuarios de prueba:</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between p-2 rounded-md bg-muted/50">
                <span className="font-medium">Admin</span>
                <span>admin@neurocare.com / admin123</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted/50">
                <span className="font-medium">Médico</span>
                <span>medico@neurocare.com / medico123</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-muted/50">
                <span className="font-medium">Paciente</span>
                <span>paciente@neurocare.com / paciente123</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
