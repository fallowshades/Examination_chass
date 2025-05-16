import React from 'react'
import { useFetcher } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Checkbox } from '~/components/ui/checkbox';
// { selectedTimeSlots }: {
//     selectedTimeSlots: Record<string, {timeSlotId: string; startTime: string; endTime: string}[]>
    
// }
const CheckboxWaterFall = ({roomId}:{roomId:string}) => {
    const fetcher = useFetcher()
  return (
    <div> <fetcher.Form method='post'>
          {formattedTimeSlots.map((timeslot) => {
            const isChecked =
              selectedTimeSlots[timeslot.roomID]?.some(
                (slot) => slot.timeSlotID === String(timeslot.timeSlotID)
              ) || false
          
            
            
            
            return (
              <DropdownMenuItem
                key={timeslot.timeSlotID}
                onSelect={(e) => e.preventDefault()}
              className='even:bg-white'>
                <label
                  htmlFor={`timeslot-${timeslot.timeSlotID}`}
                  className='flex items-center gap-2'>
                  <Checkbox
                    id={`timeslot-${timeslot.timeSlotID}`}
                    checked={
                      isChecked || false
                      //selectedTimeSlots?.has(timeslot.timeSlotID) || false
                    }
                    onCheckedChange={(checked) =>
                      // handleChange(Boolean(checked), timeslot)
                      handleTimeSlotSelect({
                        roomID: String(timeslot.roomID),
                        slot: {
                          timeSlotID: String(timeslot.timeSlotID), // Convert number to string
                          startTime: timeslot.startTime,
                          endTime: timeslot.endTime,
                        },
                        isChecked: Boolean(checked),
                      })
                    }
                  />
                  {timeslot.startTime} - {timeslot.endTime}
                </label>
              </DropdownMenuItem>
            )
          })}
        </fetcher.Form>
        </div>
  )
}

export default CheckboxWaterFall;


type TimeSlot = {
  timeSlotId: string;
  startTime: string;
  endTime: string;
};

//better to default serialization
// // 🔧 Helper to encode selection as string
// function encodeSelection(data: Record<string, TimeSlot[]>) {
//   return Object.entries(data)
//     .map(([roomId, slots]) =>
//       slots.map(slot => `${roomId}.${slot.startTime}-${slot.endTime}`).join(",")
//     )
//     .join(",");
// }

// // 🔧 Helper to decode selection from string
// function parseSelection(raw: string | null): Record<string, TimeSlot[]> {
//   if (!raw) return {};
//   const record: Record<string, TimeSlot[]> = {};

//   const items = raw.split(",");
//   for (const item of items) {
//     const [room, time] = item.split(".");
//     if (!room || !time) continue;
//     const [startTime, endTime] = time.split("-");
//     if (!startTime || !endTime) continue;

//     record[room] ??= [];
//     record[room].push({
//       timeSlotId: `${startTime}-${endTime}`,
//       startTime,
//       endTime,
//     });
//   }

//   return record;
    
// }

//      const toggleSlot = (slot: { timeSlotId: string; startTime: string; endTime: string }) => {
//   const roomSlots = selectedTimeSlots[roomId] || [];
//   const exists = roomSlots.some(s => s.timeSlotId === slot.timeSlotId);
//   const updated = exists
//     ? roomSlots.filter(s => s.timeSlotId !== slot.timeSlotId)
//     : [...roomSlots, slot];

//   const newSelected = { ...selectedTimeSlots, [roomId]: updated };
//   setSearchParams({ selected: encodeSelection(newSelected) });
//                  };