import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 



const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const postData = async (postData) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set Authorization header if token exists

      const result = await axios.post(url, postData, { headers }); // Include headers with the request
      setResponse(result.data); // Handle the response data
      toast.success('Booking created successfully!');
      return result.data; // Return the response in case it's needed

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post data'); // Handle error
      toast.error(`Failed to create booking. Please try again. ${err}`)
      return null; // Return null in case of error
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};

export default usePost;