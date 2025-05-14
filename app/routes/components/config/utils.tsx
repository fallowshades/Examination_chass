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