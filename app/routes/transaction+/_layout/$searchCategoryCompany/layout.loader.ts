import { getTimeOptions } from './queries.server'
import {

  type LoaderFunctionArgs,
} from 'react-router'
export async function loader({ request }: LoaderFunctionArgs) {
  let { searchParams } = new URL(request.url)
  let query = searchParams.get('query')
  let startTime = searchParams.getAll('startTime')
  let timeSlots = await getTimeOptions(startTime)
  return { query, timeSlots }
}
clientLoader.hydrate = false
export async function clientLoader() {
  return null
}
