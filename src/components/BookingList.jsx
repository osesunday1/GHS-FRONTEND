import React, { useState } from 'react';
import SearchField from '../components/Elements/SearchField';
import Table from '../styles/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Modal from '../styles/Modal';
import EditBookingForm from './EditBookingForm';

import useFetch from './CustomHooks/useFetch'; // Keep `useFetch` untouched
import useUpdate from '../components/CustomHooks/useUpdate';
import useDelete from '../components/CustomHooks/useDelete';
import styled from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;

  button {
    margin: 0 5px;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;

const StyledTable = styled.div`
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
`;

const StyledContent = styled.div`
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
`;

const DetailsModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;


  p {
    font-size: 16px;
  }
`;

const BookingsList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Construct URL with pagination and search parameters
  const url = `${apiUrl}/v1/bookings?page=${currentPage}&limit=${itemsPerPage}&guestName=${encodeURIComponent(searchTerm)}`;

  const { data: bookingsData, loading, error } = useFetch(url, `${currentPage}-${searchTerm}`);
  

  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [viewBooking, setViewBooking] = useState(null);

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
  };

  const handleView = (booking) => {
    setViewBooking(booking);
  };



  const handleDelete = (booking) => {
    setBookingToDelete(booking);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;

    await deleteData(`${apiUrl}/v1/bookings/${bookingToDelete._id}`);
    setBookingToDelete(null);
    setCurrentPage(1); // Refresh or reset pagination
  };

  const handleSave = async (updatedBooking) => {
    await updateData(`${apiUrl}/v1/bookings/${updatedBooking._id}`, updatedBooking);
    setSelectedBooking(null);
    setCurrentPage(1); // Reset to the first page after editing
  };

  const handleSearch = () => {
    if (searchTerm !== searchInput) {
      setSearchTerm(searchInput);
      setCurrentPage(1); // Reset to the first page
    }
  };

  const handlePageChange = (direction) => {
    // Debounce pagination updates
    setTimeout(() => {
      setCurrentPage((prevPage) => Math.max(1, prevPage + direction));
    }, 300);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const totalPages = Math.ceil(bookingsData.length / itemsPerPage);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate); // Parse the ISO date
    const year = date.getUTCFullYear(); // Get year in UTC
    const month = date.toLocaleString('default', { month: 'short', timeZone: 'UTC' }); // Month as short string
    const day = String(date.getUTCDate()).padStart(2, '0'); // Day of the month in UTC
  
    return `${day} ${month} ${year}`; // Format as "DD MMM YYYY"
  };

  return (
    <StyledTable>
      <ToastContainer />

      {/* Search Field */}
      <SearchField
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />

      {/* Bookings Table */}
      <Table
        headers={['Guest Name', 'Check-In Date', 'Check-Out Date','Days', 'Actions']}
        data={bookingsData.map((booking) => ({
          'Guest Name': `${booking.guest.firstName} ${booking.guest.lastName}`,
          'Check-In Date': formatDate(booking.checkInDate),
          'Check-Out Date': formatDate(booking.checkOutDate),
          'Days':booking.numberOfDays,
          'Actions': (
            <div>
              <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(booking)} />
              <MdDelete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(booking)} />
              <FaEye style={{ cursor: 'pointer' }} onClick={() => handleView(booking)}  /> 
   

            </div>
          ),
        }))}
      />

      {/* Pagination Controls */}
      <PaginationControls>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(-1)}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={bookingsData.length < itemsPerPage} onClick={() => handlePageChange(1)}>
          Next
        </button>
      </PaginationControls>

      {/* Edit Modal */}
      {selectedBooking && (
        <Modal show={true} onClose={() => setSelectedBooking(null)} title="Edit Booking">
          <EditBookingForm booking={selectedBooking} onSave={handleSave} />
        </Modal>
      )}

      {/* Delete Modal */}
      {bookingToDelete && (
        <Modal show={true} onClose={() => setBookingToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this booking for{bookingToDelete.guest.firstName} {bookingToDelete.guest.lastName}?</p>
            <button onClick={confirmDelete}style={{ backgroundColor: 'red', color: 'white' }}>
              Delete
            </button>
          </StyledContent>
        </Modal>
      )}

       {/* Details Modal */}
       {viewBooking && (
        <Modal show={true} onClose={() => setViewBooking(null)} title="Booking Details">
          <DetailsModalContent>
            <p><strong>Guest Name:</strong> {`${viewBooking.guest.firstName} ${viewBooking.guest.lastName}`}</p>
            <p><strong>Check-In Date:</strong> {formatDate(viewBooking.checkInDate)}</p>
            <p><strong>Check-Out Date:</strong> {formatDate(viewBooking.checkOutDate)}</p>
            <p><strong>Total Days:</strong> {viewBooking.numberOfDays}</p>
            <p><strong>Total Amount:</strong> #{viewBooking.totalAmount}</p>
            <p><strong>Amount Paid:</strong> #{viewBooking.amountPaid}</p>
            <p><strong>Balance:</strong> #{viewBooking.amountLeftToPay}</p>
            <p><strong>Number of Rooms:</strong> {viewBooking.numberOfRooms}</p>
            <p><strong>Apartment Name:</strong> {viewBooking.apartmentName}</p>
          </DetailsModalContent>
        </Modal>
      )}
    </StyledTable>
  );
};

export default BookingsList;