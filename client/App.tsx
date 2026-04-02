import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import Silk from "@/components/ui/Silk"; 

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        {/* BRUTE FORCE BACKGROUND LAYER */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -50, pointerEvents: 'none', background: '#09090b' }}>
          {/* Using bright cyan (#38bdf8) and high opacity so you can clearly see if it renders */}
          <Silk speed={40} scale={1.4} color="hsl(233, 93%, 23%)" noiseIntensity={0.4} rotation={0.2} />
        </div>

        {/* YOUR APP CONTENT */}
        {/* Notice we removed 'bg-background' from here so it doesn't block the canvas */}
        <div className="relative z-10 flex flex-col min-h-screen text-foreground overflow-x-hidden">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </div>
        
      </TooltipProvider>
    </QueryClientProvider>
  );
}