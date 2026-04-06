'use client'

import { useVisitTracking } from '@/hooks/use-visit-tracking'

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  // Initialize visit tracking
  useVisitTracking()

  return <>{children}</>
}
