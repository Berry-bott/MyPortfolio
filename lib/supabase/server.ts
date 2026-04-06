import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseServer: any = null

if (supabaseUrl && supabaseServiceKey) {
  try {
    supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch (error) {
    // Silently fall back to dummy client if Supabase initialization fails
    // Create a dummy client that won't throw immediately
    supabaseServer = {
      from: () => ({
        insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        select: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
        eq: function() { return this },
        order: function() { return this },
        limit: function() { return this },
      }),
    }
  }
} else {
  // Supabase not configured - use mock client silently
  // Create a dummy client for development without Supabase
  supabaseServer = {
    from: () => ({
      insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      select: async () => ({ data: [], error: null }),
      update: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      delete: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      eq: function() { return this },
      order: function() { return this },
      limit: function() { return this },
    }),
  }
}

export { supabaseServer }
