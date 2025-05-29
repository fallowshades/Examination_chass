import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
	ScrollRestoration,
  data,
  type ShouldRevalidateFunction,
  type HeadersFunction
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

/**
 * shouldRevalidate: data from remote container
 * links
 * lloader
 * Document
 * Layout
 * App
 * ErrorBoundary
 * @returns 
 * 
 */

// export const shouldRevalidate: ShouldRevalidateFunction = ({
//   defaultShouldRevalidate,
// }) => {
//   if ('onLine' in navigator && navigator.onLine === false) {
//     return false
//   }

//   return defaultShouldRevalidate
// }

/***
 * can preload svg sprite.
*/
// import { href as iconsHref } from '~/components/ui/icon'
export const links: Route.LinksFunction = () => [
  // { rel: 'preload', href: iconsHref, as: 'image' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  // {
  //   rel: 'manifest',
  //   href: '/site.webmanifest',
  //   crossOrigin: 'use-credentials',
  // } as const, // necessary to make typescript happy
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

import { makeTimings, time } from "./utils/timing.server";
import { getUserId, logout } from "./utils/auth.server";
import { ClientHintCheck } from './utils/client-hints';
import { getEnv } from "./utils/env.server";
import { combineHeaders } from "./utils/misc";

export let headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, s-maxage=60',
  }
}

export async function loader({ request }: Route.LoaderArgs) {
	const timings = makeTimings('root loader')
	const userId = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	const user = userId
		? await time(
				() =>
					 new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              id: userId,
              name: 'Test User',
              username: 'testuser',
              image: { objectKey: 'dummy-key' },
              roles: [
                {
                  name: 'admin',
                  permissions: [
                    { entity: 'user', action: 'read', access: 'granted' },
                    { entity: 'user', action: 'write', access: 'denied' },
                  ],
                },
              ],
            })
          }, 300)
        ),
				{ timings, type: 'find user', desc: 'find user in root' },
			)
		: null
	if (userId && !user) {
		console.info('something weird happened')
		// something weird happened... The user is authenticated but we can't find
		// them in the database. Maybe they were deleted? Let's log them out.
		await logout({ request, redirectTo: '/' })
	}
	
	return data(
		{
			user,
			requestInfo: {
				// hints: getHints(request),
				// origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				// userPrefs: {
				// 	theme: getTheme(request),
				// },
			},
			ENV: getEnv(),
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() }
			),
		},
	)
}

// import { type Theme } from './utils/theme.server'
export type Theme = 'light' | 'dark'
function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
}: {
	children: React.ReactNode;
	nonce: string;
	theme?: Theme;
	env?: Record<string, string | undefined>;
}) {
	const allowIndexing = env.ALLOW_INDEXING !== 'false';
	return (
    <html
      lang='en'
      className={`${theme} h-full overflow-x-hidden`}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
        />
        {allowIndexing ? null : (
          <meta
            name='robots'
            content='noindex, nofollow'
          />
        )}
        <Links />
      </head>
      <body className='bg-background text-foreground'>
        {children}
        {/* <script
          nonce={process.env.NODE_ENV === 'production' ? nonce : nonce}
          dangerouslySetInnerHTML={{
            __html: `window.__nonce = "${nonce}"; window.ENV = ${JSON.stringify(
              env
            )};`,
            // __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        /> */}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce || undefined} />
      </body>
    </html>
  )
}
import { useLoaderData } from "react-router";
import { useNonce } from "./utils/nonce-provider";

export function Layout({ children }: { children: React.ReactNode; }) {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()
	
	return (
	  <Document nonce={nonce}  env={data?.ENV}>
			{children}
		</Document>
    // <html lang="en">
    //   <head>
    //     <meta charSet="utf-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <Meta />
    //     <Links />
    //   </head>
    //   <body>
      
    //     {children}
    //     <ScrollRestoration />
    //     <Scripts />
    //   </body>
    // </html>
  );
}
import { NonceProvider } from './utils/nonce-provider'
declare global {
  interface Window {
    __nonce?: string;
  }
}

export default function App({
  children,
  serverNonce,
}: {
  children: React.ReactNode
  serverNonce: string
}) {
  const nonce =
    typeof window === 'undefined' ? serverNonce : window.__nonce || ''

  return (
    <NonceProvider value={nonce}>
      <Outlet />
    </NonceProvider>
  )
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
