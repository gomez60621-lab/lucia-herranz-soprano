import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-soprano.jpg";
import { Music2, Calendar, Users, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HomePageContent {
  subtitle: string;
  main_title: string;
  description: string;
  hero_image_url: string | null;
  service1_title: string;
  service1_description: string;
  service2_title: string;
  service2_description: string;
  service3_title: string;
  service3_description: string;
  cta_title: string;
  cta_description: string;
}

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [content, setContent] = useState<HomePageContent | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from("homepage")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error loading homepage content:", error);
        return;
      }

      setContent(data);
    } catch (error) {
      console.error("Error loading homepage content:", error);
    }
  };

  // Default content in case database hasn't been set up yet
  const displayContent = content || {
    subtitle: "Soprano Profesional",
    main_title: "Lucía Herranz",
    description: "Una voz que trasciende en eventos exclusivos, bodas de ensueño y conciertos memorables",
    hero_image_url: null,
    service1_title: "Ceremonias",
    service1_description: "Momentos únicos con música celestial para ocasiones especiales",
    service2_title: "Conciertos",
    service2_description: "Presentaciones en vivo con repertorio clásico y contemporáneo de excelencia",
    service3_title: "Eventos",
    service3_description: "Actuaciones exclusivas para galas, celebraciones corporativas y eventos privados",
    cta_title: "Haz de Tu Evento Algo Inolvidable",
    cta_description: "Contacta hoy para consultar disponibilidad y crear juntos una experiencia musical única",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center pt-32 pb-16 px-6 overflow-hidden">
        <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in mb-12">
          <p className="font-cormorant text-lg md:text-xl text-muted-foreground mb-2">
            {displayContent.subtitle}
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-2">
            {displayContent.main_title}
          </h1>
          <p className="font-cormorant text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {displayContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/repertorio">
              <Button 
                size="lg"
                variant="outline"
                className="font-cormorant text-lg px-8 py-6"
              >
                Ver Repertorio
              </Button>
            </Link>
            <Link to="/contacto">
              <Button 
                size="lg"
                variant="outline"
                className="font-cormorant text-lg px-8 py-6"
              >
                Solicitar Información
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-elegant"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img
            src={displayContent.hero_image_url || heroImage}
            alt="Lucía Herranz - Soprano"
            className="w-full h-auto object-cover"
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
                {displayContent.service1_title}
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground">
                {displayContent.service1_description}
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg shadow-soft hover:shadow-elegant transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center">
                <Music2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                {displayContent.service2_title}
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground">
                {displayContent.service2_description}
              </p>
            </div>

            <div className="text-center p-8 bg-card rounded-lg shadow-soft hover:shadow-elegant transition-all">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-foreground mb-4">
                {displayContent.service3_title}
              </h3>
              <p className="font-cormorant text-lg text-muted-foreground">
                {displayContent.service3_description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {displayContent.cta_title}
          </h2>
          <p className="font-cormorant text-xl text-primary-foreground/90 mb-8">
            {displayContent.cta_description}
          </p>
          <Link to="/contacto">
            <Button 
              size="lg"
              variant="outline"
              className="font-cormorant text-lg px-8 py-6 shadow-elegant"
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
