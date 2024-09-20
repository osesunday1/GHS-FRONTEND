import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../styles/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from '../styles/Modal';
import EditGuestForm from './EditGuestForm'; // Assume this component exists for editing guests
import styled from 'styled-components';

const StyledContent = styled.div`
  display: grid;
  place-items: center;
  margin: 0 auto;

  p {
    font-size: 30px;
    color: red;
  }

  button {
    font-size: 20px;
    width: 100px;
    height: 50px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--blue);
    color: white;
  }
`;

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null); // State to track the selected guest
  const [guestToDelete, setGuestToDelete] = useState(null); // State to track the guest to delete

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await axios.get(`${apiUrl}/v1/guests`);
        setGuests(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guests:', err);
        setError('Failed to fetch guests');
        setLoading(false);
      }
    };

    fetchGuests(); // Call the async function
  }, []);

  const handleEdit = (guest) => {
    setSelectedGuest(guest);
  };

  const handleDelete = (guest) => {
    setGuestToDelete(guest);
  };

  const confirmDelete = async () => {
    if (!guestToDelete) return;

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;

      await axios.delete(`${apiUrl}/v1/guests/${guestToDelete._id}`);
      setGuests(guests.filter(g => g._id !== guestToDelete._id));
      setGuestToDelete(null); // Close the modal after deletion
    } catch (err) {
      console.error('Error deleting guest:', err);
      setError('Failed to delete guest.');
    }
  };

  const handleSave = async (updatedGuest) => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.put(`${apiUrl}/v1/guests/${updatedGuest._id}`, updatedGuest);
      setSelectedGuest(null); // Reset the form after saving
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest._id === updatedGuest._id ? updatedGuest : guest
        )
      );
    } catch (err) {
      console.error('Error updating guest:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = [
    'First Name', 
    'Last Name', 
    'Email', 
    'Phone', 
    'Actions'
  ];

  return ( 
    <div>
      <Table headers={headers} data={guests.map((guest) => ({
        'First Name': guest.firstName,
        'Last Name': guest.lastName,
        'Email': guest.email,
        'Phone': guest.phone,
        'Actions': (
          <div style={{ display: 'flex', gap: '10px' }}>
            <FaRegEdit 
              style={{ cursor: 'pointer' }} 
              onClick={() => handleEdit(guest)}
            />
            <MdDelete 
              style={{ cursor: 'pointer', color: 'red' }} 
              onClick={() => handleDelete(guest)}
            />
          </div>
        )
      }))} />

      {selectedGuest && (
        <Modal show={selectedGuest !== null} onClose={() => setSelectedGuest(null)} title="Edit Guest">
          <EditGuestForm
            guest={selectedGuest} 
            onSave={handleSave} 
          />
        </Modal> 
      )}

      {guestToDelete && (
        <Modal show={true} onClose={() => setGuestToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this guest?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </StyledContent>
        </Modal>
      )}
    </div>
  );
};

export default GuestList;