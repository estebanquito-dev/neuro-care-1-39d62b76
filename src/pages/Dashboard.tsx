import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import {
  Users,
  CalendarCheck,
  Video,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const consultasData = [
  { mes: "Ene", consultas: 120, terapias: 85 },
  { mes: "Feb", consultas: 145, terapias: 102 },
  { mes: "Mar", consultas: 160, terapias: 118 },
  { mes: "Abr", consultas: 138, terapias: 95 },
  { mes: "May", consultas: 175, terapias: 130 },
  { mes: "Jun", consultas: 190, terapias: 142 },
];

const especialidadData = [
  { name: "Neurología", value: 42 },
  { name: "Fisioterapia", value: 35 },
  { name: "Fonoaudiología", value: 18 },
  { name: "Psicología", value: 22 },
  { name: "T. Ocupacional", value: 15 },
];

const citasRecientes = [
  { paciente: "María G.", hora: "09:00", especialidad: "Neurología", estado: "En curso" },
  { paciente: "Carlos R.", hora: "09:30", especialidad: "Fisioterapia", estado: "Esperando" },
  { paciente: "Ana P.", hora: "10:00", especialidad: "Fonoaudiología", estado: "Confirmada" },
  { paciente: "Luis M.", hora: "10:30", especialidad: "Neurología", estado: "Confirmada" },
  { paciente: "Sofia T.", hora: "11:00", especialidad: "Psicología", estado: "Confirmada" },
];

const estadoColors: Record<string, string> = {
  "En curso": "bg-accent text-accent-foreground",
  Esperando: "bg-warning text-warning-foreground",
  Confirmada: "bg-success text-success-foreground",
};

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Pacientes Activos" value={1248} icon={Users} trend={{ value: 12, positive: true }} subtitle="Total registrados" />
          <StatCard title="Citas Hoy" value={38} icon={CalendarCheck} variant="accent" subtitle="6 teleconsultas" />
          <StatCard title="Teleconsultas" value={142} icon={Video} trend={{ value: 24, positive: true }} subtitle="Este mes" />
          <StatCard title="Tasa Recuperación" value="87%" icon={Activity} variant="secondary" subtitle="Promedio global" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-card rounded-xl p-5 shadow-card"
          >
            <h3 className="font-display font-semibold text-sm mb-4">Consultas y Terapias</h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={consultasData}>
                <defs>
                  <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215, 60%, 22%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(215, 60%, 22%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTerapias" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 55%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(174, 55%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 18%, 88%)" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} stroke="hsl(215, 10%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 10%, 50%)" />
                <Tooltip />
                <Area type="monotone" dataKey="consultas" stroke="hsl(215, 60%, 22%)" fill="url(#colorConsultas)" strokeWidth={2} />
                <Area type="monotone" dataKey="terapias" stroke="hsl(174, 55%, 45%)" fill="url(#colorTerapias)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-xl p-5 shadow-card"
          >
            <h3 className="font-display font-semibold text-sm mb-4">Por Especialidad</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={especialidadData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 10%, 50%)" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} stroke="hsl(215, 10%, 50%)" />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(215, 60%, 22%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent appointments */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl shadow-card overflow-hidden"
        >
          <div className="p-5 border-b flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm">Citas de Hoy</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Actualizado hace 2 min</span>
            </div>
          </div>
          <div className="divide-y">
            {citasRecientes.map((cita, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">
                      {cita.paciente.split(" ").map(w => w[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{cita.paciente}</p>
                    <p className="text-xs text-muted-foreground">{cita.especialidad}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{cita.hora}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${estadoColors[cita.estado]}`}>
                    {cita.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
