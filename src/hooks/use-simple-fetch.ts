import { useCallback, useEffect, useState } from 'react';

export const useFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState(null);

  const refetch = useCallback(async () => {
    setIsError(false);
    setError(null);
    setIsFetching(true);

    try {
      if (!input) throw new Error('No input provided');
      const res = await fetch(input, init);

      if (res.ok) {
        const resData = await res.json();
        setData(resData);
      } else {
        setData(null)
      }
    } catch (error: unknown) {
      setIsError(true);
      if (error instanceof Error) {
        setError(error);
      } else {
        console.error('Unexpected error', error);
      }
    } finally {
      setIsFetching(false);
    }
  }, [input, init]);

  useEffect(() => {
    (async () => await refetch())()
  }, [refetch])

  return { data, isFetching, isError, error, refetch };
}