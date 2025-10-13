import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";

const Galeria = () => {
  // Placeholder images - replace these URLs with your actual photos
  const photos = [
    {
      url: "https://github.com/gomez60621-lab/lucia-herranz-soprano/blob/main/src/assets/1760389385462.jpg?w=800&h=600&fit=crop",
      title: "Concierto lírico en auditorio Jesus, Ibiza",
      description: "Temporada 2024"
    },
    {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
      title: "Recital de Ópera",
      description: "Sala de Cámara"
    },
    {
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
      title: "Actuación en Boda",
      description: "Ceremonia Especial"
    },
    {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      title: "Evento Corporativo",
      description: "Gala Anual"
    },
    {
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&fit=crop",
      title: "Concierto Benéfico",
      description: "Auditorio Nacional"
    },
    {
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
      title: "Presentación Privada",
      description: "Palacio de Congresos"
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
              <Camera className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
              Galería
            </h1>
            <p className="font-cormorant text-xl text-muted-foreground max-w-3xl mx-auto">
              Momentos capturados de actuaciones memorables, desde conciertos íntimos hasta grandes galas.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-primary-foreground">
                      <h3 className="font-playfair text-xl font-semibold mb-1">
                        {photo.title}
                      </h3>
                      <p className="font-cormorant text-sm">
                        {photo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

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

export default Galeria;
