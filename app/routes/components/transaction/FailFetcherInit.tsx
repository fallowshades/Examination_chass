// import React, { type ReactNode } from 'react'
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from '~/components/ui/pagination'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import { Button } from '~/components/ui/button'
// type ButtonContainerProps = {
//   currentWeek: number
//   totalWeeks: number
// }

// type ButtonProps = {
//   page: number
//   activeClass: boolean
// }
// import {
//   useLocation,
//   useNavigate,
//   useSearchParams,
//   Link,
//   replace,
//   useFetcher,
//   useSubmit,
//   useNavigation,
// } from 'react-router'
// import { useState, useEffect } from 'react'
// import { getFetcherType } from 'remix-utils/fetcher-type'

/**
 * tested state sync and fetcher done
 * @param param0 
 * @returns 
 */

// const ATriggerBWeek = ({ currentWeek }: { currentWeek: number }) => {
//   let fetcher = useFetcher()
//   const submit = useSubmit()
//   const [state, setState] = useState(7)
//   //#region update imperativly w server action
//   const handleSubmit = (newWeek: string) => {
//     const formData = new FormData()
//     formData.append('newWeek', newWeek)
//     //e.preventDefault(); : React.FormEvent<HTMLFormElement>
//     fetcher.submit(formData, { method: 'POST' })
//     // window.location.reload()
//     setState(!state)
//   }

//   const [searchParams, setSearchParams] = useSearchParams()
//   const location = useLocation() // like usePathname
//   const navigate = useNavigate() // like useRouter().push
//   let navigation = useNavigation()
//   let fetcherType = getFetcherType(fetcher, navigation)
//   const totalWeeks = Number(searchParams.get('total')) || 10

//   useEffect(() => {
//     if (fetcherType === 'done') {
//       // do something once the fetcher is done submitting the data
//       setSearchParams((prev) => {
//         const currentQuery = window.location.search
//         const updated = new URLSearchParams(currentQuery)
//         updated.set('week', String(state + 0))
//         return updated
//       })
//       const updatedParams = new URLSearchParams(searchParams)
//       navigate(`?${updatedParams.toString()}`, { replace: true })
//     }
//   }, [fetcherType, state])

//   const handleWeekChange = (newWeek: number) => {
//     setState(newWeek)
//     setSearchParams(
//       (prev) => {
//         const currentQuery = window.location.search
//         const updated = new URLSearchParams(currentQuery)
//         updated.set('week', String(newWeek + 0))
//         return updated
//       },
//       { replace: true }
//     )
//     handleSubmit(String(newWeek))
//   }
//   // //
//   //    useEffect(() => {
//   //     if (fetcher.type === 'init') {
//   //       fetcher.load(fetchPath)
//   //     }
//   //   }, [fetcher, fetchPath])
//   //#endregion

//   //#region evt handling defaults is imperatively handled
//   //${location.pathname}
//   const addPageButton = ({ page, activeClass }: ButtonProps) => {
//     return (
//       <Button
//         key={page}
//         size='icon'
//         variant={activeClass ? 'default' : 'outline'}
//         onClick={() => handleWeekChange(page)}>
//         {page}
//       </Button>
//     )
//   }
//   const renderPageButtons = () => {
//     const pageButtons = []
//     // first page

//     for (let i = 1; i <= totalWeeks; i++) {
//       pageButtons.push(
//         addPageButton({ page: i, activeClass: i === currentWeek })
//       )
//     }

//     return pageButtons
//   }

//   //#endregion
//   //#region closure f() bundled together ref its surroundings
//   return (
//     <>
//       <Pagination className='mt-16'>
//         <PaginationContent className='bg-chasGray rounded-full'>
//           <Button
//             type='submit'
//             onClick={() => {
//               let prevPage = currentWeek - 1
//               if (prevPage < 1) prevPage = currentWeek
//               handleWeekChange(prevPage)
//             }}
//             //  value= {currentWeek-1}
//             //  defaultValue={currentWeek-1}
//             aria-label='Next Page'>
//             <span></span>
//             <ChevronLeft className='h-4 w-4' />
//           </Button>

//           {renderPageButtons()}

//           <Button
//             type='button'
//             onClick={() => {
//               let nextPage = currentWeek + 1
//               if (nextPage > totalWeeks) nextPage = 1
//               handleWeekChange(nextPage)
//             }}
//             aria-label='Next Page'
//             // value={currentWeek+1}
//             //  defaultValue={currentWeek + 1}'
//           >
//             <span></span>
//             <ChevronRight className='h-4 w-4' />
//           </Button>
//         </PaginationContent>
//       </Pagination>
//     </>
//   )
//   //#endregion
// }

// export default ATriggerBWeek
