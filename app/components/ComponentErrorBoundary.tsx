import { useFetcher } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { useEffect } from 'react'

type ComponentErrorBoundaryProps = {
  children: React.ReactNode
  fallbackRender?: (props: { error: Error }) => React.ReactNode
}

export function DefaultErrorBoundaryFallback({ error }: { error: Error }) {
  return (
    <div style={{ color: 'red' }}>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

export function ComponentErrorBoundary({
  children,
  fallbackRender,
}: ComponentErrorBoundaryProps) {
  function defaultFallbackRender({ error }: { error: Error }) {
    return <DefaultErrorBoundaryFallback error={error} />
  }

  return (
    <ErrorBoundary fallbackRender={fallbackRender ?? defaultFallbackRender}>
      {children}
    </ErrorBoundary>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcludeErrorResponse<T> = T extends { $$error: any } ? never : T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Utility type to extract the resolved type from a Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export function useComponentFetcher<T extends (args: any) => Promise<any>>() {
  type Unwrapped = UnwrapPromise<ReturnType<T>>
  type Excluded = ExcludeErrorResponse<Unwrapped>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Fetcher = (args: any) => Promise<Excluded>

  // we want to infer the loader return type and exclude the $$error response
  const fetcher = useFetcher<Fetcher>()
  // ensure if we get an $errror response, we throw it so it can be handled
  // by the component error boundary
  //handleComponentError(fetcher.data)
  // Only handle error after fetcher has actually fetched
  useEffect(() => {
    if (fetcher.state === 'idle' || !fetcher.data) return
    handleComponentError(fetcher.data)
  }, [fetcher.data, fetcher.state])
  return fetcher
}

function handleComponentError<T>(fetcherData: T) {
  if (
    fetcherData &&
    typeof fetcherData === 'object' &&
    '$$error' in fetcherData
  ) {
    throw fetcherData?.$$error
  }
}
