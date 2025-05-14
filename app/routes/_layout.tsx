import React from 'react'
import { Outlet } from 'react-router'
import type { Route } from "./+types/_layout";
import { useFetcher } from 'react-router';

export default function Layout({
  loaderData,
}: Route.ComponentProps){
  const fetcher = useFetcher();

    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    {
      e.preventDefault();
      fetcher.submit(e.target as HTMLFormElement);
      // window.location.reload()
    }
  }
    return (
      <>
        <header className="p-4 bg-blue-100"><p>Pathless Layout Header</p></header>
        <main className="p-4">
          <pre>hejhej</pre>
          <>
          

            <div><Outlet /></div>
          </>
        </main>
      </>
    );
  };
