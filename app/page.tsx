'use client'

import Link from 'next/link'
import { ArrowRight, Code2, Zap, Brain, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroBackground } from '@/components/hero-background'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
        <HeroBackground />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10  flex flex-col lg:flex-row items-center gap-12 ">
          {/* Left content */}
          <div className="flex-1 z-10">
            <h1 className="max-md:text-3xl  md:text-7xl lg:text-7xl max-md:text-center font-bold mb-6 text-pretty">
              Crafting <span className="text-primary">Intelligence</span> into Code
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              I build sophisticated web applications and harness AI automation to solve complex business challenges. From full-stack development to intelligent automation—let&apos;s transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
                  View My Work <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Start a Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Feature grid preview */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Code2 className="text-primary mb-3" size={32} />
              <h3 className="font-semibold mb-2">Web Development</h3>
              <p className="text-sm text-muted-foreground">Modern full-stack applications with React, Next.js & TypeScript</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Brain className="text-accent mb-3" size={32} />
              <h3 className="font-semibold mb-2">AI Solutions</h3>
              <p className="text-sm text-muted-foreground">Intelligent automation & AI-powered tools</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Zap className="text-primary mb-3" size={32} />
              <h3 className="font-semibold mb-2">Performance</h3>
              <p className="text-sm text-muted-foreground">Lightning-fast, optimized experiences</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <TrendingUp className="text-accent mb-3" size={32} />
              <h3 className="font-semibold mb-2">Growth</h3>
              <p className="text-sm text-muted-foreground">Scalable solutions that grow with you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground">Showcasing innovative solutions in web development and AI</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'Next.js full-stack platform with real-time inventory and payment integration',
                tech: ['Next.js', 'PostgreSQL', 'Stripe'],
              },
              {
                title: 'AI Chat Dashboard',
                description: 'Interactive dashboard with AI-powered analytics and real-time data visualization',
                tech: ['React', 'AI SDK', 'Recharts'],
              },
              {
                title: 'Automation Suite',
                description: 'Intelligent automation tools for lead capture, email responses, and job tracking',
                tech: ['Node.js', 'Supabase', 'Webhooks'],
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projects">
              <Button variant="outline" size="lg">
                View All Projects <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Services & Expertise</h2>
            <p className="text-lg text-muted-foreground">Comprehensive solutions tailored to your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/services"
              className="group bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-lg p-8 hover:border-primary/50 transition-all"
            >
              <Code2 className="text-primary mb-4 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-2xl font-semibold mb-3">Web Development</h3>
              <p className="text-muted-foreground mb-4">
                Full-stack development with modern technologies, scalable architecture, and performance optimization.
              </p>
              <span className="text-primary group-hover:translate-x-2 transition-transform inline-flex items-center">
                Learn More <ArrowRight className="ml-2" size={20} />
              </span>
            </Link>

            <Link
              href="/ai-automation"
              className="group bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-lg p-8 hover:border-accent/50 transition-all"
            >
              <Brain className="text-accent mb-4 group-hover:scale-110 transition-transform" size={40} />
              <h3 className="text-2xl font-semibold mb-3">AI Automation</h3>
              <p className="text-muted-foreground mb-4">
                Intelligent automation solutions including AI-powered workflows, lead generation, and intelligent job management.
              </p>
              <span className="text-accent group-hover:translate-x-2 transition-transform inline-flex items-center">
                Explore Services <ArrowRight className="ml-2" size={20} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Something Great?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s collaborate on your next project. Whether it&apos;s web development or AI automation, I&apos;m here to help.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get In Touch <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
