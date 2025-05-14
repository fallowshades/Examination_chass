export const BIG_ROOMS = [
      {
        id: '8',
        title: 'ChasPass',
        capacity: 'Detta rum finns på plan 8 och är ett stort rum',
        image: 'assets/assets/ChasPass.jpg',
        layer: 8,
      },
      {
        id: '6',
        title: 'Susan Kare',
        capacity: 'Ett större rum för ca 25 personer',
        image: 'assets/assets/Susan_Kare.jpg',
        layer: 9,
      },
      {
        id: '5',
        title: 'Margaret Hamilton',
        capacity: 'Ett större rum för ca 25 personer',
        image: 'assets/assets/Margaret_Hamilton.jpg',
        layer: 9,
      },

      {
        id: '2',
        title: 'Alan Turing',
        capacity: 'Ett större rum för ca 40 personer',
        image: 'assets/assets/Alan_Turing.jpg',
        layer: 9,
      },
    ]

export const SMALL_ROOMS= [
      {
        id: '1',
        title: 'Ada Lovelace',
        capacity:
          'Ett allrum med små grupperingar för ca 20 personer, Inga klassiska bånkar finns',
        image: 'assets/assets/Ada_Lovelace.jpg',
        layer: 9,
      },
      {
        id: '4',
        title: 'Isis Wanger',
        capacity: 'Ett mindre rum för ca 20 personer',
        image: 'assets/assets/Isis_Wanger.jpg',
        layer: 9,
      },
      {
        id: '3',
        title: 'Amazing Grace',
        capacity:
          'Ett allrum med små grupperingar för ca 15 personer. Inga klassiska bänkar finns',
        image: 'assets/assets/Amazing_Grace.jpg',
        layer: 9,
      },
    ]


export const onlineRooms = {
  id: '7',
  title: 'Online booking',
  capacity:
    'Här går det att boka tid för distanslektioner som inte behöver ett fysiskt rum',
  image: 'assets/assets/Online_booking.png',
  layer: 9,
}

export type RoomType = {
  id: string
  title: string
  capacity: string
  image: string
  layer: number
}

type GroupedLayerRoomObject = {
  id: string
  rooms: RoomType[] // Same as RoomType.layer
}
// Define a record where keys are layer IDs
export type ReducedGroupOfRooms = Record<string, GroupedLayerRoomObject>

export type GroupedRooms = { id: string; rooms: RoomType[] }[]

export type GroupedRoomResponse = { contextWithStaticData: GroupedRooms }
