import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
  isAdminConfigured,
  verifyAdminPassword,
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    if (!isAdminConfigured()) {
      return NextResponse.json(
        { error: 'Admin login is not configured' },
        { status: 500 }
      )
    }

    const { password } = await request.json()

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = await createSessionToken()

    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_SECONDS,
    })

    return response
  } catch (error) {
    console.error('[v0] Admin login failed:', error)
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
