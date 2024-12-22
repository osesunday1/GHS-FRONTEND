import React, { useState, useEffect } from 'react';
import Table from '../../styles/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdReceipt } from "react-icons/md";
import Modal from '../../styles/Modal';
import useDelete from '../CustomHooks/useDelete';
import useUpdate from '../CustomHooks/useUpdate';
import styled from 'styled-components';
import EditConsumptionForm from './EditConsumptionForm';
import ConsumptionInvoice from './ConsumptionInvoice';
import SearchField from '../Elements/SearchField'; // Import the reusable SearchField component


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

const StyledSearchField = styled.div`
  margin: 20px auto;
  text-align: center;

  input {
    padding: 10px;
    font-size: 16px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid lightgray;
  }

  button {
    margin-left: 10px;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 5px;
    background-color: var(--blue);
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: darkblue;
  }
`;

const ConsumptionList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // State variables
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [consumptionData, setConsumptionData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  const [selectedConsumption, setSelectedConsumption] = useState(null);
  const [consumptionToDelete, setConsumptionToDelete] = useState(null);
  const [invoiceConsumption, setInvoiceConsumption] = useState(null);

  const fetchConsumptions = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${apiUrl}/v1/consumption?page=${currentPage}&limit=${itemsPerPage}&guestName=${encodeURIComponent(
        searchTerm
      )}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch consumption records');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch consumption records');
      }

      setConsumptionData(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsumptions();
  }, [currentPage, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput); // Update search term and refetch data
    setCurrentPage(1); // Reset to the first page
  };

  const handleEdit = (consumption) => {
    setSelectedConsumption(consumption);
  };

  const handleInvoice = (consumption) => {
    setInvoiceConsumption(consumption);
  };

  const handleDelete = (consumption) => {
    setConsumptionToDelete(consumption);
  };

  const confirmDelete = async () => {
    if (!consumptionToDelete) return;

    await deleteData(`${apiUrl}/v1/consumption/${consumptionToDelete._id}`);
    setConsumptionToDelete(null);
    fetchConsumptions(); // Refresh the list
  };

  const handleSave = async (updatedConsumption) => {
    await updateData(`${apiUrl}/v1/consumption/${updatedConsumption._id}`, updatedConsumption);
    setSelectedConsumption(null); // Close the modal after saving
    fetchConsumptions(); // Refresh the list
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ['Guest Name', 'Items', 'Total Amount', 'Actions'];

  return (
    <StyledTable>
      {/* Custom Search Field */}
      <SearchField
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />

      {/* Consumption Table */}
      <Table
        headers={headers}
        data={consumptionData.map((consumption) => ({
          'Guest Name': consumption.guestId
            ? `${consumption.guestId.firstName} ${consumption.guestId.lastName}`
            : 'Unknown Guest',
          'Total Amount': `#${consumption.totalAmount.toLocaleString()}`,
          'Date Consumed': new Date(consumption.createdAt).toLocaleDateString(),
          'Actions': (
            <div style={{ display: 'flex', gap: '10px' }}>
              <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(consumption)} />
              <MdReceipt style={{ cursor: 'pointer', color: 'green' }} onClick={() => handleInvoice(consumption)} />
              <MdDelete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(consumption)} />
            </div>
          ),
        }))}
      />

      {/* Pagination Controls */}
      <PaginationControls>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(-1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(1)}>
          Next
        </button>
      </PaginationControls>

      {/* Modals */}
      {selectedConsumption && (
        <Modal show={true} onClose={() => setSelectedConsumption(null)} title="Edit Consumption">
          <EditConsumptionForm consumption={selectedConsumption} onSave={handleSave} />
        </Modal>
      )}

      {consumptionToDelete && (
        <Modal show={true} onClose={() => setConsumptionToDelete(null)} title="Confirm Deletion">
          <div style={{ textAlign: 'center' }}>
            <p>Are you sure you want to delete this consumption record?</p>
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {invoiceConsumption && (
        <Modal show={true} onClose={() => setInvoiceConsumption(null)} title="Invoice">
          <ConsumptionInvoice consumption={invoiceConsumption} />
        </Modal>
      )}
    </StyledTable>
  );
};

export default ConsumptionList;