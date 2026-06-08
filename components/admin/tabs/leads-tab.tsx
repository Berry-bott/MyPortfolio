'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Eye, Mail, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message?: string
  status: string
  source?: string
  created_at: string
}

export function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [replyLead, setReplyLead] = useState<Lead | null>(null)
  const [reply, setReply] = useState({
    subject: '',
    message: '',
  })
  const [sendingReply, setSendingReply] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [filter])

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/leads${filter !== 'all' ? `?status=${filter}` : ''}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch leads')
      }

      setLeads(data.leads || [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch leads'
      setError(message)
      setLeads([])
      console.error('[v0] Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateLeadStatus = async (leadId: string, status: string) => {
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/leads?id=${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update lead')
      }

      await fetchLeads()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update lead'
      setError(message)
    }
  }

  const deleteLead = async (leadId: string) => {
    if (!window.confirm('Delete this lead?')) return

    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/leads?id=${leadId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete lead')
      }

      await fetchLeads()
      setSuccess('Lead deleted successfully.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete lead'
      setError(message)
    }
  }

  const openReplyComposer = (lead: Lead) => {
    setReplyLead(lead)
    setReply({
      subject: `Re: Your ${lead.service || 'project'} inquiry`,
      message: `Hi ${lead.name},\n\nThanks for reaching out. I reviewed your message and would love to discuss the next steps.\n\nBest regards,\nHENRY.CODE`,
    })
  }

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!replyLead) return

    setSendingReply(true)
    setError(null)
    setSuccess(null)

    try {
      const html = reply.message
        .split('\n')
        .map((line) => `<p>${line || '&nbsp;'}</p>`)
        .join('')

      const res = await fetch('/api/auto-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: replyLead.email,
          subject: reply.subject,
          message: html,
          type: 'manual-reply',
          send: true,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      setSuccess(`Email sent to ${replyLead.email}.`)
      setReplyLead(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send email'
      setError(message)
    } finally {
      setSendingReply(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/10 text-blue-500',
      contacted: 'bg-yellow-500/10 text-yellow-500',
      qualified: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    }
    return colors[status] || 'bg-gray-500/10 text-gray-500'
  }

  const filteredLeads = leads.filter((lead) => {
    const query = search.toLowerCase().trim()

    if (!query) return true

    return [
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.service,
      lead.message,
      lead.status,
    ]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query))
  })

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

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'contacted', 'qualified'].map((s) => (
          <Button
            key={s}
            variant={filter === s ? 'default' : 'outline'}
            onClick={() => setFilter(s)}
            className="capitalize"
          >
            {s}
          </Button>
        ))}
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads..."
          className="lg:max-w-xs"
        />
      </div>

      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedLead.name}</DialogTitle>
                <DialogDescription>{selectedLead.email}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Lead details and submitted inquiry.</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => openReplyComposer(selectedLead)}
                className="border border-primary/70 bg-primary text-black hover:border-primary hover:bg-primary/90 hover:text-black"
              >
                Email Lead
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
              <p className="text-sm">{selectedLead.phone || '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Company</p>
              <p className="text-sm">{selectedLead.company || '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Service</p>
              <p className="text-sm">{selectedLead.service || '-'}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Source</p>
              <p className="text-sm">{selectedLead.source || 'contact-form'}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Message</p>
            <p className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-card p-4 text-sm">
              {selectedLead.message || 'No message provided.'}
            </p>
          </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!replyLead} onOpenChange={(open) => !open && setReplyLead(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {replyLead && (
          <form onSubmit={sendReply} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Reply to {replyLead.name}</DialogTitle>
              <DialogDescription>{replyLead.email}</DialogDescription>
            </DialogHeader>
            <div>
              <label className="mb-2 block text-sm font-medium">Subject</label>
              <Input
                value={reply.subject}
                onChange={(e) => setReply({ ...reply, subject: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Message</label>
              <Textarea
                value={reply.message}
                onChange={(e) => setReply({ ...reply, message: e.target.value })}
                rows={7}
                required
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="submit" disabled={sendingReply} className="flex-1">
                {sendingReply ? 'Sending...' : 'Send Email'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setReplyLead(null)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
          )}
        </DialogContent>
      </Dialog>

      <Card className="min-w-0 overflow-hidden border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground">Company</TableHead>
              <TableHead className="text-muted-foreground">Service</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading leads...
                </TableCell>
              </TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border hover:bg-card/30">
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="text-sm">{lead.company || '-'}</TableCell>
                  <TableCell className="text-sm">{lead.service || '-'}</TableCell>
                  <TableCell>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize bg-transparent border border-border ${getStatusColor(lead.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="archived">Archived</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary/80"
                        onClick={() => openReplyComposer(lead)}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteLead(lead.id)}
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
