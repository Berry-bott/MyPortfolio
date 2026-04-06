import { ArrowRight, Code2, Brain, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Dev.AI',
  description: 'Learn about my journey in web development and AI automation',
}

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6 text-primary">About Me</h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            I&apos;m a full-stack web developer and AI enthusiast passionate about creating elegant solutions to complex problems. With expertise in modern web technologies and emerging AI applications, I help businesses transform their digital presence.
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>
          
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Code2 className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Web Development Foundation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Started with HTML, CSS, and JavaScript, progressing through React and Vue.js. Now specializing in Next.js for full-stack applications with TypeScript, creating performant and scalable web experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Brain className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">AI & Automation Specialization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Expanded into AI-powered solutions, leveraging models and APIs to build intelligent automation systems. Created tools for lead generation, email automation, and intelligent job management.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Full-Stack Expertise</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Now bringing together frontend finesse, backend robustness, and AI intelligence. Experienced with databases like PostgreSQL and Supabase, APIs, real-time features, and cloud deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Expertise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Frontend',
                items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
              },
              {
                title: 'Backend',
                items: ['Node.js', 'API Design', 'PostgreSQL', 'Supabase', 'Authentication'],
              },
              {
                title: 'AI & Automation',
                items: ['LLM Integration', 'Prompt Engineering', 'Workflow Automation', 'Data Processing'],
              },
              {
                title: 'Tools & DevOps',
                items: ['Git', 'Docker', 'Vercel', 'AWS', 'Performance Optimization'],
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-primary">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
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

      {/* Values Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">My Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Target className="text-primary mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                Every project receives meticulous attention to detail and testing to ensure excellence.
              </p>
            </div>
            <div className="text-center">
              <Code2 className="text-accent mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
              <p className="text-muted-foreground">
                Maintainable, well-documented code that scales and stands the test of time.
              </p>
            </div>
            <div className="text-center">
              <Zap className="text-primary mx-auto mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Staying cutting-edge with latest technologies to deliver modern solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s work together to bring your vision to life.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get in Touch <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
