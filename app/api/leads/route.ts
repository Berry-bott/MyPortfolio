import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Insert lead into Supabase
    const { data: lead, error } = await supabaseServer
      .from('leads')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service || null,
        message: data.message || null,
        status: 'new',
        source: 'contact-form',
      })
      .select()

    if (error) {
      console.error('[v0] Supabase error inserting lead:', error)
      return NextResponse.json(
        { error: 'Failed to save lead to database' },
        { status: 500 }
      )
    }

    const leadId = lead?.[0]?.id || `mock_${Date.now()}`

    // Log automation event
    console.log('[v0] New lead captured:', {
      email: data.email,
      service: data.service,
      timestamp: new Date().toISOString(),
      stored: !error,
    })

    // Trigger automation workflow for new lead (non-blocking)
    try {
      await supabaseServer.from('automation_logs').insert({
        workflow_id: null,
        event_type: 'lead_created',
        event_data: { email: data.email, service: data.service },
        status: 'triggered',
      })
    } catch (logError) {
      console.warn('[v0] Could not log automation event:', logError)
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead captured successfully',
        leadId
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error processing lead:', error)
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit') || '50'

    let query = supabaseServer.from('leads').select('*')

    if (status) {
      query = query.eq('status', status)
    }

    const { data: leads, error } = await query
      .order('created_at', { ascending: false })
      .limit(parseInt(limit))

    if (error) {
      console.error('[v0] Error fetching leads:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, leads, count: leads?.length || 0 },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error in GET leads:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const leadId = request.nextUrl.searchParams.get('id')
    const data = await request.json()

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      )
    }

    const { data: lead, error } = await supabaseServer
      .from('leads')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId)
      .select()

    if (error) {
      console.error('[v0] Supabase error updating lead:', error)
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      )
    }

    if (!lead || lead.length === 0) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, lead: lead[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error updating lead:', error)
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const leadId = request.nextUrl.searchParams.get('id')

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseServer
      .from('leads')
      .delete()
      .eq('id', leadId)

    if (error) {
      console.error('[v0] Supabase error deleting lead:', error)
      return NextResponse.json(
        { error: 'Failed to delete lead' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully',
    })
  } catch (error) {
    console.error('[v0] Error deleting lead:', error)
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    )
  }
}
