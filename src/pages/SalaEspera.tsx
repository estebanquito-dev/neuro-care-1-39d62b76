import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Brain } from "lucide-react";
import { useState, useEffect } from "react";

const turnos = [
  { turno: "A-012", iniciales: "MG", consultorio: "C-01", especialidad: "Neurología", estado: "actual" },
  { turno: "A-013", iniciales: "CR", consultorio: "C-02", especialidad: "Fisioterapia", estado: "proximo" },
  { turno: "A-014", iniciales: "AP", consultorio: "C-01", especialidad: "Fonoaudiología", estado: "proximo" },
  { turno: "A-015", iniciales: "LM", consultorio: "C-03", especialidad: "Neurología", estado: "proximo" },
  { turno: "A-016", iniciales: "ST", consultorio: "C-02", especialidad: "Psicología", estado: "proximo" },
  { turno: "A-017", iniciales: "PV", consultorio: "C-01", especialidad: "T. Ocupacional", estado: "proximo" },
];

const tips = [
  "🧠 La neurorrehabilitación temprana mejora los resultados hasta en un 40%",
  "💪 La constancia en las terapias es clave para la recuperación neurológica",
  "🏥 Neurotrauma Center cuenta con tecnología de última generación",
  "📱 Descarga nuestra app para seguir tu progreso desde casa",
];

export default function SalaEspera() {
  const [time, setTime] = useState(new Date());
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 6000);
    return () => clearInterval(t);
  }, []);

  const actual = turnos[0];
  const proximos = turnos.slice(1);

  return (
    <div className="min-h-screen text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
            <Brain className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">NeuroCare 360</h1>
            <p className="text-xs text-primary-foreground/60">Neurotrauma Center</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-bold tabular-nums">
            {time.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-xs text-primary-foreground/60">
            {time.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </header>

      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current turn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-1 rounded-2xl p-8 flex flex-col items-center justify-center text-center"
          style={{ background: "var(--gradient-accent)" }}
        >
          <p className="text-sm font-medium text-accent-foreground/70 uppercase tracking-wider mb-2">Turno Actual</p>
          <motion.p
            key={actual.turno}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-display font-extrabold text-accent-foreground"
          >
            {actual.turno}
          </motion.p>
          <div className="mt-4 h-16 w-16 rounded-full bg-accent-foreground/20 flex items-center justify-center">
            <span className="text-2xl font-display font-bold text-accent-foreground">{actual.iniciales}</span>
          </div>
          <p className="mt-3 text-lg font-semibold text-accent-foreground">{actual.consultorio}</p>
          <p className="text-sm text-accent-foreground/70">{actual.especialidad}</p>
        </motion.div>

        {/* Queue */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-lg">Próximos Turnos</h2>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <Users className="h-4 w-4" />
              <span>{proximos.length} en espera</span>
            </div>
          </div>

          <div className="space-y-3">
            {proximos.map((t, i) => (
              <motion.div
                key={t.turno}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-center justify-between rounded-xl bg-primary-foreground/5 px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-display font-bold text-accent">{t.turno}</span>
                  <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                    <span className="text-sm font-bold">{t.iniciales}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.especialidad}</p>
                    <p className="text-xs text-primary-foreground/50">{t.consultorio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                  <Clock className="h-4 w-4" />
                  <span>~{(i + 1) * 15} min</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <div className="fixed bottom-0 inset-x-0 bg-primary-foreground/5 backdrop-blur-sm border-t border-primary-foreground/10">
        <div className="px-8 py-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-sm text-center text-primary-foreground/70"
            >
              {tips[tipIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
