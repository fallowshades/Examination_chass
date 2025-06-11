import React, { useTransition } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import {
  CheckboxContent,
  CheckBoxTrigger,
  CheckboxContext,
  Checkbox,
} from '../SharableCheckbox'
import CheckboxWaterFall from '~/routes/components/CheckboxWaterfall'

import { useState } from 'react'
import { useFetcher } from 'react-router'
import { useRef, useEffect } from 'react'
import { useCheckboxFetcher } from '~/hooks/useCheckboxFetcher'

import { fetchData } from '~/components/sharableCheckbox/fakeApi'

const initialResource = fetchData()
interface AppCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  roomId: string
}

//www.npmjs.com/package/state-in-url
// https://www.npmjs.com/package/nuqs .
//dont use the route fetcher hook, use component

import { useComponentFetcher } from '../ComponentErrorBoundary'

export default function AppCheckbox({ roomId, ...props }: AppCheckboxProps) {
  const ctx = React.useContext(CheckboxContext)

  if (!ctx)
    throw new Error('AppCheckbox must be used within a CheckboxProvider')

  const [open, setOpen] = useState<boolean>(false)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    Record<string, { timeSlotID: string; startTime: string; endTime: string }[]>
  >({})
  const [resource, setResource] = useState(initialResource)
  const [isPending, startTransition] = useTransition()
  //const fetcher = useComponentFetcher()

  //const fetchesr = useCheckboxFetcher(roomId, open, selectedTimeSlots)
  // console.log('selectedTimes', selectedTimeSlots)
  //const dispatch = useAppDispatch()
  //const fetcher = useFetcher()
  //const isFirstRender = useRef(true);
  const hasOpened = useRef(false)

  const handleOpenChange = (isOpen: boolean) => {
    startTransition(() => {
      setOpen(isOpen)
      setResource(fetchData())
    })
    console.log(resource, 'resourcs')
  }

  useEffect(() => {
    // if (isFirstRender.current) {
    //   isFirstRender.current = false; // Skip first render
    //   return;
    // }
    if (!hasOpened.current && !open) {
      return // Skip the first effect run when component mounts
    }

    hasOpened.current = true
    if (open) {
      // Fetch available timeslots when opening
      // fetcher.submit(
      //   { actionType: 'fetch', roomId },
      //   {
      //     method: 'POST',
      //   }
      // )
    } else {
      // Save selected timeslots when closing
      // const onlyCheckedTimeIntervals = selectedTimeslots
      //   .filter((slot) => slot.selected)
      //   .map((slot) => slot.name)
      console.log(selectedTimeSlots, 'selectedTimeSlots')

      const timeSlotsArray = Object.values(selectedTimeSlots).flat() || [] //each component can noly hold a single record
      console.log(timeSlotsArray, 'sdf')
      const bookingIds = timeSlotsArray.map((slot) => slot.timeSlotID)

      const timeStrings = timeSlotsArray.map(
        (slot) => `${slot.startTime}-${slot.endTime}`
      )
      // dispatch(
      //   setInterval({
      //     roomId,
      //     interval: timeStrings,
      //     selectedTimeSlots: bookingIds,
      //   })
      // )

      // dispatch(setInterval({ roomId, interval: onlyCheckedTimeIntervals }))

      // fetcher.submit(
      //   {
      //     actionType: 'save',
      //     roomId,
      //     selectedTimeslots: JSON.stringify(bookingIds),
      //   },
      //   { method: 'POST' } //, action: '/boka'
      // )
    }
  }, [open])

  return (
    <DropdownMenu
      modal={false}
      open={open}
      onOpenChange={handleOpenChange}>
      {/* <DropdownMenuTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
        className='rounded-full select-none px-4 text-2xl bg-white text-chasBlue border-2 border-chasBlue hover:bg-chasB focus-visible:outline-none data-[state=open]:bg-chasBlue data-[state=open]:text-white'>
        <Button className='flex gap-2 text-base'>
          <span>Se lediga timmar</span>
          <FaChevronDown />
        </Button>
      </DropdownMenuTrigger> */}
      <CheckBoxTrigger className='rounded-full select-none px-4 text-2xl bg-white text-chasBlue border-2 border-chasBlue hover:bg-chasB focus-visible:outline-none data-[state=open]:bg-chasBlue data-[state=open]:text-white' />
      {/* <DropdownMenuContent
        className='mt-1 overflow-hidden rounded bg-[#ECE9E9] p-2 text-left shadow'
        sideOffset={-1}>
        SE LEDIGA TIMMAR!
        {/* {open && <CheckboxWaterFall roomId={roomId} />}
        <Outlet /> 
        </DropdownMenuContent>
        */}
      <CheckboxContent>
        <CheckboxWaterFall roomId={'1'} />
      </CheckboxContent>
    </DropdownMenu>
  )
}
