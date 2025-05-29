
import {
  useFetcher,
  useSubmit,
  useParams,
 type LoaderFunctionArgs,
} from 'react-router'


export async function loader({ request }: LoaderFunctionArgs) {
    let { searchParams } = new URL(request.url);
      let query = searchParams.get('query')
  let startTime = searchParams.getAll('startTime')
    //   let timeSlots = await getTimeOptions(startTime )
    const timeSlots = [
      ['08:00', '09:00'],
      ['09:00', '10:00'],
      ['10:00', '11:00'],
      ['11:00', '12:00'],
      ['12:00', '13:00'],
      ['13:00', '14:00'],
      ['14:00', '15:00'],
      ['15:00', '16:00'],
      ['16:00', '17:00'],
    ] 
  return { query, timeSlots };
};
clientLoader.hydrate = false
export async function clientLoader() {
  return null
}


