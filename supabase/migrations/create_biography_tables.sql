-- Crear tabla de biografía (solo habrá un registro)
CREATE TABLE IF NOT EXISTS biography (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT NOT NULL,
  biography_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Habilitar Row Level Security
ALTER TABLE biography ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "La biografía es visible públicamente"
  ON biography FOR SELECT
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden insertar biografía"
  ON biography FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden actualizar biografía"
  ON biography FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden eliminar biografía"
  ON biography FOR DELETE
  USING (auth.role() = 'authenticated');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_biography_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_biography_updated_at BEFORE UPDATE ON biography
  FOR EACH ROW EXECUTE PROCEDURE update_biography_updated_at_column();

-- Crear tabla de enlaces de prensa
CREATE TABLE IF NOT EXISTS press_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Habilitar Row Level Security
ALTER TABLE press_links ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Los enlaces de prensa son visibles públicamente"
  ON press_links FOR SELECT
  USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden insertar enlaces"
  ON press_links FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden actualizar enlaces"
  ON press_links FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Solo usuarios autenticados pueden eliminar enlaces"
  ON press_links FOR DELETE
  USING (auth.role() = 'authenticated');

-- Crear índice para ordenar los enlaces
CREATE INDEX idx_press_links_order ON press_links(order_index);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_press_links_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_press_links_updated_at BEFORE UPDATE ON press_links
  FOR EACH ROW EXECUTE PROCEDURE update_press_links_updated_at_column();

-- Insertar biografía inicial (si no existe)
INSERT INTO biography (photo_url, biography_text)
SELECT
  'placeholder.jpg',
  E'Nacida en el Mediterráneo con el telón de fondo y una nota alta en el corazón, Lucía Herranz no canta: embruja. Esta soprano ibicenca ha elevado el arte del canto lírica a nuevas alturas, llevando su voz desde los escenarios más selectos de la isla hasta los rincones más inesperados de los eventos elegantes.\n\nFormada con el rigor clásico, pero con un alma libre - como buena isleña -, Lucía combina técnica con una sensibilidad que hace vibrar hasta el último canapé del cóctel. ¿Una gala en un viñedo? ¿Una boda junto a un acantilado? ¿Una cena privada bajo las estrellas? Si hay glamour y buen gusto, allí estará Lucía, afinando el ambiente con estilo y una sonrisa que vale más que mil partituras.\n\nCon un repertorio que va desde la ópera más exigente hasta versiones exquisitas de clásicos modernos, Lucía transforma cada evento en una experiencia sensorial donde la música deja de oírse... para sentirse.'
WHERE NOT EXISTS (SELECT 1 FROM biography LIMIT 1);

-- Insertar enlaces de prensa iniciales
INSERT INTO press_links (title, source, url, order_index) VALUES
  ('La soprano ibicenca Lucía Herranz inaugura el Festival de Música de Cámara', 'Santa Eulària des Riu', 'https://santaeulariadesriu.com/es/actualidad/noticias/9731-la-soprano-ibicenca-lucia-herranz-inaugura-este-domingo-el-festival-de-musica-de-camara-con-un-recital-de-duetos-y-arias-junto-al-tenor-adria-mas-y-la-pianista-olga-kobekina', 0),
  ('Lucía Herranz y Adolfo Villalonga ofrecen un concierto gratuito en el claustro del Ayuntamiento de Eivissa', 'Nou Diari', 'https://www.noudiari.es/cultura-ibiza/lucia-herranz-y-adolfo-villalonga-ofrecen-un-concierto-gratuito-en-el-claustro-del-ayuntamiento-de-eivissa/', 1),
  ('Mañana sonar la cantante', 'Diario de Ibiza', 'https://www.diariodeibiza.es/sociedad/2025/02/24/manana-sonar-cantante-114609023.html', 2)
ON CONFLICT DO NOTHING;