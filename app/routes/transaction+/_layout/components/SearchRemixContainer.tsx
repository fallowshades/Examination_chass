import React from 'react'

import { useDeferredValue, useEffect, useState } from 'react'
import {
  type LoaderFunctionArgs,
  useSearchParams,
  useLoaderData,
  useSubmit,
  useNavigation,
  Form,
} from 'react-router'
import { type LayoutLoaderData } from '../$searchCategoryCompany/layout.types'
export default function SearchContainer() {
  const { query } = useLoaderData<LayoutLoaderData>()
  const submit = useSubmit()
  let [searchParams, setSearchParams] = useSearchParams()
  let [value, setValue] = useState(() => {
    return searchParams.get('query') ?? ''
  })

  // let deferredValue = useDeferredValue(value)
  const navigation = useNavigation()
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('query')
  // useEffect(() => {
  //   setSearchParams({ query: deferredValue })
  // }, [deferredValue, setSearchParams])
  // useEffect(() => {
  //   console.log('Search param changed to:', deferredValue)
  // }, [deferredValue])

  useEffect(() => {
    const searchField = document.getElementById('q')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = query || ''
    }
  }, [query])
  // const [prevQ, setPrevQ] = useState(query)
  // const [queryInstead, setQuery] = useState(query || '')
  // if (query !== prevQ) {
  //   setPrevQ(query)
  //   setQuery(query || '')
  // }
  return (
    <div>
      <Form
        id='search-form'
        onChange={(event) => submit(event.currentTarget)}
        role='search'>
        <input
          // type='text'
          value={value}
          // onChange={(event) => setValue(event.currentTarget.value)}

          role='search'
          className={`w-full border-2 border-amber-900 ${
            searching ? 'loading' : ''
          }`}
          aria-label='Search users'
          defaultValue={query || ''}
          placeholder='Search'
          type='search'
        />
        <div
          aria-hidden
          hidden={!searching}
          id='search-spinner'
          className={
            navigation.state === 'loading' && !searching ? 'loading' : ''
          }
        />
      </Form>
    </div>
  )
}
