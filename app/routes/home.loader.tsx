

import { BIG_ROOMS, SMALL_ROOMS } from  '~/routes/components/config/constants'
//import { defer } from "react-router"; 
import { timeout } from 'remix-utils/promise';
import type { Route } from "~/routes/+types/home";

function abortableDelay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}


export async function loader({ params }: Route.LoaderArgs) {
  const controller = new AbortController();
  const timeoutid = setTimeout(() => controller.abort(), 6000); // 10s timeout
  //const product = await fakeDb.getProduct(params.pid);
  try {
    // const [smallA, bigB] = await Promise.all([
    //   delay(randomDelay()).then(() => SMALL_ROOMS),
    //   delay(randomDelay()).then(() => BIG_ROOMS),
    // ]);
    const smallAPromise = await timeout(Promise.resolve(SMALL_ROOMS), { ms: 100 });
    //      const smallAPromis =await abortableDelay(8000, controller.signal).then(
    //   () => SMALL_ROOMS
    // );
    const bigBPromise = abortableDelay(1000, controller.signal).then(() => {
      if (true) {
        return BIG_ROOMS
      } else {
        throw new Error('Failed to load SMALL_ROOMS')
      }
    })

    return {
      smallA: smallAPromise,
      bigB: bigBPromise,
    };
    //   return defer({
    //   smallA: delay(randomDelay()).then(() => SMALL_ROOMS),
    //   bigB: delay(randomDelay()).then(() => BIG_ROOMS),
    // });;
  } catch (err) {
    console.error("Loader error:", err);
    console.error("Error loading rooms:", err);
    throw new Response("Server Timeout", { status: 504 });
  } finally {
    clearTimeout(timeoutid)
  }
}
  // defer(

// import { defer } from "react-router-dom"

