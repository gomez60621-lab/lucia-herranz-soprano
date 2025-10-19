import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Repertorio from "./pages/Repertorio";
import Biografia from "./pages/Biografia";
import Galeria from "./pages/Galeria";
import Contacto from "./pages/Contacto";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== window.location.pathname) {
      sessionStorage.removeItem('redirectPath');
      // Use a small timeout to ensure the router is ready
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 0);
    } else if (redirectPath === window.location.pathname) {
      // Already on the correct path, just clean up
      sessionStorage.removeItem('redirectPath');
    }
  }, [navigate]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/">
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/repertorio" element={<Repertorio />} />
          <Route path="/biografia" element={<Biografia />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
