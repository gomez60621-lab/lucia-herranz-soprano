import { Link, useLocation } from "react-router-dom";
import { Music, Menu, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { path: "/", label: "Inicio" },
    { path: "/repertorio", label: "Repertorio" },
    { path: "/biografia", label: "Biografía" },
    { path: "/galeria", label: "Galería" },
    { path: "/contacto", label: "Contacto" },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Music className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
            <span className="font-playfair font-semibold text-lg text-foreground">
              Lucía Herranz
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-cormorant text-base transition-colors relative ${
                  isActive(item.path)
                    ? "text-primary font-medium"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-2 hover:bg-accent/10 rounded-md transition-colors">
                {open ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background border-l border-border">
              <div className="flex flex-col gap-6 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`font-cormorant text-xl transition-colors py-2 ${
                      isActive(item.path)
                        ? "text-primary font-medium border-l-2 border-primary pl-4"
                        : "text-foreground hover:text-primary hover:pl-4 hover:border-l-2 hover:border-primary/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
