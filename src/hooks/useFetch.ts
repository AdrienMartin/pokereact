import { useCallback, useEffect, useState } from 'react';

interface UseFetchOptions {
  autoFetch?: boolean;
}

export const useFetch = <T,>(
  fetchFunction: () => Promise<T>,
  options: UseFetchOptions = { autoFetch: true }
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    if (options.autoFetch) {
      console.log('Appel API...');
      execute().catch((err) => {
        console.error('Erreur dans useFetch:', err);
      });
    }
  }, [execute, options.autoFetch]);

  return { data, loading, error, refetch: execute };
};