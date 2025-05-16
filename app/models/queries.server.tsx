
export const getheCheckBoxesForRoom = async (roomId: number) => {
  const listReturn = generateTimeSlotSkeletons(roomId);
console.log(listReturn, 'listReturn')
  return listReturn;
}

export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
};

const HOURS = [
  ['08:00', '09:00'],
  ['09:00', '10:00'],
  ['10:00', '11:00'],
  ['11:00', '12:00'],
  ['12:00', '13:00'],
  ['13:00', '14:00'],
  ['14:00', '15:00'],
  ['15:00', '16:00'],
  ['16:00', '17:00'],
] as const;

/**
 * Generate a default array of TimeSlot objects for a given roomId.
 *
 * Each slot's `id` will be `${roomId * 10 + index + 1}`, so for roomId=5 you'll get:
 *  ['51', '52', ..., '59']
 */
export function generateTimeSlotSkeletons(roomId: number): TimeSlot[] {
  return HOURS.map(([start, end], index) => ({
    id: String(roomId * 10 + (index + 1)),
    startTime: start,
    endTime: end,
  }));
}