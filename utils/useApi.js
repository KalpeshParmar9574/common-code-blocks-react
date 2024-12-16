import { useState, useEffect } from 'react';

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal; // Get the signal to pass to fetch

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, { ...options, signal }); // Pass the signal to fetch
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Abort the fetch if the component is unmounted
  }, [url, options]);

  return { data, loading, error };
};

export default useApi;
