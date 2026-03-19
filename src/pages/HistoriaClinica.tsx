import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Search, Filter, FileText, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

const pacientes = [
  { id: 1, nombre: "María García", documento: "CC 52.345.678", edad: 45, diagnostico: "ACV isquémico", glasgow: 14, barthel: 65, rankin: 3, nihss: 8, estado: "Activo" },
  { id: 2, nombre: "Carlos Rodríguez", documento: "CC 80.234.567", edad: 62, diagnostico: "TEC severo", glasgow: 11, barthel: 40, rankin: 4, nihss: 14, estado: "Activo" },
  { id: 3, nombre: "Ana Pérez", documento: "CC 39.876.543", edad: 38, diagnostico: "Esclerosis múltiple", glasgow: 15, barthel: 80, rankin: 2, nihss: 4, estado: "Activo" },
  { id: 4, nombre: "Luis Martínez", documento: "CC 71.456.789", edad: 55, diagnostico: "Parkinson", glasgow: 15, barthel: 70, rankin: 2, nihss: 3, estado: "Seguimiento" },
  { id: 5, nombre: "Sofía Torres", documento: "CC 45.678.901", edad: 29, diagnostico: "Lesión medular C5", glasgow: 15, barthel: 30, rankin: 4, nihss: 6, estado: "Activo" },
];

function ScaleBadge({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  const color = pct > 70 ? "bg-success" : pct > 40 ? "bg-warning" : "bg-destructive";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}/{max}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const evoluciones = [
  { fecha: "15 Mar 2026", nota: "Mejoría en movilidad del hemicuerpo derecho. Barthel subió de 55 a 65.", medico: "Dr. Ramírez" },
  { fecha: "08 Mar 2026", nota: "Inicio de terapia ocupacional intensiva. Paciente colaboradora.", medico: "Dra. López" },
  { fecha: "01 Mar 2026", nota: "Control neurológico. Glasgow estable 14. Se ajusta medicación.", medico: "Dr. Ramírez" },
];

export default function HistoriaClinica() {
  const [selected, setSelected] = useState(pacientes[0]);

  return (
    <AppLayout title="Historia Clínica">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Patient list */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-muted border-0 focus:ring-2 focus:ring-accent outline-none"
                placeholder="Buscar paciente..."
              />
            </div>
          </div>
          <div className="divide-y max-h-[calc(100vh-240px)] overflow-auto">
            {pacientes.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`w-full text-left px-4 py-3 hover:bg-muted/30 transition-colors ${selected.id === p.id ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{p.nombre.split(" ").map(w => w[0]).join("")}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.nombre}</p>
                    <p className="text-xs text-muted-foreground">{p.diagnostico}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Detail */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-4">
          {/* Header */}
          <div className="bg-card rounded-xl shadow-card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-lg">{selected.nombre}</h2>
                <p className="text-sm text-muted-foreground">{selected.documento} · {selected.edad} años</p>
                <p className="text-sm mt-1 font-medium text-secondary">{selected.diagnostico}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${selected.estado === "Activo" ? "bg-success text-success-foreground" : "bg-info text-info-foreground"}`}>
                {selected.estado}
              </span>
            </div>

            {/* Scales */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ScaleBadge label="Glasgow" value={selected.glasgow} max={15} />
              <ScaleBadge label="Barthel" value={selected.barthel} max={100} />
              <ScaleBadge label="Rankin" value={selected.rankin} max={6} />
              <ScaleBadge label="NIHSS" value={selected.nihss} max={42} />
            </div>
          </div>

          {/* Evolution */}
          <div className="bg-card rounded-xl shadow-card p-5">
            <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              Evolución Clínica
            </h3>
            <div className="space-y-4">
              {evoluciones.map((e, i) => (
                <div key={i} className="relative pl-6 pb-4 border-l-2 border-muted last:pb-0">
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-accent" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{e.fecha}</span>
                    <span className="text-xs text-muted-foreground">· {e.medico}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.nota}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
