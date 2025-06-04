import React from 'react'
import type { Route } from '~/routes/+types/home'
import { Welcome } from '../welcome/welcome'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
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
import { Form, Await, type LoaderFunctionArgs, data } from 'react-router'
import BookingLayer from './components/BookingLayer'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const LazyBookingLayer = React.lazy(() =>
  sleep(4000).then(() => import('./components/BookingLayer'))
)

import { Suspense } from 'react'
import { groupRooms } from '~/routes/components/config/utils'

export function HydrateFallback() {
  return <p>Loading Game...</p>
}
export function ErrorComponent({ error }: { error?: any }) {
  if (error?.status === 504) {
    return <div>Request timed out. Please try again later.</div>
  }
  return <div>Unexpected error occurred</div>
}
import { type RoomType } from '~/routes/components/config/constants'
export default function Home({ loaderData }: Route.ComponentProps) {
  const { bigB, smallA } = loaderData
  return (
    <section
      id='section'
      className='chas-light-gray'>
      {/* <BookingControlContainer /> */}
      <div className='flex  py-12   gap-4'>
        <Suspense fallback={<HydrateFallback />}>
          <Await
            resolve={Promise.all([bigB, smallA])}
            errorElement={<ErrorComponent />}>
            {([resolvedBigB, resolvedSmallA]) => {
              const grouped = groupRooms(
                resolvedBigB as RoomType[] | undefined,
                resolvedSmallA as RoomType[] | undefined
              )
              return (
                <>
                  {grouped.map((layer, i) => (
                    <React.Fragment key={i}>
                      {false ? (
                        <BookingLayer layer={layer} />
                      ) : (
                        <LazyBookingLayer layer={layer} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )
            }}
          </Await>
          {/* <Await  resolve={bigB}  errorElement={<ErrorComponent />}>
          {(resolvedBigB) => {
           

            const grouped = groupRooms(resolvedBigB,);

            return (
              <>
                {grouped.map((layer, i) => (
                  <BookingLayer key={i} layer={layer} />
                ))}
              </>
            );
          }}
        </Await>
        <Await resolve={smallA}  errorElement={<ErrorComponent />}>
        {(resolvedSmallA) => {
         

          const grouped = groupRooms( resolvedSmallA);

          return (
            <>
              {grouped.map((layer, i) => (
                <BookingLayer key={i} layer={layer} />
              ))}
            </>
          );
        }}
      </Await> */}
        </Suspense>
      </div>
      <div className='p-4 flex justify-center'>
        <div className=' border-t '>
          <OnlineBooking />
        </div>
      </div>
      <div className='px-20'>
        <Form method='POST'>
          <input
            type='hidden'
            name='formType'
            value='confirm'
          />
          <Confirm />
        </Form>
      </div>
    </section>
  )
}
