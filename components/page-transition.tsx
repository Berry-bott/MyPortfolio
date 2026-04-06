'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition() {
  const pathname = usePathname()

  useEffect(() => {
    // Trigger CSS animations on route change
    const elements = {
      headings: document.querySelectorAll('h1, h2, h3'),
      paragraphs: document.querySelectorAll('p'),
      buttons: document.querySelectorAll('button, a[role="button"]'),
      cards: document.querySelectorAll('[class*="border-"][class*="rounded"]'),
    }

    // Remove animation classes
    Object.values(elements).forEach(nodeList => {
      nodeList.forEach((el: Element) => {
        el.classList.remove('animate-fade-in-up')
      })
    })

    // Trigger reflow to restart animation
    void document.documentElement.offsetHeight

    // Add animation classes with stagger
    elements.headings.forEach((el: Element, i: number) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.1}s`
      el.classList.add('animate-fade-in-up')
    })

    elements.paragraphs.forEach((el: Element, i: number) => {
      (el as HTMLElement).style.animationDelay = `${0.3 + i * 0.05}s`
      el.classList.add('animate-fade-in-up')
    })

    elements.buttons.forEach((el: Element, i: number) => {
      (el as HTMLElement).style.animationDelay = `${0.4 + i * 0.1}s`
      el.classList.add('animate-fade-in-up')
    })

    elements.cards.forEach((el: Element, i: number) => {
      (el as HTMLElement).style.animationDelay = `${0.2 + i * 0.1}s`
      el.classList.add('animate-fade-in-up')
    })
  }, [pathname])

  return (
    <style jsx global>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
      }
    `}</style>
  )
}
