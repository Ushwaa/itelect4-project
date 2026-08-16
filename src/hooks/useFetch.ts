import { useCallback, useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function useFetch<T>(fetchFunction: () => Promise<T>): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result: T = await fetchFunction();
      setData(result);
    } catch (caughtError) {
      const message: string =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while fetching data.";
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect((): void => {
    void refetch();
  }, [refetch]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export default useFetch;
