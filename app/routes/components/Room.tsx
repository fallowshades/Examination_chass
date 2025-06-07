import React from 'react'
/**
 * room
 * - flex grow
 * checkboxwaterfall
 *  -
 * avvilable ours dropdown
 * - may want to have provider
 */
import { type RoomType } from '~/routes/components/config/constants'
import { Skeleton } from '~/components/ui/skeleton'
const Room = ({ roomDetails }: { roomDetails: RoomType }) => {
  //console.log(roomDetails)
  if (!roomDetails) {
    return <div>Room data is unavailable</div> // Handle missing data gracefully
  }
  return (
    <div>
      <div className='flex flex-col  md:flex-row gap-2 justify-around items-center min-h-[100px] lg:min-h-[110px]'>
        <div>
          {typeof roomDetails?.image === 'string' ? (
            <img
              src={roomDetails.image}
              alt='room'
              className='basis-sm grow-1 max-w-[200px]'
            />
          ) : (
            <Skeleton className='h-[125px] w-[200px] rounded-xl' /> // Replace with your actual skeleton node/component
          )}
        </div>
        {/**1st box */}
        <div className='space-y-1'>
          <h6>{roomDetails?.title}</h6>
          <p className='min-w-[20ch] max-w-[20ch] break-words '>
            {roomDetails?.capacity}
          </p>
        </div>
        {roomDetails?.id ? (
          <CheckBoxMenu roomId={String(roomDetails.id)} />
        ) : (
          <p>No room selected</p>
        )}
      </div>
    </div>
  )
}

export default Room

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { FaChevronDown } from 'react-icons/fa'
import { Button } from '~/components/ui/button'
import { useState, lazy } from 'react'
import { Link, useSearchParams, Outlet } from 'react-router'

import { useEffect } from 'react'
import CheckboxWaterFall from './CheckboxWaterfall'
// import AsyncFetcher from './AsyncFetcher';

// const AsyncFetcher = lazy(() => import('./AsyncFetcher'))

import { useParams } from 'react-router'

/**
 *
 * @param param0
 * @returns
 */
import { CheckboxProvider as CheckboxProviders } from '~/components/SharableCheckbox'
import { cn } from '~/lib/utils'
import AppCheckbox from '~/components/sharableCheckbox/AppCheckbox'
const CheckBoxMenu = ({ roomId = 'o' }: { roomId?: string }) => {
  const { selectedUser } = useParams()
  console.log(selectedUser)
  const [searchParams, setSearchParams] = useSearchParams()
  // const [isOpen, setIsOpen] = useState(searchParams.get('dialog') === 'open')

  // 🔄 Sync state from URL to local state
  // useEffect(() => {
  //   setIsOpen(searchParams.get('dialog') === 'open')
  // }, [searchParams])
  const isDialogOpen = searchParams.get('dialog') === 'open'
  const isOpen = true //isDialogOpen

  // const toggleOpen = () => {
  //   const updatedParams = new URLSearchParams(searchParams) // copy existing params
  //   if (isOpen) {
  //     updatedParams.set('dialog', 'closed') // or: updatedParams.delete('dialog') to remove
  //   } else {
  //     updatedParams.set('dialog', 'open')
  //   }
  //   setSearchParams(updatedParams)
  // }
  const setOpen = (next: boolean) => {
    const updatedParams = new URLSearchParams(searchParams)
    if (next) {
      updatedParams.set('dialog', 'open')
    } else {
      updatedParams.set('dialog', 'closed') // or updatedParams.delete('dialog')
    }
    setSearchParams(updatedParams)
  }

  const r = roomId
  // const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {true ? (
        <CheckboxProviders>
          <AppCheckbox roomId={roomId} />
          <div
            id='content'
            className={cn()}>
            <Outlet />
          </div>{' '}
        </CheckboxProviders>
      ) : (
        <AvailableHoursDropdown
          roomId={roomId}
          open={isOpen}
          setOpen={setOpen}
        />
      )}
    </>
  )
}
type TimeSlots = Record<
  string,
  { timeSlotId: string; startTime: string; endTime: string }[]
>

import { useRef } from 'react'
type AvailableHoursDropdownProps = {
  roomId: string
  open: boolean
  setOpen: (value: boolean) => void
}

