import { useState } from 'react';
import Table from '../styles/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from '../styles/Modal';
import EditBookingForm from './EditBookingForm';

import useFetch from '../components/CustomHooks/useFetch';
import useUpdate from '../components/CustomHooks/useUpdate';
import useDelete from '../components/CustomHooks/useDelete';
import styled from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const BookingsList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [trigger, setTrigger] = useState(0);
  const { data: bookings, loading, error } = useFetch(`${apiUrl}/v1/bookings`, trigger);
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
  };

  const handleDelete = (booking) => {
    setBookingToDelete(booking); 
    
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return; // Make sure there's a booking selected for deletion
  
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      await deleteData(`${apiUrl}/v1/bookings/${bookingToDelete._id}`); 
      setBookingToDelete(null); // Clear after delete
      setTrigger(trigger + 1);
  
  };


  const handleSave = async (updatedBooking) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    
    await updateData(`${apiUrl}/v1/bookings/${updatedBooking._id}`, updatedBooking);
    setSelectedBooking(null);
    setTrigger(trigger + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = [
    'Guest Name', 'Check-In Date', 'Check-Out Date', 'Days',
    'Apartment', 'Rooms', 'Price', 'Total Amount', 
    'Amount Paid', 'Caution Fee', 'Balance Due', 'Actions'
  ];

  const StyledTable =styled.div`
    margin: 0 auto;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

    }
`
  const StyledContent =styled.div`
    margin: 0 auto;
    display: grid;
    justify-content: center;
    align-items: center;

 
`
  return (
    <StyledTable>
    <ToastContainer />
      <Table headers={headers} data={bookings.map((booking) => ({
        'Guest Name': `${booking.guest.firstName} ${booking.guest.lastName}`,
        'Check-In Date': new Date(booking.checkInDate).toLocaleDateString(),
        'Check-Out Date': new Date(booking.checkOutDate).toLocaleDateString(),
        'Days': booking.numberOfDays,
        'Apartment': booking.apartmentName,
        'Rooms': booking.numberOfRooms,
        'Price': `#${booking.price.toLocaleString()}`,
        'Total Amount': `#${(booking.totalAmount).toLocaleString()}`,
        'Amount Paid': `#${(booking.amountPaid).toLocaleString()}`,
        'Caution Fee': `#${(booking.cautionFee).toLocaleString()}`,
        'Balance Due': `#${(booking.amountLeftToPay).toLocaleString()}`,
        'Actions': (
          <div style={{ display: 'flex', gap: '10px' }}>
            <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(booking)} />
            <MdDelete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(booking)} />
          </div>
        )
      }))} />

      {selectedBooking && (
        <Modal show={true} onClose={() => setSelectedBooking(null)} title="Edit Booking">
          <EditBookingForm booking={selectedBooking} onSave={handleSave} />
        </Modal> 
      )}

      {bookingToDelete && (
        <Modal show={true} onClose={() => setBookingToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this booking?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </StyledContent>
        </Modal>
      )}
    </StyledTable>
  );
};

export default BookingsList;