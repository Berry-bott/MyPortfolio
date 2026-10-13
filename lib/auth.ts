const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8 // 8 hours

const encoder = new TextEncoder()

function getSessionSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  return secret && secret.length >= 16 ? secret : null
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

async function signHmac(data: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return new Uint8Array(signature)
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return timingSafeEqual(password, expected)
}

export async function createSessionToken(
  ttlSeconds: number = SESSION_TTL_SECONDS
): Promise<string> {
  const secret = getSessionSecret()
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET (or ADMIN_PASSWORD) must be set')
  }

  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ exp: Date.now() + ttlSeconds * 1000 }))
  )
  const signature = toBase64Url(await signHmac(payload, secret))
  return `${payload}.${signature}`
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  if (!token) return false

  const secret = getSessionSecret()
  if (!secret) return false

  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [payload, signature] = parts
  const expected = toBase64Url(await signHmac(payload, secret))
  if (!timingSafeEqual(expected, signature)) return false

  try {
    const decoded = JSON.parse(new TextDecoder().decode(fromBase64Url(payload)))
    if (typeof decoded?.exp !== 'number' || Date.now() > decoded.exp) {
      return false
    }
    return true
  } catch {
    return false
  }
}

export { ADMIN_SESSION_COOKIE, SESSION_TTL_SECONDS }
