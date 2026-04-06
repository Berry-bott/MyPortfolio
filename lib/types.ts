// Profile types
export interface Profile {
  id: string
  name: string
  title: string
  bio?: string
  email: string
  phone?: string
  location?: string
  avatar_url?: string
  resume_url?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  website_url?: string
  created_at: string
  updated_at: string
}

// Project types
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  short_description?: string
  image_url?: string
  thumbnail_url?: string
  technologies: string[]
  category: 'web-development' | 'ai-automation' | 'full-stack'
  featured: boolean
  live_url?: string
  github_url?: string
  created_at: string
  updated_at: string
  display_order: number
}

// Case Study types
export interface CaseStudy {
  id: string
  project_id: string
  title: string
  challenge?: string
  solution?: string
  results?: string
  metrics?: Record<string, string | number>
  testimonial?: string
  client_name?: string
  created_at: string
  updated_at: string
}

// Service types
export interface Service {
  id: string
  name: string
  slug: string
  description: string
  features: string[]
  icon?: string
  pricing?: number
  created_at: string
  updated_at: string
}

// Lead types
export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  service_interest?: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived'
  created_at: string
  updated_at: string
}

// Visit types
export interface Visit {
  id: string
  visitor_ip?: string
  page_path: string
  referrer?: string
  user_agent?: string
  duration_seconds?: number
  created_at: string
}

// Message types
export interface AutoMessage {
  id: string
  sender_email: string
  subject: string
  message: string
  type: 'inquiry' | 'contact' | 'partnership'
  auto_response_sent: boolean
  created_at: string
}

// Job types
export interface Job {
  id: string
  title: string
  description: string
  location?: string
  job_type: 'full-time' | 'part-time' | 'contract' | 'freelance'
  salary_range?: string
  source: 'email' | 'linkedin' | 'indeed' | 'manual' | 'other'
  status: 'saved' | 'applied' | 'interviewed' | 'offered' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  tags?: string[]
  created_at: string
  updated_at: string
}

// Blog Post types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  category: string
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
}

// Automation Log types
export interface AutomationLog {
  id: string
  automation_type: 'email' | 'visit_tracking' | 'lead_capture' | 'job_tracking' | 'analytics'
  event_data: Record<string, any>
  status: 'success' | 'failure'
  created_at: string
}
