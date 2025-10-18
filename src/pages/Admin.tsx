import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, LogOut, Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  description: string;
  embed_url: string;
  order_index: number;
}

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    embed_url: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadVideos();
    }
  }, [session]);

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Sesión iniciada correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error de autenticación",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const maxOrder = videos.length > 0 ? Math.max(...videos.map(v => v.order_index)) : -1;

      const { error } = await supabase.from("videos").insert({
        title: newVideo.title,
        description: newVideo.description,
        embed_url: newVideo.embed_url,
        order_index: maxOrder + 1,
      });

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Video añadido correctamente",
      });

      setNewVideo({ title: "", description: "", embed_url: "" });
      setIsDialogOpen(false);
      loadVideos();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este video?")) return;

    try {
      const { error } = await supabase.from("videos").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Video eliminado correctamente",
      });

      loadVideos();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-playfair text-2xl">Panel de Administración</CardTitle>
            <CardDescription>Inicia sesión para gestionar el contenido</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">Gestiona los videos del repertorio</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        {/* Add Video Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-6">
              <Plus className="w-4 h-4 mr-2" />
              Añadir Video
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Video</DialogTitle>
              <DialogDescription>
                Completa los datos del video de YouTube
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="La vie en rose"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  placeholder="Duo Lhav"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="embed_url">URL del Video (Embed)</Label>
                <Input
                  id="embed_url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={newVideo.embed_url}
                  onChange={(e) => setNewVideo({ ...newVideo, embed_url: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Usa el formato: https://www.youtube.com/embed/VIDEO_ID
                </p>
              </div>
              <Button type="submit" className="w-full">
                Añadir Video
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Videos List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={video.embed_url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-xl flex items-start gap-2">
                  <Youtube className="w-5 h-5 mt-1 flex-shrink-0 text-red-500" />
                  <span>{video.title}</span>
                </CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDeleteVideo(video.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <Youtube className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">
              No hay videos añadidos todavía
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Haz clic en "Añadir Video" para empezar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
