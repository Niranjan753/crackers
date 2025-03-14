import { createClient } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.pgrst.object+json',
        'Prefer': 'return=representation'
      }
    }
  }
);

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
