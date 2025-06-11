export function fetchData() {
  let promise = createDelay()
  return {
    delay: wrapPromise(promise),
  }
}

function createDelay() {
  return new Promise((resolve) => {
    const delay = Math.random() * 520 + 230
    setTimeout(() => resolve(delay), delay)
  })
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
interface WrappedPromise<T> {
  read(): T
}

function wrapPromise<T>(promise: Promise<T>): WrappedPromise<T> {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T
  let suspender = promise.then(
    (r) => {
      status = 'success'
      result = r
    },
    (e) => {
      status = 'error'
      result = e
    }
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
      // This line is unreachable, but needed for type safety
      throw new Error('Unexpected status')
    },
  }
}
