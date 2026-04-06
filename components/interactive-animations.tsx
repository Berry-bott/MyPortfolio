'use client'

import { useEffect } from 'react'

export function InteractiveAnimations() {
  useEffect(() => {
    // Button hover animations
    const buttons = document.querySelectorAll('button, a[role="button"]')
    
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        ;(button as HTMLElement).style.transform = 'scale(1.05)'
        ;(button as HTMLElement).style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      })

      button.addEventListener('mouseleave', () => {
        ;(button as HTMLElement).style.transform = 'scale(1)'
      })
    })

    // Card hover animations
    const cards = document.querySelectorAll('[class*="border-"][class*="rounded"]')
    
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        ;(card as HTMLElement).style.transform = 'translateY(-10px)'
        ;(card as HTMLElement).style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)'
        ;(card as HTMLElement).style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      })

      card.addEventListener('mouseleave', () => {
        ;(card as HTMLElement).style.transform = 'translateY(0)'
        ;(card as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
      })
    })

    // Input focus animations
    const inputs = document.querySelectorAll('input, textarea, select')
    
    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        ;(input as HTMLElement).style.borderColor = '#00d4ff'
        ;(input as HTMLElement).style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)'
        ;(input as HTMLElement).style.transition = 'all 0.3s ease-out'
      })

      input.addEventListener('blur', () => {
        ;(input as HTMLElement).style.borderColor = 'var(--border)'
        ;(input as HTMLElement).style.boxShadow = 'none'
      })
    })

    // Link hover animations
    const links = document.querySelectorAll('a:not([role="button"])')
    
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        ;(link as HTMLElement).style.color = '#00d4ff'
        ;(link as HTMLElement).style.transition = 'color 0.3s ease-out'
      })

      link.addEventListener('mouseleave', () => {
        ;(link as HTMLElement).style.color = ''
      })
    })
  }, [])

  return (
    <style jsx global>{`
      button, a[role="button"] {
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      [class*="border-"][class*="rounded"] {
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      input, textarea, select {
        transition: all 0.3s ease-out;
      }

      a:not([role="button"]) {
        transition: color 0.3s ease-out;
      }
    `}</style>
  )
}
