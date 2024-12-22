import React, { useState, useEffect } from 'react';
import SearchField from '../Elements/SearchField'; // Import the reusable component
import Table from '../../styles/Table';
import useDelete from '../CustomHooks/useDelete';
import useUpdate from '../CustomHooks/useUpdate';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Modal from '../../styles/Modal';
import EditInventoryForm from './EditInventoryForm';
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

const TopFilter = styled.div`
display: flex;
justify-content: center;
margin: 20px;
gap: 20px;
`

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

const InventoryList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchInput, setSearchInput] = useState(''); // Search input state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(15); // Number of items per page
  const [inventoryData, setInventoryData] = useState([]); // Data state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  const [selectedInventory, setSelectedInventory] = useState(null); // State to track the selected inventory
  const [inventoryToDelete, setInventoryToDelete] = useState(null); // State to track the inventory to delete

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${apiUrl}/v1/inventory?page=${currentPage}&limit=${itemsPerPage}&item=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch inventory');
      }

      setInventoryData(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [currentPage, searchTerm, selectedCategory]); // Refetch when page, search term, or category changes

  const handleEdit = (inventory) => {
    setSelectedInventory(inventory);
  };

  const handleDelete = (inventory) => {
    setInventoryToDelete(inventory);
  };

  const confirmDelete = async () => {
    if (!inventoryToDelete) return;

    await deleteData(`${apiUrl}/v1/inventory/${inventoryToDelete._id}`);
    setInventoryToDelete(null);
    fetchInventory();
  };

  const handleSave = async (updatedInventory) => {
    await updateData(`${apiUrl}/v1/inventory/${updatedInventory._id}`, updatedInventory);
    setSelectedInventory(null);
    fetchInventory();
  };

  const handleSearch = () => {
    setSearchTerm(searchInput); // Trigger search with the input value
    setCurrentPage(1); // Reset to the first page
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ['Product', 'Category', 'Quantity', 'Price', 'Actions'];

  return (
    <div>
      {/* Search Field */}
      <TopFilter>
      <SearchField
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />

      {/* Category Dropdown */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to the first page
          }}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid lightgray',
          }}
        >
          <option value="">All Categories</option>
          <option value="Perishable">Perishable</option>
          <option value="Shelf-Stable">Shelf-Stable</option>
        </select>
      </div>
      </TopFilter>

      {/* Inventory Table */}
      <Table
        headers={headers}
        data={inventoryData.map((inventory) => ({
          Product: inventory.item,
          Category: inventory.category,
          Quantity: inventory.quantity,
          Price: inventory.price,
          Actions: (
            <div style={{ display: 'flex', gap: '10px' }}>
              <FaRegEdit
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(inventory)}
              />
              <MdDelete
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => handleDelete(inventory)}
              />
            </div>
          ),
        }))}
      />

      {/* Pagination Controls */}
      <PaginationControls>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(-1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(1)}
        >
          Next
        </button>
      </PaginationControls>

      {/* Modals */}
      {selectedInventory && (
        <Modal
          show={selectedInventory !== null}
          onClose={() => setSelectedInventory(null)}
          title="Edit Inventory"
        >
          <EditInventoryForm
            inventory={selectedInventory}
            onSave={handleSave}
          />
        </Modal>
      )}

      {inventoryToDelete && (
        <Modal
          show={true}
          onClose={() => setInventoryToDelete(null)}
          title="Confirm Deletion"
        >
          <StyledContent>
            <p>Are you sure you want to delete this inventory?</p>
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </button>
          </StyledContent>
        </Modal>
      )}
    </div>
  );
};

export default InventoryList;