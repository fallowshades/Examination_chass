import { type RoomType } from "~/routes/components/config/constants";
export function groupRooms(resolvedBig: RoomType[], resolvedSmall: RoomType[]) {
  console.log(resolvedBig, resolvedSmall), "resolved";
  return [
    {
      id:  String(resolvedBig[0]?.layer) ?? '0',
      groupId: "Stora rum",
      rooms: resolvedBig,
    
    },
    {
      id: String(resolvedBig[0]?.layer) ?? '0',//crypto.randomUUID(),
      groupId: "Små rum",
      rooms: resolvedSmall,
     
    },
  ];
}

export type TimeSlot = {
  timeSlotId: string;
  startTime: string;
  endTime: string;
};