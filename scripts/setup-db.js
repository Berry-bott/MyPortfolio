import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[v0] Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('[v0] Starting database setup...');

    // Create profiles table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          title TEXT NOT NULL,
          bio TEXT,
          email TEXT NOT NULL,
          phone TEXT,
          location TEXT,
          avatar_url TEXT,
          resume_url TEXT,
          linkedin_url TEXT,
          github_url TEXT,
          twitter_url TEXT,
          website_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    console.log('[v0] Tables created successfully');
  } catch (error) {
    console.error('[v0] Database setup error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
