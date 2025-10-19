import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Upload, Home } from "lucide-react";

interface HomePage {
  id: string;
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

export const HomePageAdmin = () => {
  const [homepage, setHomepage] = useState<HomePage | null>(null);
  const [formData, setFormData] = useState<Partial<HomePage>>({});
  const [selectedHeroImage, setSelectedHeroImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const { data, error } = await supabase
        .from("homepage")
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;
      setHomepage(data);
      setFormData(data);
    } catch (error: any) {
      console.error("Error loading homepage:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar el contenido de la página principal",
        variant: "destructive",
      });
    }
  };

  const handleUpdateContent = async () => {
    if (!homepage) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("homepage")
        .update({
          subtitle: formData.subtitle,
          main_title: formData.main_title,
          description: formData.description,
          service1_title: formData.service1_title,
          service1_description: formData.service1_description,
          service2_title: formData.service2_title,
          service2_description: formData.service2_description,
          service3_title: formData.service3_title,
          service3_description: formData.service3_description,
          cta_title: formData.cta_title,
          cta_description: formData.cta_description,
          updated_at: new Date().toISOString(),
        })
        .eq("id", homepage.id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Contenido actualizado correctamente",
      });

      loadHomepage();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateHeroImage = async () => {
    if (!homepage || !selectedHeroImage) {
      toast({
        title: "Error",
        description: "Por favor selecciona una imagen",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Upload the image to Supabase Storage
      const fileExt = selectedHeroImage.name.split('.').pop();
      const fileName = `hero-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, selectedHeroImage);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // Update in the database
      const { error: dbError } = await supabase
        .from("homepage")
        .update({
          hero_image_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", homepage.id);

      if (dbError) throw dbError;

      toast({
        title: "Éxito",
        description: "Imagen principal actualizada correctamente",
      });

      setSelectedHeroImage(null);
      loadHomepage();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateField = (field: keyof HomePage, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!homepage) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Cargando contenido...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Sección Principal (Hero)
          </CardTitle>
          <CardDescription>Edita el título y descripción principal de la página de inicio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Input
              id="subtitle"
              value={formData.subtitle || ''}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Soprano Profesional"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="main_title">Título Principal</Label>
            <Input
              id="main_title"
              value={formData.main_title || ''}
              onChange={(e) => updateField('main_title', e.target.value)}
              placeholder="Lucía Herranz"
              className="text-2xl font-playfair"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="font-cormorant"
              placeholder="Una voz que trasciende..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Hero Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Imagen Principal
          </CardTitle>
          <CardDescription>Actualiza la imagen principal de la página de inicio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {homepage.hero_image_url && (
            <div className="w-full max-w-md rounded-lg overflow-hidden">
              <img
                src={homepage.hero_image_url}
                alt="Imagen principal actual"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="hero-image">Nueva Imagen</Label>
            <Input
              id="hero-image"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedHeroImage(e.target.files?.[0] || null)}
            />
            <p className="text-xs text-muted-foreground">
              Formatos recomendados: JPG, PNG. Tamaño recomendado: 1200x1600px
            </p>
          </div>
          <Button onClick={handleUpdateHeroImage} disabled={!selectedHeroImage || uploading}>
            {uploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Actualizar Imagen
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Services Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sección de Servicios</CardTitle>
          <CardDescription>Edita los tres servicios que aparecen en la página principal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service 1 */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">Servicio 1</h3>
            <div className="space-y-2">
              <Label htmlFor="service1_title">Título</Label>
              <Input
                id="service1_title"
                value={formData.service1_title || ''}
                onChange={(e) => updateField('service1_title', e.target.value)}
                placeholder="Ceremonias"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service1_description">Descripción</Label>
              <Textarea
                id="service1_description"
                value={formData.service1_description || ''}
                onChange={(e) => updateField('service1_description', e.target.value)}
                rows={2}
                className="font-cormorant"
                placeholder="Momentos únicos con música celestial..."
              />
            </div>
          </div>

          {/* Service 2 */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">Servicio 2</h3>
            <div className="space-y-2">
              <Label htmlFor="service2_title">Título</Label>
              <Input
                id="service2_title"
                value={formData.service2_title || ''}
                onChange={(e) => updateField('service2_title', e.target.value)}
                placeholder="Conciertos"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service2_description">Descripción</Label>
              <Textarea
                id="service2_description"
                value={formData.service2_description || ''}
                onChange={(e) => updateField('service2_description', e.target.value)}
                rows={2}
                className="font-cormorant"
                placeholder="Presentaciones en vivo con repertorio clásico..."
              />
            </div>
          </div>

          {/* Service 3 */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">Servicio 3</h3>
            <div className="space-y-2">
              <Label htmlFor="service3_title">Título</Label>
              <Input
                id="service3_title"
                value={formData.service3_title || ''}
                onChange={(e) => updateField('service3_title', e.target.value)}
                placeholder="Eventos"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service3_description">Descripción</Label>
              <Textarea
                id="service3_description"
                value={formData.service3_description || ''}
                onChange={(e) => updateField('service3_description', e.target.value)}
                rows={2}
                className="font-cormorant"
                placeholder="Actuaciones exclusivas para galas..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sección de Llamada a la Acción (CTA)</CardTitle>
          <CardDescription>Edita el texto que invita a contactar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cta_title">Título</Label>
            <Input
              id="cta_title"
              value={formData.cta_title || ''}
              onChange={(e) => updateField('cta_title', e.target.value)}
              placeholder="Haz de Tu Evento Algo Inolvidable"
              className="text-xl font-playfair"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta_description">Descripción</Label>
            <Textarea
              id="cta_description"
              value={formData.cta_description || ''}
              onChange={(e) => updateField('cta_description', e.target.value)}
              rows={2}
              className="font-cormorant"
              placeholder="Contacta hoy para consultar disponibilidad..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleUpdateContent} size="lg" disabled={saving}>
          {saving ? (
            <>
              <Save className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Todos los Cambios
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
