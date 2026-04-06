import { ArrowRight, Target, Users, TrendingUp, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead Generation - Dev.AI',
  description: 'AI-powered lead generation and conversion optimization',
}

export default function LeadGeneration() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Lead Generation & Conversion</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Capture, qualify, and convert more leads with AI-powered systems. Our intelligent lead generation solutions help you build a pipeline of qualified prospects.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Smart Lead Capture',
                description: 'Strategically designed forms and landing pages that convert visitors into leads. Optimized for maximum capture rates.',
                points: ['High-conversion forms', 'Mobile-optimized pages', 'A/B testing', 'Multi-channel capture'],
              },
              {
                icon: Users,
                title: 'Lead Qualification',
                description: 'AI-powered lead scoring that automatically qualifies prospects. Focus your team on the most promising opportunities.',
                points: ['Automatic scoring', 'Quality filtering', 'Behavioral analysis', 'Intent detection'],
              },
              {
                icon: TrendingUp,
                title: 'Conversion Optimization',
                description: 'Continuously improve conversion rates through data-driven optimization. Test, measure, and refine.',
                points: ['Funnel analysis', 'Conversion tracking', 'Performance metrics', 'Continuous testing'],
              },
              {
                icon: BarChart3,
                title: 'Analytics & Insights',
                description: 'Deep insights into your lead generation performance. Understand what works and replicate success.',
                points: ['Real-time dashboards', 'ROI tracking', 'Source attribution', 'Trend analysis'],
              },
            ].map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-background border border-border rounded-lg p-8">
                  <Icon className="text-primary mb-4" size={40} />
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lead Pipeline */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">The Lead Pipeline</h2>

          <div className="space-y-8">
            {[
              {
                stage: 'Awareness',
                description: 'Attract potential customers to your content and offerings. Drive traffic through multiple channels.',
              },
              {
                stage: 'Interest',
                description: 'Capture visitor information with optimized forms. Convert anonymous visitors into known leads.',
              },
              {
                stage: 'Qualification',
                description: 'AI-powered scoring determines lead quality. Prioritize high-value prospects automatically.',
              },
              {
                stage: 'Engagement',
                description: 'Nurture leads with personalized communication. Keep prospects engaged throughout the journey.',
              },
              {
                stage: 'Conversion',
                description: 'Guide qualified leads to purchase. Streamlined process from lead to customer.',
              },
            ].map((stage, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="text-primary text-3xl font-bold flex-shrink-0 w-16">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{stage.stage}</h3>
                  <p className="text-muted-foreground text-lg">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What We Track</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                metric: 'Lead Quality Score',
                description: 'AI-powered scoring of lead quality based on fit and engagement signals',
              },
              {
                metric: 'Conversion Rate',
                description: 'Percentage of leads that convert to customers or desired action',
              },
              {
                metric: 'Cost Per Lead',
                description: 'Total acquisition cost divided by number of qualified leads',
              },
              {
                metric: 'Lead Response Time',
                description: 'How quickly leads are engaged after initial capture',
              },
              {
                metric: 'Pipeline Value',
                description: 'Total potential revenue from all active leads',
              },
              {
                metric: 'Win Rate',
                description: 'Percentage of leads that become paying customers',
              },
            ].map((item, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-primary">{item.metric}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Success Story</h2>

          <div className="bg-card border border-border rounded-lg p-12">
            <h3 className="text-2xl font-semibold mb-4">B2B SaaS Company Results</h3>
            <p className="text-muted-foreground mb-8">
              Implemented a comprehensive lead generation system with AI-powered qualification and nurturing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { number: '150%', label: 'More Qualified Leads' },
                { number: '45%', label: 'Higher Conversion Rate' },
                { number: '3x', label: 'ROI Improvement' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground">
              By implementing AI-powered lead scoring and automated nurturing, the company increased qualified lead volume by 150% while maintaining higher conversion rates. The system automatically prioritizes sales team efforts on the most promising prospects.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Generate More Leads?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let&apos;s build a lead generation system that works for your business.
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
