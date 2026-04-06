'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    category: 'web-development',
    short_description: 'Full-stack e-commerce solution with real-time inventory',
    description: 'A comprehensive e-commerce platform built with Next.js and PostgreSQL. Features include product management, real-time inventory tracking, integrated payment processing with Stripe, user authentication, and order management.',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e9651a80?w=800&q=80',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'TypeScript'],
    live_url: '#',
    github_url: '#',
    featured: true,
  },
  {
    id: 'ai-chat-dashboard',
    title: 'AI Chat Dashboard',
    slug: 'ai-chat-dashboard',
    category: 'ai-automation',
    short_description: 'Interactive dashboard with AI-powered analytics',
    description: 'Real-time analytics dashboard powered by AI insights. Features intelligent data visualization, predictive analytics, automated report generation, and custom metric tracking. Built with React and integrated with modern AI APIs.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    technologies: ['React', 'AI SDK', 'Recharts', 'Supabase', 'WebSockets'],
    live_url: '#',
    github_url: '#',
    featured: true,
  },
  {
    id: 'automation-suite',
    title: 'Business Automation Suite',
    slug: 'automation-suite',
    category: 'ai-automation',
    short_description: 'Intelligent automation for leads, emails, and jobs',
    description: 'Comprehensive automation platform featuring AI-powered lead scoring, automated email responses, intelligent job tracking and management. Includes visit analytics, CRM integration, and webhook-based automation workflows.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    technologies: ['Node.js', 'Supabase', 'Webhooks', 'AI APIs', 'PostgreSQL'],
    live_url: '#',
    github_url: '#',
    featured: true,
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    slug: 'portfolio-site',
    category: 'web-development',
    short_description: 'Modern portfolio with analytics and CMS',
    description: 'Elegant portfolio website featuring project showcases, service listings, automated lead capture, and integrated analytics. Built with Next.js and optimized for performance and SEO.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    live_url: '#',
    github_url: '#',
    featured: false,
  },
  {
    id: 'saas-platform',
    title: 'SaaS Management Platform',
    slug: 'saas-platform',
    category: 'web-development',
    short_description: 'Multi-tenant SaaS with subscription management',
    description: 'Enterprise-grade SaaS platform with multi-tenancy, subscription management, usage analytics, and team collaboration features. Includes Stripe integration for billing and customer portal.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    live_url: '#',
    github_url: '#',
    featured: false,
  },
  {
    id: 'mobile-app',
    title: 'Cross-Platform Mobile App',
    slug: 'mobile-app',
    category: 'web-development',
    short_description: 'React Native app with offline capabilities',
    description: 'Cross-platform mobile application built with React Native and Expo. Features offline-first architecture, push notifications, real-time sync, and native module integration for iOS and Android platforms.',
    image: 'https://images.unsplash.com/photo-1512941691920-25d18d400558?w=800&q=80',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    live_url: '#',
    github_url: '#',
    featured: false,
  },
]

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'ai-automation', name: 'AI Automation' },
]

export function ProjectsList() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:border-primary'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary to-accent">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="mb-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {project.category === 'web-development' ? 'Web Development' : 'AI Automation'}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.short_description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-4 border-t border-border">
                {project.live_url !== '#' && (
                  <a
                    href={project.live_url}
                    onClick={e => e.preventDefault()}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}
                {project.github_url !== '#' && (
                  <a
                    href={project.github_url}
                    onClick={e => e.preventDefault()}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
                <button
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowRight size={16} />
                  Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
