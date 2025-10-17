import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types for gallery images
export interface GalleryImage {
  id?: string;
  url: string;
  public_id: string;
  title: string;
  description: string;
  uploaded_at?: string;
  created_at?: string;
}
