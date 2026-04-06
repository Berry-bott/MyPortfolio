'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Trash2 } from 'lucide-react'
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
  company?: string
  service?: string
  status: string
  created_at: string
}

export function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`/api/leads${filter !== 'all' ? `?status=${filter}` : ''}`)
        const data = await res.json()
        setLeads(data.leads || [])
      } catch (error) {
        console.error('[v0] Error fetching leads:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [filter])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/10 text-blue-500',
      contacted: 'bg-yellow-500/10 text-yellow-500',
      qualified: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    }
    return colors[status] || 'bg-gray-500/10 text-gray-500'
  }

  return (
    <div className="space-y-4">
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

      <Card className="border border-border overflow-hidden">
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
            ) : leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No leads found
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="border-border hover:bg-card/30">
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="text-sm">{lead.company || '-'}</TableCell>
                  <TableCell className="text-sm">{lead.service || '-'}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                        <Mail className="w-4 h-4" />
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
