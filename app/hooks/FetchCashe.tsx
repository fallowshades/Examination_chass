import { use, useContext } from 'react'

class FetchCache {
  // Container for all-things-requests
  requestMap = new Map()

  // Tracking callbacks for broadcasting state updates
  subscribers = new Set<() => void>()

  fetchUrl(url: string | URL | Request, refetch: any) {
    const currentData = this.requestMap.get(url)

    if (currentData) {
      // This request is already in flight.
      // We need to keep this `readPromiseState` check
      if (readPromiseState(currentData.status) === 'pending') return currentData
      // If data is already in cache and has not been
      // explicitly re-requested. Return it.
      // status is either fulfilled or rejected.
      if (!refetch) return currentData
    }

    const broadcastUpdate = () => {
      // Delay notification in order to not run
      // during render cycle
      // https://reactjs.org/link/setstate-in-render
      setTimeout(() => {
        for (const callback of this.subscribers) {
          callback()
        }
      }, 0)
    }

    // Dispatch request and observe it
    const newPromise = fetch(url).then((res) => res.json())

    newPromise.finally(() => {
      // Whatever happens, notify subscribers
      // that state should be refreshed
      broadcastUpdate()
    })

    this.requestMap.set(url, newPromise)

    // Report that a request is now pending
    broadcastUpdate()

    // Report that a request is now pending
    return newPromise
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }
}
function readPromiseState(promise: Promise<any>) {
  // This function checks the state of a promise.
  // Since JS promises don't expose their state, we need to track it ourselves.
  // In this code, the promise itself is stored in requestMap as the status.
  // So, unless you wrap the promise to track its state, you can't know if it's pending, fulfilled, or rejected.
  // For now, let's assume that if the promise is in requestMap and hasn't resolved/rejected, it's pending.
  // But this is not reliable without extra tracking.
  // A better approach is to wrap the promise and attach a state property.

  // If the promise has a custom _state property, use it.
  if ((promise as any)._state) {
    return (promise as any)._state
  }
  // Otherwise, assume it's pending (since we just created it).
  return 'pending'
}
//https://www.bbss.dev/posts/react-learn-suspense/

const useFetch = (url) => {
  const { fetchUrl } = useContext(fetchCacheContext)
  const promise = fetchUrl(url)

  // Handles throwing for pending and rejected promises
  const data = use(promise)

  // Allow refreshing data
  const reload = () => fetchUrl(url, true)

  // Only return data now
  return [data, reload]
}
