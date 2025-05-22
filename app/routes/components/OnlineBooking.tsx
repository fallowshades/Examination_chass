import React from 'react'
import Room from '~/routes/components/Room';
import { onlineRooms } from '~/routes/components/config/constants';
import { useLoaderData, type LoaderFunctionArgs} from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  // Simulate async if needed
  return { rooms: onlineRooms };
}
const OnlineBooking = () => {
    const {rooms} = useLoaderData<typeof loader>()
  return (
      <div className='w-[80vw] vlex flex-col items-center'>
          <div className="p-8">
              <h5 className="font-bold">
                  Online
            </h5>
          </div>
          <div>
        <Room roomDetails={rooms} />
        
          </div >
           </div>
  )
}

export default OnlineBooking