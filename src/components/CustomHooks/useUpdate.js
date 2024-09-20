import { useState } from 'react';
import axios from 'axios';

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (url, updatedData) => {
    try {
      setLoading(true);
      await axios.put(url, updatedData);
    } catch (err) {
      setError('Failed to update data');
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
};

export default useUpdate;