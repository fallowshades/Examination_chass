import { type RoomType } from "~/routes/components/config/constants";
export function groupRooms(resolvedBig?: RoomType[], resolvedSmall?: RoomType[]) {
  const groups = [];

  if (resolvedBig?.length) {
    groups.push({
      id: String(resolvedBig[0].layer ?? '0'),
      groupId: "Stora rum",
      rooms: resolvedBig ?? [],
    });
  }

  if (resolvedSmall?.length) {
    groups.push({
      id: String(resolvedSmall[0].layer ?? '0'),
      groupId: "Små rum",
      rooms: resolvedSmall ?? [],
    });
  }

  return groups;
}

export type TimeSlot = {
  timeSlotId: string;
  startTime: string;
  endTime: string;
};


//  pageButtons.push(
//       addPageButton({ page: 1, activeClass: currentWeek === 1 })
//     );
//     // dots

//     if (currentWeek > 3) {
//       pageButtons.push(
//         <Button size='icon' variant='outline' key='dots-1'>
//           ...
//         </Button>
//       );
//     }
//     // one before current page
//     if (currentWeek !== 1 && currentWeek !== 2) {
//       pageButtons.push(
//         addPageButton({
//           page: currentWeek - 1,
//           activeClass: false,
//         })
//       );
//     }
//     // current page
//     if (currentWeek !== 1 && currentWeek !== currentWeek) {
//       pageButtons.push(
//         addPageButton({
//           page: currentWeek,
//           activeClass: true,
//         })
//       );
//     }
//     // one after current page

//     if (currentWeek !== totalWeeks && currentWeek !== totalWeeks - 1) {
//       pageButtons.push(
//         addPageButton({
//           page: currentWeek + 1,
//           activeClass: false,
//         })
//       );
//     }
//     if (currentWeek < totalWeeks - 2) {
//       pageButtons.push(
//         <Button size='icon' variant='outline' key='dots-2'>
//           ...
//         </Button>
//       );
//     }
//     pageButtons.push(
//       addPageButton({
//         page: totalWeeks,
//         activeClass: currentWeek === totalWeeks,
//       })
//     );