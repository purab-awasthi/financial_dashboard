import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [userRole, setUserRole] = useState<"Viewer" | "Admin">("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // THE FIX IS HERE: Changed bg-background to bg-transparent
    <div className="min-h-screen bg-transparent">
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-sidebar z-40 transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Navbar */}
      <Navbar
        userRole={userRole}
        onRoleChange={setUserRole}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="pt-16 md:ml-sidebar transition-all duration-300 overflow-x-hidden max-w-full">
        <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}