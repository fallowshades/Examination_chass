import React from 'react'
import { type RoomType } from '~/routes/components/config/constants'
const Room = ({ roomDetails }: { roomDetails: RoomType; }) => {
    //console.log(roomDetails)
      if (!roomDetails) {
    return <div>Room data is unavailable</div>; // Handle missing data gracefully
  }
  return (
    <div className='flex flex-row gap-2 justify-around items-center min-h-[200px] lg:min-h-[110px]'>
      <div>
        <img
          src={roomDetails?.image}
          alt='rooom'
          className='basis-sm grow-1 max-w-[200px]'
        />
      </div>
      {/**1st box */}
      <div className='space-y-1'>
        <h6>{roomDetails?.title}</h6>
        <p className='min-w-[20ch] max-w-[20ch] break-words '>
          {roomDetails?.capacity}
        </p>
      </div>
      <CheckBoxMenu roomId={roomDetails?.id} />
    </div>
  )
}

export default Room;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { FaChevronDown } from 'react-icons/fa'
import { Button } from '~/components/ui/button';
import { useState ,lazy} from 'react'
import { Link, useSearchParams,Outlet } from 'react-router';

import { useEffect } from 'react';
// import CheckboxWaterFall from './CheckboxWaterFall';
// import AsyncFetcher from './AsyncFetcher';

// const AsyncFetcher = lazy(() => import('./AsyncFetcher'))

import { useParams } from 'react-router';
const CheckBoxMenu = ({ roomId = 'o' }: { roomId?: string; }) => {
  const { selectedUser } = useParams()
  console.log(selectedUser)
    
    const r = roomId
    const [open, setOpen] = useState<boolean>(false)    
    return (
         <DropdownMenu
      modal={false}
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuTrigger
          asChild
                      onClick={(e) => e.stopPropagation()}

        className=' rounded-full select-none  px-4 text-2xl bg-white text-chasBlue border-2 border-chasBlue hover:bg-chasB  focus-visible:outline-none data-[state=open]:bg-chasBlue data-[state=open]:text-white'>
         
            	<Link
						to={`/${selectedUser}/${roomId}`}
						// this is for progressive enhancement
						
						className="flex items-center gap-2"
					>
          {' '}
          <span>Se lediga timmar</span>
              <FaChevronDown />
              </Link>
      
      </DropdownMenuTrigger>
        <DropdownMenuContent
          className='mt-1 overflow-hidden rounded bg-[#ECE9E9]  p-2 text-left shadow' sideOffset={-1}>
          {/* {open &&
            <CheckboxWaterFall
          roomId={r}
        />} */}
          <p>open</p>
          <Outlet />
          {/* <AsyncFetcher<any[]>
        url="/resources/"
        render={({
          loading,
          error,
          data,
        }: {
          loading: boolean;
          error?: string;
          data?: any[];
        }) => ( <div>test</div>)}
/> */}
      </DropdownMenuContent>
    </DropdownMenu>
    )
};
type TimeSlots = Record<string, { timeSlotId: string; startTime: string, endTime: string; }[]>


type MultiselectProps = TimeSlots
const CheckboxWaterFallOld = ({roomId}:{roomId:string}) => {
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
        
        
      const [searchParams, setSearchParams] = useSearchParams();
    const selectedRaw = searchParams.get("selected");
    const selectedTimeSlots: Record<string, TimeSlot[]> = parseSelection(selectedRaw);
        const [filters, setFilters] = useState({ category: [], sort: "asc" });

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

     const toggleSlot = (slot: { timeSlotId: string; startTime: string; endTime: string }) => {
  const roomSlots = selectedTimeSlots[roomId] || [];
  const exists = roomSlots.some(s => s.timeSlotId === slot.timeSlotId);
  const updated = exists
    ? roomSlots.filter(s => s.timeSlotId !== slot.timeSlotId)
    : [...roomSlots, slot];

  const newSelected = { ...selectedTimeSlots, [roomId]: updated };
  // setSearchParams({ selected: encodeSelection(newSelected) });
};
    
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
};


// 🔧 Helper to encode selection as string
function encodeSelection(data: Record<string, TimeSlot[]>) {
  return Object.entries(data)
    .map(([roomId, slots]) =>
      slots.map(slot => `${roomId}.${slot.startTime}-${slot.endTime}`).join(",")
    )
    .join(",");
}

type TimeSlot = {
  id: string;
  timeSlotId: string;
  startTime: string;
  endTime: string;
};

// 🔧 Helper to decode selection from string
function parseSelection(raw: string | null): Record<string, TimeSlot[]> {
  if (!raw) return {};
  const record: Record<string, TimeSlot[]> = {};

  const items = raw.split(",");
  for (const item of items) {
    const [room, time] = item.split(".");
    if (!room || !time) continue;
    const [startTime, endTime] = time.split("-");
    if (!startTime || !endTime) continue;

    record[room] ??= [];
    // record[room].push({
    //   timeSlotId: `${startTime}-${endTime}`,
    //   startTime,
    //   endTime,
    // });
  }

  return record;
    
}

     const toggleSlot = (slot: { timeSlotId: string; startTime: string; endTime: string }) => {
  // const roomSlots = selectedTimeSlots[roomId] || [];
  // const exists = roomSlots.some(s => s.timeSlotId === slot.timeSlotId);
  // const updated = exists
  //   ? roomSlots.filter(s => s.timeSlotId !== slot.timeSlotId)
  //   : [...roomSlots, slot];

  // const newSelected = { ...selectedTimeSlots, [roomId]: updated };
  // setSearchParams({ selected: encodeSelection(newSelected) });
                 };