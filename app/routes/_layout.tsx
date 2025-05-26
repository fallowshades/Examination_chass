import React from 'react'
import { Outlet } from 'react-router'
import type { Route } from "./+types/_layout";
import { useFetcher } from 'react-router';
import { Button } from '~/components/ui/button';
import FormSelect from '~/components/ui/FormSelect';
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
  const userMeta = ['alice', 'bob', 'carol']
    return (
      <>
        <header className='p-4 bg-blue-100'>
          <p>Pathless Layout Header</p>
        </header>
        <main className=''>
          <fetcher.Form
            className='pt-8'
            method='POST'>
              {/* col 1 */}
              <div className='flex flex-col gap-4 max-w-[200px] justify-center mx-auto w-full'>
                <FormSelect
                  labelText='select category'
                  name='valdKonsultant'
                  list={userMeta.map((meta) => {
                    return { label: meta, value: meta }
                  })}
                  defaultValue={userMeta[0]}
                />
                <Button
                  type='submit'
                  size='sm'
                  variant='default'
                  className='self-start mb-2 rounded-full  py-2 px-6"'
                  // asChild
                >
                  Bekräfta
                </Button>
              </div>
          </fetcher.Form>
          <>
            <div>
              <Outlet />
            </div>
          </>
        </main>
      </>
    )
  };


  
const ResponsiveBallContent = ({
  children,
  nrFr = 2,
}: {
  children: React.ReactNode
  nrFr?: number
}) => {
  return (
    <div className='w-full flex justify-center bg-amber-700 m-0'>
      <div
        className={`grid w-9/12    items-start ${
          nrFr === 1 ? 'grid-cols-[1fr]' : 'grid-cols-[1fr_1fr] '
        }`}>
        {children}
      </div>
    </div>
  )
}
