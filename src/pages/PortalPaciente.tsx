import { AppLayout } from "@/components/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Video, Activity, ChevronRight, FileText, Clock, Plus, X, Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const especialidades = ["Neurología", "Fisioterapia", "Fonoaudiología", "Psicología", "Terapia Ocupacional"];

const medicos: Record<string, string[]> = {
  "Neurología": ["Dr. Ramírez", "Dr. Castro"],
  "Fisioterapia": ["Dra. Gómez", "Dr. Martínez"],
  "Fonoaudiología": ["Dr. López"],
  "Psicología": ["Dra. Castillo"],
  "Terapia Ocupacional": ["Dra. Suárez"],
};

const turnosDisponibles = [
  { fecha: "24 Mar 2026", hora: "08:00" },
  { fecha: "24 Mar 2026", hora: "10:00" },
  { fecha: "24 Mar 2026", hora: "14:00" },
  { fecha: "25 Mar 2026", hora: "09:00" },
  { fecha: "25 Mar 2026", hora: "11:00" },
  { fecha: "26 Mar 2026", hora: "08:00" },
  { fecha: "26 Mar 2026", hora: "15:00" },
];

interface CitaAgendada {
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  tipo: "presencial" | "teleconsulta";
  teleLink?: string;
}

const terapias = [
  { nombre: "Fisioterapia", sesiones: 12, completadas: 8, progreso: 67 },
  { nombre: "Fonoaudiología", sesiones: 8, completadas: 5, progreso: 63 },
  { nombre: "Terapia Ocupacional", sesiones: 10, completadas: 3, progreso: 30 },
];

const resultados = [
  { fecha: "15 Mar 2026", tipo: "Resonancia Magnética", estado: "Disponible" },
  { fecha: "10 Mar 2026", tipo: "Electroencefalograma", estado: "Disponible" },
];

