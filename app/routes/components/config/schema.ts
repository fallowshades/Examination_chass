import { z } from 'zod'
import {

  PAGINATION_PER_PAGE_DEFAULT,
  PAGINATION_PER_PAGE_ITEMS,

} from '../config'

// Define the schema for pagination
export const PaginationSchema = z.object({
  week: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional().default('1').transform(Number),
  ),
  newWeek: z.preprocess(
    (val) => (val === null ? undefined : val),
    z
      .enum(PAGINATION_PER_PAGE_ITEMS)
      .optional()
      .default(PAGINATION_PER_PAGE_DEFAULT)
      .transform(Number),
  ),
})


//////////777old'
// Define the TimeIntervalState schema
export const TimeIntervalStateSchema = z.object({
  day: z.string(),
  week: z.string(),
  totalHours: z.number(),
  rooms: z.record(
    z.string(),
    z.object({
      timeBounds: z.string(),
      selectedInterval: z.array(z.string()),
      previousLength: z.number().optional(),
    })
  ),
});

// Define the SetTimeIntervalState schema
export const SetTimeIntervalStateSchema = z.object({
  sets: z.array(TimeIntervalStateSchema),
  timeInTotal: z.number(),
});

//may change in the future, mb dont

export const parseQueryParams = (request: Request) => {
    const searchParams = new URL(request.url).searchParams
    console.log(searchParams)
//   const search = SearchSchema.parse({
//     [SEARCH_FIELD]: searchParams.get(SEARCH_FIELD),
//   })
//   const filters = FilterSchema.parse(
//     Object.fromEntries(
//       FILTER_FIELDS.map((field) => [field, searchParams.getAll(field)]),
//     ),
//   )
//   const { sort_by: sortBy, sort_order: sortOrder } = SortSchema.parse({
//     sort_by: searchParams.get('sort_by'),
//     sort_order: searchParams.get('sort_order'),
//   })

  const { week,  newWeek } = PaginationSchema.parse({
    week: searchParams.get('week'),
     newWeek : searchParams.get('newWeek'),
  })
//  const no = { search, filters, sortBy, sortOrder, page, perPage}
  return { week,newWeek}
}
