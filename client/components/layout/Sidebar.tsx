import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, ArrowRightLeft, LucideIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  onClose?: () => void;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: ArrowRightLeft,
  },
  {
    label: "Insights",
    href: "/insights",
    icon: TrendingUp,
  },
];

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="h-screen w-full flex flex-col border-r border-white/[0.04] bg-background/50 backdrop-blur-xl z-40 relative">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-white/[0.04]">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
          <span className="text-xs font-bold text-background">FD</span>
        </div>
        <span className="font-bold text-lg text-foreground tracking-wide">
          Financial Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm group relative overflow-hidden",
                isActive
                  ? "text-primary bg-primary/10 shadow-[inset_0_0_20px_rgba(56,189,248,0.05)] border border-primary/20"
                  : "text-muted-foreground hover:bg-white/[0.02] hover:text-foreground border border-transparent"
              )}
            >
              {/* Subtle left glow bar for active state */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
              )}
              
              <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "group-hover:text-foreground")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Settings Button */}
      <div className="border-t border-white/[0.04] px-4 py-6">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary border border-white/5 text-foreground text-sm font-medium hover:bg-secondary/80 hover:border-white/10 transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}