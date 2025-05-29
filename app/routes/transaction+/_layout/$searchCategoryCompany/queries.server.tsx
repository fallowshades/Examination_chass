type TimeSlotBase = {
  id: string
  startTime: string
  endTime: string
}


  export const defaultTimeSlotSkeletonsBase: TimeSlotBase[] = [
    { id: '1', startTime: '08:00', endTime: '09:00' },
    { id: '2', startTime: '09:00', endTime: '10:00' },
    { id: '3', startTime: '10:00', endTime: '11:00' },
    { id: '4', startTime: '11:00', endTime: '12:00' },
    { id: '5', startTime: '12:00', endTime: '13:00' },
    { id: '6', startTime: '13:00', endTime: '14:00' },
    { id: '7', startTime: '14:00', endTime: '15:00' },
    { id: '8', startTime: '15:00', endTime: '16:00' },
    { id: '9', startTime: '16:00', endTime: '17:00' },
  ]


  export function getTimeOptions(startTime: string[]): TimeSlotBase[] {
   
    // include only those whose startTime matches one of the query values
    return defaultTimeSlotSkeletonsBase.filter((slot) =>
      startTime.includes(slot.startTime)
    )
    //  return defaultTimeSlotSkeletonsBase.filter(
    //    (slot) => slot.startTime === startTime
    //  )
}
export const performMutation = ({}) => {
  console.log('performMutation called with:', {})
  return null
}