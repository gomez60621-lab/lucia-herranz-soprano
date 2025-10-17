// Cloudinary configuration
// Get your credentials from: https://cloudinary.com/console

export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'your-upload-preset',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || 'your-api-key',
  folder: 'lucia-gallery', // Folder where gallery images will be stored
};

// Admin password - change this to something secure
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'change-this-password';

// Cloudinary API endpoints
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

// Helper to get gallery images from Cloudinary
export const getCloudinaryGalleryUrl = () => {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/list/${cloudinaryConfig.folder}.json`;
};
