import { useState, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  apiCall: () => Promise<{ data?: T; error?: string }>,
  dependencies: any[] = []
): ApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await apiCall();
      if (result.error) {
        setState({ data: null, loading: false, error: result.error });
      } else {
        setState({ data: result.data || null, loading: false, error: null });
      }
    } catch (err) {
      setState({ data: null, loading: false, error: 'An unexpected error occurred' });
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { ...state, refetch: fetchData };
}
