export const BIG_ROOMS = [
      {
        id: '8',
        title: 'ChasPass',
        capacity: 'Detta rum finns på plan 8 och är ett stort rum',
        image: '/assets/ChasPass.jpg',
        layer: 8,
      },
      {
        id: '6',
        title: 'Susan Kare',
        capacity: 'Ett större rum för ca 25 personer',
        image: '/assets/Susan_Kare.jpg',
        layer: 9,
      },
      {
        id: '5',
        title: 'Margaret Hamilton',
        capacity: 'Ett större rum för ca 25 personer',
        image: '/assets/Margaret_Hamilton.jpg',
        layer: 9,
      },

      {
        id: '2',
        title: 'Alan Turing',
        capacity: 'Ett större rum för ca 40 personer',
        image: '/assets/Alan_Turing.jpg',
        layer: 9,
      },
    ]

export const SMALL_ROOMS= [
      {
        id: '1',
        title: 'Ada Lovelace',
        capacity:
          'Ett allrum med små grupperingar för ca 20 personer, Inga klassiska bånkar finns',
        image: '/assets/Ada_Lovelace.jpg',
        layer: 9,
      },
      {
        id: '4',
        title: 'Isis Wanger',
        capacity: 'Ett mindre rum för ca 20 personer',
        image: '/assets/Isis_Wanger.jpg',
        layer: 9,
      },
      {
        id: '3',
        title: 'Amazing Grace',
        capacity:
          'Ett allrum med små grupperingar för ca 15 personer. Inga klassiska bänkar finns',
        image: '/assets/Amazing_Grace.jpg',
        layer: 9,
      },
    ]


export const onlineRooms = {
  id: '7',
  title: 'Online booking',
  capacity:
    'Här går det att boka tid för distanslektioner som inte behöver ett fysiskt rum',
  image: 'assets/Online_booking.png',
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

export const DAYS_OF_THE_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
export const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'] as const;
export const ROOM_LIMIT = 8;
  export const PAGINATION_PER_PAGE_DEFAULT = '10'
 export const PAGINATION_PER_PAGE_ITEMS = Array.from({ length: 52 }, (_, i) => String(i + 1)) as [string, ...string[]];