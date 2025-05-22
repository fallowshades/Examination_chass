import { type IconType } from 'react-icons';
export type TimeSlot = {
    id: string;
    startTime: string;
    endTime: string;
  icon: IconType;
  selected: boolean;
};
import {

  FiSunrise,
  FiSunset,


} from 'react-icons/fi';

export const defaultTimeSlotSkeletoons: TimeSlot[] = [
  {id:'1', startTime: '08:00', endTime: '09:00', icon: FiSunrise, selected: false },
  {id:'2', startTime: '09:00', endTime: '10:00', icon: FiSunrise, selected: false },
  {id:'3', startTime: '10:00', endTime: '11:00', icon: FiSunrise, selected: false },
  {id:'4', startTime: '11:00', endTime: '12:00', icon: FiSunset, selected: false },
  {id:'5', startTime: '12:00', endTime: '13:00', icon: FiSunset, selected: false },
  {id:'6', startTime: '13:00', endTime: '14:00', icon: FiSunset, selected: false },
  {id:'7', startTime: '14:00', endTime: '15:00', icon: FiSunset, selected: false },
  {id:'8', startTime: '15:00', endTime: '16:00', icon: FiSunset, selected: false },
  { id:'9',startTime: '16:00', endTime: '17:00', icon: FiSunset, selected: false },
];
export const calculateDayAndWeek = () => {
  const today = new Date()

  // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
  let dayOfWeek = today.getDay() // Sunday is 0, Monday is 1, etc.
  // Get current week number (ISO 8601 week date system)
  const startDate = new Date(today.getFullYear(), 0, 1) // Get the first day of the year
  const days = Math.floor(
    (today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  ) // Calculate the number of days since the start of the year

  let weekOfYear = Math.ceil((days + 1) / 7) // Week is based on the number of days passed, rounded up

  // If it's Saturday (6) or Sunday (0), set it to Monday (1)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    dayOfWeek = 1
    weekOfYear++
  }

  return {
    dayOfWeek: dayOfWeek, // === 0 ? 7 : dayOfWeek, // Return 7 for Sunday, otherwise return dayOfWeek
    weekOfYear: weekOfYear + 1, //start from week 1?
  }
}