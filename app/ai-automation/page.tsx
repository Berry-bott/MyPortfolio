import { ArrowRight, Zap, MessageSquare, TrendingUp, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Automation - Dev.AI',
  description: 'Intelligent automation solutions powered by AI',
}

export default function AIAutomation() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">AI Automation Solutions</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Transform your business with intelligent automation. From lead generation to workflow optimization, AI-powered solutions that save time and increase efficiency.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Automation Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: MessageSquare,
                title: 'Automated Responses',
                description: 'AI-powered email and message responses that are contextually relevant and personalized. Save hours on repetitive communications.',
                features: ['Email automation', 'Smart templates', 'Context awareness', '24/7 operation'],
              },
              {
                icon: TrendingUp,
                title: 'Lead Generation & Scoring',
                description: 'Automatically capture, qualify, and score leads using AI. Focus your efforts on the highest-potential prospects.',
                features: ['Smart lead capture', 'Qualification scoring', 'Priority ranking', 'CRM integration'],
              },
              {
                icon: Briefcase,
                title: 'Job Management',
                description: 'Intelligent job tracking and management system. Organize opportunities, track applications, and manage your job search.',
                features: ['Job tracking', 'Application management', 'Status tracking', 'Analytics & insights'],
              },
              {
                icon: Zap,
                title: 'Workflow Automation',
                description: 'Custom automation workflows tailored to your business. Connect tools, automate processes, reduce manual work.',
                features: ['Process automation', 'Tool integration', 'Webhook support', 'Custom logic'],
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-background border border-border rounded-lg p-8">
                  <Icon className="text-primary mb-4" size={40} />
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AI Automation?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Save Time',
                description: 'Automate repetitive tasks and focus on what matters. Reclaim hours every week.',
              },
              {
                title: 'Increase Revenue',
                description: 'Better lead qualification and faster response times lead to more conversions.',
              },
              {
                title: 'Improve Quality',
                description: 'Consistent, high-quality responses and processes every single time.',
              },
              {
                title: 'Scale Effortlessly',
                description: 'Handle more volume without adding headcount. Scale your business intelligently.',
              },
              {
                title: '24/7 Operation',
                description: 'Never miss a lead or inquiry. Automation works around the clock for you.',
              },
              {
                title: 'Better Insights',
                description: 'Data-driven analytics help you understand and optimize your processes.',
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Real-World Use Cases</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'B2B SaaS Company',
                challenge: 'Overwhelmed with inbound leads but slow response times',
                solution: 'Implemented AI lead scoring and automated qualification',
                result: '40% increase in conversion rate, 60% faster response time',
              },
              {
                title: 'Freelance Service Provider',
                challenge: 'Spending too much time on admin tasks and emails',
                solution: 'Built automated email responses and booking system',
                result: '10 hours saved per week, more time for billable work',
              },
              {
                title: 'Job Seeker / Recruiter',
                challenge: 'Tracking applications across multiple platforms',
                solution: 'Created intelligent job tracking and management system',
                result: 'Organized pipeline, better tracking, data-driven decisions',
              },
            ].map((useCase, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">{useCase.title}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Challenge</p>
                    <p className="text-sm">{useCase.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Solution</p>
                    <p className="text-sm">{useCase.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-accent">Result</p>
                    <p className="text-sm">{useCase.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technology Stack</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'AI & LLMs',
                items: ['OpenAI', 'Anthropic', 'Custom Models', 'Prompt Engineering'],
              },
              {
                title: 'Backend',
                items: ['Node.js', 'PostgreSQL', 'Supabase', 'Webhooks'],
              },
              {
                title: 'Integration',
                items: ['APIs', 'Email Services', 'CRM Systems', 'Analytics'],
              },
            ].map((stack, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">{stack.title}</h3>
                <ul className="space-y-2">
                  {stack.items.map((item, i) => (
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
      <section className="py-20 bg-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Automate Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s explore how AI automation can transform your workflows and save you time.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
