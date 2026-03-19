import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, FileText, Monitor } from "lucide-react";
import { useState } from "react";

const consultasHoy = [
  { hora: "09:00", paciente: "María García", especialidad: "Neurología", estado: "completada" },
  { hora: "10:30", paciente: "Ana Pérez", especialidad: "Fonoaudiología", estado: "en-curso" },
  { hora: "11:30", paciente: "Luis Martínez", especialidad: "Neurología", estado: "pendiente" },
  { hora: "14:00", paciente: "Sofía Torres", especialidad: "Psicología", estado: "pendiente" },
];

const estadoLabel: Record<string, { text: string; class: string }> = {
  completada: { text: "Completada", class: "bg-muted text-muted-foreground" },
  "en-curso": { text: "En curso", class: "bg-accent text-accent-foreground" },
  pendiente: { text: "Pendiente", class: "bg-warning/20 text-warning" },
};

export default function Telemedicina() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  return (
    <AppLayout title="Telemedicina">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video area */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="lg:col-span-3 space-y-4">
          {/* Main video */}
          <div className="relative bg-primary rounded-xl aspect-video overflow-hidden flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto">
                <span className="text-3xl font-display font-bold text-primary-foreground/50">AP</span>
              </div>
              <p className="text-primary-foreground/70 text-sm">Ana Pérez — Fonoaudiología</p>
              <p className="text-accent text-xs font-medium animate-pulse-soft">● Conectada</p>
            </div>

            {/* Self view */}
            <div className="absolute bottom-4 right-4 w-40 h-28 bg-sidebar rounded-lg flex items-center justify-center border-2 border-sidebar-border">
              <span className="text-sm font-display font-bold text-sidebar-foreground/50">Dr. Ramírez</span>
            </div>

            {/* Timer */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-destructive animate-pulse-soft" />
              <span className="text-xs font-medium text-primary-foreground">12:34</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setMicOn(!micOn)} className={`p-3 rounded-full transition-colors ${micOn ? "bg-muted hover:bg-muted/80" : "bg-destructive text-destructive-foreground"}`}>
              {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            <button onClick={() => setCamOn(!camOn)} className={`p-3 rounded-full transition-colors ${camOn ? "bg-muted hover:bg-muted/80" : "bg-destructive text-destructive-foreground"}`}>
              {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <Monitor className="h-5 w-5" />
            </button>
            <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <FileText className="h-5 w-5" />
            </button>
            <button className="p-4 rounded-full bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity ml-2">
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Sidebar: Today's consultations */}
        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-display font-semibold text-sm">Consultas de Hoy</h3>
          </div>
          <div className="divide-y">
            {consultasHoy.map((c, i) => {
              const est = estadoLabel[c.estado];
              return (
                <div key={i} className={`px-4 py-3 ${c.estado === "en-curso" ? "bg-accent/5" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{c.paciente}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${est.class}`}>{est.text}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{c.hora}</span>
                    <span>·</span>
                    <span>{c.especialidad}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
