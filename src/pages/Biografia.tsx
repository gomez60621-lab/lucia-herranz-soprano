import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ExternalLink, Quote } from "lucide-react";
import bioImage from "@/assets/1760389683892.jpg";

const Biografia = () => {
  const articles = [
    {
      title: "La soprano ibicenca Lucía Herranz inaugura el Festival de Música de Cámara",
      source: "Santa Eulària des Riu",
      url: "https://santaeulariadesriu.com/es/actualidad/noticias/9731-la-soprano-ibicenca-lucia-herranz-inaugura-este-domingo-el-festival-de-musica-de-camara-con-un-recital-de-duetos-y-arias-junto-al-tenor-adria-mas-y-la-pianista-olga-kobekina"
    },
    {
      title: "Lucía Herranz y Adolfo Villalonga ofrecen un concierto gratuito en el claustro del Ayuntamiento de Eivissa",
      source: "Nou Diari",
      url: "https://www.noudiari.es/cultura-ibiza/lucia-herranz-y-adolfo-villalonga-ofrecen-un-concierto-gratuito-en-el-claustro-del-ayuntamiento-de-eivissa/"
    },
    {
      title: "Mañana sonar la cantante",
      source: "Diario de Ibiza",
      url: "https://www.diariodeibiza.es/sociedad/2025/02/24/manana-sonar-cantante-114609023.html"
    }
  ];

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
              <img 
                src={bioImage}
                alt="Lucía Herranz - Soprano" 
                className="w-full rounded-lg shadow-elegant hover-scale"
              />
            </div>

            {/* Personal Information */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
                Lucía Herranz
              </h2>
              <div className="font-cormorant text-lg text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  Soprano profesional nacida en Ibiza, Lucía Herranz ha cautivado a audiencias en toda España con su voz excepcional y su profunda sensibilidad artística.
                </p>
                <p>
                  Formada en las más prestigiosas instituciones musicales, Lucía combina una sólida técnica vocal con una interpretación emotiva que conecta directamente con el corazón del público.
                </p>
                <p>
                  Su versatilidad le permite desenvolverse con maestría tanto en el repertorio operístico clásico como en obras contemporáneas, convirtiéndola en una artista completa y de reconocida trayectoria.
                </p>
                <p>
                  Ha participado en numerosos conciertos, festivales y eventos exclusivos, aportando elegancia y distinción a cada actuación. Su compromiso con la excelencia musical la ha establecido como una referencia en el panorama lírico español.
                </p>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="mb-16 p-8 md:p-12 bg-gradient-elegant rounded-lg shadow-elegant animate-fade-in">
            <Quote className="w-12 h-12 text-primary-foreground/40 mb-4" />
            <blockquote className="font-cormorant text-2xl md:text-3xl text-primary-foreground italic leading-relaxed">
              "La música es el lenguaje del alma, y cada nota que canto es un puente entre mi corazón y el de quienes me escuchan"
            </blockquote>
            <p className="font-cormorant text-xl text-primary-foreground/80 mt-6 text-right">
              — Lucía Herranz
            </p>
          </div>

          {/* Press Section */}
          <div className="animate-fade-in">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Apariciones en Prensa
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <a
                  key={index}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Quieres trabajar conmigo?
          </h2>
          <p className="font-cormorant text-xl text-muted-foreground mb-8">
            Contacta para consultar disponibilidad y hacer de tu evento algo inolvidable
          </p>
          <Link to="/contacto">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-cormorant text-lg px-8 py-6 shadow-elegant"
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
