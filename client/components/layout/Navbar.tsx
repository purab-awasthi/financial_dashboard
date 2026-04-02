import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  LogOut,
  ChevronDown,
  User,
  Menu,
  ShieldAlert,
  Settings2,
  Users,
  ShieldCheck,
  TerminalSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

interface NavbarProps {
  userName?: string;
  onMenuClick?: () => void;
}

export function Navbar({
  userName = "Purab Awasthi",
  onMenuClick,
}: NavbarProps) {
  const { role: userRole, setRole, isAdmin } = useUser();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  
  const configRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (configRef.current && !configRef.current.contains(event.target as Node)) {
        setConfigOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchRole = (newRole: "Viewer" | "Admin") => {
    setRole(newRole);
    setDropdownOpen(false);
    setConfigOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-sidebar z-40 h-16 border-b border-white/[0.04] bg-background/50 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 md:px-6 gap-4">
        
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-xl hover:bg-white/[0.08] text-muted-foreground transition-all duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center flex-1 gap-4 max-w-2xl">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="dash-input pl-10 w-full bg-secondary/50 border-white/5 focus:border-primary/50 transition-all duration-300"
            />
          </div>

          {isAdmin && (
            <div className="relative hidden lg:block animate-fade-in" ref={configRef}>
              <button 
                onClick={() => setConfigOpen(!configOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap border",
                  configOpen 
                    ? "bg-rose-500/20 border-rose-500/40 text-rose-400" 
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                )}
              >
                <Settings2 className="w-4 h-4" />
                <span className="text-sm font-medium">System Config</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", configOpen && "rotate-180")} />
              </button>

              {configOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-secondary border border-white/5 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl z-50 overflow-hidden py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-all">
                    <Users className="w-4 h-4" /> Manage Users
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-all">
                    <ShieldCheck className="w-4 h-4" /> Security Policies
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-all">
                    <TerminalSquare className="w-4 h-4" /> Audit Logs
                  </button>
                  <div className="h-px w-full bg-white/[0.02] my-1"></div>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-all font-medium">
                    Server Restart
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 rounded-xl hover:bg-white/[0.08] transition-all duration-200"
          >
            <Bell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            <span className={cn(
              "absolute top-1.5 right-1.5 w-2 h-2 rounded-full transition-colors duration-300",
              isAdmin ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" : "bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            )}></span>
          </button>

          <div className="relative hidden sm:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 text-sm font-medium border",
                isAdmin 
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20" 
                  : "bg-transparent text-foreground border-transparent hover:border-white/5 hover:bg-white/[0.04]"
              )}
            >
              {isAdmin && <ShieldAlert className="w-3.5 h-3.5 mr-1" />}
              <span>{userRole}</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-secondary border border-white/5 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl z-50 overflow-hidden">
                <button
                  onClick={() => switchRole("Viewer")}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-all duration-200",
                    !isAdmin
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      : "hover:bg-white/[0.04] text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                  )}
                >
                  Viewer
                </button>
                <div className="h-px w-full bg-white/[0.02]"></div>
                <button
                  onClick={() => switchRole("Admin")}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-all duration-200",
                    isAdmin
                      ? "bg-rose-500/10 text-rose-400 font-medium border-l-2 border-rose-500"
                      : "hover:bg-white/[0.04] text-muted-foreground hover:text-foreground border-l-2 border-transparent"
                  )}
                >
                  Admin
                </button>
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-white/[0.06] hidden sm:block"></div>

          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:opacity-80">
                {userName}
              </p>
              <p className={cn(
                "text-xs transition-colors duration-300",
                isAdmin ? "text-rose-400/80" : "text-muted-foreground"
              )}>{userRole}</p>
            </div>
            
            <button className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border",
              isAdmin 
                ? "bg-rose-500/10 border-rose-500/30 text-rose-400 group-hover:border-rose-500/60 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                : "bg-primary/10 border-primary/20 text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            )}>
              <User className="w-4 h-4" />
            </button>
          </div>

          <button className="hidden sm:flex p-2 rounded-xl hover:bg-white/[0.08] transition-all duration-200 ml-1">
            <LogOut className="w-5 h-5 text-muted-foreground hover:text-rose-400 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}