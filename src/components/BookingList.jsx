import React, { useState } from 'react';
import SearchField from '../components/Elements/SearchField';
import Table from '../styles/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
  };

  const handleDelete = (booking) => {
    setBookingToDelete(booking);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;

    await deleteData(`${apiUrl}/v1/bookings/${bookingToDelete._id}`);
    setBookingToDelete(null);
    setCurrentPage(1); // Reset to the first page after deletion
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
        headers={['Guest Name', 'Check-In Date', 'Check-Out Date', 'Actions']}
        data={bookingsData.map((booking) => ({
          'Guest Name': `${booking.guest.firstName} ${booking.guest.lastName}`,
          'Check-In Date': new Date(booking.checkInDate).toLocaleDateString(),
          'Check-Out Date': new Date(booking.checkOutDate).toLocaleDateString(),
          'Actions': (
            <div>
              <button>Edit</button>
              <button>Delete</button>
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
            <p>Are you sure you want to delete this booking?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>
              Delete
            </button>
          </StyledContent>
        </Modal>
      )}
    </StyledTable>
  );
};

export default BookingsList;