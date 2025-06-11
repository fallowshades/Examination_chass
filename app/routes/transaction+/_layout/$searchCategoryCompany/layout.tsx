import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import type { Route } from '../../../+types/_layout' //../
import {
  useFetcher,
  useSubmit,
  useParams,
  type LoaderFunctionArgs,
  useMatches,
  Link,
} from 'react-router'
import { Button } from '~/components/ui/button'
import FormSelect from '~/components/ui/FormSelect'

import SearchContainer from '../components/SearchContainer'
import SearchRemixContainer from '../components/SearchRemixContainer'

export const handle = {
  breadcrumb: () => <Link to='/layout'>Some Route</Link>,
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher()
  const matches = useMatches()
  // const submit = useSubmit()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userMeta.includes(userId || '' || 'userSelected')) {
      navigate(`/${userMeta[0]}${location.search}`, { replace: true })
    }
  }, [])
  const handleUserChange = (newUserId: string) => {
    const search = location.search // preserve existing query params
    console.log(newUserId, 'newUserId')
    navigate(`/${newUserId}${search}`, { replace: true })
  }

  const userMeta = ['alice', 'bob', 'carol']
  const { userId } = useParams()
  console.log(userId, 'userId')
  //const defaultUser = userMeta.includes(userId || '') ? userId : userMeta[0];
  const fallbackUser =
    typeof window !== 'undefined'
      ? localStorage.getItem('selectedSegmentUser') || userMeta[0]
      : userMeta[0]
  const selectedUserConsition = userMeta.includes(userId || '')
    ? userId
    : fallbackUser
  const routeUser = userMeta.includes(userId || '') ? userId : undefined
  // 🌟 State for selected user
  const [selectedUser, setSelectedUser] = useState(() => {
    // Avoid SSR mismatch: only use routeUser on first render
    return routeUser || userMeta[0]
  })
  // Save to localStorage whenever userId changes
  useEffect(() => {
    if (selectedUser) {
      const stored = localStorage.getItem('selectedSegmentUser')
      if (typeof window !== 'undefined' && selectedUserConsition && stored) {
        const value = localStorage.getItem('selectedSegmentUser') || userMeta[0]
        setSelectedUser(value)
      }
      localStorage.setItem('selectedSegmentUser', selectedUser)
    }
  }, [selectedUser])
  return (
    <>
      <header className='p-4 bg-blue-100'>
        <p>Pathless Layout Header</p>
        <ol>
          {matches
            .filter(
              (match) =>
                match.handle &&
                (
                  match.handle as {
                    breadcrumb?: (match: any) => React.ReactNode
                  }
                ).breadcrumb
            )
            .map((match, index) => (
              <li key={index}>
                {(
                  match.handle as {
                    breadcrumb: (match: any) => React.ReactNode
                  }
                ).breadcrumb(match)}
              </li>
            ))}
        </ol>
      </header>
      <main className=''>
        {/* <fetcher.Form
            className='pt-8'
            method='POST'> */}
        {/* col 1 */}
        <div className='flex flex-col gap-4 max-w-[200px] justify-center items-center  mx-auto w-full'>
          <FormSelect
            labelText='select '
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
          {/* <img
            src={
              'https://scontent.fgse1-1.fna.fbcdn.net/v/t39.30808-6/454827025_7931072470262275_7423371356918111227_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=ULAGo8X9TXMQ7kNvwGUufM8&_nc_oc=Adnj42jMfTBcMGs0ZImgWu3kWJPnaLtGDCfjyMc12vJrSUvwzWqI6OYUjvAApGY0j0c&_nc_zt=23&_nc_ht=scontent.fgse1-1.fna&_nc_gid=0_jsESz4Uq2xfTTjInQzmQ&oh=00_AfJ-bxSbqPLIDOxeUipNQP9qKtXuanuCnj_Vrv2pPVZwnw&oe=683CF323'
            }
            className='w-12 h-12 rounded-full object-cover'
          /> */}
          {true ? <SearchContainer /> : <SearchRemixContainer />}
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
}
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
