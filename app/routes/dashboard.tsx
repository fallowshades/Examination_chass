
import React from 'react'
import type { Route } from "./+types/dashboard";
import { Outlet, redirect ,useNavigate,useSearchParams} from 'react-router';
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
          const url = new URL(request.url); // full URL, including origin, path, and search

      const hasWeek = url.searchParams.has("week");
  const hasDay = url.searchParams.has("day");

  if (!hasWeek || !hasDay) {
    const { dayOfWeek, weekOfYear } = calculateDayAndWeek();
const defaultState: TimeIntervalState = {
  day: dayOfWeek,
  week: weekOfYear,
  totalHours: 0,
  rooms: {},
    }
    console.log(dayOfWeek, weekOfYear, 'loader')
  const origin = url.origin;
  const pathname = url.pathname;//${weekOfYear}

    return redirect(`${url.pathname}?week=3.&day=${dayOfWeek}&total=10`);
  }

  // Don't redirect again; just return something or null
  return null;
}
export async function clientLoader() {
  return null
}


// export async function clientAction({ request }: { request: Request }) {
//   const formData = await request.formData();
//   // Perform mutation logic based on form data, like updating part of an object
//   const updatedData =  8//performMutation(formData); // This could mutate a part of the object
//   console.log(updatedData,'client')
//   // Return a response (e.g., JSON or redirect)
//   return { updatedData };
// }

export async function action({ request }: { request: Request; }) {
    const { week } = parseQueryParams(request)
   
    const formData = await request.formData();
     console.log(week,formData, 'action',formData.get('newWeek'))
  // Perform mutation logic based on form data, like updating part of an object

    // Convert FormData to plain object
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      values[key] = value;
    }
  }
console.log(values, 'values')
  let updatedData = await performMutation(values); // This could mutate a part of the object
  console.log(updatedData,'"action')
    // Return a response (e.g., JSON or redirect)
    // const updatedWeek = parseInt(formData.get('newWeek') as string, 10) || 1;
    const rawWeek = formData.get('newWeek');
    console.log(rawWeek, 'rawWeek',parseInt((rawWeek as string)?.trim()))
    const updatedWeek = rawWeek ? parseInt((rawWeek as string)?.trim(), 10) : undefined;
  console.log(updatedWeek, 'updatedWeek')
  
        const url = new URL(request.url); // full URL, including origin, path, and search

  return { updatedData,updatedWeek};
}

import { useState, useEffect } from 'react';
export default function dashboard({ loaderData }: { loaderData: { week: string; }; }) {
 
    let fetcher = useFetcher();
     const [searchParams, setSearchParams] = useSearchParams();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        {
            e.preventDefault();
            fetcher.submit(e.target as HTMLFormElement);
            // window.location.reload()
        }
    }
     
    let [state, setState] = useState(() => {
      const parsed = Number(searchParams.get("week"));
      return isNaN(parsed) ? 9 : parsed;
    });
  const navigate = useNavigate()
    useEffect(() => {
       
    if (fetcher.data && fetcher.data.updatedWeek != null) {
        // When action returns data, update local state
      console.log(fetcher.data, 'fetcher')
      
    //    setSearchParams((prev) => {
    // const updated = new URLSearchParams(prev);
    // updated.set('week', String(fetcher.data.updatedWeek));
    // return updated;
      //    });
        const updatedWeekStr = String(fetcher.data.updatedWeek);
       // 1. Update search params
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('week', updatedWeekStr);
   
      setState(fetcher.data.updatedWeek);
       setSearchParams(updatedParams);
    navigate(`?${updatedParams.toString()}`, { replace: true });
      
      }
    }, [fetcher.data]);
  
  useEffect(() => {
  console.log("updatedWeek changed", state);
}, [state]);
    console.log(state, 'state')
     console.log(JSON.stringify(fetcher.data), 'fetcher')
    const MemoizedOutlet = React.memo(() => <Outlet />);
        return (
            <>
                <div className='pt-7'>
      
                   
                        <ATriggerBWeek key={state}  currentWeek={state}/>
                   
                    <fetcher.Form
                        method='POST'
                        onSubmit={handleSubmit}
                    >
                        <BTriggeredDay key={state}  week={state} />
                    </fetcher.Form>
                </div>
                <div><MemoizedOutlet/></div>
            </>
        );
    };
