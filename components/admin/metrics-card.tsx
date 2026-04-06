'use client'

import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string
  icon: LucideIcon
  color: string
  change: string
  loading?: boolean
}

export function MetricsCard({
  title,
  value,
  icon: Icon,
  color,
  change,
  loading,
}: MetricsCardProps) {
  return (
    <Card className="p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">
            {loading ? '...' : value}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-primary/10 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </Card>
  )
}
