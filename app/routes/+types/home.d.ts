export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs
  export type LoaderData = {
    bigB: Promise<any> // or RoomType[] if you have the type
    smallA: Promise<any>
  }
  export type ComponentProps = {
    loaderData: LoaderData
  }
      export type MetaArgs = Parameters<MetaFunction>[0]
      export type ClientLoaderArgs = {
        serverLoader: () => Promise<{ bigB: any; smallA: any }>
        params: Record<string, string>
      }
}

// export namespace Route {
//   export type LoaderArgs = {
//     params: {
//       [key: string]: string | undefined
//     }
//   }

import { RoomType } from "../components/config/utils"
import { type MetaFunction, type LoaderFunctionArgs } from 'react-router'

  export type LoaderData = {
    smallA: RoomType[] 
    bigB: RoomType[]
  }

  export type ComponentProps = {
    loaderData: LoaderData
  }

  // ✅ Add this:
  export type ClientLoaderArgs = {
    serverLoader: () => Promise<LoaderData>
    params: Record<string, string>;//LoaderArgs['params']
  }

    export type MetaArgs = MetaFunctionArgs<typeof loader>; // or more loosely:
  // export type MetaArgs = { data: LoaderData; params: LoaderArgs['params'] };
