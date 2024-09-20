import { useState } from 'react';
import axios from 'axios';

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url) => {
    try {
      setLoading(true);
      await axios.delete(url);
    } catch (err) {
      setError('Failed to delete data');
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;