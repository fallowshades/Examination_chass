
import React from 'react'
import type { Route } from "./+types/dashboard";
import { Outlet } from 'react-router';
import { useFetcher } from 'react-router';
import ATriggerBWeek from './components/ATriggerBWeek';
import BTriggeredDay from './components/BTriggeredDay';

import {performMutation} from './queries.server'; // Import your mutation function
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  // Perform mutation logic based on form data, like updating part of an object
  const updatedData = performMutation(formData); // This could mutate a part of the object
  
  // Return a response (e.g., JSON or redirect)
  return { updatedData };
}

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
      
                    <fetcher.Form
                        method='POST'
                        onSubmit={handleSubmit}
                        className='mb-4'
                    >
                        <ATriggerBWeek />
                    </fetcher.Form>
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
