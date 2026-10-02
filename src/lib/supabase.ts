import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Read from Vite env. The anon key is safe to expose client-side — it is
// protected by Row-Level Security policies on the database.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** True when both env vars are present — enables the Supabase-backed review system. */
export const supabaseEnabled = Boolean(url && anonKey)

export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
