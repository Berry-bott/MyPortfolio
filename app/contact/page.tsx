import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact - Dev.AI',
  description: 'Get in touch to discuss your project',
}

export default function Contact() {

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">Let&apos;s Talk</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Have a project in mind or want to explore opportunities? I&apos;d love to hear about it. Reach out and let&apos;s discuss how I can help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'contact@dev-ai.com',
                link: 'mailto:contact@dev-ai.com',
              },
              {
                icon: Phone,
                title: 'Phone',
                content: '+1 (555) 123-4567',
                link: 'tel:+15551234567',
              },
              {
                icon: MapPin,
                title: 'Location',
                content: 'Remote / Worldwide',
                link: '#',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={index}
                  href={item.link}
                  className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors text-center"
                >
                  <Icon className="text-primary mx-auto mb-3" size={32} />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </a>
              )
            })}
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: 'What is your typical project timeline?',
                answer: 'Project timelines vary depending on complexity and scope. A website redesign typically takes 6-12 weeks, while smaller projects can be completed in 2-4 weeks. I&apos;ll provide a detailed timeline after our consultation.',
              },
              {
                question: 'Do you offer ongoing support?',
                answer: 'Yes! I offer maintenance packages for long-term support, updates, and optimization. This ensures your application stays secure and performs optimally.',
              },
              {
                question: 'What is your process?',
                answer: 'I follow a structured approach: Discovery & Planning → Design → Development → Testing → Deployment → Support. You&apos;ll be involved every step of the way.',
              },
              {
                question: 'How do you handle project costs?',
                answer: 'I offer flexible pricing models: fixed project costs, hourly consulting, or retainer agreements. Let&apos;s discuss what works best for your needs.',
              },
              {
                question: 'Can you work with my existing team?',
                answer: 'Absolutely! I love collaborating with existing teams. Whether you need me to lead a project or support your developers, I&apos;m flexible.',
              },
              {
                question: 'How do I get started?',
                answer: 'Simply fill out the contact form above or email me directly. We&apos;ll schedule a free consultation to discuss your project and goals.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="text-primary mx-auto mb-4" size={40} />
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground">
            Let&apos;s turn your ideas into reality. Reach out today!
          </p>
        </div>
      </section>
    </div>
  )
}
