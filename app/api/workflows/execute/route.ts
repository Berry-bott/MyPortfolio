import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

interface WorkflowAction {
  type: string
  config: Record<string, any>
}

export async function POST(request: NextRequest) {
  try {
    const { workflowId, triggerData } = await request.json()

    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID is required' },
        { status: 400 }
      )
    }

    // Fetch the workflow
    const { data: workflows, error: fetchError } = await supabaseServer
      .from('automation_workflows')
      .select('*')
      .eq('id', workflowId)

    if (fetchError || !workflows || workflows.length === 0) {
      console.error('[v0] Workflow not found:', workflowId)
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      )
    }

    const workflow = workflows[0]

    if (!workflow.is_active) {
      return NextResponse.json(
        { error: 'Workflow is not active' },
        { status: 400 }
      )
    }

    // Execute workflow actions
    const results: any[] = []
    const actions = workflow.actions as WorkflowAction[]

    for (const action of actions) {
      try {
        const result = await executeAction(action, triggerData)
        results.push({
          action: action.type,
          status: 'success',
          result,
        })
      } catch (error: any) {
        console.error('[v0] Action execution failed:', error)
        results.push({
          action: action.type,
          status: 'failed',
          error: error.message,
        })
      }
    }

    // Log the execution
    await supabaseServer.from('automation_logs').insert({
      workflow_id: workflowId,
      event_type: 'workflow_executed',
      event_data: {
        trigger_data: triggerData,
        actions_executed: results.length,
      },
      status: 'completed',
    })

    console.log('[v0] Workflow executed:', {
      workflowId,
      actionsExecuted: results.length,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Workflow executed successfully',
      results,
      executedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[v0] Error executing workflow:', error)
    return NextResponse.json(
      { error: 'Failed to execute workflow' },
      { status: 500 }
    )
  }
}

async function executeAction(action: WorkflowAction, triggerData: any): Promise<any> {
  const { type, config } = action

  switch (type) {
    case 'send_email':
      return await sendEmailAction(config, triggerData)

    case 'create_record':
      return await createRecordAction(config, triggerData)

    case 'update_status':
      return await updateStatusAction(config, triggerData)

    case 'webhook':
      return await triggerWebhook(config, triggerData)

    case 'notification':
      return await sendNotification(config, triggerData)

    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

async function sendEmailAction(config: any, triggerData: any): Promise<any> {
  const recipient = config.recipient || triggerData.email
  const subject = config.subject || 'Workflow email'
  const body = config.message || 'Workflow email action was triggered.'

  if (!recipient) {
    throw new Error('Recipient email is required for send_email action')
  }

  const { data: message, error } = await supabaseServer
    .from('messages')
    .insert({
      from_email: 'noreply@henry-code.local',
      from_name: 'HENRY.CODE Workflow',
      to_email: recipient,
      subject,
      body,
      message_type: 'workflow',
      status: 'logged',
    })
    .select()

  if (error) {
    throw new Error(`Failed to log workflow email: ${error.message}`)
  }

  return {
    type: 'email',
    recipient,
    subject,
    messageId: message?.[0]?.id,
    sent_at: new Date().toISOString(),
  }
}

async function createRecordAction(config: any, triggerData: any): Promise<any> {
  const { table, data } = config

  if (!table) {
    throw new Error('Table name is required for create_record action')
  }

  // Merge trigger data with configured data
  const recordData = {
    ...data,
    ...triggerData,
  }

  const { data: record, error } = await supabaseServer
    .from(table)
    .insert(recordData)
    .select()

  if (error) {
    throw new Error(`Failed to create record: ${error.message}`)
  }

  return {
    type: 'record_created',
    table,
    recordId: record?.[0]?.id,
    created_at: new Date().toISOString(),
  }
}

async function updateStatusAction(config: any, triggerData: any): Promise<any> {
  const { table, recordId, status } = config

  if (!table || !recordId || !status) {
    throw new Error('Table, recordId, and status are required for update_status action')
  }

  const { data: record, error } = await supabaseServer
    .from(table)
    .update({ status })
    .eq('id', recordId)
    .select()

  if (error) {
    throw new Error(`Failed to update status: ${error.message}`)
  }

  return {
    type: 'status_updated',
    table,
    recordId,
    newStatus: status,
    updated_at: new Date().toISOString(),
  }
}

async function triggerWebhook(config: any, triggerData: any): Promise<any> {
  const { url, method = 'POST' } = config

  if (!url) {
    throw new Error('URL is required for webhook action')
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(triggerData),
    })

    return {
      type: 'webhook_triggered',
      url,
      status_code: response.status,
      triggered_at: new Date().toISOString(),
    }
  } catch (error: any) {
    throw new Error(`Webhook trigger failed: ${error.message}`)
  }
}

async function sendNotification(config: any, triggerData: any): Promise<any> {
  // Mock notification - replace with actual service (Slack, Discord, etc.)
  console.log('[v0] Sending notification:', {
    channel: config.channel,
    message: config.message,
    triggerData,
  })

  return {
    type: 'notification_sent',
    channel: config.channel,
    timestamp: new Date().toISOString(),
  }
}
