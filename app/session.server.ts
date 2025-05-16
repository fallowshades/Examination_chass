// session.ts
import { parse, serialize } from 'cookie'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET || 'mysecret')
const SESSION_COOKIE = 'session'

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)

  return serialize(SESSION_COOKIE, token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const cookie = request.headers.get('cookie')
  if (!cookie) return null
  const cookies = parse(cookie)
  const token = cookies[SESSION_COOKIE]
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secret)
    return payload.userId as string
  } catch {
    return null
  }
}

export async function requireUser(request: Request) {
  const userId = await getUserIdFromRequest(request)
  if (!userId) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return userId
}
