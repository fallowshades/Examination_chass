import type { loader as layoutLoader } from '../$searchCategoryCompany/layout.loader.server'

export type LayoutLoaderData = Awaited<
  ReturnType<typeof layoutLoader>
> extends Response
  ? never
  : Awaited<ReturnType<typeof layoutLoader>>

// export type LayoutLoaderData = Awaited<
//   ReturnType<typeof loader>
// > extends Response
//   ? Awaited<ReturnType<typeof loader>> extends Response<infer D>
//     ? D
//     : never
//   : Awaited<ReturnType<typeof loader>>
