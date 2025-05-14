
import React from 'react'
import type { Route } from "./+types/dashboard";
import { Outlet, redirect } from 'react-router';
import { useFetcher } from 'react-router';
import ATriggerBWeek from './components/ATriggerBWeek';
import BTriggeredDay from './components/BTriggeredDay';
import {  parseQueryParams } from '~/routes/components/config'
import { performMutation } from './queries.server'; // Import your mutation function
import { z } from 'zod'
export const formSchema = z.object({
  week: z
    .string({ required_error: 'Please this is a button' })
    
})

import { calculateDayAndWeek } from '~/routes/queries.server';
import type { TimeIntervalState } from './components/config/types';
export async function loader({ request }: { request: Request; }) {

    const { dayOfWeek, weekOfYear } = calculateDayAndWeek();
const defaultState: TimeIntervalState = {
  day: dayOfWeek,
  week: weekOfYear,
  totalHours: 0,
  rooms: {},
    }
    console.log(dayOfWeek, weekOfYear, 'loader')
      const url = new URL(request.url); // full URL, including origin, path, and search
  const origin = url.origin;
  const pathname = url.pathname;//${weekOfYear}
  const hasWeek = url.searchParams.has("week");
  const hasDay = url.searchParams.has("day");

  if (!hasWeek || !hasDay) {
    const { dayOfWeek, weekOfYear } = calculateDayAndWeek();

    return redirect(`${url.pathname}?week=3&day=${dayOfWeek}`);
  }

  // Don't redirect again; just return something or null
  return null;
}
export async function clientLoader() {
    return null
}

export async function action({ request }: { request: Request; }) {
    const { week } = parseQueryParams(request)
   
    const formData = await request.formData();
     console.log(week,formData, 'action')
  // Perform mutation logic based on form data, like updating part of an object
  const updatedData = performMutation(formData); // This could mutate a part of the object
  console.log(updatedData,'"action')
  // Return a response (e.g., JSON or redirect)
  return { updatedData };
}


// export async function clientAction({ request }: { request: Request }) {
//   const formData = await request.formData();
//   // Perform mutation logic based on form data, like updating part of an object
//   const updatedData =  8//performMutation(formData); // This could mutate a part of the object
//   console.log(updatedData,'client')
//   // Return a response (e.g., JSON or redirect)
//   return { updatedData };
// }


export default function dashboard() {
    let fetcher = useFetcher();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        {
            e.preventDefault();
            fetcher.submit(e.target as HTMLFormElement);
            // window.location.reload()
        }
    }
        return (
            <>
                <div className='pt-7'>
      
                   
                        <ATriggerBWeek />
                   
                    <fetcher.Form
                        method='POST'
                        onSubmit={handleSubmit}
                    >
                        <BTriggeredDay />
                    </fetcher.Form>
                </div>
                <div><Outlet /></div>
            </>
        );
    };
