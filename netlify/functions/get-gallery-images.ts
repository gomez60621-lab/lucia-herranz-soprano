import { Handler } from '@netlify/functions';

const cloudinaryCloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.VITE_CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

export const handler: Handler = async () => {
  if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Cloudinary credentials not configured' }),
    };
  }

  try {
    // Fetch images from Cloudinary using Admin API
    const auth = Buffer.from(`${cloudinaryApiKey}:${cloudinaryApiSecret}`).toString('base64');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/resources/image?tags=lucia-gallery&max_results=500`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Format the images
    const images = data.resources.map((resource: any) => ({
      url: resource.secure_url,
      public_id: resource.public_id,
      title: resource.context?.custom?.title || resource.public_id.split('/').pop() || 'Gallery Image',
      description: resource.context?.custom?.description || '',
      uploaded_at: resource.created_at,
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60', // Cache for 1 minute
      },
      body: JSON.stringify({ images }),
    };
  } catch (error) {
    console.error('Error fetching images:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch images' }),
    };
  }
};
