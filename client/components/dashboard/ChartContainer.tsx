import { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ChartContainer({
  title,
  description,
  children,
  footer,
}: ChartContainerProps) {
  return (
    <div className="glass-card p-6 h-full group">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex-1 mb-4 transition-all duration-300 group-hover:opacity-105">
        {children}
      </div>

      {footer && (
        <div className="border-t border-white/10 pt-4 text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}
