'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function useVisitTracking() {
  const pathname = usePathname()
  const startTimeRef = useRef<number>(Date.now())
  const trackedRef = useRef<boolean>(false)

  useEffect(() => {
    // Track page visit
    startTimeRef.current = Date.now()
    trackedRef.current = false

    const trackVisit = async () => {
      if (trackedRef.current) return
      trackedRef.current = true

      try {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000)

        await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer || 'direct',
            duration,
          }),
        })
      } catch (error) {
        console.error('[v0] Failed to track visit:', error)
      }
    }

    // Track visit on page change or component unmount
    const handleBeforeUnload = () => {
      trackVisit()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      trackVisit()
    }
  }, [pathname])
}
