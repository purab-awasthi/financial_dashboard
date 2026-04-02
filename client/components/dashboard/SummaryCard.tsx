import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative";
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "positive",
}: SummaryCardProps) {
  return (
    <div className="glass-card interactive group p-6 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/20 flex items-center justify-center shadow-lg shadow-accent/10 group-hover:shadow-accent/20 transition-all duration-300">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        </div>

        <p className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {value}
        </p>

        {change && (
          <div className="flex items-center gap-1">
            <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
              changeType === "positive"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}>
              {changeType === "positive" ? "↑" : "↓"} {change}
            </span>
            <span className="text-xs text-muted-foreground">from last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
