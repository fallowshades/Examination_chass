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

function randomDelay(min: number = 1000, max: number = 6000): number {
  const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(randomDelay, "randomDelay");
   return randomDelay
}
 

import { BIG_ROOMS, SMALL_ROOMS } from  '~/routes/components/config/constants'
// import { defer } from "react-router-dom"
export async function clientLoader({ params }: Route.LoaderArgs) {
  //const product = await fakeDb.getProduct(params.pid);
   const [smallA, bigB] = await Promise.all([
    delay(randomDelay()).then(() => SMALL_ROOMS),
    delay(randomDelay()).then(() => BIG_ROOMS),
  ]);

  // return { smallA, bigB };
   return{
    smallA: delay(randomDelay()).then(() => SMALL_ROOMS),
    bigB: delay(randomDelay()).then(() => BIG_ROOMS),
   }
  // defer(
}

import GroupedBookings from "./components/GroupedBookings";
import Confirm from "./components/Confirm";
import OnlineBooking from "./components/OnlineBooking";
import { Form,Await } from "react-router";
import BookingLayer from "./components/BookingLayer";

import { Suspense } from "react";
import { groupRooms } from "~/routes/components/config/utils";

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  const { bigB, smallA } = loaderData
  return <section id='section' className='bg-chasLightGray'>
      {/* <BookingControlContainer /> */}
    <div className='flex  py-12   gap-4'>
      <Suspense fallback={<p>Loading rooms...</p>}>
        <Await resolve={Promise.all([bigB, smallA])}>
          {(resolved) => {
          const [resolvedBig, resolvedSmall] = resolved;
          console.log(resolvedBig, resolvedSmall), 'resolved';
          const grouped = groupRooms(resolvedBig, resolvedSmall)
            return (
            <>
                {grouped.map((layer, i) => (
                  <BookingLayer key={i} layer={layer} />
                ))}
            </>
            );
          }}
        </Await>
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
     <Welcome /> 
    </section>
}
