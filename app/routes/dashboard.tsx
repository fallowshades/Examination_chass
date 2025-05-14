
import React from 'react'
import type { Route } from "./+types/dashboard";
import { Outlet } from 'react-router';
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

export async function action({ request }: { request: Request; }) {
    const { week } = { week: 'setup' }//parseQueryParams(request)
   
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
