import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL:", https://ivvnuinjzjgmybxulley.supabase.co);
  console.error("Supabase Anon Key:", eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dm51aW5qempnbXlieHVsbGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNTI1MzgsImV4cCI6MjA3MzgyODUzOH0.HXJjQ02jO_Tm38koCpK5UAZYdf4A0Xct0TJKqXSsl50);
  throw new Error("Supabase URL and Anon Key are required. Check your .env file and ensure they are prefixed with VITE_ and the dev server was restarted.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
