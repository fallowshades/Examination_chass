import { Suspense } from 'react'
import RoomList from './RoomList'
import type { RoomType } from './config'

type BookingLayerProps = {
  layer: {
    groupId: string | React.ReactNode
    id: string | React.ReactNode
    rooms: RoomType[]
  }
}

const BookingLayer = ({ layer }: BookingLayerProps) => (
  <div
    className="w-1/2  p-4 border-r last:border-r-0  border-yellow'>
       ">
    <div className='flex justify-center'>
      <div>
        <h1 className='text-xl font-bold'>
          <span className='flex'>{layer.groupId} rum</span>
        </h1>
        <h1 className='text-xl font-bold'>
          <span className='flex'>Våning {layer.id}</span>
        </h1>
      </div>
    </div>
    <div className='flex'>
      <div className='container'>
        <RoomList rooms={layer.rooms} />
      </div>
    </div>
  </div>
)

export default BookingLayer
