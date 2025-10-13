import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music4 } from "lucide-react";

const Repertorio = () => {
  const videos = [
    {
      title: "Ave María - Schubert",
      description: "Interpretación en concierto",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "O Mio Babbino Caro - Puccini",
      description: "Recital de ópera italiana",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Hallelujah - Cohen",
      description: "Versión en ceremonia",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-elegant rounded-full flex items-center justify-center">
              <Music4 className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
              Repertorio
            </h1>
            <p className="font-cormorant text-xl text-muted-foreground max-w-3xl mx-auto">
              Una selección de interpretaciones que abarcan desde arias clásicas hasta piezas contemporáneas, 
              cada una ejecutada con pasión y técnica refinada.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-playfair text-xl text-foreground">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="font-cormorant text-base">
                    {video.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Additional Content */}
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto p-8 bg-gradient-subtle rounded-lg shadow-soft">
              <h2 className="font-playfair text-3xl font-semibold text-foreground mb-4">
                Repertorio Personalizado
              </h2>
              <p className="font-cormorant text-lg text-muted-foreground">
                Cada evento es único. Trabajo contigo para seleccionar el repertorio perfecto que complemente 
                la atmósfera y el significado de tu celebración. Desde arias de ópera hasta canciones modernas 
                adaptadas, puedo crear la experiencia musical que imaginas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-cormorant text-muted-foreground">
            © 2025 Soprano Profesional. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Repertorio;
