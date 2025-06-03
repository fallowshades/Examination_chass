import React, { type JSX } from 'react'
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
import { useId } from 'react';
import { useEffect,useState } from 'react';
// import { useUpdateCheckbox } from '../resources/UpdateCheckboxes';
import  { type TimeSlot as TimeSlotList,defaultTimeSlotSkeletoons } from '~/utils/TimeSlots';
const CheckboxWaterFall = ({ roomId }: { roomId: string; }) => {
  // const fetcher = useFetcher({ key: 'resource.checkbox.update' })
  let [query, setQuery] = useState('')
  let [value, setValue] = useState(() => defaultTimeSlotSkeletoons[0])

  // Define LoaderData type to match the expected data structure from fetcher
  type LoaderData = {
    amenities?: TimeSlotList[];
  };
  
    let { data, load, state } = useFetcher<LoaderData>()
  let defaultTimeSlotSkeletoonsRemote = data?.amenities ?? []

  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlotList[]>(
    defaultTimeSlotSkeletoons
  )



  const handleChange = (amenity: TimeSlotList) => {
    setSelectedTimeSlots((prev) => {
      return prev.map((a) => {
        if (a.id === amenity.id) {
          return { ...a, selected: !a.selected }
        }
        return a
      })
    })
  }

  //#region format on client
  type FormattedTimeSlot = TimeSlotList & {
    label: string
    icon: () => JSX.Element
  }

  const formattedTimeSlots: FormattedTimeSlot[] = selectedTimeSlots.map(
    (amenity) => ({
      id: amenity.id,
      timeSlotId: amenity.id,
      label: `${amenity.startTime} - ${amenity.endTime}`,
      startTime: amenity.startTime,
      endTime: amenity.endTime,
      icon: () => <span>🕒</span>,
      selected: amenity.selected,
    })
  )
//#endregion
  return (
    <div>
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(selectedTimeSlots)}
      />
      {formattedTimeSlots.map((timeslot) => (
        <DropdownMenuItem
          key={timeslot.id}
          onSelect={(e) => e.preventDefault()}
          className='even:bg-white'>
          {/* Render the icon */}
          {/** If you run into errors here, do:
        const Icon = timeslot.icon;
        <Icon className="..." /> */}
          <timeslot.icon />

          <label
            htmlFor={`timeslot-${timeslot.id}`}
            className='flex items-center gap-2'>
            <Checkbox
              id={`timeslot-${timeslot.id}`}
              checked={!!timeslot.selected}
              onCheckedChange={() => handleChange(timeslot)}
            />
            {timeslot.label}
          </label>
        </DropdownMenuItem>
      ))}
    </div>
  )
}

export default CheckboxWaterFall;


import { GeneralErrorBoundary } from '~/routes/components/GeneralErrorBoundary';
export function ErrorBoundary() {
    return <GeneralErrorBoundary />
}


  //#startregion
  // useEffect(() => {
  //   if (fetcher.state === "idle" && !fetcher.data && true) {
  //     fetcher.load("/resources/updatecheckbox?roomId=123"); // Route-specific loader or endpoint
  //   }
  // }, [load]);
  
  //  useEffect(() => {
  //   if (fetcher.data?.amenities) {
  //     setSelectedTimeSlots(fetcher.data.amenities);
  //   }
  // }, [fetcher.data]);
  //#endregion