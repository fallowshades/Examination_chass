import type { z } from 'zod'
import type {
    TimeIntervalStateSchema,SetTimeIntervalStateSchema, PaginationSchema
} from './schema'

export type Pagination = z.infer<typeof PaginationSchema>;


export type SyncronizedDisplayContainerRecord = {
  selectedTimeSlots:string,
}

export interface Room {
  selectedInterval: SyncronizedDisplayContainerRecord[];
  previousLength?: number;
  timeBounds: string;
}

export interface TimeIntervalState {
  day: number
  week: number
  rooms: Record<string, Room>
  totalHours: number
}