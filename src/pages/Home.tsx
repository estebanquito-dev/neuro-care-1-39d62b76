import { motion } from "framer-motion";
import { Brain, ArrowRight, Activity, Smartphone, Globe, Users, Heart, Shield, ChevronRight, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const pilares = [
  {
    icon: Activity,
    title: "Terapias Especializadas",
    items: ["Fisioterapia", "Fonoaudiología", "Psicología", "Terapia Ocupacional", "Hidroterapia", "Método Tomatis"],
  },
  {
    icon: Globe,
    title: "Tecnología de Vanguardia",
    items: ["Realidad Virtual terapéutica", "Plataforma NeuroCare 360", "Telerehabilitación", "Monitoreo digital"],
  },
  {
    icon: Users,
    title: "Alcance Comunitario",
    items: ["Unidad Móvil", "Atención domiciliaria", "Programas de prevención", "Inclusión social"],
  },
];

const cifras = [
  { valor: "5,000+", label: "Pacientes atendidos" },
  { valor: "1,000+", label: "Pacientes rehabilitados" },
  { valor: "15+", label: "Especialistas" },
  { valor: "2", label: "Sedes internacionales" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Neuro Care 360</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
            <a href="#tecnologia" className="hover:text-foreground transition-colors">CUIDATECH</a>
            <a href="#resultados" className="hover:text-foreground transition-colors">Resultados</a>
            <a href="#compromiso" className="hover:text-foreground transition-colors">Compromiso</a>
          </div>
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent mb-6">
              Neurorrehabilitación Integral
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Innovación que{" "}
              <span className="text-gradient-primary">transforma vidas</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Neurorehabilitación con sentido humano. Atención integral y personalizada
              respaldada por tecnología de última generación para devolver independencia
              y funcionalidad a cada paciente.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                style={{ background: "var(--gradient-accent)" }}
              >
                Agendar Valoración <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border border-border hover:bg-muted transition-colors"
              >
                Conocer Servicios
              </a>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ background: "var(--gradient-primary)" }}>
              <div className="h-full flex flex-col items-center justify-center text-primary-foreground p-10 text-center">
                <Brain className="h-16 w-16 mb-6 opacity-80" />
                <p className="font-display text-2xl font-bold">Neurotrauma Center IPS</p>
                <p className="text-sm mt-2 opacity-70">Colombia · Panamá</p>
              </div>
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-elevated p-4 flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Heart className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Satisfacción pacientes</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pilares */}
      <section id="servicios" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Pilares de Innovación</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Tres ejes fundamentales que definen nuestro enfoque integral en neurorrehabilitación.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pilares.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <p.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{p.title}</h3>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-3 w-3 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CUIDATECH */}
      <section id="tecnologia" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary mb-4">
              Investigación e Innovación
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold">CUIDATECH</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nuestro departamento de investigación y desarrollo tecnológico impulsa políticas de
              innovación que mejoran la calidad de vida de nuestros usuarios. Combinamos ciencia,
              tecnología y humanismo para crear soluciones terapéuticas de vanguardia.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "Protocolos basados en evidencia" },
                { icon: Smartphone, label: "Telerehabilitación avanzada" },
                { icon: Globe, label: "Realidad Virtual terapéutica" },
                { icon: Activity, label: "Monitoreo continuo IA" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm">
                  <f.icon className="h-4 w-4 text-accent shrink-0" />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="rounded-2xl p-8 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Brain className="h-12 w-12 mb-6 opacity-70" />
              <p className="font-display text-xl font-bold mb-2">
                "La tecnología al servicio de la recuperación"
              </p>
              <p className="text-sm opacity-70 leading-relaxed">
                CUIDATECH integra realidad virtual, inteligencia artificial y plataformas digitales
                para potenciar cada etapa del proceso de neurorrehabilitación.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cifras */}
      <section id="resultados" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Cifras que inspiran</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cifras.map((c, i) => (
              <motion.div
                key={c.label}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 text-center shadow-card"
              >
                <p className="font-display text-3xl font-extrabold text-accent">{c.valor}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimony */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="mt-12 bg-card rounded-xl p-8 shadow-card max-w-3xl mx-auto text-center">
            <p className="text-lg italic text-muted-foreground leading-relaxed">
              "Gracias a Neurotrauma Center, Jerónimo recuperó su independencia. El equipo
              multidisciplinario, la tecnología y sobre todo el cariño marcaron la diferencia
              en su proceso de rehabilitación."
            </p>
            <p className="mt-4 font-display font-semibold text-sm">Familia de Jerónimo</p>
            <p className="text-xs text-muted-foreground">Paciente de neurorrehabilitación pediátrica</p>
          </motion.div>
        </div>
      </section>

      {/* Compromiso */}
      <section id="compromiso" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Compromiso Humano</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Cooperamos con instituciones educativas y apoyamos a población vulnerable,
              reforzando nuestro compromiso ético y social con la comunidad.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mt-10 flex flex-wrap justify-center gap-6">
            {["Alianzas universitarias", "Apoyo a población vulnerable", "Investigación clínica", "Responsabilidad social"].map(
              (item) => (
                <div key={item} className="px-5 py-3 rounded-full border bg-card text-sm font-medium shadow-card">
                  {item}
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-12 px-6 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6" />
              <span className="font-display font-bold text-lg">Neuro Care 360</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Plataforma integral de neurorrehabilitación de Neurotrauma Center IPS.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Sedes</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Sede Principal — Bucaramanga, Colombia</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Campus UDES — Bucaramanga, Colombia</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Sede Panamá</p>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Contacto</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +57 (607) 000 0000</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> info@neurotraumacenter.com</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-primary-foreground/20 text-center text-xs opacity-50">
          © 2026 Neurotrauma Center IPS. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
