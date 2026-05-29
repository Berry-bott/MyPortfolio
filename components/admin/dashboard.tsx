'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, Users, Eye, TrendingUp, Zap, Briefcase } from 'lucide-react'
import { LeadsTab } from './tabs/leads-tab'
import { VisitsTab } from './tabs/visits-tab'
import { WorkflowsTab } from './tabs/workflows-tab'
import { JobsTab } from './tabs/jobs-tab'
import { MetricsCard } from './metrics-card'

export function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    totalVisits: 0,
    avgDuration: 0,
    conversionRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      setError(null)

      try {
        const [leadsRes, visitsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/visits'),
        ])

        const leadsData = await leadsRes.json()
        const visitsData = await visitsRes.json()

        if (!leadsRes.ok) {
          throw new Error(leadsData.error || 'Failed to fetch leads')
        }

        if (!visitsRes.ok) {
          throw new Error(visitsData.error || 'Failed to fetch visits')
        }

        const leads = leadsData.leads || []
        const visits = visitsData.recentVisits || []

        const qualifiedLeads = leads.filter((l: any) => l.status === 'qualified').length
        const conversionRate = leads.length > 0 ? Math.round((qualifiedLeads / leads.length) * 100) : 0

        setMetrics({
          totalLeads: leads.length,
          totalVisits: visits.length,
          avgDuration: visitsData.avgDuration || 0,
          conversionRate,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch dashboard metrics'
        setError(message)
        console.error('[v0] Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const statsCards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads.toString(),
      icon: Users,
      color: 'text-primary',
      change: 'Real-time data',
    },
    {
      title: 'Recent Visits',
      value: metrics.totalVisits.toString(),
      icon: Eye,
      color: 'text-accent',
      change: 'Last 100 visits',
    },
    {
      title: 'Conversion Rate',
      value: `${metrics.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-green-500',
      change: 'Qualified leads',
    },
    {
      title: 'Avg Duration',
      value: `${metrics.avgDuration}s`,
      icon: Mail,
      color: 'text-blue-500',
      change: 'Per visitor',
    },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage leads, visitors, workflows, and jobs</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((card) => (
            <MetricsCard key={card.title} {...card} loading={loading} />
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mb-8">
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Visits</span>
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Workflows</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <LeadsTab />
          </TabsContent>

          <TabsContent value="visits" className="space-y-4">
            <VisitsTab />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <WorkflowsTab />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <JobsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
