//
import { PassThrough } from "node:stream";
import type { AppLoadContext, EntryContext } from "react-router";
//
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";

//
import { getEnv, init } from './utils/env.server'
import { NonceProvider } from './utils/nonce-provider'
import { makeTimings } from './utils/timing.server'

import crypto from 'node:crypto'

//basically dotenv
init()
global.ENV = getEnv()


export const streamTimeout = 5_000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
  // If you have middleware enabled:
  // loadContext: unstable_RouterContextProvider
) {


  const nonce = crypto.randomBytes(16).toString('hex')
  
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    const timings = makeTimings('render', 'renderToPipeableStream')
    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    let readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";
	// const callbackName = isbot(request.headers.get('user-agent'))
	// 	? 'onAllReady'
	// 	: 'onShellReady'

    const { pipe, abort } = renderToPipeableStream(
      <NonceProvider value={nonce}>
        <ServerRouter context={routerContext} url={request.url} />
      </NonceProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          

          responseHeaders.set("Content-Type", "text/html");
          responseHeaders.append('Server-Timing', timings.toString())

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    // Abort the rendering stream after the `streamTimeout` so it has time to
    // flush down the rejected boundaries
    setTimeout(abort, streamTimeout + 1000);
  });
}
import {
 
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type HandleDocumentRequestFunction,
} from 'react-router'
import { styleText } from 'node:util'
export function handleError(
  error: unknown,
  { request }: LoaderFunctionArgs | ActionFunctionArgs
): void {
  // Skip capturing if the request is aborted as Remix docs suggest
  // Ref: https://remix.run/docs/en/main/file-conventions/entry.server#handleerror
  if (request.signal.aborted) {
    return
  }

  if (error instanceof Error) {
    console.error(styleText('red', String(error.stack)))
  } else {
    console.error(error)
  }


}