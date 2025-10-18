-- Crear tabla de fotos para la galería
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Habilitar Row Level Security
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (cualquiera puede ver las fotos)
CREATE POLICY "Las fotos son visibles públicamente"
  ON photos FOR SELECT
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden insertar fotos"
  ON photos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden actualizar fotos"
  ON photos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden eliminar fotos"
  ON photos FOR DELETE
  USING (auth.role() = 'authenticated');

-- Crear índice para ordenar las fotos
CREATE INDEX idx_photos_order ON photos(order_index);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_photos_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON photos
  FOR EACH ROW EXECUTE PROCEDURE update_photos_updated_at_column();

-- Crear bucket de almacenamiento para las fotos
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage para el bucket de galería
-- Permitir lectura pública
CREATE POLICY "Las imágenes de la galería son visibles públicamente"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

-- Permitir subida solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden subir imágenes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- Permitir eliminación solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden eliminar imágenes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');