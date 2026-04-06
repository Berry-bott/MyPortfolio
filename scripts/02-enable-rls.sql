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
