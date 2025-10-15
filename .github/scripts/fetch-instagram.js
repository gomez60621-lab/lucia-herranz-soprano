const fs = require('fs');
const path = require('path');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
  console.error('Missing Instagram credentials in environment variables');
  process.exit(1);
}

async function fetchInstagramPosts() {
  try {
    // Fetch user's media using Instagram Graph API
    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data) {
      throw new Error('No data received from Instagram API');
    }

    // Transform the data to match our gallery format
    const posts = data.data
      .filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 12) // Get the latest 12 posts
      .map(post => ({
        id: post.id,
        url: post.media_url,
        thumbnail: post.thumbnail_url || post.media_url,
        title: extractTitle(post.caption),
        description: extractDescription(post.caption),
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp,
        media_type: post.media_type
      }));

    // Write to JSON file
    const outputPath = path.join(process.cwd(), 'src', 'data', 'instagram-posts.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ posts, lastUpdated: new Date().toISOString() }, null, 2)
    );

    console.log(`Successfully fetched ${posts.length} Instagram posts`);
    console.log(`Data written to ${outputPath}`);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error.message);
    process.exit(1);
  }
}

// Helper function to extract a title from caption (first line or first few words)
function extractTitle(caption) {
  if (!caption) return 'Instagram Post';

  // Get first line or first 50 characters
  const firstLine = caption.split('\n')[0];
  if (firstLine.length <= 50) return firstLine;

  return firstLine.substring(0, 50) + '...';
}

// Helper function to extract description from caption
function extractDescription(caption) {
  if (!caption) return '';

  // Get second line or remaining text after first line
  const lines = caption.split('\n');
  if (lines.length > 1) {
    return lines.slice(1).join(' ').substring(0, 100);
  }

  // If only one line and it's long, use part of it as description
  if (caption.length > 50) {
    return caption.substring(50, 150) + '...';
  }

  return '';
}

// Run the function
fetchInstagramPosts();
