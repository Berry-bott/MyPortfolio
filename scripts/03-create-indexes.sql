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
