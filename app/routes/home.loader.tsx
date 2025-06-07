import { BIG_ROOMS, SMALL_ROOMS } from '~/routes/components/config/constants'
//import { defer } from "react-router";

import type { Route } from '~/routes/+types/home'

function abortableDelay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

import { timeout } from 'remix-utils/promise'
export async function loader({ request, params }: Route.LoaderArgs) {
  const controller = new AbortController()
  const timeoutid = setTimeout(() => controller.abort(), 6000) // 10s timeout
  //const product = await fakeDb.getProduct(params.pid);
  try {
    // const [smallA, bigB] = await Promise.all([
    //   delay(randomDelay()).then(() => SMALL_ROOMS),
    //   delay(randomDelay()).then(() => BIG_ROOMS),
    // ]);
    const smallAPromise = await abortableDelay(5000, controller.signal).then(
      () => SMALL_ROOMS
    )
    const bigBPromise = abortableDelay(500, controller.signal).then(() => {
      if (true) {
        return BIG_ROOMS
      } else {
        throw new Error('Failed to load SMALL_ROOMS')
      }
    })

    const smallAsPromise = true
      ? SMALL_ROOMS
      : timeout(Promise.resolve(SMALL_ROOMS), { ms: 7000 }) // Will timeout before 7s finishes);
    const bigBsPromise = true ? BIG_ROOMS : timeout(bigBPromise, { ms: 1000 })

    const result = await Promise.all([smallAsPromise, bigBsPromise])

    ////////////////////////////////////////////////////////////for optional waterfall
    let url = new URL(request.url)
    const term = url.searchParams.get('roomCheck')
    const brands = url.searchParams.getAll('timeSlot')
    console.log('brandsss', brands)
    return {
      // smallA: smallAPromise,
      // bigB: bigBPromise,
      // smallA: await smallAPromise,
      // bigB: await bigBPromise,
      smallA: result[0],
      bigB: result[1],
    }
    //   return defer({
    //   smallA: delay(randomDelay()).then(() => SMALL_ROOMS),
    //   bigB: delay(randomDelay()).then(() => BIG_ROOMS),
    // });;
  } catch (err) {
    console.error('Loader error:', err)
    console.error('Error loading rooms:', err)
    throw new Response('Server Timeout', { status: 504 })
  } finally {
    clearTimeout(timeoutid)
  }
}
// defer(

// import { defer } from "react-router-dom"