function AvailableHoursDropdown({
  roomId,
  open = true,
  setOpen,
}: AvailableHoursDropdownProps) {
  const didMount = useRef(false)

  const handleOpenChange = (value: boolean) => {
    if (!didMount.current) {
      didMount.current = true
      return // Skip initial onOpenChange on mount
    }
    setOpen(value)
  }
  return (
    <DropdownMenu
      modal={false}
      open={true}
      onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
        className='rounded-full select-none px-4 text-2xl bg-white text-chasBlue border-2 border-chasBlue hover:bg-chasB focus-visible:outline-none data-[state=open]:bg-chasBlue data-[state=open]:text-white'>
        <Button className='flex gap-2 text-base'>
          <span>Se lediga timmar</span>
          <FaChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='mt-1 overflow-hidden rounded bg-[#ECE9E9] p-2 text-left shadow'
        sideOffset={-1}>
        {open && <CheckboxWaterFall roomId={roomId} />}
        <Outlet />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type MultiselectProps = TimeSlots
const CheckboxWaterFallOld = ({ roomId }: { roomId: string }) => {
  // ({ selectedTimeSlots, setSelectedTimeSlots }:
  // { setSelectedTimeSlots: (slots: MultiselectProps) => void, selectedTimeSlots: MultiselectProps; })
  // => {
  //     ({
  //   selectedTimeSlots,
  //   setSelectedTimeSlots,
  // }: {
  //   setSelectedTimeSlots: React.Dispatch<React.SetStateAction<Record<string, TimeSlot[]>>>;
  //   selectedTimeSlots: Record<string, TimeSlot[]>;
  //         }) {

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedRaw = searchParams.get('selected')
  const selectedTimeSlots: Record<string, TimeSlot[]> =
    parseSelection(selectedRaw)
  const [filters, setFilters] = useState({ category: [], sort: 'asc' })

  // // On mount, read from URL
  // useEffect(() => {
  //   const category = searchParams.getAll("category");
  //   const sort = searchParams.get("sort") || "asc";
  //   setFilters({ category, sort });
  // }, [searchParams]);

  // // Update URL and state together
  // function updateFilter(key, value) {
  //   const newParams = new URLSearchParams(searchParams);
  //   newParams.set(key, value);
  //   setSearchParams(newParams); // Updates the browser URL without reload
  // }

  const toggleSlot = (slot: {
    timeSlotId: string
    startTime: string
    endTime: string
  }) => {
    const roomSlots = selectedTimeSlots[roomId] || []
    const exists = roomSlots.some((s) => s.timeSlotId === slot.timeSlotId)
    const updated = exists
      ? roomSlots.filter((s) => s.timeSlotId !== slot.timeSlotId)
      : [...roomSlots, slot]

    const newSelected = { ...selectedTimeSlots, [roomId]: updated }
    // setSearchParams({ selected: encodeSelection(newSelected) });
  }

  //     const formattedTimeSlots = checkboxes.map((timeslot) => ({
  //   ...timeslot,
  //   startTime: timeslot.startTime.replace(/:00$/, ""),
  //   endTime: timeslot.endTime.replace(/:00$/, ""),
  // }));

  return (
    <div>k</div>
    //       <fetcher.Form method='post'>
    //   {formattedTimeSlots.map((timeslot) => {
    //     const isChecked =
    //       selectedTimeSlots[timeslot.roomID]?.some(
    //         (slot) => slot.timeSlotID === String(timeslot.timeSlotID)
    //       ) || false

    //     return (
    //       <DropdownMenuItem
    //         key={timeslot.timeSlotID}
    //         onSelect={(e) => e.preventDefault()}
    //       className='even:bg-white'>
    //         <label
    //           htmlFor={`timeslot-${timeslot.timeSlotID}`}
    //           className='flex items-center gap-2'>
    //           <Checkbox
    //             id={`timeslot-${timeslot.timeSlotID}`}
    //             checked={
    //               isChecked || false
    //               //selectedTimeSlots?.has(timeslot.timeSlotID) || false
    //             }
    //             onCheckedChange={(checked) =>
    //               // handleChange(Boolean(checked), timeslot)
    //               handleTimeSlotSelect({
    //                 roomID: String(timeslot.roomID),
    //                 slot: {
    //                   timeSlotID: String(timeslot.timeSlotID), // Convert number to string
    //                   startTime: timeslot.startTime,
    //                   endTime: timeslot.endTime,
    //                 },
    //                 isChecked: Boolean(checked),
    //               })
    //             }
    //           />
    //           {timeslot.startTime} - {timeslot.endTime}
    //         </label>
    //       </DropdownMenuItem>
    //     )
    //   })}
    // </fetcher.Form>
  )
}

//https://github.com/fallowshades/Examination_chass/blob/main/app/routes/components/Room.tsx
// 🔧 Helper to encode selection as string
function encodeSelection(data: Record<string, TimeSlot[]>) {
  return Object.entries(data)
    .map(([roomId, slots]) =>
      slots
        .map((slot) => `${roomId}.${slot.startTime}-${slot.endTime}`)
        .join(',')
    )
    .join(',')
}

type TimeSlot = {
  id: string
  timeSlotId: string
  startTime: string
  endTime: string
}

// 🔧 Helper to decode selection from string
function parseSelection(raw: string | null): Record<string, TimeSlot[]> {
  if (!raw) return {}
  const record: Record<string, TimeSlot[]> = {}

  const items = raw.split(',')
  for (const item of items) {
    const [room, time] = item.split('.')
    if (!room || !time) continue
    const [startTime, endTime] = time.split('-')
    if (!startTime || !endTime) continue

    record[room] ??= []
    // record[room].push({
    //   timeSlotId: `${startTime}-${endTime}`,
    //   startTime,
    //   endTime,
    // });
  }

  return record
}

const toggleSlot = (slot: {
  timeSlotId: string
  startTime: string
  endTime: string
}) => {
  // const roomSlots = selectedTimeSlots[roomId] || [];
  // const exists = roomSlots.some(s => s.timeSlotId === slot.timeSlotId);
  // const updated = exists
  //   ? roomSlots.filter(s => s.timeSlotId !== slot.timeSlotId)
  //   : [...roomSlots, slot];
  // const newSelected = { ...selectedTimeSlots, [roomId]: updated };
  // setSearchParams({ selected: encodeSelection(newSelected) });
}
