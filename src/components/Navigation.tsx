import { Link, useLocation } from "react-router-dom";
import { Music } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
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
          
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-cormorant text-base transition-colors relative ${
                isActive("/")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Inicio
              {isActive("/") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
            
            <Link
              to="/repertorio"
              className={`font-cormorant text-base transition-colors relative ${
                isActive("/repertorio")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Repertorio
              {isActive("/repertorio") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
            
            <Link
              to="/biografia"
              className={`font-cormorant text-base transition-colors relative ${
                isActive("/biografia")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Biografía
              {isActive("/biografia") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
            
            <Link
              to="/galeria"
              className={`font-cormorant text-base transition-colors relative ${
                isActive("/galeria")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Galería
              {isActive("/galeria") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
            
            <Link
              to="/contacto"
              className={`font-cormorant text-base transition-colors relative ${
                isActive("/contacto")
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
            >
              Contacto
              {isActive("/contacto") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
