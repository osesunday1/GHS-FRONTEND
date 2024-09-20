import { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../styles/Table';



const ApartmentList = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/apartments`);
        setApartments(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching apartments:', err);
        setError('Failed to fetch apartments');
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ['Apartment Name', 'Type', 'Description', 'Max Guests'];
  const data = apartments.map(apartment => ({
    'Apartment Name': apartment.name,
    'Type': apartment.type,
    'Description': apartment.description,
    'Max Guests': apartment.maxGuests
  }));

  
  return (
    <div>
      
      <Table headers={headers} data={data} />
    </div>
  );
};

export default ApartmentList;