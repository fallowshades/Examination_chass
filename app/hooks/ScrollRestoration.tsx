//react router doess not have scroll: false like nextjs.
import { useEffect } from 'react'
import { useLocation } from 'react-router'

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // or don't scroll here if you want to preserve
  }, [pathname]) // only on pathname change, not query param

  return null
}

const scrollPositions = new Map()

function useScrollRestoration() {
  const location = useLocation()

  useEffect(() => {
    scrollPositions.set(location.key, window.scrollY)
    return () => {
      const y = scrollPositions.get(location.key) ?? 0
      window.scrollTo(0, y)
    }
  }, [location])
}

export default useScrollRestoration
