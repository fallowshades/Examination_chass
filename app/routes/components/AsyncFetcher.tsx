type FetchError = { _fetch_error: string };
import { type LoaderFunctionArgs } from "react-router";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useSpinDelay } from "spin-delay";

function handleError(error: unknown): { error: string } {
  if (error instanceof Error) {
    return { error: error.message };
  }
  return { error: "Unknown error occurred" };
}

function asyncFetch<R>(loader: (a: LoaderFunctionArgs) => R) {
  return async (args: LoaderFunctionArgs): Promise<R | FetchError> => {
    try {
      return await loader(args);
    } catch (error) {
      return { _fetch_error: handleError(error).error };
    }
  };
}

export default function AsyncFetcher<T = unknown>({
  url,
  render,
}: {
  url: string;
  render: (p: { loading: boolean; error?: string; data?: T }) => ReactNode;
}) {
  const fetcher = useFetcher<T | FetchError>();
  const showLoader = useSpinDelay(!fetcher.data, {
    delay: 0,
    minDuration: 500,
  });

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load(url);
    }
  }, [fetcher, url]);

  // Assigning the error in a type-safe manner
  const error =
    fetcher.data &&
    typeof fetcher.data === "object" &&
    "_fetch_error" in fetcher.data
      ? fetcher.data?._fetch_error
      : undefined;
console.log('async fetch')
  return render({
    loading: showLoader,
    error,
    data: fetcher.data as T,
  });
}