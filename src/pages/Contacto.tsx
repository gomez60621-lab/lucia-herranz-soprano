import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoEvento: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nombre || !formData.email || !formData.mensaje) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Show success message
    toast({
      title: "Mensaje enviado",
      description: "Gracias por tu interés. Te contactaré pronto.",
    });

    // Reset form
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      tipoEvento: "",
      mensaje: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-foreground mb-6">
              Contacto
            </h1>
            <p className="font-cormorant text-xl text-muted-foreground max-w-3xl mx-auto">
              ¿Interesado en añadir una experiencia musical única a tu evento? 
              Completa el formulario y conversemos sobre cómo hacer de tu celebración algo inolvidable.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="shadow-soft hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-elegant rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-playfair text-lg">Email</CardTitle>
                  <CardDescription className="font-cormorant">
                    soprano@email.com
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-soft hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-elegant rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-playfair text-lg">Teléfono</CardTitle>
                  <CardDescription className="font-cormorant">
                    +34 610 865 215
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-soft hover:shadow-elegant transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-elegant rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-playfair text-lg">Ubicación</CardTitle>
                  <CardDescription className="font-cormorant">
                    Ibiza, Islas Baleares y España peninsular
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl">
                    Solicita Información
                  </CardTitle>
                  <CardDescription className="font-cormorant text-base">
                    Completa el formulario y te responderé en menos de 24 horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="font-cormorant text-base">
                        Nombre completo *
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        className="font-cormorant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-cormorant text-base">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className="font-cormorant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="font-cormorant text-base">
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                        className="font-cormorant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipoEvento" className="font-cormorant text-base">
                        Tipo de evento
                      </Label>
                      <Input
                        id="tipoEvento"
                        name="tipoEvento"
                        value={formData.tipoEvento}
                        onChange={handleChange}
                        placeholder="Ej: Boda, concierto, evento corporativo..."
                        className="font-cormorant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje" className="font-cormorant text-base">
                        Mensaje *
                      </Label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="Cuéntame sobre tu evento, fecha aproximada, ubicación y cualquier detalle que consideres importante..."
                        required
                        rows={6}
                        className="font-cormorant resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-elegant text-primary-foreground hover:opacity-90 font-cormorant text-lg py-6 shadow-elegant"
                    >
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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

export default Contacto;
