# Configuración del Panel de Administración

## Pasos para configurar la base de datos

### 1. Crear la tabla en Supabase

Ejecuta el siguiente SQL en el editor SQL de Supabase (o aplica la migración):

```sql
-- El archivo SQL está en: supabase/migrations/create_videos_table.sql
```

Puedes copiar y pegar el contenido de ese archivo en el editor SQL de Supabase.

### 2. Crear un usuario administrador

En Supabase, ve a Authentication > Users y crea un nuevo usuario con email y contraseña.

### 3. Migrar videos existentes (opcional)

Si quieres migrar los videos que ya existen en el código a la base de datos, ejecuta este SQL:

```sql
INSERT INTO videos (title, description, embed_url, order_index) VALUES
  ('La vie en rose', 'Duo Lhav', 'https://www.youtube.com/embed/tAkMAlqZqPk?si=z0vKTmgsiY6ywgrC', 0),
  ('Aria Pensar en él', 'Marina de E. Arrieta', 'https://www.youtube.com/embed/jSmC-JWLWh8', 1),
  ('El teu somris', 'A. Villalonga', 'https://www.youtube.com/embed/OA9mZg8aiXI', 2),
  ('Aleluya - L. Cohen', 'Duo Lhav', 'https://www.youtube.com/embed/QjVE-DIJa3g?si=8-SdpaPk0ZLRF5qk', 3);
```

## Uso del panel de administración

### Acceder al panel

1. Ve a: `http://tu-dominio/admin`
2. Inicia sesión con el email y contraseña del usuario que creaste en Supabase

### Añadir videos

1. Haz clic en "Añadir Video"
2. Completa los campos:
   - **Título**: El nombre de la canción/pieza
   - **Descripción**: Información adicional (compositor, ensemble, etc.)
   - **URL del Video (Embed)**: La URL de YouTube en formato embed
     - Ejemplo: `https://www.youtube.com/embed/VIDEO_ID`
     - Para obtenerla: Ve al video en YouTube > Compartir > Insertar > Copia la URL del src

### Eliminar videos

- Haz clic en el botón "Eliminar" en la tarjeta del video que desees eliminar
- Confirma la acción en el diálogo

## Características

- ✅ Autenticación segura con Supabase
- ✅ Gestión completa de videos (añadir/eliminar)
- ✅ Vista previa de videos en el panel
- ✅ Los videos se ordenan automáticamente
- ✅ La página de Repertorio carga los videos dinámicamente desde la base de datos
- ✅ Row Level Security habilitado para proteger los datos

## Seguridad

- Solo usuarios autenticados pueden añadir, modificar o eliminar videos
- Los videos son visibles públicamente en la página de Repertorio
- Las políticas de seguridad están configuradas en Supabase (RLS)
