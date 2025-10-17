import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera, Instagram, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import image1 from "@/assets/1760389385462.jpg";
import image2 from "@/assets/1760389453082.jpg";
import image3 from "@/assets/1760389644220.jpg";
import instagramData from "@/data/instagram-posts.json";

const Galeria = () => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; description: string } | null>(null);
  // Fallback photos if Instagram posts aren't loaded yet
  const fallbackPhotos = [
    {
      url: image1,
      title: "Concierto lírico en auditorio Jesus, Ibiza",
      description: "Temporada 2024",
      permalink: null
    },
    {
      url: image2,
      title: "Noches en 1742, Ibiza",
      description: "Temporada 2023",
      permalink: null
    },
    {
      url: image3,
      title: "Fira de la sal San Jordi, Ibiza",
      description: "Temporada 2022",
      permalink: null
    },
  ];

  // Use Instagram posts if available, otherwise use fallback
  const photos = instagramData.posts && instagramData.posts.length > 0
    ? instagramData.posts
    : fallbackPhotos;

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
                {photo.permalink ? (
                  <a
                    href={photo.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="text-primary-foreground">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-playfair text-xl font-semibold">
                              {photo.title}
                            </h3>
                            <ExternalLink className="w-5 h-5 flex-shrink-0" />
                          </div>
                          <p className="font-cormorant text-sm">
                            {photo.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div 
                    className="aspect-[4/3] relative overflow-hidden bg-muted cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  >
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
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-full p-0 border-0 bg-transparent">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-12 right-0 z-50 p-2 rounded-full bg-opera-red text-opera-white hover:bg-opera-red/90 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
          {selectedImage && (
            <div className="relative w-full animate-fade-in">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 rounded-b-lg">
                <h3 className="font-playfair text-2xl font-semibold text-primary-foreground mb-2">
                  {selectedImage.title}
                </h3>
                <p className="font-cormorant text-lg text-primary-foreground/90">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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

export default Galeria;
