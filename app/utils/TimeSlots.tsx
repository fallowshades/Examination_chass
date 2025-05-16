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