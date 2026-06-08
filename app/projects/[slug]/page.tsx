import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Github, ArrowLeft, ArrowRight, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects: Record<string, any> = {
  'gift-card-platform': {
    title: 'Gift Card Website',
    category: 'web-development',
    description: 'Full-stack gift card solution with real-time inventory',
    fullDescription: 'A comprehensive gift card platform built with Next.js and PostgreSQL. Features include product management, real-time inventory tracking, integrated payment processing with Stripe, user authentication, and order management.',
    image: '/project_one.png',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    live_url: 'https://spin-object-95371433.figma.site/',
    github_url: '#',
    featured: true,
    challenge: 'Create a clean, reliable gift card platform that makes buying and managing cards simple for customers.',
    solution: 'Built a full-stack experience with product management, secure checkout structure, inventory tracking, and a polished customer-facing interface.',
    results: [
      'Clear product browsing flow',
      'Real-time inventory-ready structure',
      'Secure payment integration path',
      'Admin-friendly order management',
    ],
    testimonial: 'The platform made our gift card sales look professional and easier to manage.',
    clientName: 'Gift Card Client',
  },
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    category: 'web-development',
    description: 'Full-stack e-commerce solution with real-time inventory',
    fullDescription: 'A comprehensive e-commerce platform built with Next.js and PostgreSQL. Features include product management, real-time inventory tracking, integrated payment processing with Stripe, user authentication, and order management.',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e9651a80?w=1200&q=80',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'TypeScript', 'Redis', 'Vercel'],
    live_url: '#',
    github_url: '#',
    featured: true,
    challenge: 'Build a scalable e-commerce platform that handles high traffic and complex inventory management',
    solution: 'Implemented Next.js for optimal performance, PostgreSQL for data integrity, Redis for caching, and Stripe for secure payments.',
    results: [
      'Handles 10,000+ concurrent users',
      'Sub-second page load times',
      '99.9% uptime',
      'Real-time inventory sync',
    ],
    testimonial: 'This platform transformed our online sales. The performance is incredible and our customers love the experience.',
    clientName: 'E-Commerce Client',
  },
  'fintech-app': {
    title: 'Fintech App',
    category: 'web-development',
    description: 'React and mobile-ready finance platform with a polished product experience',
    fullDescription: 'A modern fintech application built with React, Expo-ready architecture, Express, Neon, Redux, and TypeScript. The project focuses on a clean user experience, reliable data flow, and a responsive interface for financial workflows.',
    image: '/pharste_project.png',
    technologies: ['React', 'Expo', 'Express', 'Neon', 'Redux', 'TypeScript'],
    live_url: 'https://pharste-site.vercel.app',
    github_url: '#',
    featured: true,
    challenge: 'Create a trustworthy fintech experience that feels fast, clear, and easy to use across devices.',
    solution: 'Built a responsive React interface with typed state management, backend-ready Express structure, and database support through Neon.',
    results: [
      'Clean fintech landing experience',
      'Responsive web layout',
      'Backend-ready architecture',
      'Scalable TypeScript foundation',
    ],
    testimonial: 'The fintech product now feels polished, credible, and ready to present.',
    clientName: 'Fintech Client',
  },
  'cbt-web-app': {
    title: 'CBT Web App',
    category: 'web-development',
    description: 'Therapy-focused web app with guided CBT tools',
    fullDescription: 'A CBT-focused web application built with React and Express. It supports mental health and wellness workflows with guided exercises, mood tracking concepts, secure user flow foundations, and a clean interface.',
    image: '/cbt_project.png',
    technologies: ['React', 'Express', 'MongoDB', 'Redux', 'TypeScript'],
    live_url: 'https://fillops-edu-tech.vercel.app/',
    github_url: '#',
    featured: true,
    challenge: 'Design a calm, practical CBT experience that helps users access wellness tools without friction.',
    solution: 'Created a focused web app structure with guided tools, clear navigation, and a scalable React plus Express foundation.',
    results: [
      'CBT tool-focused interface',
      'Clean user experience',
      'Full-stack app foundation',
      'Live deployed project',
    ],
    testimonial: 'The app communicates the product clearly and makes the CBT tools easy to explore.',
    clientName: 'CBT App Client',
  },
  'ai-chat-dashboard': {
    title: 'AI Chat Dashboard',
    category: 'ai-automation',
    description: 'Interactive dashboard with AI-powered analytics',
    fullDescription: 'Real-time analytics dashboard powered by AI insights. Features intelligent data visualization, predictive analytics, automated report generation, and custom metric tracking.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    technologies: ['React', 'AI SDK', 'Recharts', 'Supabase', 'WebSockets', 'TypeScript'],
    live_url: '#',
    github_url: '#',
    featured: true,
    challenge: 'Create a real-time analytics dashboard that provides AI-powered insights',
    solution: 'Built with React for interactivity, Supabase for real-time data, and integrated AI models for predictive analytics.',
    results: [
      'Real-time data updates',
      'AI-powered predictions',
      'Custom report generation',
      'Intuitive dashboard UI',
    ],
    testimonial: 'The insights we get from this dashboard have completely changed how we run our business.',
    clientName: 'Analytics Client',
  },
  'automation-suite': {
    title: 'Business Automation Suite',
    category: 'ai-automation',
    description: 'Intelligent automation for leads, emails, and jobs',
    fullDescription: 'Comprehensive automation platform featuring AI-powered lead scoring, automated email responses, intelligent job tracking and management.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    technologies: ['Node.js', 'Supabase', 'Webhooks', 'AI APIs', 'PostgreSQL', 'TypeScript'],
    live_url: '#',
    github_url: '#',
    featured: true,
    challenge: 'Automate complex business processes across multiple channels',
    solution: 'Built a scalable platform with webhook integration, AI-powered automation, and comprehensive analytics.',
    results: [
      'Automated 80% of repetitive tasks',
      '10 hours saved per week',
      '150% more qualified leads',
      'Seamless integrations',
    ],
    testimonial: 'This automation suite has been a game-changer for our business. The time savings are incredible.',
    clientName: 'Automation Client',
  },
  'portfolio-site': {
    title: 'Portfolio Website',
    category: 'web-development',
    description: 'Modern portfolio with analytics and CMS',
    fullDescription: 'Elegant portfolio website featuring project showcases, service listings, automated lead capture, and integrated analytics. Built with Next.js and optimized for performance and SEO.',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&q=80',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    live_url: '#',
    github_url: '#',
    featured: false,
    challenge: 'Build a portfolio that does more than look good: it also captures leads and shows useful admin insights.',
    solution: 'Combined a fast marketing site with Supabase-backed lead capture, visit tracking, and an admin dashboard.',
    results: [
      'Professional project showcase',
      'Lead capture workflow',
      'Visit tracking support',
      'SEO-friendly pages',
    ],
    testimonial: 'The site finally feels like a business tool, not just an online brochure.',
    clientName: 'Portfolio Client',
  },
  'saas-platform': {
    title: 'SaaS Management Platform',
    category: 'web-development',
    description: 'Multi-tenant SaaS with subscription management',
    fullDescription: 'Enterprise-grade SaaS platform with multi-tenancy, subscription management, usage analytics, and team collaboration features. Includes Stripe integration for billing and customer portal.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    live_url: '#',
    github_url: '#',
    featured: false,
    challenge: 'Design a scalable SaaS foundation that can support multiple customers, teams, and billing states.',
    solution: 'Structured the app around tenant-aware data, subscription billing, role-based workflows, and performance-focused infrastructure.',
    results: [
      'Multi-tenant architecture',
      'Subscription-ready billing',
      'Team collaboration flows',
      'Usage analytics support',
    ],
    testimonial: 'This gave us a strong foundation to launch and grow our SaaS product.',
    clientName: 'SaaS Client',
  },
  'mobile-app': {
    title: 'Cross-Platform Mobile App',
    category: 'web-development',
    description: 'React Native app with offline capabilities',
    fullDescription: 'Cross-platform mobile application built with React Native and Expo. Features offline-first architecture, push notifications, real-time sync, and native module integration for iOS and Android platforms.',
    image: 'https://images.unsplash.com/photo-1512941691920-25d18d400558?w=1200&q=80',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    live_url: '#',
    github_url: '#',
    featured: false,
    challenge: 'Deliver a mobile app experience that works smoothly across iOS and Android, even with unreliable connectivity.',
    solution: 'Built an offline-first React Native app with sync flows, push notification support, and shared business logic.',
    results: [
      'iOS and Android support',
      'Offline-first usage',
      'Push notification workflow',
      'Real-time sync foundation',
    ],
    testimonial: 'The mobile experience is smooth, practical, and ready for real users.',
    clientName: 'Mobile App Client',
  },
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug]

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-96 bg-card flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link href="/projects" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft size={20} /> Back to Projects
          </Link>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {project.fullDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge Section */}
              <div>
                <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Solution Section */}
              <div>
                <h2 className="text-3xl font-bold mb-4">The Solution</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Results Section */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Results & Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.results.map((result: string, index: number) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                      <Code2 className="text-primary flex-shrink-0" size={20} />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Section */}
              <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-8">
                <p className="text-lg italic text-foreground mb-4">
                  &quot;{project.testimonial}&quot;
                </p>
                <p className="font-semibold text-muted-foreground">
                  — {project.clientName}
                </p>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Technologies */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.live_url !== '#' || project.github_url !== '#') && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Links</h3>
                  <div className="space-y-3">
                    {project.live_url !== '#' && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink size={20} /> View Live
                      </a>
                    )}
                    {project.github_url !== '#' && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Github size={20} /> View Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(projects)
              .filter(([projectSlug]) => projectSlug !== slug)
              .slice(0, 2)
              .map(([slug, proj]) => (
                <Link
                  key={slug}
                  href={`/projects/${slug}`}
                  className="group bg-background border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="h-40 bg-muted overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {proj.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Interested in a Similar Project?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s discuss how I can help build your next great project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Project <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
