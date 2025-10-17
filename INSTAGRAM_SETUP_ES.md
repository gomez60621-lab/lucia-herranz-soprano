# Guía de Configuración de la API de Instagram

Esta guía te llevará paso a paso para configurar la API de Instagram Graph y obtener automáticamente las publicaciones para tu galería.

## Requisitos Previos

- Cuenta de Instagram Business o Creador (no una cuenta personal)
- Página de Facebook conectada a tu cuenta de Instagram
- Cuenta de desarrollador de Facebook

---

## Paso 1: Convertir a Cuenta Business/Creador de Instagram

1. Abre la aplicación de Instagram en tu móvil
2. Ve a **Configuración** → **Cuenta** → **Cambiar a cuenta profesional**
3. Elige **Creador** o **Empresa**
4. Completa el proceso de configuración

---

## Paso 2: Crear/Vincular Página de Facebook

Tu cuenta de Instagram Business debe estar vinculada a una Página de Facebook.

1. Ve a [Páginas de Facebook](https://www.facebook.com/pages/create)
2. Crea una nueva página o usa una existente
3. Vincula tu cuenta de Instagram a esta página:
   - Ve a tu Página de Facebook
   - Haz clic en **Configuración** → **Instagram**
   - Conecta tu cuenta de Instagram

---

## Paso 3: Crear Aplicación de Facebook

1. Ve a [Facebook para Desarrolladores](https://developers.facebook.com/)
2. Haz clic en **Mis aplicaciones** → **Crear aplicación**
3. Selecciona **Empresa** como tipo de aplicación
4. Completa los detalles de la aplicación:
   - **Nombre de la aplicación**: "Galería Lucia Herranz" (o cualquier nombre)
   - **Correo de contacto de la aplicación**: Tu correo electrónico
5. Haz clic en **Crear aplicación**

---

## Paso 4: Configurar Instagram Graph API

1. En el panel de tu aplicación, haz clic en **Añadir casos de uso** (o "Add use case")
2. Selecciona **"Inserta el contenido de Facebook, Instagram y Threads en otros sitios web"**
3. Haz clic en **Personalizar** o **Comenzar**
4. Activa **Instagram** en la configuración
5. Configura los permisos necesarios cuando te los solicite:
   - `instagram_basic` - Para acceder a datos básicos del perfil
   - `pages_show_list` - Para listar páginas
   - `pages_read_engagement` - Para leer contenido de las páginas
6. Completa el proceso de configuración y guarda los cambios

---

## Paso 5: Obtener Token de Acceso

### Opción A: Usando el Explorador de API de Graph (Más fácil)

1. Ve al [Explorador de API de Graph](https://developers.facebook.com/tools/explorer/)
2. Selecciona tu aplicación del menú desplegable
3. Haz clic en **Generar token de acceso**
4. Otorga permisos: `instagram_basic`, `pages_show_list`, `pages_read_engagement`
5. Obtendrás un **Token de acceso de corta duración** (válido por ~1 hora)

### Convertir a Token de larga duración:

Ejecuta este comando en tu terminal (reemplaza los valores):

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=TU_APP_ID&client_secret=TU_APP_SECRET&fb_exchange_token=TU_TOKEN_CORTA_DURACION"
```

Esto devuelve un **Token de acceso de larga duración** (válido por 60 días).

### Opción B: Llamada manual a la API

1. Obtén tu App ID y App Secret desde el panel de tu aplicación de Facebook
2. Usa el Explorador de API de Graph para obtener un token de corta duración
3. Cámbialo por un token de larga duración usando el comando curl anterior

---

## Paso 6: Obtener ID de Usuario de Instagram

Ejecuta este comando con tu token de acceso:

```bash
curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=TU_TOKEN_LARGA_DURACION"
```

Esto devuelve tu ID de Página de Facebook. Luego obtén tu ID de Cuenta Business de Instagram:

```bash
curl -X GET "https://graph.facebook.com/v18.0/PAGE_ID?fields=instagram_business_account&access_token=TU_TOKEN_LARGA_DURACION"
```

El `instagram_business_account.id` es tu **ID de Usuario de Instagram**.

---

## Paso 7: Añadir Secretos a GitHub

1. Ve a tu repositorio de GitHub
2. Haz clic en **Settings** → **Secrets and variables** → **Actions**
3. Haz clic en **New repository secret**
4. Añade dos secretos:

   **Secreto 1:**
   - Nombre: `INSTAGRAM_ACCESS_TOKEN`
   - Valor: Tu token de acceso de larga duración

   **Secreto 2:**
   - Nombre: `INSTAGRAM_USER_ID`
   - Valor: Tu ID de Cuenta Business de Instagram

---

## Paso 8: Probar el Workflow

1. Ve a tu repositorio en GitHub
2. Haz clic en la pestaña **Actions**
3. Selecciona el workflow **Fetch Instagram Posts**
4. Haz clic en **Run workflow** → **Run workflow** (activación manual)
5. Espera a que el workflow se complete
6. Verifica si `src/data/instagram-posts.json` se actualizó con tus publicaciones

---

## Paso 9: Renovar Token de Acceso (Cada 60 días)

Los tokens de larga duración expiran después de 60 días. Tienes dos opciones:

### Opción A: Renovación Manual
Repite el Paso 5 cada 60 días para obtener un nuevo token.

### Opción B: Renovación Automática (Recomendado)
Usa el endpoint de renovación de tokens de Facebook antes de que expire:

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=TU_APP_ID&client_secret=TU_APP_SECRET&fb_exchange_token=TU_TOKEN_ACTUAL"
```

---

## Solución de Problemas

### Error: "Invalid OAuth access token"
- Tu token ha expirado. Genera uno nuevo (Paso 5)
- Asegúrate de estar usando un token de larga duración, no de corta duración

### Error: "Permissions error"
- Asegúrate de que tu cuenta de Instagram es una cuenta Business/Creador
- Verifica que tu Página de Facebook está correctamente vinculada
- Verifica que otorgaste los permisos correctos

### No se muestran publicaciones
- Verifica que tus publicaciones de Instagram son públicas
- Verifica que el workflow se ejecutó correctamente en GitHub Actions
- Revisa los logs del workflow para ver mensajes de error

### Las publicaciones no se actualizan
- El workflow se ejecuta diariamente a las 6 AM UTC
- Puedes activarlo manualmente desde la pestaña Actions
- Verifica los límites de uso de GitHub Actions (2000 minutos/mes para cuentas gratuitas)

---

## Pruebas en Local

Para probar el script localmente antes de subirlo:

1. Crea un archivo `.env` en la raíz del proyecto:
```
INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
INSTAGRAM_USER_ID=tu_user_id_aqui
```

2. Ejecuta el script:
```bash
node .github/scripts/fetch-instagram.js
```

3. Verifica `src/data/instagram-posts.json` para ver las publicaciones obtenidas

---

## Recursos Adicionales

- [Documentación de Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [Tokens de Acceso de Facebook](https://developers.facebook.com/docs/facebook-login/guides/access-tokens)
- [API de Instagram Basic Display](https://developers.facebook.com/docs/instagram-basic-display-api)

---

## ¿Necesitas Ayuda?

Si encuentras problemas:
1. Revisa los logs de GitHub Actions para mensajes de error detallados
2. Verifica tu tipo de cuenta de Instagram (debe ser Business/Creador)
3. Asegúrate de que tu Página de Facebook está correctamente conectada
4. Prueba tu token de acceso usando el Explorador de API de Graph

¡Buena suerte! 🎭
