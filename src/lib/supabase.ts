import { createClient } from '@supabase/supabase-js';

// Default Supabase project credentials for BuildSync
// This ensures production builds (e.g. Render) work immediately without configuration errors
const DEFAULT_SUPABASE_URL = 'https://ioglvhazrluyoyqzpizl.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZ2x2aGF6cmx1eW95cXpwaXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NjAyNjcsImV4cCI6MjEwNDEzNjI2N30.XB53KJdxgo4cdAUWDWDnPrBRWWqPRTBqh5rwpOiW99U';

// @ts-ignore
const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
// If the provided URL doesn't look like a valid Supabase URL (e.g. accidentally set to a Google Client ID), use DEFAULT_SUPABASE_URL
const isRealSupabaseUrl = envUrl.includes('supabase.co');
let rawUrl = isRealSupabaseUrl ? envUrl : DEFAULT_SUPABASE_URL;

if (rawUrl && !rawUrl.startsWith('http')) {
    rawUrl = 'https://' + rawUrl;
}
// Automatically fix if the user pasted the REST API URL instead of the base Project URL
if (rawUrl.includes('.co')) {
    rawUrl = rawUrl.split('.co')[0] + '.co';
}
const supabaseUrl = rawUrl;

// @ts-ignore
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
// Supabase anon keys are always JWTs starting with eyJ...
const isRealSupabaseKey = envKey.startsWith('eyJ');
const supabaseAnonKey = isRealSupabaseKey ? envKey : DEFAULT_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : null;


