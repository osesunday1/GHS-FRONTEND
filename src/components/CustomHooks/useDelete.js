import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set Authorization header if token exists

      setLoading(true);
      await axios.delete(url, { headers });
      toast.success("Delete Successful")
    } catch (err) {
      setError('Failed to delete data');
      toast.error(`Delete failed: ${err}`)
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;