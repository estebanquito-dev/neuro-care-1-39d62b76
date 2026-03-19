import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Plus, Clock, MapPin, Video, Calendar, User, Filter } from "lucide-react";
import { useState } from "react";

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  paciente: string;
  especialidad: string;
  profesional: string;
  tipo: "presencial" | "virtual";
  estado: "confirmada" | "pendiente" | "en_curso" | "completada";
}

const citas: Cita[] = [
  { id: 1, fecha: "2026-03-19", hora: "08:00", paciente: "María García", especialidad: "Neurología", profesional: "Dr. Ramírez", tipo: "presencial", estado: "completada" },
  { id: 2, fecha: "2026-03-19", hora: "09:00", paciente: "Carlos Ruiz", especialidad: "Fisioterapia", profesional: "Dra. Gómez", tipo: "presencial", estado: "en_curso" },
  { id: 3, fecha: "2026-03-19", hora: "10:00", paciente: "Ana Pérez", especialidad: "Fonoaudiología", profesional: "Dr. López", tipo: "virtual", estado: "confirmada" },
  { id: 4, fecha: "2026-03-19", hora: "11:00", paciente: "Pedro Vargas", especialidad: "T. Ocupacional", profesional: "Dra. Suárez", tipo: "presencial", estado: "confirmada" },
  { id: 5, fecha: "2026-03-19", hora: "14:00", paciente: "Luis Mendoza", especialidad: "Neurología", profesional: "Dr. Ramírez", tipo: "presencial", estado: "pendiente" },
  { id: 6, fecha: "2026-03-19", hora: "15:00", paciente: "Sofía Torres", especialidad: "Psicología", profesional: "Dra. Castillo", tipo: "virtual", estado: "pendiente" },
  { id: 7, fecha: "2026-03-20", hora: "08:00", paciente: "Diego Herrera", especialidad: "Fisioterapia", profesional: "Dra. Gómez", tipo: "presencial", estado: "confirmada" },
  { id: 8, fecha: "2026-03-20", hora: "09:30", paciente: "Laura Sánchez", especialidad: "Fonoaudiología", profesional: "Dr. López", tipo: "virtual", estado: "confirmada" },
];

const estadoStyles: Record<string, string> = {
  confirmada: "bg-info/10 text-info",
  pendiente: "bg-warning/10 text-warning",
  en_curso: "bg-accent/10 text-accent",
  completada: "bg-success/10 text-success",
};

const estadoLabels: Record<string, string> = {
  confirmada: "Confirmada",
  pendiente: "Pendiente",
  en_curso: "En curso",
  completada: "Completada",
};

export default function Agenda() {
  const [filtro, setFiltro] = useState<string>("todos");

  const citasFiltradas = filtro === "todos" ? citas : citas.filter((c) => c.estado === filtro);

  // Group by date
  const grouped = citasFiltradas.reduce<Record<string, Cita[]>>((acc, c) => {
    if (!acc[c.fecha]) acc[c.fecha] = [];
    acc[c.fecha].push(c);
    return acc;
  }, {});

  const formatDate = (d: string) => {
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
  };

  return (
    <AppLayout title="Agenda Médica">
      <div className="space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {["todos", "confirmada", "pendiente", "en_curso", "completada"].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filtro === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f === "todos" ? "Todos" : estadoLabels[f]}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Nueva Cita
          </button>
        </motion.div>

        {/* Event list */}
        {Object.entries(grouped).map(([fecha, events]) => (
          <motion.div key={fecha} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-accent" />
              <h3 className="font-display font-semibold text-sm capitalize">{formatDate(fecha)}</h3>
              <span className="text-xs text-muted-foreground">({events.length} citas)</span>
            </div>
            <div className="space-y-2">
              {events.map((cita) => (
                <div
                  key={cita.id}
                  className="bg-card rounded-xl shadow-card p-4 flex items-center justify-between hover:shadow-elevated transition-shadow cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[50px]">
                      <p className="font-display font-bold text-lg">{cita.hora}</p>
                    </div>
                    <div className="h-10 w-[3px] rounded-full bg-accent" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{cita.paciente}</p>
                        {cita.tipo === "virtual" && (
                          <span className="flex items-center gap-1 text-[10px] font-medium text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                            <Video className="h-3 w-3" /> Virtual
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-3 mt-0.5">
                        <span>{cita.especialidad}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" />{cita.profesional}</span>
                        {cita.tipo === "presencial" && (
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Sede</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${estadoStyles[cita.estado]}`}>
                    {estadoLabels[cita.estado]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AppLayout>
  );
}
