export const emailTemplates = {
  contactConfirmation: (name: string, service: string) => ({
    subject: 'Re: Your inquiry - Dev.AI',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Thank you for reaching out, ${name}!</h2>
        <p>I've received your inquiry regarding <strong>${service}</strong> and will get back to you shortly.</p>
        <p>In the meantime, feel free to explore more about my work:</p>
        <ul>
          <li><a href="https://dev-ai.com/projects">View my projects</a></li>
          <li><a href="https://dev-ai.com/services">Learn about my services</a></li>
          <li><a href="https://dev-ai.com/about">Read my background</a></li>
        </ul>
        <p>Best regards,<br/>Dev.AI</p>
      </div>
    `,
  }),

  leadQualification: (name: string) => ({
    subject: "Let's discuss your project - Dev.AI",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Hi ${name},</h2>
        <p>Thank you for your interest! I've reviewed your inquiry and would love to discuss your project further.</p>
        <p>Here's what I typically cover in initial consultations:</p>
        <ul>
          <li>Project scope and requirements</li>
          <li>Technology recommendations</li>
          <li>Timeline and budget estimation</li>
          <li>Next steps and deliverables</li>
        </ul>
        <p>Would you have time for a brief call this week? Let me know your availability.</p>
        <p>Best regards,<br/>Dev.AI</p>
      </div>
    `,
  }),

  projectInquiry: (name: string, projectName: string) => ({
    subject: `Re: ${projectName} - Let's build something great`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Hi ${name},</h2>
        <p>Thanks for reaching out about a project similar to <strong>${projectName}</strong>!</p>
        <p>I specialize in:</p>
        <ul>
          <li>Full-stack web development with Next.js</li>
          <li>AI-powered automation solutions</li>
          <li>Real-time analytics and dashboards</li>
          <li>Scalable architecture design</li>
        </ul>
        <p>Let's discuss how I can help bring your vision to life. I'm excited to hear more about your project!</p>
        <p>Best regards,<br/>Dev.AI</p>
      </div>
    `,
  }),

  serviceInquiry: (name: string, service: string) => ({
    subject: `Re: ${service} - Custom solutions for your needs`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Hi ${name},</h2>
        <p>Thank you for your interest in <strong>${service}</strong>!</p>
        <p>I've helped many businesses achieve their goals through:</p>
        <ul>
          <li>Custom development tailored to specific needs</li>
          <li>Proven strategies and best practices</li>
          <li>Ongoing support and optimization</li>
          <li>Transparent communication</li>
        </ul>
        <p>I'd love to learn more about your project and see how I can add value. Let's set up a time to chat!</p>
        <p>Best regards,<br/>Dev.AI</p>
      </div>
    `,
  }),

  aiAutomationFollowUp: (name: string) => ({
    subject: 'AI Automation: Transform Your Business Efficiency',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e3a8a;">Hi ${name},</h2>
        <p>Following up on your interest in AI automation solutions!</p>
        <p>Here are some common automation wins I've helped clients achieve:</p>
        <ul>
          <li><strong>Lead Generation:</strong> 150% increase in qualified leads</li>
          <li><strong>Email Automation:</strong> 10+ hours saved per week</li>
          <li><strong>Job Management:</strong> Organized pipeline with better tracking</li>
          <li><strong>Analytics:</strong> Real-time insights into your business</li>
        </ul>
        <p>Would you like to explore how automation could work for your business?</p>
        <p>Best regards,<br/>Dev.AI</p>
      </div>
    `,
  }),
}

export function getEmailTemplate(type: string, data: Record<string, any>) {
  switch (type) {
    case 'contact':
      return emailTemplates.contactConfirmation(data.name || 'there', data.service || 'your inquiry')
    case 'qualification':
      return emailTemplates.leadQualification(data.name || 'there')
    case 'project':
      return emailTemplates.projectInquiry(data.name || 'there', data.projectName || 'similar work')
    case 'service':
      return emailTemplates.serviceInquiry(data.name || 'there', data.service || 'our services')
    case 'ai-automation':
      return emailTemplates.aiAutomationFollowUp(data.name || 'there')
    default:
      return emailTemplates.contactConfirmation(data.name || 'there', data.service || 'your inquiry')
  }
}
