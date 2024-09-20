import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set Authorization header if token exists

        const response = await axios.get(url, { headers }); // Include headers with the request
        setData(response.data.data); // Assuming data is in response.data.data
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;