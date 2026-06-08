'use client'

import { useEffect } from 'react'

export function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('opacity-0')
      observer.observe(section)
    })

    // Observe all cards
    document.querySelectorAll('[class*="border-"][class*="rounded"]').forEach((card, index) => {
      card.classList.add('opacity-0')
      ;(card as HTMLElement).style.transitionDelay = `${index * 50}ms`
      observer.observe(card)
    })

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Hero sections get parallax
      document.querySelectorAll('section.relative').forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight) {
          const offset = (scrollY - rect.top + window.innerHeight) * 0.5
          ;(section as HTMLElement).style.backgroundPosition = `center ${offset}px`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <style jsx global>{`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards !important;
      }

      section {
        transition: opacity 0.6s ease-out;
      }

      [class*="border-"][class*="rounded"] {
        transition: opacity 0.6s ease-out;
      }
    `}</style>
  )
}
