import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "accent" | "secondary";
}

const variantStyles = {
  default: "bg-card shadow-card",
  accent: "bg-accent text-accent-foreground shadow-glow",
  secondary: "bg-secondary text-secondary-foreground",
};

const iconVariants = {
  default: "bg-muted text-primary",
  accent: "bg-accent-foreground/20 text-accent-foreground",
  secondary: "bg-secondary-foreground/20 text-secondary-foreground",
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-5 ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${variant === "default" ? "text-muted-foreground" : "opacity-80"}`}>
            {title}
          </p>
          <p className="mt-1 text-2xl font-display font-bold">{value}</p>
          {subtitle && (
            <p className={`mt-1 text-xs ${variant === "default" ? "text-muted-foreground" : "opacity-70"}`}>
              {subtitle}
            </p>
          )}
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trend.positive ? "text-success" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={`rounded-lg p-2.5 ${iconVariants[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
