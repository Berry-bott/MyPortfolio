'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 'gift-card-platform',
    title: 'Gift Card Website',
    slug: 'gift-card-platform',
    category: 'web-development',
    short_description: 'Full-stack gift card solution with real-time inventory',
    description: 'A comprehensive gift card platform built with Next.js and PostgreSQL. Features include product management, real-time inventory tracking, integrated payment processing with Stripe, user authentication, and order management.',
    image: '/project_one.png',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'TypeScript'],
    live_url: 'https://spin-object-95371433.figma.site/',
    github_url: '#',
    featured: true,
  },
    {
    id: 'fintech',
    title: 'Fintech App',
    slug: 'fintech-app',
    category: 'web-development',
    short_description: 'React Native app with offline capabilities',
    description: 'A cross-platform application built with React, React Native and Expo. Features offline-first architecture, push notifications, real-time sync, and native module integration for iOS and Android platforms.',
    image: '/pharste_project.png',
    technologies: ['React', 'Expo','Express', 'neon', 'Redux', 'TypeScript'],
    live_url: 'https://pharste-site.vercel.app',
    github_url: '#',
    featured: true,
  },
   {
    id: 'cbt-web-app',
    title: 'CBT Web App',
    slug: 'cbt-web-app',
    category: 'web-development',
    short_description: 'React Native app with offline capabilities',
    description: 'cbt web app is a cross-platform mobile application built with React and Express. It offers cognitive behavioral therapy (CBT) tools, mood tracking, and guided exercises. The app features offline capabilities, secure user authentication, and a clean, intuitive interface designed to support mental health and wellness.',
    image: '/cbt_project.png',
    technologies: ['React', 'Express', 'MongoDB', 'Redux', 'TypeScript'],
    live_url: 'https://fillops-edu-tech.vercel.app/',
    github_url: '#',
    featured: true,
  },
  {
    id: 'hotel-site',
    title: 'Hotel Booking Website',
    slug: 'hotel-site',
    category: 'web-development',
    short_description: 'Modern hotel booking platform with analytics and CMS',
    description: 'Elegant hotel booking website featuring room showcases, service listings, automated booking management, and integrated analytics. Built with Next.js and optimized for performance and SEO.',
    image: '/hotel_project.png',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    live_url: '#',
    github_url: '#',
    featured: false,
  },
  {
    id: 'edgloe',
    title: 'Edgloe',
    slug: 'edgloe',
    category: 'ai-automation',
    short_description: 'AI product photos and marketing copy for e-commerce sellers',
    description: 'Edgloe turns a single phone photo into a complete selling package for e-commerce sellers: studio-quality enhanced product images, AI-written marketing copy with hashtags and a suggested price, and scheduled social posts. Built for African sellers, it auto-publishes to Instagram and Facebook and prepares ready-to-share content for WhatsApp, Jumia, and Konga — no design skills or expensive gear required.',
    image: '/projects/edgloe.png',
    technologies: ['React', 'AI Image Generation', 'PWA', 'Cloudflare', 'Marketing Automation'],
    live_url: 'https://edgloe.com/',
    github_url: '#',
    featured: true,
  },
  {
    id: 'lovins-ai',
    title: "Lovin's AI",
    slug: 'lovins-ai',
    category: 'ai-automation',
    short_description: 'No-code automation SaaS for WhatsApp, Email, Instagram, Slack and more',
    description: "Lovin's AI is a no-code automation SaaS that lets businesses build intelligent bots for every platform — WhatsApp, Email, Instagram, Slack, Telegram, SMS, Discord, and Messenger. It pairs AI-powered auto-replies and lead qualification with drip campaigns, real-time analytics, unlimited automations, and enterprise-grade security across simple monthly plans.",
    image: '/projects/lovins-ai.png',
    technologies: ['Next.js', 'AI', 'Multi-channel Bots', 'Webhooks', 'Automation'],
    live_url: 'https://lovins-ai.vercel.app',
    github_url: '#',
    featured: true,
  },
  {
    id: 'filloptech',
    title: 'Fillop Tech',
    slug: 'filloptech',
    category: 'web-development',
    short_description: 'AI-personalized LMS with online assessments and CBT simulations',
    description: "A powerful Learning Management System (LMS) by Fillop Tech featuring advanced online assessments and AI-driven personalization that tailors each student's learning journey based on their performance. It includes a JAMB, WAEC and NECO CBT simulation engine, structured lessons, daily quizzes, and performance tracking designed to boost exam confidence.",
    image: '/projects/filloptech.png',
    technologies: ['React', 'Node.js', 'AI Personalization', 'CBT Engine', 'LMS'],
    live_url: 'https://filloptech.com/',
    github_url: '#',
    featured: true,
  },
  {
    id: 'fillop-business',
    title: 'Fillop Business',
    slug: 'fillop-business',
    category: 'web-development',
    short_description: 'Business management platform from Fillop Tech',
    description: 'Fillop Business is the business solutions platform from Fillop Tech, giving organisations a digital workspace to streamline operations, manage customers, and run day-to-day workflows more efficiently.',
    image: '/projects/fillop-business.png',
    technologies: ['React', 'Node.js', 'Business Tools', 'Dashboard'],
    live_url: 'https://business.filloptech.com/',
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
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}
                {project.github_url !== '#' && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Github size={16}/>
                    Code
                  </a>
                )}
                <span className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                  <ArrowRight size={16} />
                  Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
 