'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Trash2, ExternalLink } from 'lucide-react'
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
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    source: 'manual',
    priority: 'medium',
    status: 'saved',
    salaryRange: '',
    jobUrl: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [statusFilter, priorityFilter])

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (priorityFilter !== 'all') params.append('priority', priorityFilter)

      const res = await fetch(`/api/jobs?${params.toString()}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch jobs')
      }

      setJobs(data.jobs || [])
      setStats(data.stats || { total: 0, byStatus: {}, byPriority: {} })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch jobs'
      setError(message)
      setJobs([])
      setStats({ total: 0, byStatus: {}, byPriority: {} })
      console.error('[v0] Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/jobs?id=${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update job')
      }

      await fetchJobs()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update job'
      setError(message)
    }
  }

  const deleteJob = async (jobId: string) => {
    if (!window.confirm('Delete this job?')) return

    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/jobs?id=${jobId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete job')
      }

      await fetchJobs()
      setSuccess('Job deleted successfully.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete job'
      setError(message)
    }
  }

  const createJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create job')
      }

      setNewJob({
        title: '',
        company: '',
        location: '',
        description: '',
        source: 'manual',
        priority: 'medium',
        status: 'saved',
        salaryRange: '',
        jobUrl: '',
      })
      setShowCreate(false)
      setSuccess('Job created successfully.')
      await fetchJobs()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create job'
      setError(message)
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
    <div className="min-w-0 space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Jobs & Gigs</h3>
          <p className="text-sm text-muted-foreground">Track freelance gigs, applications, and opportunities.</p>
        </div>
        <Button onClick={() => setShowCreate((value) => !value)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Job
        </Button>
      </div>

      {showCreate && (
        <Card className="border border-primary/40 p-6">
          <form onSubmit={createJob} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Title *</label>
                <Input
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="Frontend Developer Gig"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Company / Client</label>
                <Input
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  placeholder="Client or company name"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Location</label>
                <Input
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  placeholder="Remote, Lagos, etc."
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Budget / Salary</label>
                <Input
                  value={newJob.salaryRange}
                  onChange={(e) => setNewJob({ ...newJob, salaryRange: e.target.value })}
                  placeholder="$1,000 - $3,000"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Priority</label>
                <select
                  value={newJob.priority}
                  onChange={(e) => setNewJob({ ...newJob, priority: e.target.value })}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <select
                  value={newJob.status}
                  onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Job URL</label>
                <Input
                  value={newJob.jobUrl}
                  onChange={(e) => setNewJob({ ...newJob, jobUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Description *</label>
                <Textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="What is the opportunity about?"
                  rows={4}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" className="flex-1">Create Job</Button>
              <Button type="button" variant="outline" onClick={() => setShowCreate(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

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
      <Card className="min-w-0 overflow-hidden border border-border">
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
                    <select
                      value={job.priority}
                      onChange={(e) => updateJob(job.id, { priority: e.target.value })}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize bg-transparent border border-border ${getPriorityColor(
                        job.priority
                      )}`}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <select
                      value={job.status}
                      onChange={(e) => updateJob(job.id, { status: e.target.value })}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize bg-transparent border border-border ${getStatusColor(
                        job.status
                      )}`}
                    >
                      <option value="saved">Saved</option>
                      <option value="applied">Applied</option>
                      <option value="interviewed">Interviewed</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                    </select>
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
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteJob(job.id)}
                      >
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
