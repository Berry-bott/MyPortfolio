import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProjectsList } from '@/components/projects-list'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Projects - Dev.AI',
  description: 'Explore my portfolio of web development and AI automation projects',
}

export default function Projects() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            A showcase of my work in web development and AI automation. Each project demonstrates my commitment to quality, innovation, and solving real-world problems.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsList />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let&apos;s discuss your next project and how I can help bring it to life.
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
