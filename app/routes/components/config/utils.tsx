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




type DateType = {
    year: number, week: number;
}
export const getFirstDateOfISOWeek = ({ year, week }:DateType) => {
  const simpleDate = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simpleDate.getDay();
  const difference = (dayOfWeek <= 4 ? 1 : 8) - dayOfWeek;
  const monday = new Date(simpleDate.setDate(simpleDate.getDate() + difference));
  return monday;
};
export function formatWithPadding(day: string, baseDate: Date, offset: number) {
  const date = new Date(baseDate);
  date.setDate(baseDate.getDate() + offset);

  const formatted = date.toLocaleDateString('sv-SE', {
    day: '2-digit',
    month: '2-digit',
  });

  const [dayPart, monthPart] = formatted.split('/');

  const paddedDay = Number(dayPart) < 10 ? `${dayPart}\u00A0` : dayPart;
  const paddedMonth = Number(monthPart) < 10 ? `\u00A0${monthPart}` : monthPart;

  return `${day} ${Number(paddedDay)}${Number(dayPart) < 10 ? ' ' : ''}/${Number(dayPart) < 10 ? ' ' : ''}${Number(paddedMonth)}`;
}

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