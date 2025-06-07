import { useNavigate, useLocation } from 'react-router'
import { useCallback } from 'react'
const navigate = useNavigate()
const location = useLocation()

interface Filters {
  [key: string]: string | undefined
}

const setFilters = useCallback(
  (newFilters: Filters) => {
    const currentParams = new URLSearchParams(location.search)

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value)
      } else {
        currentParams.delete(key)
      }
    })

    const search = currentParams.toString()
    const query = search ? `?${search}` : ''
    const url = `${location.pathname}${query}`

    // Replace the URL but preserve scroll manually
    navigate(url, { replace: true }) // This doesn't scroll, but...
    // scroll preservation is up to you
  },
  [navigate, location]
)
