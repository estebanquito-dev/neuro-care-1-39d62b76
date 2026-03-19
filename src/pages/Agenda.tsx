import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from "lucide-react";
import { useState } from "react";

const dias = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const horas = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

interface Cita {
  hora: string;
  dia: number;
  paciente: string;
  especialidad: string;
  tipo: "presencial" | "virtual";
  duracion: number; // in slots
}

const citas: Cita[] = [
  { hora: "08:00", dia: 0, paciente: "María G.", especialidad: "Neurología", tipo: "presencial", duracion: 1 },
  { hora: "09:00", dia: 0, paciente: "Carlos R.", especialidad: "Fisioterapia", tipo: "presencial", duracion: 2 },
  { hora: "10:00", dia: 1, paciente: "Ana P.", especialidad: "Fonoaudiología", tipo: "virtual", duracion: 1 },
  { hora: "14:00", dia: 1, paciente: "Luis M.", especialidad: "Neurología", tipo: "presencial", duracion: 1 },
  { hora: "08:00", dia: 2, paciente: "Sofía T.", especialidad: "Psicología", tipo: "virtual", duracion: 1 },
  { hora: "11:00", dia: 2, paciente: "Pedro V.", especialidad: "T. Ocupacional", tipo: "presencial", duracion: 1 },
  { hora: "09:00", dia: 3, paciente: "Laura S.", especialidad: "Fisioterapia", tipo: "presencial", duracion: 2 },
  { hora: "15:00", dia: 4, paciente: "Diego H.", especialidad: "Neurología", tipo: "virtual", duracion: 1 },
];

const tipoStyles = {
  presencial: "bg-primary/10 border-l-primary text-foreground",
  virtual: "bg-accent/10 border-l-accent text-foreground",
};

export default function Agenda() {
  return (
    <AppLayout title="Agenda Médica">
      <div className="space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="font-display font-bold text-base">16 – 21 Marzo 2026</h2>
            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Nueva Cita
          </button>
        </motion.div>

        {/* Calendar grid */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="grid grid-cols-[60px_repeat(6,1fr)] border-b">
            <div className="p-3" />
            {dias.map((d, i) => (
              <div key={d} className={`p-3 text-center border-l ${i === 0 ? "bg-primary/5" : ""}`}>
                <p className="text-xs text-muted-foreground">{d}</p>
                <p className={`text-lg font-display font-bold ${i === 0 ? "text-primary" : ""}`}>{16 + i}</p>
              </div>
            ))}
          </div>
          <div className="max-h-[calc(100vh-280px)] overflow-auto">
            {horas.map((hora) => (
              <div key={hora} className="grid grid-cols-[60px_repeat(6,1fr)] border-b last:border-b-0 min-h-[64px]">
                <div className="p-2 text-xs text-muted-foreground text-right pr-3 pt-3">{hora}</div>
                {dias.map((_, diaIdx) => {
                  const cita = citas.find((c) => c.hora === hora && c.dia === diaIdx);
                  return (
                    <div key={diaIdx} className="border-l p-1 relative">
                      {cita && (
                        <div className={`rounded-md border-l-[3px] p-2 text-xs cursor-pointer hover:shadow-elevated transition-shadow ${tipoStyles[cita.tipo]}`}>
                          <p className="font-semibold truncate">{cita.paciente}</p>
                          <p className="text-muted-foreground truncate">{cita.especialidad}</p>
                          <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                            {cita.tipo === "virtual" ? (
                              <span className="text-accent text-[10px] font-medium">● Virtual</span>
                            ) : (
                              <span className="text-[10px]">
                                <MapPin className="inline h-3 w-3" /> Sede
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
