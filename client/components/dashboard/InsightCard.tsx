import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  title: string;
  value: string;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
}

export function InsightCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendType = "neutral",
}: InsightCardProps) {
  const trendColors = {
    positive: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
    negative: "text-rose-400 bg-rose-500/20 border-rose-500/30",
    neutral: "text-muted-foreground bg-white/5 border-white/10",
  };

  return (
    <div className="glass-card interactive group p-6 h-full flex flex-col relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/20 flex items-center justify-center shadow-lg shadow-accent/10 group-hover:shadow-accent/20 transition-all duration-300">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        </div>

        <p className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {value}
        </p>

        {subtext && (
          <p className="text-xs text-muted-foreground mb-3">{subtext}</p>
        )}

        {trend && (
          <div className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border inline-block transition-all duration-200 ${trendColors[trendType]}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
