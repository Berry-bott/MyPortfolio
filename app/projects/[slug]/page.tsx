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
  'edgloe': {
    title: 'Edgloe',
    category: 'ai-automation',
    description: 'AI product photos and marketing copy for e-commerce sellers',
    fullDescription: 'Edgloe turns a single phone photo into a complete selling package for e-commerce sellers: studio-quality enhanced product images, AI-written marketing copy with hashtags and a suggested price, and scheduled social posts for every channel.',
    image: '/projects/edgloe.png',
    technologies: ['React', 'AI Image Generation', 'PWA', 'Cloudflare', 'Marketing Automation'],
    live_url: 'https://edgloe.com/',
    github_url: '#',
    featured: true,
    challenge: 'Small sellers on Instagram, WhatsApp, Jumia and Konga have great products but poor photos and no time to write captions — hiring a photographer or learning complex editing tools is out of reach.',
    solution: 'Built a mobile-first AI workflow where one phone photo is enhanced into a studio-quality product image, paired with platform-aware AI copy, hashtags and a suggested price, then scheduled or auto-published to Instagram and Facebook.',
    results: [
      'Phone photo to studio image in about 30 seconds',
      'AI copy, hashtags and pricing per product',
      'Auto-publish to Instagram and Facebook',
      'Ready-to-share content for WhatsApp, Jumia and Konga',
    ],
    testimonial: 'I built Edgloe so a seller can take a normal phone photo and post something that looks like it was shot in a studio — no learning curve, no expensive gear.',
    clientName: 'Edgloe',
  },
  'lovins-ai': {
    title: "Lovin's AI",
    category: 'ai-automation',
    description: 'No-code automation SaaS for every messaging platform',
    fullDescription: "Lovin's AI is a no-code automation SaaS that lets businesses build intelligent bots for every platform — WhatsApp, Email, Instagram, Slack, Telegram, SMS, Discord, and Messenger — from one dashboard.",
    image: '/projects/lovins-ai.png',
    technologies: ['Next.js', 'AI', 'Multi-channel Bots', 'Webhooks', 'Automation', 'TypeScript'],
    live_url: 'https://lovins-ai.vercel.app',
    github_url: '#',
    featured: true,
    challenge: 'Businesses juggle customer conversations across many messaging platforms and needed a way to automate replies, qualify leads, and run campaigns without writing code.',
    solution: 'Created a unified no-code builder where users connect a platform, define AI-powered automations for auto-replies and lead qualification, and monitor everything with real-time analytics.',
    results: [
      'One dashboard across eight messaging platforms',
      'AI auto-replies and lead qualification',
      'Drip campaigns and broadcast messaging',
      'Real-time analytics and simple tiered pricing',
    ],
    testimonial: 'One platform to automate them all — no code required.',
    clientName: "Lovin's AI",
  },
  'filloptech': {
    title: 'Fillop Tech',
    category: 'web-development',
    description: 'AI-personalized LMS with online assessments and CBT simulations',
    fullDescription: "A powerful Learning Management System (LMS) by Fillop Tech featuring advanced online assessments and AI-driven personalization that tailors each student's learning journey based on their performance.",
    image: '/projects/filloptech.png',
    technologies: ['React', 'Node.js', 'AI Personalization', 'CBT Engine', 'LMS', 'TypeScript'],
    live_url: 'https://filloptech.com/',
    github_url: '#',
    featured: true,
    challenge: 'Students preparing for JAMB, WAEC and NECO face exam anxiety, poor time management and shallow understanding from rote memorization, with little access to affordable study tools.',
    solution: 'Built a comprehensive LMS with structured lessons, daily quizzes, performance tracking and a CBT simulation engine that mirrors the real exam interface, plus AI personalization that adapts to each learner.',
    results: [
      'Realistic JAMB, WAEC and NECO CBT simulations',
      'AI-personalized learning paths',
      'Structured lessons and daily quizzes',
      'Free access to improve exam confidence',
    ],
    testimonial: 'Our goal is not only to help students pass examinations but to build confidence, improve speed and strengthen understanding.',
    clientName: 'Fillop Tech Ltd',
  },
  'fillop-business': {
    title: 'Fillop Business',
    category: 'web-development',
    description: 'Business management platform from Fillop Tech',
    fullDescription: 'Fillop Business is the business solutions platform from Fillop Tech, giving organisations a digital workspace to streamline operations, manage customers, and run day-to-day workflows more efficiently.',
    image: '/projects/fillop-business.png',
    technologies: ['React', 'Node.js', 'Business Tools', 'Dashboard', 'TypeScript'],
    live_url: 'https://business.filloptech.com/',
    github_url: '#',
    featured: false,
    challenge: 'Businesses needed a single digital workspace to manage operations and customer relationships instead of relying on fragmented manual processes.',
    solution: 'Delivered a responsive business platform that centralises business workflows, customer management and operational tools in one place.',
    results: [
      'Centralised business workspace',
      'Streamlined operational workflows',
      'Customer management tools',
      'Responsive, modern interface',
    ],
    testimonial: 'A practical platform that helps businesses simplify and digitise how they operate.',
    clientName: 'Fillop Tech Ltd',
  },
  'hotel-site': {
    title: 'Hotel Booking Website',
    category: 'web-development',
    description: 'Modern hotel booking platform with analytics and CMS',
    fullDescription: 'Elegant hotel booking website featuring room showcases, service listings, automated booking management, and integrated analytics. Built with Next.js and optimized for performance and SEO.',
    image: '/hotel_project.png',
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    live_url: '#',
    github_url: '#',
    featured: false,
    challenge: 'Give hotels a modern, fast booking experience that showcases rooms and services while keeping reservations easy to manage.',
    solution: 'Built a polished Next.js site with room showcases, service listings, automated booking management and integrated analytics.',
    results: [
      'Clean room and service showcases',
      'Automated booking management',
      'Performance and SEO optimized',
      'Analytics-ready structure',
    ],
    testimonial: 'The booking site looks premium and makes managing reservations straightforward.',
    clientName: 'Hotel Client',
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
