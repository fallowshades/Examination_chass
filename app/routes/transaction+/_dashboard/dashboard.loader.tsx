import { redirect } from 'react-router'
import { calculateDayAndWeek } from '~/routes/queries.server'
import type { TimeIntervalState } from './components/config/types'
export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url) // full URL, including origin, path, and search

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
