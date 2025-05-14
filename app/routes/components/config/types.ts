import type { z } from 'zod'
import type {
    TimeIntervalStateSchema,SetTimeIntervalStateSchema, PaginationSchema
} from './schema'

export type Pagination = z.infer<typeof PaginationSchema>