-- Create homepage table
CREATE TABLE IF NOT EXISTS public.homepage (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subtitle TEXT NOT NULL DEFAULT 'Soprano Profesional',
    main_title TEXT NOT NULL DEFAULT 'Lucía Herranz',
    description TEXT NOT NULL DEFAULT 'Una voz que trasciende en eventos exclusivos, bodas de ensueño y conciertos memorables',
    hero_image_url TEXT,

    -- Service 1
    service1_title TEXT NOT NULL DEFAULT 'Ceremonias',
    service1_description TEXT NOT NULL DEFAULT 'Momentos únicos con música celestial para ocasiones especiales',

    -- Service 2
    service2_title TEXT NOT NULL DEFAULT 'Conciertos',
    service2_description TEXT NOT NULL DEFAULT 'Presentaciones en vivo con repertorio clásico y contemporáneo de excelencia',

    -- Service 3
    service3_title TEXT NOT NULL DEFAULT 'Eventos',
    service3_description TEXT NOT NULL DEFAULT 'Actuaciones exclusivas para galas, celebraciones corporativas y eventos privados',

    -- CTA Section
    cta_title TEXT NOT NULL DEFAULT 'Haz de Tu Evento Algo Inolvidable',
    cta_description TEXT NOT NULL DEFAULT 'Contacta hoy para consultar disponibilidad y crear juntos una experiencia musical única',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.homepage ENABLE ROW LEVEL SECURITY;

-- Create policies for homepage
CREATE POLICY "Public can view homepage"
    ON public.homepage FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can update homepage"
    ON public.homepage FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Insert default values
INSERT INTO public.homepage (
    subtitle,
    main_title,
    description,
    service1_title,
    service1_description,
    service2_title,
    service2_description,
    service3_title,
    service3_description,
    cta_title,
    cta_description
) VALUES (
    'Soprano Profesional',
    'Lucía Herranz',
    'Una voz que trasciende en eventos exclusivos, bodas de ensueño y conciertos memorables',
    'Ceremonias',
    'Momentos únicos con música celestial para ocasiones especiales',
    'Conciertos',
    'Presentaciones en vivo con repertorio clásico y contemporáneo de excelencia',
    'Eventos',
    'Actuaciones exclusivas para galas, celebraciones corporativas y eventos privados',
    'Haz de Tu Evento Algo Inolvidable',
    'Contacta hoy para consultar disponibilidad y crear juntos una experiencia musical única'
);
