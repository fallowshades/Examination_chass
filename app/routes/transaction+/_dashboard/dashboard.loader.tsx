import { redirect } from 'react-router'
import { calculateDayAndWeek } from '~/routes/queries.server'
import type { TimeIntervalState } from './components/config/types'
import { getClientLocales } from 'remix-utils/locales/server'
//not may have to syncronize afterwards / mb a context wrapping root if cashe properly
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url) // full URL, including origin, path, and search
  let locales = getClientLocales(request)
  console.log('client locales:', locales)
  console.log('url:', url.toString())
  const hasWeek = url.searchParams.has('week')
  const hasDay = url.searchParams.has('day')

  if (!hasWeek || !hasDay) {
    const { dayOfWeek, weekOfYear } = calculateDayAndWeek()
    const defaultState: TimeIntervalState = {
      day: dayOfWeek,
      week: weekOfYear,
      totalHours: 0,
      rooms: {},
    }
    console.log(dayOfWeek, weekOfYear, 'loader')
    const origin = url.origin
    const pathname = url.pathname //${weekOfYear}
    //${url.origin &&('/' +url.origin)}
    return redirect(`${url.pathname}?week=3.&day=${dayOfWeek}&total=10`)
  }
  return null
}
