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
                  Nacida en el Mediterráneo con el telón de fondo y una nota alta en el corazón, Lucía Herranz no canta: embruja. Esta soprano ibicenca ha elevado el arte del canto lírica a nuevas
                  alturas, llevando su voz desde los escenarios más selectos de la isla hasta los rincones más inesperados de los eventos elegantes. 
                </p>
                <p>
                  Formada con el rigor clásico, pero con un alma libre - como buena isleña -, Lucía combina técnica con una sensibilidad que hace vibrar hasta el último canapé del cóctel. ¿Una gala en un viñedo? ¿Una boda junto a un acantilado? ¿Una cena 
                  privada bajo las estrellas? Si hay glamour y buen gusto, allí estará Lucía, afinando el ambiente con estilo y una sonrisa que vale más que mil partituras. 
                </p>
                <p>
                  Con un repertorio que va desde la ópera más exigente hasta versiones exquisitas de clásicos modernos, Lucía transforma cada evento en una experiencia sensorial donde la música deja
                  de oírse... para sentirse.
                </p>
              </div>
            </div>
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
