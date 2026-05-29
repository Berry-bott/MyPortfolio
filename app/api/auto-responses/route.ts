import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import { getEmailTemplate } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const template = data.subject && data.message
      ? { subject: data.subject, html: data.message }
      : getEmailTemplate(data.type || 'contact', data)

    const { data: message, error } = await supabaseServer
      .from('messages')
      .insert({
        from_email: 'noreply@henry-code.local',
        from_name: 'HENRY.CODE',
        to_email: data.email,
        subject: data.subject || template.subject,
        body: template.html,
        message_type: data.type || 'contact',
        status: 'logged',
      })
      .select()

    if (error) {
      console.error('[v0] Supabase error logging auto-response:', error)
      return NextResponse.json(
        { error: 'Failed to log auto-response' },
        { status: 500 }
      )
    }

    // Log automation event
    console.log('[v0] Auto-response triggered:', {
      email: data.email,
      type: data.type || 'contact',
      timestamp: new Date().toISOString(),
    })

    // In production, send actual email via sendgrid, resend, or similar
    // await sendEmail({
    //   to: data.email,
    //   subject: response.subject,
    //   html: response.message,
    // })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Auto-response logged successfully',
        responseId: message?.[0]?.id
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error sending auto-response:', error)
    return NextResponse.json(
      { error: 'Failed to send auto-response' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data: messages, error } = await supabaseServer
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('[v0] Error fetching messages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch messages' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      total: messages?.length || 0,
      messages: messages || [],
    })
  } catch (error) {
    console.error('[v0] Error in GET auto-responses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
