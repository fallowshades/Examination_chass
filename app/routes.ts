//relative function:  sergiodxa.com/tutorials/split-routes-config-in-react-router

import {
  route,
  layout,
  type RouteConfig,
  index,
  prefix,
  relative,
} from '@react-router/dev/routes'
// const { route, index } = relative(import.meta.dirname)

// lazy: () => import("~/routes/_")
// element: <MainLayout />
//   {

//          file: "routes/_layout.tsx",
//     children: [
//       index("routes/home.tsx")
//     ],
//   }
export default [
  layout('routes/transaction+/_layout/route.tsx', [
    route('/', 'routes/dashboard.tsx', [
      index('routes/homeRoute.tsx'),
      route('home', 'routes/homeIndex.tsx'), //dont use suspens
      route('/:userId', 'routes/home.tsx', [
        // route(':dates', 'routes/dashboard.dates.tsx'),
      ]),

      route('/:id', 'routes/CheckboxWaterFall.tsx'),
    ]),
    // route(
    //   '/resources/save-checkboxes',
    //   'routes/resources/useCheckboxFetcher.tsx'
    // ),
    route('/viewBookings/:id', 'routes/ViewBookings.tsx'),
    route('codeBasedRoutingNoCollocatedModules', 'routes/_layout.tsx'),
    route('*', 'routes/_errors/404.tsx'),
  ]),
] satisfies RouteConfig

// import { flatRoutes } from '@react-router/fs-routes'

// export default flatRoutes() satisfies RouteConfig

//  {
//   ignoredRouteFiles: ['**/.*'], // Ignore dot files (like .DS_Store)
//appDir: 'app',
//routeDir: 'routes',
//basePath: '/',
//paramPrefixChar: '$',
//nestedDirectoryChar: '+',
//routeRegex: /((\${nestedDirectoryChar}[\/\\][^\/\\:?*]+)|[\/\\]((index|route|layout|page)|(_[^\/\\:?*]+)|([^\/\\:?*]+\.route)))\.(ts|tsx|js|jsx|md|mdx)$$/,
//     })
//   },
