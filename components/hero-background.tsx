'use client'

import { ThreeDHero } from './three-d-hero'

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <ThreeDHero />
      
      {/* Overlay gradient for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/70" />
    </div>
  )
}
