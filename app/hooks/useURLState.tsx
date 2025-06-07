import { useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'

const useUrlState = <S extends Record<string, string>>(
  initialState: S,
  navigateMode: 'push' | 'replace' = 'push'
) => {
  const location = useLocation()
  const navigate = useNavigate()

  const queryFromUrl = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    return Object.fromEntries(searchParams.entries())
  }, [location.search])

  const initialStateRef = useRef(initialState)
  const state: S = useMemo(
    () => ({
      ...initialStateRef.current,
      ...queryFromUrl,
    }),
    [queryFromUrl]
  )

  const setState = (s: React.SetStateAction<S>) => {
    const newQuery = typeof s === 'function' ? s(state) : s

    const searchParams = new URLSearchParams(location.search)
    for (const [k, v] of Object.entries(newQuery)) {
      searchParams.set(k, v)
    }

    navigate(
      {
        hash: location.hash,
        search: searchParams.toString(),
      },
      {
        replace: navigateMode === 'replace',
        state: location.state,
      }
    )
  }

  return [state, setState] as const
}

export default useUrlState
