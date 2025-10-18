import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Upload, FileText, Newspaper, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

export const BiographyAdmin = () => {
  const [biography, setBiography] = useState<Biography | null>(null);
  const [pressLinks, setPressLinks] = useState<PressLink[]>([]);
  const [bioText, setBioText] = useState("");
  const [selectedBioPhoto, setSelectedBioPhoto] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isPressDialogOpen, setIsPressDialogOpen] = useState(false);
  const [newPressLink, setNewPressLink] = useState({
    title: "",
    source: "",
    url: "",
  });
  const { toast } = useToast();

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
      setBioText(data.biography_text);
    } catch (error: any) {
      console.error("Error loading biography:", error);
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateBiographyText = async () => {
    if (!biography) return;

    try {
      const { error } = await supabase
        .from("biography")
        .update({ biography_text: bioText })
        .eq("id", biography.id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Texto de biografía actualizado correctamente",
      });

      loadBiography();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateBiographyPhoto = async () => {
    if (!biography || !selectedBioPhoto) {
      toast({
        title: "Error",
        description: "Por favor selecciona una foto",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Subir la imagen a Supabase Storage
      const fileExt = selectedBioPhoto.name.split('.').pop();
      const fileName = `biography-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, selectedBioPhoto);

      if (uploadError) throw uploadError;

      // Obtener la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // Actualizar en la base de datos
      const { error: dbError } = await supabase
        .from("biography")
        .update({ photo_url: publicUrl })
        .eq("id", biography.id);

      if (dbError) throw dbError;

      toast({
        title: "Éxito",
        description: "Foto de biografía actualizada correctamente",
      });

      setSelectedBioPhoto(null);
      loadBiography();
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

  const handleAddPressLink = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const maxOrder = pressLinks.length > 0 ? Math.max(...pressLinks.map(p => p.order_index)) : -1;

      const { error } = await supabase.from("press_links").insert({
        title: newPressLink.title,
        source: newPressLink.source,
        url: newPressLink.url,
        order_index: maxOrder + 1,
      });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Enlace de prensa añadido correctamente",
      });

      setNewPressLink({ title: "", source: "", url: "" });
      setIsPressDialogOpen(false);
      loadPressLinks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeletePressLink = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este enlace?")) return;

    try {
      const { error } = await supabase.from("press_links").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Enlace eliminado correctamente",
      });

      loadPressLinks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Biography Photo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Foto de Biografía
          </CardTitle>
          <CardDescription>Actualiza la foto principal de la página de biografía</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {biography?.photo_url && (
            <div className="w-48 h-48 rounded-lg overflow-hidden">
              <img
                src={biography.photo_url}
                alt="Biografía actual"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="bio-photo">Nueva Foto</Label>
            <Input
              id="bio-photo"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedBioPhoto(e.target.files?.[0] || null)}
            />
          </div>
          <Button onClick={handleUpdateBiographyPhoto} disabled={!selectedBioPhoto || uploading}>
            {uploading ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Actualizar Foto
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Biography Text Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Texto de Biografía
          </CardTitle>
          <CardDescription>Edita el texto que aparece en la página de biografía</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            rows={12}
            className="font-cormorant"
            placeholder="Escribe la biografía aquí..."
          />
          <p className="text-xs text-muted-foreground">
            Usa doble salto de línea para separar párrafos
          </p>
          <Button onClick={handleUpdateBiographyText}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Texto
          </Button>
        </CardContent>
      </Card>

      {/* Press Links Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            Enlaces de Prensa
          </CardTitle>
          <CardDescription>Gestiona los artículos de prensa que aparecen en biografía</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isPressDialogOpen} onOpenChange={setIsPressDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-6">
                <Plus className="w-4 h-4 mr-2" />
                Añadir Enlace
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Añadir Enlace de Prensa</DialogTitle>
                <DialogDescription>
                  Añade un nuevo artículo o mención en prensa
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddPressLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="press-title">Título del Artículo</Label>
                  <Input
                    id="press-title"
                    placeholder="La soprano inaugura el Festival..."
                    value={newPressLink.title}
                    onChange={(e) => setNewPressLink({ ...newPressLink, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="press-source">Fuente</Label>
                  <Input
                    id="press-source"
                    placeholder="Diario de Ibiza"
                    value={newPressLink.source}
                    onChange={(e) => setNewPressLink({ ...newPressLink, source: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="press-url">URL del Artículo</Label>
                  <Input
                    id="press-url"
                    type="url"
                    placeholder="https://..."
                    value={newPressLink.url}
                    onChange={(e) => setNewPressLink({ ...newPressLink, url: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Añadir Enlace
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Press Links List */}
          <div className="space-y-4">
            {pressLinks.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-cormorant">
                        {link.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {link.source}
                      </CardDescription>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        {link.url}
                      </a>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePressLink(link.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {pressLinks.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                No hay enlaces de prensa añadidos todavía
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Haz clic en "Añadir Enlace" para empezar
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};