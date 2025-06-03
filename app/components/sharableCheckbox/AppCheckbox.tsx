import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import { CheckBoxTrigger, CheckboxContext, Checkbox } from '../SharableCheckbox'
export default function AppCheckbox({
  ...props
}: React.ComponentProps<typeof Checkbox>) {
  const ctx = React.useContext(CheckboxContext)

  if (!ctx)
    throw new Error('AppCheckbox must be used within a CheckboxProvider')

  return (
    <DropdownMenu

    //   modal={false}
    //   open={true}
    //   onOpenChange={handleOpenChange}
    >
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
      <DropdownMenuContent
        className='mt-1 overflow-hidden rounded bg-[#ECE9E9] p-2 text-left shadow'
        sideOffset={-1}>
        SE LEDIGA TIMMAR!
        {/* {open && <CheckboxWaterFall roomId={roomId} />}
        <Outlet /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
