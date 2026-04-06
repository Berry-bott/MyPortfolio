import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Dev.AI',
  description: 'Explore web development and AI automation services',
}

const services = [
  {
    id: 'web-development',
    slug: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web development services for modern applications',
    features: [
      'Next.js & React applications',
      'TypeScript for type-safe code',
      'Responsive design with Tailwind CSS',
      'Database design & optimization',
      'API development & integration',
      'Performance optimization',
      'SEO implementation',
      'Deployment & hosting',
    ],
    benefits: [
      'Fast, responsive user experiences',
      'Scalable architecture',
      'Clean, maintainable code',
      'Security best practices',
      'Analytics integration',
    ],
    pricing: 'Custom',
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    name: 'AI Automation Solutions',
    description: 'Intelligent automation and AI-powered tools for your business',
    features: [
      'AI-powered chatbots',
      'Automated lead generation',
      'Email automation & responses',
      'Job tracking & management',
      'Analytics & reporting',
      'Workflow automation',
      'Custom AI integrations',
      'Data processing pipelines',
    ],
    benefits: [
      'Save time on repetitive tasks',
      'Improve lead quality',
      'Better decision making',
      'Increased productivity',
      'Cost reduction',
    ],
    pricing: 'Custom',
  },
  {
    id: 'consulting',
    slug: 'consulting',
    name: 'Technical Consulting',
    description: 'Expert advice on technology strategy and implementation',
    features: [
      'Architecture design',
      'Technology selection',
      'Code review & optimization',
      'Team mentoring',
      'Performance audits',
      'Security assessment',
      'Migration planning',
      'Best practices guidance',
    ],
    benefits: [
      'Expert guidance',
      'Reduced risk',
      'Better technical decisions',
      'Team knowledge transfer',
      'Long-term success',
    ],
    pricing: 'Hourly',
  },
]

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Services</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Comprehensive solutions tailored to your business needs. Whether you need a new web application, AI automation, or strategic consulting, I&apos;m here to help.
          </p>
        </div>
      </section>

      {/* Services Cards */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-background border border-border rounded-lg p-8 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="text-primary flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <span className="text-primary group-hover:translate-x-2 transition-transform inline-flex items-center font-semibold">
                  View Details <ArrowRight className="ml-2" size={20} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">My Process</h2>

          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Discovery & Planning',
                description: 'Understand your goals, challenges, and vision. We&apos;ll discuss the project scope, timeline, and requirements.',
              },
              {
                step: '02',
                title: 'Design & Architecture',
                description: 'Create detailed designs and technical architecture. Ensure everything aligns with your needs and best practices.',
              },
              {
                step: '03',
                title: 'Development & Implementation',
                description: 'Build your solution with clean, maintainable code. Regular updates and transparency throughout the process.',
              },
              {
                step: '04',
                title: 'Testing & Deployment',
                description: 'Comprehensive testing for quality assurance. Deploy to production with confidence and provide ongoing support.',
              },
            ].map((phase, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-primary text-4xl font-bold flex-shrink-0 w-20">{phase.step}</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground text-lg">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Technologies I Use</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: 'Frontend',
                items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
              },
              {
                category: 'Backend',
                items: ['Node.js', 'PostgreSQL', 'Supabase', 'Firebase', 'REST APIs'],
              },
              {
                category: 'AI & Tools',
                items: ['OpenAI', 'Anthropic', 'LangChain', 'Vercel AI', 'Custom Models'],
              },
              {
                category: 'DevOps',
                items: ['Vercel', 'Docker', 'Git', 'GitHub', 'CI/CD'],
              },
            ].map((tech, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s discuss how I can help with your next project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Schedule a Consultation <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