export default function PortalPaciente() {
  const { user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedEsp, setSelectedEsp] = useState("");
  const [selectedMed, setSelectedMed] = useState("");
  const [selectedTurno, setSelectedTurno] = useState<number | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<"presencial" | "teleconsulta">("presencial");
  const [citasAgendadas, setCitasAgendadas] = useState<CitaAgendada[]>([
    { especialidad: "Neurología", medico: "Dr. Ramírez", fecha: "20 Mar 2026", hora: "10:00", tipo: "presencial" },
    { especialidad: "Fisioterapia", medico: "Dra. Gómez", fecha: "22 Mar 2026", hora: "15:00", tipo: "presencial" },
  ]);

  const resetBooking = () => {
    setShowBooking(false);
    setStep(0);
    setSelectedEsp("");
    setSelectedMed("");
    setSelectedTurno(null);
    setSelectedTipo("presencial");
  };

  const confirmarCita = () => {
    if (selectedTurno === null) return;
    const turno = turnosDisponibles[selectedTurno];
    const newCita: CitaAgendada = {
      especialidad: selectedEsp,
      medico: selectedMed,
      fecha: turno.fecha,
      hora: turno.hora,
      tipo: selectedTipo,
      teleLink: selectedTipo === "teleconsulta" ? `/telemedicina?room=nc360-${Date.now()}` : undefined,
    };
    setCitasAgendadas((prev) => [...prev, newCita]);
    resetBooking();
  };

  return (
    <AppLayout title="Portal del Paciente">
      <div className="space-y-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6" style={{ background: "var(--gradient-primary)" }}
        >
          <h2 className="font-display font-bold text-xl text-primary-foreground">
            Bienvenid{user?.name.endsWith("a") ? "a" : "o"}, {user?.name.split(" ")[0] || "Paciente"}
          </h2>
          <p className="text-primary-foreground/70 text-sm mt-1">
            {citasAgendadas.length > 0
              ? `Tu próxima cita es el ${citasAgendadas[0].fecha} a las ${citasAgendadas[0].hora} · ${citasAgendadas[0].especialidad}`
              : "No tienes citas próximas. ¡Agenda una ahora!"}
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowBooking(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" /> Agendar Cita
            </button>
          </div>
        </motion.div>

        {/* Booking modal */}
        <AnimatePresence>
          {showBooking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4"
              onClick={resetBooking}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card rounded-xl shadow-elevated w-full max-w-lg p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-lg">Agendar Cita</h3>
                  <button onClick={resetBooking} className="p-1 rounded-lg hover:bg-muted"><X className="h-4 w-4" /></button>
                </div>

                {/* Steps indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {["Especialidad", "Médico", "Turno", "Tipo"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>{i + 1}</div>
                      <span className={`text-xs hidden sm:inline ${i <= step ? "font-medium" : "text-muted-foreground"}`}>{s}</span>
                      {i < 3 && <div className="w-4 h-px bg-border" />}
                    </div>
                  ))}
                </div>

                {/* Step 0: Especialidad */}
                {step === 0 && (
                  <div className="space-y-2">
                    {especialidades.map((e) => (
                      <button key={e} onClick={() => { setSelectedEsp(e); setStep(1); }}
                        className="w-full text-left px-4 py-3 rounded-lg border hover:border-accent hover:bg-accent/5 transition-colors text-sm font-medium"
                      >{e}</button>
                    ))}
                  </div>
                )}

                {/* Step 1: Médico */}
                {step === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">Especialidad: <strong>{selectedEsp}</strong></p>
                    {(medicos[selectedEsp] || []).map((m) => (
                      <button key={m} onClick={() => { setSelectedMed(m); setStep(2); }}
                        className="w-full text-left px-4 py-3 rounded-lg border hover:border-accent hover:bg-accent/5 transition-colors text-sm font-medium"
                      >{m}</button>
                    ))}
                    <button onClick={() => setStep(0)} className="text-xs text-muted-foreground mt-2 hover:underline">← Cambiar especialidad</button>
                  </div>
                )}

                {/* Step 2: Turno */}
                {step === 2 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">{selectedEsp} · {selectedMed}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {turnosDisponibles.map((t, i) => (
                        <button key={i} onClick={() => { setSelectedTurno(i); setStep(3); }}
                          className={`px-3 py-3 rounded-lg border text-sm text-left hover:border-accent hover:bg-accent/5 transition-colors ${
                            selectedTurno === i ? "border-accent bg-accent/5" : ""
                          }`}
                        >
                          <p className="font-medium">{t.fecha}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{t.hora}</p>
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="text-xs text-muted-foreground mt-2 hover:underline">← Cambiar médico</button>
                  </div>
                )}

                {/* Step 3: Tipo */}
                {step === 3 && (
                  <div className="space-y-4">
                    <p className="text-xs text-muted-foreground">
                      {selectedEsp} · {selectedMed} · {selectedTurno !== null && turnosDisponibles[selectedTurno].fecha} {selectedTurno !== null && turnosDisponibles[selectedTurno].hora}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedTipo("presencial")}
                        className={`p-4 rounded-lg border text-center transition-colors ${
                          selectedTipo === "presencial" ? "border-accent bg-accent/10" : "hover:border-accent"
                        }`}
                      >
                        <CalendarDays className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm font-medium">Presencial</p>
                        <p className="text-xs text-muted-foreground mt-1">En sede</p>
                      </button>
                      <button
                        onClick={() => setSelectedTipo("teleconsulta")}
                        className={`p-4 rounded-lg border text-center transition-colors ${
                          selectedTipo === "teleconsulta" ? "border-accent bg-accent/10" : "hover:border-accent"
                        }`}
                      >
                        <Video className="h-6 w-6 mx-auto mb-2 text-accent" />
                        <p className="text-sm font-medium">Teleconsulta</p>
                        <p className="text-xs text-muted-foreground mt-1">Videollamada</p>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setStep(2)} className="flex-1 h-10 rounded-lg border text-sm font-medium hover:bg-muted transition-colors">Atrás</button>
                      <button onClick={confirmarCita}
                        className="flex-1 h-10 rounded-lg text-sm font-semibold text-primary-foreground flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        style={{ background: "var(--gradient-accent)" }}
                      >
                        <Check className="h-4 w-4" /> Confirmar
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming appointments */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card rounded-xl shadow-card">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-display font-semibold text-sm">Mis Citas</h3>
            </div>
            <div className="divide-y">
              {citasAgendadas.map((c, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {c.tipo === "teleconsulta" ? <Video className="h-4 w-4 text-accent" /> : <CalendarDays className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.especialidad}</p>
                      <p className="text-xs text-muted-foreground">{c.medico} · {c.fecha} {c.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.teleLink && (
                      <a href={c.teleLink} className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                        <LinkIcon className="h-3 w-3" /> Entrar
                      </a>
                    )}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      c.tipo === "teleconsulta" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                    }`}>
                      {c.tipo === "teleconsulta" ? "Virtual" : "Presencial"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Therapy progress */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl shadow-card">
            <div className="p-5 border-b">
              <h3 className="font-display font-semibold text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" /> Progreso Terapéutico
              </h3>
            </div>
            <div className="p-5 space-y-4">
              {terapias.map((t, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t.nombre}</span>
                    <span className="text-xs text-muted-foreground">{t.completadas}/{t.sesiones}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${t.progreso}%` }}
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
          <div className="p-5 border-b">
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
