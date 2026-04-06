import { NextRequest, NextResponse } from 'next/server'

// Mock message queue - in production, integrate with email service
const messageQueue: any[] = []

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.email || !data.subject) {
      return NextResponse.json(
        { error: 'Email and subject are required' },
        { status: 400 }
      )
    }

    // Create auto-response record
    const response = {
      id: Date.now().toString(),
      sender_email: data.email,
      subject: data.subject,
      message: data.message || 'Thank you for your inquiry. I will get back to you shortly.',
      type: data.type || 'inquiry',
      auto_response_sent: true,
      created_at: new Date().toISOString(),
    }

    messageQueue.push(response)

    // Log automation event
    console.log('[v0] Auto-response triggered:', {
      email: response.sender_email,
      type: response.type,
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
        message: 'Auto-response sent successfully',
        responseId: response.id 
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
  return NextResponse.json({
    total: messageQueue.length,
    recentResponses: messageQueue.slice(-20).reverse(),
  })
}
