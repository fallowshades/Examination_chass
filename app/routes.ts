
import {route,layout, type RouteConfig, index ,prefix} from "@react-router/dev/routes";

// lazy: () => import("~/routes/_")
// element: <MainLayout /> 
//   {
       
//          file: "routes/_layout.tsx",
//     children: [
//       index("routes/home.tsx")
//     ],
//   }
export default [
  layout('routes/_layout+/route.tsx', [
    route('/', 'routes/dashboard.tsx', [
      index('routes/homeIndex.tsx'),
      route('/:userId', 'routes/home.tsx', [
        route(':dates', 'routes/dashboard.dates.tsx'),
      ]),

      route('/:id', 'routes/CheckboxWaterFall.tsx'),
    ]),

    route('/viewBookings/:id', 'routes/ViewBookings.tsx'),

    route('*', 'routes/_errors/404.tsx'),
  ]),
] satisfies RouteConfig

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