# Automatic Gallery Upload - Setup Guide

## Overview

This solution allows Lucía to upload images that appear in the gallery **automatically** - no Git commits needed!

### How It Works

1. Lucía uploads images via `/admin` panel
2. Images upload to Cloudinary with a special tag (`lucia-gallery`)
3. Gallery page fetches images from Cloudinary via a serverless function
4. Images appear immediately - no manual updates needed!

## Setup Steps

### 1. Get Cloudinary API Secret

You already have the Cloud Name and API Key. Now you need the API Secret:

1. Go to https://console.cloudinary.com/console
2. Look at the top of the dashboard for your credentials
3. You'll see:
   - Cloud Name: `dec6j8pqb` ✓ (already have)
   - API Key: `738696132696944` ✓ (already have)
   - API Secret: `[hidden]` ← Click "Show" to reveal
4. Copy the API Secret

### 2. Update Environment Variables

Add the API Secret to your `.env` file:

```env
CLOUDINARY_API_SECRET=your-actual-api-secret-here
```

**Important:** The API Secret is sensitive! Never commit it to Git.

### 3. Configure Upload Preset for Tags

1. Go to Cloudinary Settings → Upload
2. Find your preset: `lucia-web`
3. Click "Edit"
4. Make sure:
   - **Signing Mode**: Unsigned
   - **Tags**: You can leave this empty (tags are added during upload)
   - **Folder**: Leave empty or set to `lucia-gallery`
5. Save

### 4. Deploy to Netlify/Vercel

#### For Netlify:

1. The serverless function is already created in `/netlify/functions/get-gallery-images.ts`

2. Add environment variables in Netlify dashboard:
   - `VITE_CLOUDINARY_CLOUD_NAME` = `dec6j8pqb`
   - `VITE_CLOUDINARY_API_KEY` = `738696132696944`
   - `CLOUDINARY_API_SECRET` = (your secret)
   - `VITE_CLOUDINARY_UPLOAD_PRESET` = `lucia-web`
   - `VITE_ADMIN_PASSWORD` = (your admin password)

3. Deploy:
   ```bash
   git add .
   git commit -m "Add automatic gallery with serverless function"
   git push
   ```

4. Netlify will automatically build and deploy the function

#### For Vercel:

If using Vercel instead, you'll need to create `/api/get-gallery-images.ts` instead. Let me know if you need help with this.

### 5. Test the Setup

1. Go to your deployed site: `https://your-domain.netlify.app/admin`
2. Login with your password
3. Upload a test image
4. Go to `/galeria`
5. The image should appear immediately!

## How It Works Technically

### Upload Flow:
1. User uploads image via admin panel
2. Image uploads to Cloudinary with tag `lucia-gallery`
3. Cloudinary stores the image and tag
4. Success!

### Gallery Display:
1. Gallery page loads
2. Calls serverless function: `/.netlify/functions/get-gallery-images`
3. Function fetches images from Cloudinary Admin API (filtered by `lucia-gallery` tag)
4. Gallery displays images
5. Images are cached for 1 minute for performance

### Benefits:
- ✅ **Zero manual work** - Upload and done!
- ✅ **Multi-device** - Upload from phone, laptop, anywhere
- ✅ **Instant updates** - Gallery refreshes every minute
- ✅ **No database** - Uses Cloudinary as the source of truth
- ✅ **No Git commits** - Everything automatic

## File Structure

```
/netlify/functions/
  └─ get-gallery-images.ts    # Serverless function to fetch images

/src/components/
  └─ AdminUpload.tsx           # Adds 'lucia-gallery' tag when uploading

/src/pages/
  └─ Galeria.tsx               # Fetches from serverless function

/.env
  └─ CLOUDINARY_API_SECRET     # Secret for Admin API access
```

## Security

- API Secret is only used server-side (in the Netlify function)
- Never exposed to the browser
- Admin panel still password-protected
- Gallery endpoint is public (as intended)

## Troubleshooting

### Images don't appear after upload

1. **Check Cloudinary tags**:
   - Go to Cloudinary Media Library
   - Find your uploaded image
   - Check if it has the tag `lucia-gallery`
   - If not, check the upload preset configuration

2. **Check serverless function**:
   - Go to `https://your-domain.netlify.app/.netlify/functions/get-gallery-images`
   - You should see JSON with images
   - If error, check Netlify function logs

3. **Check environment variables**:
   - Netlify Dashboard → Site Settings → Environment Variables
   - Make sure `CLOUDINARY_API_SECRET` is set
   - Redeploy after adding/changing env vars

### Function returns error

1. Check Netlify function logs:
   - Netlify Dashboard → Functions → get-gallery-images → Logs

2. Common issues:
   - Missing `CLOUDINARY_API_SECRET`
   - Wrong API credentials
   - Cloudinary API rate limits

### Images upload but function doesn't fetch them

1. Make sure images have the `lucia-gallery` tag
2. Check if the Admin API is enabled in Cloudinary
3. Try manually calling: `https://api.cloudinary.com/v1_1/dec6j8pqb/resources/image?tags=lucia-gallery`

## Performance

- **Upload**: Instant (direct to Cloudinary)
- **Gallery load**: ~500ms (serverless function + Cloudinary API)
- **Caching**: 1 minute (reduces API calls)
- **Scalability**: Handles 1000s of images easily

## Cost

**Cloudinary Free Tier:**
- 25 GB storage
- 25 GB bandwidth/month
- 25,000 transformations/month
- More than enough for this use case!

**Netlify Free Tier:**
- 125,000 serverless function requests/month
- Even with 100 gallery views/day = 3000/month
- Plenty of headroom!

## Future Enhancements (Optional)

- Add image deletion feature in admin
- Add ability to edit titles/descriptions
- Add image reordering
- Add categories/tags
- Real-time updates with WebSockets
- Image compression before upload
- Bulk upload improvements

##For Lucía (Simple Instructions in Spanish)

1. Ve a: `https://tu-dominio.com/admin`
2. Ingresa tu contraseña
3. Arrastra fotos al área de carga
4. ¡Listo! Las fotos aparecen en la galería automáticamente
5. No necesitas hacer nada más

**¡Así de simple!**
