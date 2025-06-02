// import { unstable_createServerTimingMiddleware } from 'remix-utils/middleware/server-timing'

// export const [serverTimingMiddleware, getTimingCollector] =
//   unstable_createServerTimingMiddleware()



//   import { getTimingCollector } from '~/middleware/server-timing.server'

//   export async function loader({ request }: Route.LoaderArgs) {
//     let collector = getTimingCollector()
//     return await collector.measure('name', 'optional description', async () => {
//       return await getData()
//     })
//   }