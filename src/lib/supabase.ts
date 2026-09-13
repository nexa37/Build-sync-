import { createClient } from '@supabase/supabase-js';

// @ts-ignore
let rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
if (rawUrl && !rawUrl.startsWith('http')) {
    rawUrl = 'https://' + rawUrl;
}
// Automatically fix if the user pasted the REST API URL instead of the base Project URL
if (rawUrl.includes('.co')) {
    rawUrl = rawUrl.split('.co')[0] + '.co';
}
const supabaseUrl = rawUrl;
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
