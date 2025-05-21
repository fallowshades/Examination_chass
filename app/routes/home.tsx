import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(min: number = 1000, max: number = 2000): number {
  const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomDelay, "randomDelay");
   return randomDelay
}
 

import { BIG_ROOMS, SMALL_ROOMS } from  '~/routes/components/config/constants'
//import { defer } from "react-router"; 

function abortableDelay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
export async function loader({ params }: Route.LoaderArgs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
  //const product = await fakeDb.getProduct(params.pid);
  try {
    // const [smallA, bigB] = await Promise.all([
    //   delay(randomDelay()).then(() => SMALL_ROOMS),
    //   delay(randomDelay()).then(() => BIG_ROOMS),
    // ]);
    const smallAPromise = await abortableDelay(6000, controller.signal).then(
      () => SMALL_ROOMS
    );
    const bigBPromise = abortableDelay(1000, controller.signal).then(
      () => BIG_ROOMS
    );

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
    clearTimeout(timeout);
  }
}
  // defer(

// import { defer } from "react-router-dom"


export async function clientLoader({
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {
  ;
  const serverData = await serverLoader();
  console.log("serverData", serverData);
  return { ...serverData, params };
}
// export async function loader() {
//   return defer({
//     smallA: delay(randomDelay()).then(() => SMALL_ROOMS),
//     bigB: delay(randomDelay()).then(() => BIG_ROOMS),
//   });
// }
import Confirm from "./components/Confirm";
import OnlineBooking from "./components/OnlineBooking";
import { Form,Await } from "react-router";
import BookingLayer from "./components/BookingLayer";

import { Suspense } from "react";
import { groupRooms } from "~/routes/components/config/utils";

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}
export function ErrorComponent({ error }: { error?: any }) {
  if (error?.status === 504) {
    return <div>Request timed out. Please try again later.</div>;
  }
  return <div>Unexpected error occurred</div>;
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  


  const { bigB, smallA } = loaderData
  return <section id='section' className='bg-chasLightGray'>
      {/* <BookingControlContainer /> */}
    <div className='flex  py-12   gap-4'>
      <Suspense fallback={<HydrateFallback />}>
         <Await resolve={Promise.all([bigB, smallA])} errorElement={<ErrorComponent />}>
    {([resolvedBigB, resolvedSmallA]) => {
      const grouped = groupRooms(resolvedBigB, resolvedSmallA);
      return (
        <>
          {grouped.map((layer, i) => (
            <BookingLayer key={i} layer={layer} />
          ))}
        </>
      );
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
        <div className=' border-t  border-chasBlue'>
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
}
