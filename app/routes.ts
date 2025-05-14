
import {route,layout, type RouteConfig, index } from "@react-router/dev/routes";

// lazy: () => import("~/routes/_")
// element: <MainLayout /> 
//   {
       
//          file: "routes/_layout.tsx",
//     children: [
//       index("routes/home.tsx")
//     ],
//   }
export default [
     layout("routes/_layout.tsx", [  
    route("/", "routes/dashboard.tsx", [
         
          index("routes/home.tsx"),
        ]),
  
  ]),

] satisfies RouteConfig;

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