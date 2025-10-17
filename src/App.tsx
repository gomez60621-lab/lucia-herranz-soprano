import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Repertorio from "./pages/Repertorio";
import Biografia from "./pages/Biografia";
import Galeria from "./pages/Galeria";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import AdminUpload from "./components/AdminUpload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/lucia-herranz-soprano">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/repertorio" element={<Repertorio />} />
          <Route path="/biografia" element={<Biografia />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<AdminUpload />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
