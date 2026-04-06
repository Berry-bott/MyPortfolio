-- Portfolio Database Schema

-- Profile table (portfolio owner info)
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

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  image_url TEXT,
  thumbnail_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'web-development',
  featured BOOLEAN DEFAULT false,
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  display_order INTEGER DEFAULT 0
);

-- Case Studies (detailed project info)
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  metrics JSONB DEFAULT '{}',
  testimonial TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  icon_name TEXT,
  price_range TEXT,
  features TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'development',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  display_order INTEGER DEFAULT 0
);

-- Leads / Contact Submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  service_interested TEXT,
  status TEXT DEFAULT 'new',
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_contacted_at TIMESTAMP
);

-- Visit Tracking
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  user_agent TEXT,
  page_path TEXT NOT NULL,
  referer TEXT,
  time_spent_seconds INTEGER,
  session_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP
);

-- Automated Messages / Email Responses
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  message_type TEXT DEFAULT 'auto-response',
  trigger_type TEXT DEFAULT 'contact-form',
  is_sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs / Opportunities Management
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  job_type TEXT DEFAULT 'full-time',
  salary_range TEXT,
  description TEXT,
  apply_url TEXT,
  status TEXT DEFAULT 'active',
  priority INTEGER DEFAULT 0,
  notes TEXT,
  application_date TIMESTAMP,
  deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tags TEXT[] DEFAULT '{}'
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author TEXT NOT NULL,
  category TEXT DEFAULT 'technology',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  view_count INTEGER DEFAULT 0
);

-- Automation Logs
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  data JSONB DEFAULT '{}',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for public tables
CREATE POLICY "Public profiles are viewable by anyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Public projects are viewable by anyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Public case studies are viewable by anyone"
  ON case_studies FOR SELECT
  USING (true);

CREATE POLICY "Public services are viewable by anyone"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Public blog posts are viewable by anyone"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Leads - only insert allowed publicly, view restricted
CREATE POLICY "Anyone can submit a lead"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Leads are not viewable by the public"
  ON leads FOR SELECT
  USING (false);

-- Visits - anonymous tracking
CREATE POLICY "Visits can be logged anonymously"
  ON visits FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Visits are not viewable by the public"
  ON visits FOR SELECT
  USING (false);

-- Messages - not viewable by public
CREATE POLICY "Messages can be created"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Messages are not viewable by the public"
  ON messages FOR SELECT
  USING (false);

-- Jobs - not fully viewable by public
CREATE POLICY "Jobs are not viewable by the public"
  ON jobs FOR SELECT
  USING (false);

-- Automation logs - not viewable by public
CREATE POLICY "Automation logs are not viewable by the public"
  ON automation_logs FOR SELECT
  USING (false);

-- Create indexes for better performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_case_studies_project_id ON case_studies(project_id);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_visits_created_at ON visits(created_at DESC);
CREATE INDEX idx_visits_page_path ON visits(page_path);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_jobs_status ON jobs(status);
