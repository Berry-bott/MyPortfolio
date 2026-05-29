'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Play, Plus, Trash2, CheckCircle2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Workflow {
  id: string
  name: string
  description?: string
  trigger_type: string
  is_active: boolean
  created_at: string
}

export function WorkflowsTab() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    trigger_type: 'lead_created',
    actions: [],
  })

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/workflows')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch workflows')
      }

      setWorkflows(data.workflows || [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch workflows'
      setError(message)
      setWorkflows([])
      console.error('[v0] Error fetching workflows:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    
    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newWorkflow,
          actions: newWorkflow.actions.length > 0 ? newWorkflow.actions : [{ type: 'notification', config: {} }],
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create workflow')
      }

      setNewWorkflow({ name: '', trigger_type: 'lead_created', actions: [] })
      setShowCreate(false)
      setSuccess('Workflow created successfully.')
      fetchWorkflows()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create workflow'
      setError(message)
      console.error('[v0] Error creating workflow:', error)
    }
  }

  const handleExecuteWorkflow = async (workflowId: string) => {
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/workflows/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId,
          triggerData: { manual: true },
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to execute workflow')
      }

      setSuccess('Workflow executed successfully.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to execute workflow'
      setError(message)
      console.error('[v0] Error executing workflow:', error)
    }
  }

  const handleToggleActive = async (workflow: Workflow) => {
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/workflows?id=${workflow.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !workflow.is_active }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update workflow')
      }

      fetchWorkflows()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update workflow'
      setError(message)
      console.error('[v0] Error toggling workflow:', error)
    }
  }

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (!window.confirm('Delete this workflow?')) return

    setError(null)
    setSuccess(null)

    try {
      const res = await fetch(`/api/workflows?id=${workflowId}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete workflow')
      }

      setSuccess('Workflow deleted successfully.')
      fetchWorkflows()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete workflow'
      setError(message)
    }
  }

  const triggerTypeLabels: Record<string, string> = {
    lead_created: 'Lead Created',
    visit_recorded: 'Visit Recorded',
    scheduled: 'Scheduled',
    manual: 'Manual',
  }

  return (
    <div className="space-y-4">
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

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Automation Workflows</h3>
        <Button onClick={() => setShowCreate(!showCreate)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Workflow
        </Button>
      </div>

      {showCreate && (
        <Card className="border border-primary/50 p-6">
          <form onSubmit={handleCreateWorkflow} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Workflow Name</label>
              <Input
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                placeholder="e.g., Send email to new leads"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trigger Type</label>
              <select
                value={newWorkflow.trigger_type}
                onChange={(e) => setNewWorkflow({ ...newWorkflow, trigger_type: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
              >
                <option value="lead_created">Lead Created</option>
                <option value="visit_recorded">Visit Recorded</option>
                <option value="scheduled">Scheduled</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Create Workflow
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreate(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Name</TableHead>
              <TableHead className="text-muted-foreground">Trigger</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Created</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Loading workflows...
                </TableCell>
              </TableRow>
            ) : workflows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No workflows created yet
                </TableCell>
              </TableRow>
            ) : (
              workflows.map((workflow) => (
                <TableRow key={workflow.id} className="border-border hover:bg-card/30">
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {triggerTypeLabels[workflow.trigger_type] || workflow.trigger_type}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        workflow.is_active ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                    <span className="ml-2 text-sm">
                      {workflow.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(workflow.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleActive(workflow)}
                        className="text-yellow-500 hover:text-yellow-600"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleExecuteWorkflow(workflow.id)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                        className="text-red-500 hover:text-red-600"
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
