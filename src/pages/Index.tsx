import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-soprano.jpg";
import { Music2, Calendar, Users, Instagram } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center pt-32 pb-16 px-6 overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in mb-12">
          <p className="font-cormorant text-lg md:text-xl text-muted-foreground mb-2">
            Soprano Profesional
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-2">
            Lucía Herranz
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Una voz que trasciende en eventos exclusivos, bodas de ensueño y conciertos memorables
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repertorio">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-cormorant text-lg px-8 py-6"
              >
                Ver Repertorio
              </Button>
            </Link>
            <Link to="/contacto">
              <Button 
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-cormorant text-lg px-8 py-6"
              >
                Solicitar Información
              </Button>
            </Link>
          </div>
        </div>

        <div 
          className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-elegant transition-transform duration-700 hover:scale-105"
          style={{ 
            transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.3 : 0}px)`,
          }}
        >
          <img 
            src={heroImage} 
            alt="Lucía Herranz - Soprano" 
            className="w-full h-auto object-cover"
            onLoad={(e) => {
              window.addEventListener('scroll', () => {
                const target = e.currentTarget.parentElement;
                if (target) {
                  target.style.transform = `translateY(${window.scrollY * 0.3}px)`;
                }
              });
            }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
            Servicios
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-lg shadow-soft hover:shadow-elegant transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                Bodas
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground">
                Momentos únicos con música celestial para el día más especial de tu vida
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg shadow-soft hover:shadow-elegant transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center">
                <Music2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                Conciertos
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground">
                Presentaciones en vivo con repertorio clásico y contemporáneo de excelencia
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg shadow-soft hover:shadow-elegant transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                Eventos
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground">
                Actuaciones exclusivas para galas, celebraciones corporativas y eventos privados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Haz de Tu Evento Algo Inolvidable
          </h2>
          <p className="font-cormorant text-xl text-primary-foreground/90 mb-8">
            Contacta hoy para consultar disponibilidad y crear juntos una experiencia musical única
          </p>
          <Link to="/contacto">
            <Button 
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-cormorant text-lg px-8 py-6 shadow-elegant"
            >
              Solicitar Información
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <a 
            href="https://www.instagram.com/luciaherranz_soprano" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-6 h-6" />
            <span className="font-cormorant text-lg">@luciaherranz_soprano</span>
          </a>
          <p className="font-cormorant text-muted-foreground">
            © 2025 Lucía Herranz - Soprano Profesional. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
