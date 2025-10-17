# Cloudinary Gallery Upload Setup Guide

This guide will help you set up Cloudinary for the gallery image upload feature.

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Sign up for a free account (no credit card required)
3. The free tier includes:
   - 25 GB storage
   - 25 GB monthly bandwidth
   - 25 monthly credits
   - This is more than enough for a personal gallery website

## Step 2: Get Your Cloudinary Credentials

1. After logging in, go to your [Dashboard](https://console.cloudinary.com/console)
2. You'll see your credentials at the top:
   - **Cloud Name** (e.g., "dxxxxx")
   - **API Key** (e.g., "123456789012345")
   - **API Secret** (keep this private!)

## Step 3: Create an Upload Preset

An upload preset allows uploading images without exposing your API secret.

1. Go to **Settings** → **Upload** in your Cloudinary console
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `lucia-gallery-preset` (or any name you prefer)
   - **Signing Mode**: Select **Unsigned** (important!)
   - **Folder**: Leave empty (we'll set it in code)
   - **Access Mode**: Select **Public**
   - Save the preset

## Step 4: Enable Resource List API

This allows the gallery to fetch uploaded images automatically.

1. In Cloudinary console, go to **Settings** → **Security**
2. Scroll down to **Restricted media types**
3. Find **Resource list** section
4. Make sure **Enable public resource list** is turned ON (toggle should be green)
5. Save the settings

## Step 5: Configure Environment Variables

Create a `.env` file in the root of your project (where `package.json` is located):

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
VITE_CLOUDINARY_UPLOAD_PRESET=lucia-gallery-preset
VITE_CLOUDINARY_API_KEY=your-api-key-here

# Admin Panel Password (change this to something secure!)
VITE_ADMIN_PASSWORD=your-secure-password-here
```

**Replace the values:**
- `your-cloud-name-here` → Your Cloud Name from Step 2
- `lucia-gallery-preset` → The preset name from Step 3 (if you used a different name)
- `your-api-key-here` → Your API Key from Step 2
- `your-secure-password-here` → Choose a strong password for the admin panel

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=dpx1kj3mn
VITE_CLOUDINARY_UPLOAD_PRESET=lucia-gallery-preset
VITE_CLOUDINARY_API_KEY=123456789012345
VITE_ADMIN_PASSWORD=MySecurePassword123!
```

## Step 6: Update .gitignore

Make sure `.env` is in your `.gitignore` file so credentials aren't committed to GitHub:

```
# Environment variables
.env
.env.local
.env.production
```

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin page:
   ```
   http://localhost:5173/admin
   ```
   (Or if deployed: `https://your-domain.com/admin`)

3. Enter the password you set in `.env`

4. Try uploading an image:
   - Drag and drop an image, or click to select
   - Wait for the upload to complete
   - You should see a success message and thumbnail

5. Check the gallery:
   - Navigate to `/galeria`
   - The uploaded images should appear automatically

## Step 8: Deploy to Production

When deploying (e.g., to GitHub Pages, Netlify, Vercel):

1. Add the environment variables in your hosting platform's settings:
   - **GitHub Pages**: Not recommended for this feature (no server-side env vars)
   - **Netlify**: Settings → Environment Variables → Add each VITE_ variable
   - **Vercel**: Settings → Environment Variables → Add each VITE_ variable

2. Rebuild and deploy your site

3. Access the admin panel at: `https://your-domain.com/admin`

## How to Use the Admin Panel (For the Website Owner)

### Uploading Images

1. Go to: `https://your-domain.com/admin`
2. Enter your password
3. Drag images onto the upload area (or click to select files)
4. Wait for uploads to complete
5. Images will appear in the gallery immediately!

### Tips

- You can upload multiple images at once
- Supported formats: JPG, PNG, GIF, WebP
- Images are automatically optimized for web viewing
- No need to refresh the gallery - new images appear instantly
- All images are backed up on Cloudinary's servers

### Troubleshooting

**"Upload failed" error:**
- Check that your Cloudinary credentials are correct in `.env`
- Make sure the upload preset is set to "Unsigned"
- Verify Resource List API is enabled

**Images not appearing in gallery:**
- Make sure Resource List is enabled in Cloudinary Security settings
- Check browser console for errors (F12 → Console)
- Try refreshing the gallery page

**Password not working:**
- Check the `VITE_ADMIN_PASSWORD` value in your `.env` file
- Make sure there are no extra spaces
- If deployed, verify environment variables are set on your hosting platform

## Security Notes

- The admin panel uses a password for basic protection
- For production, consider adding:
  - Rate limiting
  - CAPTCHA
  - IP restrictions
  - More robust authentication

- Never commit your `.env` file to GitHub
- Change the default admin password immediately
- Keep your Cloudinary API Secret private (not needed for this implementation)

## Cost Considerations

**Free Tier Limits:**
- 25 GB storage (approximately 10,000 high-quality photos)
- 25 GB monthly bandwidth
- 25 credits per month (1 credit = 1,000 transformations)

If you exceed these limits:
- Cloudinary will notify you
- You can upgrade to a paid plan
- Or optimize images more aggressively

For a personal portfolio website, the free tier should be sufficient for years.

## Support

If you need help:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Support](https://support.cloudinary.com/)
