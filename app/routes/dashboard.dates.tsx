import { type loader as dashboardLoader } from '~/routes/dashboard'
import { useLoaderData, useRouteLoaderData } from 'react-router'
export async function loader() {
  let data = 'test' //await getData();
  return { data }
}

export default function Component() {
  let loaderData = useLoaderData<typeof loader>() // this is safe
  // let dashboardLoaderData =
  // useRouteLoaderData<typeof dashboardLoader>("routes/dashboard"); // kinda safe
  // const dashboardData = useRouteLoaderData(
  //   'routes/dashboard'
  // ) as LoaderReturnType<typeof dashboardLoader>

  const dashboardData = useRouteLoaderData('routes/dashboard') as Awaited<
    ReturnType<typeof dashboardLoader>
  >
  // more code
}
