import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('active')

    let query = supabaseServer.from('automation_workflows').select('*')

    if (isActive === 'true') {
      query = query.eq('is_active', true)
    } else if (isActive === 'false') {
      query = query.eq('is_active', false)
    }

    const { data: workflows, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Error fetching workflows:', error)
      return NextResponse.json(
        { error: 'Failed to fetch workflows' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      workflows,
      count: workflows?.length || 0,
    })
  } catch (error) {
    console.error('[v0] Error in GET workflows:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.name || !data.trigger_type || !data.actions) {
      return NextResponse.json(
        { error: 'Name, trigger_type, and actions are required' },
        { status: 400 }
      )
    }

    const { data: workflow, error } = await supabaseServer
      .from('automation_workflows')
      .insert({
        name: data.name,
        description: data.description || null,
        trigger_type: data.trigger_type,
        actions: data.actions,
        is_active: data.is_active !== false,
      })
      .select()

    if (error) {
      console.error('[v0] Supabase error creating workflow:', error)
      return NextResponse.json(
        { error: 'Failed to create workflow' },
        { status: 500 }
      )
    }

    console.log('[v0] Automation workflow created:', {
      name: data.name,
      trigger_type: data.trigger_type,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Workflow created successfully',
        workflow: workflow?.[0]
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error creating workflow:', error)
    return NextResponse.json(
      { error: 'Failed to create workflow' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const workflowId = searchParams.get('id')
    const data = await request.json()

    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID is required' },
        { status: 400 }
      )
    }

    const { data: workflow, error } = await supabaseServer
      .from('automation_workflows')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', workflowId)
      .select()

    if (error) {
      console.error('[v0] Supabase error updating workflow:', error)
      return NextResponse.json(
        { error: 'Failed to update workflow' },
        { status: 500 }
      )
    }

    if (!workflow || workflow.length === 0) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      )
    }

    console.log('[v0] Workflow updated:', {
      workflowId,
      updates: Object.keys(data),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      workflow: workflow[0],
    })
  } catch (error) {
    console.error('[v0] Error updating workflow:', error)
    return NextResponse.json(
      { error: 'Failed to update workflow' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const workflowId = searchParams.get('id')

    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseServer
      .from('automation_workflows')
      .delete()
      .eq('id', workflowId)

    if (error) {
      console.error('[v0] Supabase error deleting workflow:', error)
      return NextResponse.json(
        { error: 'Failed to delete workflow' },
        { status: 500 }
      )
    }

    console.log('[v0] Workflow deleted:', {
      workflowId,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Workflow deleted successfully',
    })
  } catch (error) {
    console.error('[v0] Error deleting workflow:', error)
    return NextResponse.json(
      { error: 'Failed to delete workflow' },
      { status: 500 }
    )
  }
}
