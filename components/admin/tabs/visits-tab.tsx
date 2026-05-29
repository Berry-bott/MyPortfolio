'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Visit {
  id: string
  page_path: string
  referrer: string
  duration_seconds: number
  created_at: string
}

interface VisitsData {
  recentVisits: Visit[]
  pageViews: Record<string, number>
  referrers: Record<string, number>
  avgDuration: number
}

const COLORS = ['#0ea5e9', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export function VisitsTab() {
  const [data, setData] = useState<VisitsData>({
    recentVisits: [],
    pageViews: {},
    referrers: {},
    avgDuration: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVisits = async () => {
      setError(null)

      try {
        const res = await fetch('/api/visits')
        const visitData = await res.json()

        if (!res.ok) {
          throw new Error(visitData.error || 'Failed to fetch visits')
        }

        setData({
          recentVisits: visitData.recentVisits || [],
          pageViews: visitData.pageViews || {},
          referrers: visitData.referrers || {},
          avgDuration: visitData.avgDuration || 0,
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch visits'
        setError(message)
        setData({
          recentVisits: [],
          pageViews: {},
          referrers: {},
          avgDuration: 0,
        })
        console.error('[v0] Error fetching visits:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVisits()
    const interval = setInterval(fetchVisits, 60000) // Refresh every 60 seconds

    return () => clearInterval(interval)
  }, [])

  const pageViewsData = Object.entries(data.pageViews).map(([page, count]) => ({
    name: page,
    visits: count,
  }))

  const referrersData = Object.entries(data.referrers).map(([referrer, count]) => ({
    name: referrer,
    value: count,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {error && (
        <Alert variant="destructive" className="lg:col-span-3">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Page Views Chart */}
      <Card className="lg:col-span-2 border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Page Views</h3>
        {loading ? (
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--foreground)',
                }}
              />
              <Bar dataKey="visits" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Referrers Chart */}
      <Card className="border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
        {loading ? (
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={referrersData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {referrersData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--foreground)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Recent Visits Table */}
      <Card className="lg:col-span-3 border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold">Recent Visits</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Page</TableHead>
              <TableHead className="text-muted-foreground">Referrer</TableHead>
              <TableHead className="text-muted-foreground">Duration</TableHead>
              <TableHead className="text-muted-foreground">Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.recentVisits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No visits recorded yet
                </TableCell>
              </TableRow>
            ) : (
              data.recentVisits.map((visit) => (
                <TableRow key={visit.id} className="border-border hover:bg-card/30">
                  <TableCell className="font-medium text-sm">{visit.page_path}</TableCell>
                  <TableCell className="text-sm text-muted-foreground capitalize">{visit.referrer}</TableCell>
                  <TableCell className="text-sm">{visit.duration_seconds}s</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(visit.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
