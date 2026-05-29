-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  company VARCHAR(255),
  service VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100) DEFAULT 'contact-form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create visits table
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_ip VARCHAR(50),
  page_path VARCHAR(255) NOT NULL,
  referrer VARCHAR(255) DEFAULT 'direct',
  user_agent TEXT,
  duration_seconds INTEGER DEFAULT 0,
  session_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create automation_workflows table
CREATE TABLE IF NOT EXISTS automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  trigger_type VARCHAR(100) NOT NULL,
  actions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create automation_logs table
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES automation_workflows(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  status VARCHAR(50),
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source VARCHAR(100),
  priority VARCHAR(50) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'saved',
  company VARCHAR(255),
  salary_range VARCHAR(100),
  location VARCHAR(255),
  job_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email VARCHAR(255) NOT NULL,
  from_name VARCHAR(255),
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  body TEXT,
  message_type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(255) NOT NULL,
  metric_value DECIMAL(10, 2),
  dimension_1 VARCHAR(255),
  dimension_2 VARCHAR(255),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_page_path ON visits(page_path);
CREATE INDEX IF NOT EXISTS idx_visits_referrer ON visits(referrer);
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_priority ON jobs(priority);
CREATE INDEX IF NOT EXISTS idx_automation_logs_workflow_id ON automation_logs(workflow_id);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies so this file can be run more than once.
DROP POLICY IF EXISTS "allow_all_leads" ON leads;
DROP POLICY IF EXISTS "allow_all_visits" ON visits;
DROP POLICY IF EXISTS "allow_all_workflows" ON automation_workflows;
DROP POLICY IF EXISTS "allow_all_logs" ON automation_logs;
DROP POLICY IF EXISTS "allow_all_jobs" ON jobs;
DROP POLICY IF EXISTS "allow_all_messages" ON messages;

-- Create RLS policies (allow all operations for now - secure based on your auth needs)
CREATE POLICY "allow_all_leads" ON leads FOR ALL USING (true);
CREATE POLICY "allow_all_visits" ON visits FOR ALL USING (true);
CREATE POLICY "allow_all_workflows" ON automation_workflows FOR ALL USING (true);
CREATE POLICY "allow_all_logs" ON automation_logs FOR ALL USING (true);
CREATE POLICY "allow_all_jobs" ON jobs FOR ALL USING (true);
CREATE POLICY "allow_all_messages" ON messages FOR ALL USING (true);

-- Keep older installations compatible with the current API.
ALTER TABLE automation_logs ALTER COLUMN workflow_id DROP NOT NULL;
