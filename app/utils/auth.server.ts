// auth.server.ts
import { Authenticator } from "remix-auth"
import { redirect } from "react-router"


// file: types.ts
export type ProviderUser = {
  id: string
  username: string
}

// file: fake-strategy.ts
// import { Strategy } from "remix-auth/build/strategy"
import { safeRedirect } from 'remix-utils/safe-redirect'
import { combineHeaders } from './misc'
export class FakeStrategy<User>  {
  //extends Strategy<User, never>
  name = "fake"

  async authenticate(_request: Request): Promise<User> {
    // Return a random dummy user
    return {
      id: Math.random().toString(36).slice(2),
      username: `user${Math.floor(Math.random() * 1000)}`,
    } as User
  }
}


export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30
export const sessionKey = "sessionId"

// dummy session store (in-memory for testing only)
const sessions = new Map<string, ProviderUser>()

// fake cookie/session handling
export const authSessionStorage = {
  async getSession(cookie: string | null) {
    const sessionId = cookie?.split("=")[1]
    return {
      get: (key: string) => (key === sessionKey ? sessionId : null),
    }
  },
  async destroySession() {
    return "sessionId="
  },
}

export const authenticator = new Authenticator<ProviderUser>()

// authenticator.use(
//   new FakeStrategy(),
//   "fake"
// )

// Dummy function to simulate Prisma lookup
const dummyUserDatabase: Record<string, { userId: string }> = {}

export async function getUserId(request: Request) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  )

  const sessionId = authSession.get(sessionKey)
  if (!sessionId || !dummyUserDatabase[sessionId]) return null

  const session = dummyUserDatabase[sessionId]
  if (!session.userId) {
    throw redirect("/", {
      headers: {
        "set-cookie": await authSessionStorage.destroySession(),
      },
    })
  }

  return session.userId
}
export async function logout(
  {
    request,
    redirectTo = "/",
  }: {
    request: Request
    redirectTo?: string
  },
  responseInit?: ResponseInit
) {
  const authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  )

  const sessionId = authSession.get(sessionKey)

  // Remove from in-memory session
  if (sessionId) {
    delete dummyUserDatabase[sessionId]
  }

  throw redirect(safeRedirect(redirectTo), {
    ...responseInit,
    headers: combineHeaders(
      { "set-cookie": await authSessionStorage.destroySession() },
      responseInit?.headers
    ),
  })
}