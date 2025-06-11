//get from server first https://sergiodxa.com/articles/building-a-command-palette-with-remix-and-tailwind-ui

/**
 * either we sync or mutate
 */
import { useSearchParams } from 'react-router'
import { useMemo } from 'react'
const [searchParams, setSearchParams] = useSearchParams()
const updateParams = (
  updates: Record<string, string | null>,
  replace = true
) => {
  setSearchParams(
    (searchParams) => {
      Object.entries(updates).forEach(([key, value]) => {
        value !== null ? searchParams.set(key, value) : searchParams.delete(key)
      })
      return searchParams
    },
    { replace }
  )
}

//https://medium.com/@roman_j/mastering-state-in-next-js-app-router-with-url-query-parameters-a-practical-guide-03939921d09c
//memo and replace
const filters = useMemo(
  () => ({
    searchTerm: searchParams.get('searchTerm') || '',
    category: searchParams.get('category') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  }),
  [searchParams]
)

///////////https://cgarethc.medium.com/using-react-router-searchparams-to-manage-filter-state-for-a-list-e515e8e50166
/**extract should remove the res from server
 * Remove a value from an existing parameter where the parameter can occur multiple times
 * If the value is the last value, the parameter is removed
 *
 * @param {URLSearchParams} searchParams
 * @param {string} key
 * @param {string} value
//  */
// export function removeExistingParamsArrayValue(searchParams, key, value) {
//   const existingParams = extractExistingParams(searchParams)
//   if (existingParams[key]) {
//     existingParams[key] = existingParams[key].filter((v) => v !== value)
//   }
//   if (existingParams[key].length === 0) {
//     delete existingParams[key]
//   }
//   return existingParams
// }

// React.useEffect(() => {
//   if (searchParams.get('tags')) {
//     setSelectedTags(searchParams.getAll('tags'))
//   } else {
//     setSelectedTags([])
//   }

//   if (searchParams.get('userTags')) {
//     setSelectedUserTags(searchParams.getAll('userTags'))
//   } else {
//     setSelectedUserTags([])
//   }
//   if (searchParams.get('sort')) {
//     setSortField(searchParams.get('sort'))
//   } else {
//     setSortField('name')
//   }

//   //... etc...

//   setSearchParamsLoaded(true)
//   storeItem('searchParams', Array.from(searchParams.entries()))
// }, [searchParams])
