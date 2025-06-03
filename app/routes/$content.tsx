//https://sergiodxa.com/tutorials/bubble-up-data-on-remix-routes
import {
  useMatches,data,
  type LoaderFunctionArgs,
  type SerializeFrom,
} from 'react-router'
import {z} from 'zod'
// import type { SerializeFrom } from "@remix-run/node";
export async function loader({ params }: LoaderFunctionArgs) {
  let slug = z.string().parse(params.content)
  let content = await Content.findBySlug(slug)
  return data(content)
}

import React from 'react'

export default function $content() {
    let matches = useMatches()
    // here, we use match.data instead of match.handle
    let match = matches.find((match) => 'lang' in match.data)
    let lang = match.data?.lang as string

    return <html lang={lang}> ... </html>

//   return (
//     <div>$content</div>
//   )
}


// export let handle = { hydrate: true }
export let handle = {
  hydrate(data: SerializeFrom<typeof loader>) {
    return data.hydrate
  },
}
  