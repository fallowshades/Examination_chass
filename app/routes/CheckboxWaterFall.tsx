/**
 * WE CAN MAintain all in useState
 * -
 * we can maintain in url search params
 * https://cgarethc.medium.com/using-react-router-searchparams-to-manage-filter-state-for-a-list-e515e8e50166
 *
 */

import React, { type JSX } from 'react'
import { useFetcher, useSearchParams } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Checkbox } from '~/components/ui/checkbox'
// { selectedTimeSlots }: {
//     selectedTimeSlots: Record<string, {timeSlotId: string; startTime: string; endTime: string}[]>

// }
import { useId } from 'react'
import { useEffect, useState } from 'react'
// import { useUpdateCheckbox } from '../resources/UpdateCheckboxes';
import {
  type TimeSlot as TimeSlotList,
  defaultTimeSlotSkeletoons,
} from '~/utils/TimeSlots'
const CheckboxWaterFall = ({ roomId }: { roomId: string }) => {
  type FormattedTimeSlot = TimeSlotList & {
    label: string
    icon: () => JSX.Element
  }
  const [searchParams] = useSearchParams()
  const brands = searchParams.getAll('timeSlot')
  const formattedTimeSlots: FormattedTimeSlot[] = defaultTimeSlotSkeletoons.map(
    (amenity) => ({
      id: amenity.id,
      timeSlotId: amenity.id,
      label: `${amenity.startTime} - ${amenity.endTime}`,
      startTime: amenity.startTime,
      endTime: amenity.endTime,
      icon: () => <span>🕒</span>, //can find
      selected: amenity.selected,
    })
  )
  const [selectedTimeSlots, setSelectedTimeSlots] =
    useState<TimeSlotList[]>(formattedTimeSlots)

  const [SelectedRecord, setSelectedRecord] = useState({
    [roomId]: selectedTimeSlots,
  })
  //#region local update and formation non serializable jsx match
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
  useEffect(() => {
    setSelectedRecord((prev) => ({
      ...prev,
      [roomId]: selectedTimeSlots,
    }))
  }, [selectedTimeSlots, roomId])

  //#endregion

  //#startregion can' typpical waterfall
  // const fetcher = useFetcher({ key: 'resource.checkbox.update' })
  // useEffect(() => {
  //   if (fetcher.state === 'idle' && !fetcher.data && true) {
  //     fetcher.load('/resources/updatecheckbox?roomId=123') // Route-specific loader or endpoint
  //   }
  // }, [])
  // useEffect(() => {
  //   if (fetcher.data?.amenities) {
  //     setSelectedTimeSlots(fetcher.data.amenities)
  //   }
  // }, [fetcher.data])
  //#endregion

  return (
    <div>
      <input
        type='hidden'
        name='amenities'
        value={JSON.stringify(SelectedRecord)}
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
              name='timeSlot'
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

export default CheckboxWaterFall

import { GeneralErrorBoundary } from '~/routes/components/GeneralErrorBoundary'
export function ErrorBoundary() {
  return <GeneralErrorBoundary />
}
