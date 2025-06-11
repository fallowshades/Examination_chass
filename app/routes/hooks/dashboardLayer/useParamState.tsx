/**
 * we want our store to be remote and need to useSearchParams to sync. basically we iterate over the entries.
 * the policy is basically to replace and modify the search params in the URL
 * se we have a pipeline. we can payload and look existence. w may use effect to later create links.
 * we can compose from params and update serialized and parse it. is hook w particals for forms.
 */

//SIMPLE LIB

//github.com/asmyshlyaev177/state-in-url?tab=readme-ov-file

import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router'

/**
 * A custom hook that syncs state with a URL search parameter.
 * Supports string, number, boolean, and object values.
 * @param key The search parameter key to sync with.
 * @param defaultValue The default value for the state.
 * @returns A stateful value, and a function to update it.
 */
function useParamState<T extends string | number | boolean | object>(
  key: string,
  defaultValue: T
): [T, (newValue: Partial<T> | T) => void] {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramValue = searchParams.get(key)

  const [state, setState] = useState<T>(() => {
    if (paramValue === null) {
      return defaultValue
    }
    try {
      return JSON.parse(paramValue) as T
    } catch {
      return paramValue as T
    }
  })

  const setParamState = useCallback(
    (newValue: Partial<T> | T) => {
      const updatedValue =
        typeof newValue === 'object' && !Array.isArray(newValue)
          ? {
              ...(typeof state === 'object' && state !== null ? state : {}),
              ...(typeof newValue === 'object' && newValue !== null
                ? newValue
                : {}),
            }
          : newValue

      setState(updatedValue as T)
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, JSON.stringify(updatedValue))
      setSearchParams(newSearchParams)
    },
    [key, searchParams, setSearchParams, state]
  )

  return [state, setParamState]
}

export default useParamState

/**
 * ACTION
 * Remove a value from an existing parameter where the parameter can occur multiple times
 * If the value is the last value, the parameter is removed
 *
 * @param {URLSearchParams} searchParams
 * @param {string} key
 * @param {string} value
 */
interface RemoveParamsOptions {
  searchParams: URLSearchParams
  key: string
  value: string
}

export function removeExistingParamsArrayValue(
  searchParams: URLSearchParams,
  key: string,
  value: string
): void {
  console.log(searchParams, key, value)
  // const existingParams = extractExistingParams(searchParams);
  // if (existingParams[key]) {
  //   existingParams[key] = existingParams[key].filter(v => v !== value);
  // }
  // if (existingParams[key].length === 0) {
  //   delete existingParams[key];
  // }
  // return existingParams;
}

//array
// const handleSort = (sortField) => {
//   setSearchParams({ ...searchParams, sort: sortField })
// }

//create url from optemistic (store)
// const createRecipesLink = () => {
//   return getItem('searchParams')
//     ? {
//         pathname: '/recipes',
//         search: `?${createSearchParams(getItem('searchParams'))}`,
//       }
//     : '/recipes'
// }

//how to compose the search. within hook.

// const serialize = (state) => {
// 2  const params = new URLSearchParams();
// 3  params.set('categories', state.categories.join(',')); // Comma-separated list
// 4  params.set('minPrice', state.priceRange.min); // Individual values
// 5  params.set('maxPrice', state.priceRange.max);
// 6  params.set('sortBy', state.sortBy);
// 7  return params;
// 8};
// 9 10const parse = (params) => {
// 11  return {
// 12    categories: params.getAll('categories').split(','), // Parse list
// 13    priceRange: {
// 14      min: Number(params.get('minPrice')), // Convert to numbers
// 15      max: Number(params.get('maxPrice')),
// 16    },
// 17    sortBy: params.get('sortBy'),
// 18  };
// 19};
// 20 21const MyComponent = () => {
// 22  const [searchParams, setSearchParams] = useSearchParams({ ... }, { serialize, parse });

/**
 * url is resilient user friendly app.
 * keeps the UI in sync with the URL without triggering page reloads
 */
// so we iterate obj entries and replace, after a payload.
