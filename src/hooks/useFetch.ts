import { useEffect, useState } from "react";
import axios, { type AxiosRequestConfig } from "axios";

export const useFetch = <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  immediate: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios(url, config);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) fetchData();
  }, [url, immediate]);

  return { data, loading, error, refetch: fetchData };
};
