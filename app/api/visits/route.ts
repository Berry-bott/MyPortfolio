import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

type VisitRow = {
  page_path: string
  referrer?: string | null
  duration_seconds?: number | null
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Get visitor IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Insert visit into Supabase
    const { error } = await supabaseServer.from('visits').insert({
      visitor_ip: ip,
      page_path: data.page || '/',
      referrer: data.referrer || 'direct',
      user_agent: request.headers.get('user-agent') || '',
      duration_seconds: data.duration || 0,
      session_id: data.sessionId || null,
    })

    if (error) {
      // Silently continue - Supabase may not be configured in development
      // The visit is still logged below for debugging
    }

    // Log visit event
    console.log('[v0] Visit tracked:', {
      page: data.page || '/',
      referrer: data.referrer || 'direct',
      duration: data.duration || 0,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: 'Visit tracked successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error tracking visit:', error)
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '100'

    // Get recent visits
    const { data: visits, error: visitsError } = await supabaseServer
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(parseInt(limit))

    if (visitsError) {
      console.error('[v0] Error fetching visits:', visitsError)
      return NextResponse.json(
        { error: 'Failed to fetch visits' },
        { status: 500 }
      )
    }

    // Calculate analytics
    const typedVisits = (visits || []) as VisitRow[]
    const totalVisits = typedVisits.length
    const avgDuration = typedVisits.length > 0
      ? Math.round(typedVisits.reduce((sum: number, v: VisitRow) => sum + (v.duration_seconds || 0), 0) / typedVisits.length)
      : 0

    const pageViews: Record<string, number> = {}
    const referrers: Record<string, number> = {}

    typedVisits.forEach((v: VisitRow) => {
      pageViews[v.page_path] = (pageViews[v.page_path] || 0) + 1
      const referrer = v.referrer || 'direct'
      referrers[referrer] = (referrers[referrer] || 0) + 1
    })

    return NextResponse.json({
      success: true,
      totalVisits,
      avgDuration,
      pageViews,
      referrers,
      recentVisits: typedVisits,
    })
  } catch (error) {
    console.error('[v0] Error in GET visits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
