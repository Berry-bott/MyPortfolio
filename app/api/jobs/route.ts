import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Insert job into Supabase
    const { data: job, error } = await supabaseServer
      .from('jobs')
      .insert({
        title: data.title,
        description: data.description,
        source: data.source || null,
        priority: data.priority || 'medium',
        status: data.status || 'saved',
        company: data.company || null,
        salary_range: data.salaryRange || null,
        location: data.location || null,
        job_url: data.jobUrl || null,
      })
      .select()

    if (error) {
      console.error('[v0] Supabase error inserting job:', error)
      return NextResponse.json(
        { error: 'Failed to save job to database' },
        { status: 500 }
      )
    }

    // Log job tracking event
    console.log('[v0] Job added:', {
      title: data.title,
      source: data.source,
      priority: data.priority,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job added successfully',
        jobId: job.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error adding job:', error)
    return NextResponse.json(
      { error: 'Failed to add job' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get('status')
    const priority = request.nextUrl.searchParams.get('priority')
    const limit = request.nextUrl.searchParams.get('limit') || '50'

    let query = supabaseServer.from('jobs').select('*')

    if (status) {
      query = query.eq('status', status)
    }

    if (priority) {
      query = query.eq('priority', priority)
    }

    const { data: jobs, error } = await query
      .order('created_at', { ascending: false })
      .limit(parseInt(limit))

    if (error) {
      console.error('[v0] Error fetching jobs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch jobs' },
        { status: 500 }
      )
    }

    // Calculate stats from fetched jobs
    const stats = {
      total: jobs?.length || 0,
      byStatus: {
        saved: jobs?.filter((j: any) => j.status === 'saved').length || 0,
        applied: jobs?.filter((j: any) => j.status === 'applied').length || 0,
        interviewed: jobs?.filter((j: any) => j.status === 'interviewed').length || 0,
        offered: jobs?.filter((j: any) => j.status === 'offered').length || 0,
        rejected: jobs?.filter((j: any) => j.status === 'rejected').length || 0,
      },
      byPriority: {
        high: jobs?.filter((j: any) => j.priority === 'high').length || 0,
        medium: jobs?.filter((j: any) => j.priority === 'medium').length || 0,
        low: jobs?.filter((j: any) => j.priority === 'low').length || 0,
      },
    }

    return NextResponse.json({
      success: true,
      jobs,
      stats,
    })
  } catch (error) {
    console.error('[v0] Error in GET jobs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json()
    const jobId = request.nextUrl.searchParams.get('id')

    if (!jobId) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      )
    }

    const { data: job, error } = await supabaseServer
      .from('jobs')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId)
      .select()

    if (error) {
      console.error('[v0] Supabase error updating job:', error)
      return NextResponse.json(
        { error: 'Failed to update job' },
        { status: 500 }
      )
    }

    if (!job || job.length === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    console.log('[v0] Job updated:', {
      jobId,
      updates: Object.keys(data),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, job: job[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error updating job:', error)
    return NextResponse.json(
      { error: 'Failed to update job' },
      { status: 500 }
    )
  }
}
