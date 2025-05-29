import React from 'react'




import { useDeferredValue, useEffect, useState } from 'react'
import { type LoaderFunctionArgs, useSearchParams } from 'react-router'

export default function SearchContainer() {
   let [searchParams, setSearchParams] = useSearchParams()
   let [value, setValue] = useState(() => {
     return searchParams.get('query') ?? ''
   })

//    let deferredValue = useDeferredValue(value)

//    useEffect(() => {
//      setSearchParams({ query: deferredValue })
//    }, [deferredValue, setSearchParams])
// useEffect(() => {
//   console.log('Search param changed to:', deferredValue)
// }, [deferredValue])
   return (
     <div>
       

       <input
         type='text'
         value={value}
         onChange={(event) => setValue(event.currentTarget.value)}
         className='w-full border-2 border-amber-900'
       />
     </div>
   )
}
