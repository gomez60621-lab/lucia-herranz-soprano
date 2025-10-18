import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ExternalLink, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Biography {
  id: string;
  photo_url: string;
  biography_text: string;
}

interface PressLink {
  id: string;
  title: string;
  source: string;
  url: string;
  order_index: number;
}

const Biografia = () => {
  const [biography, setBiography] = useState<Biography | null>(null);
  const [pressLinks, setPressLinks] = useState<PressLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBiography();
    loadPressLinks();
  }, []);

  const loadBiography = async () => {
    try {
      const { data, error } = await supabase
        .from("biography")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      setBiography(data);
    } catch (error) {
      console.error("Error loading biography:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadPressLinks = async () => {
    try {
      const { data, error } = await supabase
        .from("press_links")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setPressLinks(data || []);
    } catch (error) {
      console.error("Error loading press links:", error);
    }
  };

  // Divide el texto en párrafos
  const biographyParagraphs = biography?.biography_text.split('\n\n').filter(p => p.trim()) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-center text-foreground mb-4 animate-fade-in">
            Biografía
          </h1>
          <p className="font-cormorant text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            Descubre la historia y trayectoria de Lucía Herranz
          </p>
        </div>
      </section>

      {/* Main Biography Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            {/* Photo */}
            <div className="animate-fade-in">
              {biography?.photo_url && (
                <img
                  src={biography.photo_url}
                  alt="Lucía Herranz - Soprano"
                  className="w-full rounded-lg shadow-elegant hover-scale"
                />
              )}
            </div>

            {/* Personal Information */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                Lucía Herranz
              </h2>
              <div className="font-cormorant text-lg text-muted-foreground space-y-4 leading-relaxed">
                {biographyParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Press Section */}
          {pressLinks.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Apariciones en Prensa
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {pressLinks.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 bg-card rounded-lg shadow-soft hover:shadow-elegant transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-sm font-cormorant text-primary font-semibold">
                        {article.source}
                      </span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-cormorant text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            Solicita Información
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground mb-8">
            Contacta para consultar disponibilidad y hacer de tu evento algo inolvidable
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
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-cormorant text-muted-foreground">
            © 2025 Lucía Herranz - Soprano Profesional. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Biografia;
