import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "medico" | "paciente";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const HARDCODED_USERS: Record<string, { password: string; user: User }> = {
  "admin@neurocare.com": {
    password: "admin123",
    user: { id: "1", name: "Carlos Admin", email: "admin@neurocare.com", role: "admin" },
  },
  "medico@neurocare.com": {
    password: "medico123",
    user: { id: "2", name: "Dra. Ana Ramírez", email: "medico@neurocare.com", role: "medico" },
  },
  "paciente@neurocare.com": {
    password: "paciente123",
    user: { id: "3", name: "María García", email: "paciente@neurocare.com", role: "paciente" },
  },
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem("neurocare_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string): string | null => {
    const entry = HARDCODED_USERS[email.toLowerCase()];
    if (!entry) return "Usuario no encontrado";
    if (entry.password !== password) return "Contraseña incorrecta";
    setUser(entry.user);
    sessionStorage.setItem("neurocare_user", JSON.stringify(entry.user));
    return null;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("neurocare_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const ROLE_ROUTES: Record<UserRole, { path: string; label: string }[]> = {
  admin: [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/agenda", label: "Agenda Médica" },
    { path: "/sala-espera", label: "Sala de Espera" },
  ],
  medico: [
    { path: "/historia-clinica", label: "Historia Clínica" },
    { path: "/telemedicina", label: "Telemedicina" },
  ],
  paciente: [
    { path: "/portal-paciente", label: "Portal Paciente" },
    { path: "/telemedicina", label: "Telemedicina" },
  ],
};
