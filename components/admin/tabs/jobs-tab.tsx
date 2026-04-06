'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, ExternalLink } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Job {
  id: string
  title: string
  company?: string
  location?: string
  priority: string
  status: string
  created_at: string
  job_url?: string
}

interface JobStats {
  total: number
  byStatus: Record<string, number>
  byPriority: Record<string, number>
}

export function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [stats, setStats] = useState<JobStats>({
    total: 0,
    byStatus: {},
    byPriority: {},
  })
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  useEffect(() => {
    fetchJobs()
  }, [statusFilter, priorityFilter])

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (priorityFilter !== 'all') params.append('priority', priorityFilter)

      const res = await fetch(`/api/jobs?${params.toString()}`)
      const data = await res.json()
      setJobs(data.jobs || [])
      setStats(data.stats || { total: 0, byStatus: {}, byPriority: {} })
    } catch (error) {
      console.error('[v0] Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-500/10 text-red-500',
      medium: 'bg-yellow-500/10 text-yellow-500',
      low: 'bg-blue-500/10 text-blue-500',
    }
    return colors[priority] || 'bg-gray-500/10 text-gray-500'
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      saved: 'bg-gray-500/10 text-gray-500',
      applied: 'bg-blue-500/10 text-blue-500',
      interviewed: 'bg-yellow-500/10 text-yellow-500',
      offered: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    }
    return colors[status] || 'bg-gray-500/10 text-gray-500'
  }

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Jobs</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Applied</p>
          <p className="text-2xl font-bold">{stats.byStatus?.applied || 0}</p>
        </Card>
        <Card className="p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">High Priority</p>
          <p className="text-2xl font-bold">{stats.byPriority?.high || 0}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div>
          <label className="text-sm text-muted-foreground mr-2">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All</option>
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewed">Interviewed</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mr-2">Priority:</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1 bg-card border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <Card className="border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Job Title</TableHead>
              <TableHead className="text-muted-foreground">Company</TableHead>
              <TableHead className="text-muted-foreground">Location</TableHead>
              <TableHead className="text-muted-foreground">Priority</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading jobs...
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job.id} className="border-border hover:bg-card/30">
                  <TableCell className="font-medium text-sm">{job.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{job.company || '-'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{job.location || '-'}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(
                        job.priority
                      )}`}
                    >
                      {job.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(job.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {job.job_url && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:text-primary/80"
                          asChild
                        >
                          <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-blue-500 hover:text-blue-600">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
