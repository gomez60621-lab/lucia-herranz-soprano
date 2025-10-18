-- Crear tabla de videos para el repertorio
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Habilitar Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (cualquiera puede ver los videos)
CREATE POLICY "Los videos son visibles públicamente"
  ON videos FOR SELECT
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden insertar videos"
  ON videos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden actualizar videos"
  ON videos FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden eliminar videos"
  ON videos FOR DELETE
  USING (auth.role() = 'authenticated');

-- Crear índice para ordenar los videos
CREATE INDEX idx_videos_order ON videos(order_index);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
