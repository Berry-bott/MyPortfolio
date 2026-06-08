'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface MessageLog {
  id: string
  from_email: string
  from_name?: string
  to_email: string
  subject?: string
  body?: string
  message_type?: string
  status?: string
  created_at: string
}

export function MessagesTab() {
  const [messages, setMessages] = useState<MessageLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auto-responses')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch messages')
      }

      setMessages(data.messages || [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch messages'
      setError(message)
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-w-0 space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="min-w-0 overflow-hidden border border-border">
        <div className="border-b border-border p-6">
          <h3 className="text-lg font-semibold">Message Logs</h3>
          <p className="text-sm text-muted-foreground">
            Auto-response and email activity saved from contact form submissions.
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">To</TableHead>
              <TableHead className="text-muted-foreground">Subject</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Loading messages...
                </TableCell>
              </TableRow>
            ) : messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No messages logged yet
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow key={message.id} className="border-border hover:bg-card/30">
                  <TableCell className="text-sm font-medium">{message.to_email}</TableCell>
                  <TableCell className="max-w-[22rem] truncate text-sm text-muted-foreground">
                    {message.subject || '-'}
                  </TableCell>
                  <TableCell className="text-sm capitalize">{message.message_type || '-'}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {message.status || 'logged'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(message.created_at).toLocaleString()}
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
