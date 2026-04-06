'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'web-development',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Send lead to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Also trigger auto-response
      await fetch('/api/auto-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          subject: 'Re: Your inquiry - Dev.AI',
          type: 'contact',
        }),
      })

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'web-development',
        message: '',
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('[v0] Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-background border border-border rounded-lg p-8">
      {submitted && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
          <p className="text-primary font-semibold">Thanks for reaching out! I&apos;ll get back to you soon.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Company</label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Service Interest *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-primary"
          >
            <option value="web-development">Web Development</option>
            <option value="ai-automation">AI Automation</option>
            <option value="lead-generation">Lead Generation</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Message *</label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            required
            rows={6}
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
