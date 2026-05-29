'use client'

import { useEffect, useState } from 'react'

export function SiteLoader() {
  const [count, setCount] = useState(1)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount((current) => {
        if (current >= 100) {
          window.clearInterval(interval)
          setIsLeaving(true)
          window.setTimeout(() => setIsVisible(false), 650)
          return 100
        }

        return current + 1
      })
    }, 90)

    return () => window.clearInterval(interval)
  }, [])

  if (!isVisible) {
    return null
  }

  const previousCount = Math.max(1, count - 1)

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center overflow-hidden bg-background text-foreground transition-opacity duration-700 ${
        isLeaving ? 'opacity-0' : 'opacity-100'
      }`}
      aria-live="polite"
      aria-label={`Loading website ${count} percent`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,212,255,0.14),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.06),transparent_42%)]" />

      <div className="relative px-6 text-center">
        <p className="mb-10 text-xs font-semibold uppercase tracking-[0.48em] text-muted-foreground">
          HENRY.CODE
        </p>

        <div className="book-loader" aria-hidden="true">
          <div className="book-loader__base" />
          <div className="book-loader__cover book-loader__cover--left" />
          <div className="book-loader__cover book-loader__cover--right" />
          <div className="book-loader__page book-loader__page--left">
            <span>Portfolio</span>
          </div>
          <div className="book-loader__page book-loader__page--right">
            <span>{count}</span>
          </div>
          <div key={count} className="book-loader__flip">
            <span>{previousCount}</span>
          </div>
          <div className="book-loader__spine" />
        </div>
      </div>
    </div>
  )
}
