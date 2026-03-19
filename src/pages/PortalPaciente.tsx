import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { CalendarDays, FileText, Video, Activity, Clock, ChevronRight } from "lucide-react";

const proximasCitas = [
  { fecha: "20 Mar 2026", hora: "10:00", especialidad: "Neurología", medico: "Dr. Ramírez", tipo: "presencial" },
  { fecha: "22 Mar 2026", hora: "15:00", especialidad: "Fisioterapia", medico: "Dra. Gómez", tipo: "presencial" },
  { fecha: "25 Mar 2026", hora: "09:30", especialidad: "Fonoaudiología", medico: "Dr. López", tipo: "virtual" },
];

const terapias = [
  { nombre: "Fisioterapia", sesiones: 12, completadas: 8, progreso: 67 },
  { nombre: "Fonoaudiología", sesiones: 8, completadas: 5, progreso: 63 },
  { nombre: "Terapia Ocupacional", sesiones: 10, completadas: 3, progreso: 30 },
];

const resultados = [
  { fecha: "15 Mar 2026", tipo: "Resonancia Magnética", estado: "Disponible" },
  { fecha: "10 Mar 2026", tipo: "Electroencefalograma", estado: "Disponible" },
  { fecha: "05 Mar 2026", tipo: "Hemograma", estado: "Disponible" },
];

export default function PortalPaciente() {
  return (
    <AppLayout title="Portal del Paciente">
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6"
          style={{ background: "var(--gradient-primary)" }}
        >
          <h2 className="font-display font-bold text-xl text-primary-foreground">
            Bienvenida, María
          </h2>
          <p className="text-primary-foreground/70 text-sm mt-1">
            Tu próxima cita es el 20 de marzo a las 10:00 AM · Neurología
          </p>
          <div className="flex gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <CalendarDays className="h-4 w-4" /> Agendar Cita
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground text-sm font-medium hover:bg-primary-foreground/20 transition-colors">
              <Video className="h-4 w-4" /> Teleconsulta
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming appointments */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl shadow-card">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Próximas Citas</h3>
              <button className="text-xs text-accent font-medium">Ver todas</button>
            </div>
            <div className="divide-y">
              {proximasCitas.map((c, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {c.tipo === "virtual" ? <Video className="h-4 w-4 text-accent" /> : <CalendarDays className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.especialidad}</p>
                      <p className="text-xs text-muted-foreground">{c.medico} · {c.fecha} {c.hora}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Therapy progress */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl shadow-card">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" />
                Progreso Terapéutico
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {terapias.map((t, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t.nombre}</span>
                    <span className="text-xs text-muted-foreground">{t.completadas}/{t.sesiones} sesiones</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.progreso}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Results */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl shadow-card">
          <div className="p-5 border-b flex items-center justify-between">
            <h3 className="font-display font-semibold text-sm">Resultados Médicos</h3>
          </div>
          <div className="divide-y">
            {resultados.map((r, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">{r.tipo}</p>
                    <p className="text-xs text-muted-foreground">{r.fecha}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-success">{r.estado}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
