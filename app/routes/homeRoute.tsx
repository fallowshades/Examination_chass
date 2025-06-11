import React from 'react'
import type { Route } from '~/routes/+types/home'
import { Welcome } from '../welcome/welcome'

/**
 * meta
 * loader
 * clientLoader
 * HydrateFallback
 * Home
 *
 * @param param0
 * @returns
 */
export function meta({}: Route.MetaArgs) {
  return [
    { title: 'booking time' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export { loader } from './home.loader'

let cache: Record<string, unknown> | undefined
export async function clientLoader({
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {
  try {
    if (cache) return { ...cache }
    const serverData = await serverLoader()
    cache = serverData
    console.log('serverData', serverData)
    return {
      ...(typeof serverData === 'object' && serverData !== null
        ? serverData
        : {}),
      params,
    }
  } catch (err) {
    console.error('Failed to load SMALL_ROOMS', err)
    return data({ data: [] })
  }
}
clientLoader.hydrate = false

export async function action() {
  //await saveSomeStuff()
  return { ok: true }
}
import type { ShouldRevalidateFunction } from 'react-router'
//localhost:5174/bob?week=8&day=3&total=10http:

export const shouldRevalidate: ShouldRevalidateFunction = ({
  actionResult,
  currentParams, //slug
  currentUrl,
  defaultShouldRevalidate,
  formAction,
  formData,
  formEncType,
  formMethod,
  nextParams, //slug
  nextUrl,
}) => {
  if (actionResult?.ok) {
    return defaultShouldRevalidate
  }
  // Example optimization: if only the hash changed, skip revalidation
  return currentUrl.search !== nextUrl.search ? false : true
  if (
    currentUrl.pathname === nextUrl.pathname &&
    currentUrl.search === nextUrl.search
  ) {
    return false
  }

  // Example: don't revalidate on GET form submissions
  if (formMethod === 'GET') {
    //does not seem related to parent
    return false
  }
  return currentUrl.pathname !== nextUrl.pathname
  return false
}
// export async function loader() {
//   return defer({
//     smallA: delay(randomDelay()).then(() => SMALL_ROOMS),
//     bigB: delay(randomDelay()).then(() => BIG_ROOMS),
//   });
// }
import Confirm from './components/Confirm'
import OnlineBooking from './components/OnlineBooking'
import {
  Form,
  Await,
  type LoaderFunctionArgs,
  data,
  useLocation,
} from 'react-router'
import BookingLayer from './components/BookingLayer'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const LazyBookingLayer = React.lazy(() =>
  sleep(2000).then(() => import('./components/BookingLayer'))
)

import { Suspense, useMemo } from 'react'
import { groupRooms } from '~/routes/components/config/utils'

export function HydrateFallback() {
  const skeletonLayer = {
    groupId: <Skeleton className='h-4 w-[120px]' />,
    id: <Skeleton className='h-4 w-[120px]' />,
    rooms: Array(2).fill({
      id: '8',
      title: <Skeleton className='h-[10px] w-[7px] rounded-full' />,
      capacity: Array.from({ length: 3 }, (_, i) => (
        <Skeleton
          key={i}
          className='h-[20px] w-[100px] rounded-full py-2 mb-2'
        />
      )),
      // image: <Skeleton className='h-[125px] w-[250px] rounded-xl' />,
      layer: <Skeleton className='h-4 w-[20px]' />,
    }), // or fake room data
  }

  return <BookingLayer layer={skeletonLayer} />
}
export function ErrorComponent({ error }: { error?: any }) {
  if (error?.status === 504) {
    return <div>Request timed out. Please try again later.</div>
  }
  return <div>Unexpected error occurred</div>
}
import { type RoomType } from '~/routes/components/config/constants'
import { useFetcher } from 'react-router'
import { isSlowNetwork } from './hooks/isSlowNetwork'
import { Skeleton } from '~/components/ui/skeleton'

import { ComponentErrorBoundary } from '~/components/ComponentErrorBoundary'
import { ErrorFallback } from '~/components/ErrorFallback'

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = loaderData
  const { bigB, smallA } = data
  const location = useLocation()

  const logError = (error: Error, info: { componentStack: string }) => {
    console.log('Error logged:', error, info)
  }
  const fetcher = useFetcher()

  // If you want to support Deferred, unwrap manually or ignore until resolved
  const isLoaded = Array.isArray(bigB) && Array.isArray(smallA)

  if (!isLoaded) {
    return (
      <div className='flex py-12 gap-4'>
        {[...Array(2)].map((_, i) => (
          <HydrateFallback key={i} />
        ))}
      </div>
    )
  }

  const grouped = groupRooms(bigB, smallA)

  return (
    <section
      id='section'
      className='chas-light-gray'>
      <h1>without suspense</h1>
      <div className='flex py-12 gap-4'>
        {grouped.map((layer, i) => (
          <React.Fragment key={i}>
            {false ? (
              <BookingLayer layer={layer} />
            ) : (
              <LazyBookingLayer layer={layer} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
