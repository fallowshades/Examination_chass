import React from 'react'
import { type RoomType } from '~/routes/components/config/constants'
import Room from './Room'
type RoomListProps = {rooms:RoomType[] }
const RoomList = ({ rooms }: RoomListProps) => {
    
    if (rooms.length == 0) {
    return <div>such empty</div>
  }

  return (
     <>
      <div className=' justify-around lex gap-4'>
        {rooms.map((room, index) => (
          <Room
            key={index}
            roomDetails={room}
          />
        ))}
      </div>
    </>
  )
}

export default RoomList