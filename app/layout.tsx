import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { TrackingProvider } from '@/components/tracking-provider'
import { PageTransition } from '@/components/page-transition'
import { ScrollAnimations } from '@/components/scroll-animations'
import { InteractiveAnimations } from '@/components/interactive-animations'
import { SiteLoader } from '@/components/site-loader'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'HENRY.CODE - Web Development & AI Automation',
  description: 'Professional portfolio showcasing web development projects and AI automation solutions',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <SiteLoader />
        <TrackingProvider>
          <PageTransition />
          <ScrollAnimations />
          <InteractiveAnimations />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </TrackingProvider>
      </body>
    </html>
  )
}
