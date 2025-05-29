import React, { useEffect,useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import type { Route } from "./+types/_layout";
import { useFetcher ,useSubmit,useParams, } from 'react-router';
import { Button } from '~/components/ui/button';
import FormSelect from '~/components/ui/FormSelect';
export default function Layout({
  loaderData,
}: Route.ComponentProps){
  const fetcher = useFetcher()

  // const submit = useSubmit()
  const navigate = useNavigate()
  const handleUserChange = (newUserId: string) => {
    const search = location.search // preserve existing query params
    console.log(newUserId, 'newUserId')
    navigate(`/${newUserId}${search}`,{replace: true})
  }

  const userMeta = ['alice', 'bob', 'carol']
  const { userId } = useParams()
  console.log(userId, 'userId')
  //const defaultUser = userMeta.includes(userId || '') ? userId : userMeta[0];
  const fallbackUser =
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedUser') || userMeta[0]
      : userMeta[0]
  const selectedUserConsition = userMeta.includes(userId || '') ? userId : fallbackUser
   const routeUser = userMeta.includes(userId || '') ? userId : undefined;
  // 🌟 State for selected user
  const [selectedUser, setSelectedUser] = useState(() => {
    // Avoid SSR mismatch: only use routeUser on first render
    return routeUser || userMeta[0]
  })
  // Save to localStorage whenever userId changes
  useEffect(() => {
    if (selectedUser) {
       const stored = localStorage.getItem('selectedUser')
      if (typeof window !== 'undefined' && selectedUserConsition && stored) {
        const value = localStorage.getItem('yourKey')
      }
      localStorage.setItem('selectedUser', selectedUser)
    }
  }, [selectedUser])
  return (
    <>
      <header className='p-4 bg-blue-100'>
        <p>Pathless Layout Header</p>
      </header>
      <main className=''>
        {/* <fetcher.Form
            className='pt-8'
            method='POST'> */}
        {/* col 1 */}
        <div className='flex flex-col gap-4 max-w-[200px] justify-center mx-auto w-full'>
          <FormSelect
            labelText='select category'
            name='user'
            list={userMeta.map((meta) => {
              return { label: meta, value: meta }
            })}
            defaultValue={fallbackUser}
            onChange={(e) => {
              const selectedUserId = e.target.value
              handleUserChange(selectedUserId)
            }}
          />
        </div>
        {/* </fetcher.Form> */}
        <>
          <div>
            <Outlet />
          </div>
        </>
      </main>
    </>
  )
};
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   {
  //     e.preventDefault()
  //     fetcher.submit(e.target as HTMLFormElement)
  //     // window.location.reload()
  //   }
  // }


  
// const ResponsiveBallContent = ({
//   children,
//   nrFr = 2,
// }: {
//   children: React.ReactNode
//   nrFr?: number
// }) => {
//   return (
//     <div className='w-full flex justify-center bg-amber-700 m-0'>
//       <div
//         className={`grid w-9/12    items-start ${
//           nrFr === 1 ? 'grid-cols-[1fr]' : 'grid-cols-[1fr_1fr] '
//         }`}>
//         {children}
//       </div>
//     </div>
//   )
// }

