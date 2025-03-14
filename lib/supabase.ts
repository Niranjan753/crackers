import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';
import { PostgrestError } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.pgrst.object+json',
      'Prefer': 'return=representation'
    }
  }
});

// Helper function to check if we're in a production environment
export const isProduction = process.env.NODE_ENV === 'production';

// Custom error type for handling various error types
type SupabaseErrorType = PostgrestError | Error | unknown;

// Helper function to handle Supabase errors with proper typing
export const handleSupabaseError = (error: SupabaseErrorType): string => {
  console.error('Supabase error:', error);
  
  if (isProduction) {
    return 'An error occurred while processing your request';
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return (error as { message: string }).message;
  }

  return 'Unknown error occurred';
};

export type Product = {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock?: number;
  brand?: string;
  featured?: boolean;
};
