import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/auth'

// API routes that are fully admin-only (all methods require a session).
const ADMIN_ONLY_API = ['/api/jobs', '/api/workflows', '/api/admin']

// API routes that are publicly writable (contact form, visit tracking) but
// expose admin-only data on read/update/delete.
const SHARED_API = ['/api/leads', '/api/visits', '/api/auto-responses']

function matchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

function unauthorizedApi() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // The login endpoint and login page must stay public.
  if (pathname === '/api/admin/login' || pathname === '/admin/login') {
    return NextResponse.next()
  }

  const isAuthed = await verifySessionToken(
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  )

  // Admin pages: redirect unauthenticated visitors to the login page.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (isAuthed) return NextResponse.next()

    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin-only APIs: every method requires a session.
  if (matchesPrefix(pathname, ADMIN_ONLY_API)) {
    return isAuthed ? NextResponse.next() : unauthorizedApi()
  }

  // Shared APIs: allow public POSTs, protect everything else.
  if (matchesPrefix(pathname, SHARED_API)) {
    if (request.method === 'POST') return NextResponse.next()
    return isAuthed ? NextResponse.next() : unauthorizedApi()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/leads/:path*',
    '/api/visits/:path*',
    '/api/auto-responses/:path*',
    '/api/jobs/:path*',
    '/api/workflows/:path*',
    '/api/admin/:path*',
  ],
}
