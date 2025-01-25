import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../../styles/Table';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Modal from '../../styles/Modal';
import useDelete from '../CustomHooks/useDelete';
import useUpdate from '../CustomHooks/useUpdate';
import EditExpensesForm from './EditExpensesForm'; // Create/Edit Expense Form
import SearchField from '../Elements/SearchField'; // Reusable Search Component

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

const ExpensesList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // State variables
  const [expenses, setExpenses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  // Fetch Expenses
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${apiUrl}/v1/expenses?page=${currentPage}&limit=10&category=${encodeURIComponent(
        searchTerm
      )}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch expenses');
      }

      setExpenses(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentPage, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput); // Update search term and refetch data
    setCurrentPage(1); // Reset to the first page
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
  };

  const handleDelete = (expense) => {
    setExpenseToDelete(expense);
  };

  const confirmDelete = async () => {
    if (!expenseToDelete) return;

    await deleteData(`${apiUrl}/v1/expenses/${expenseToDelete._id}`);
    setExpenseToDelete(null);
    fetchExpenses(); // Refresh the list
  };

  const handleSave = async (updatedExpense) => {
    await updateData(`${apiUrl}/v1/expenses/${updatedExpense._id}`, updatedExpense);
    setSelectedExpense(null); // Close the modal
    fetchExpenses(); // Refresh the list
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ['Description', 'Amount', 'Category', 'Date', 'Actions'];

  return (
    <StyledTable>
      {/* Search Field */}
      <SearchField
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
      />

      {/* Expenses Table */}
      <Table
        headers={headers}
        data={expenses.map((expense) => ({
          Description: expense.description,
          Amount: `#${expense.amount.toLocaleString()}`,
          Category: expense.category,
          Date: new Date(expense.date).toLocaleDateString(),
          Actions: (
            <div style={{ display: 'flex', gap: '10px' }}>
              <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(expense)} />
              <MdDelete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(expense)} />
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

      {/* Edit Modal */}
      {selectedExpense && (
        <Modal show={selectedExpense !== null} 
        onClose={() => setSelectedExpense(null)} 
        title="Edit Expense">
          <EditExpensesForm expense={selectedExpense} onSave={handleSave} />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {expenseToDelete && (
        <Modal show={true} onClose={() => setExpenseToDelete(null)} title="Confirm Deletion">
          <div style={{ textAlign: 'center' }}>
            <p>Are you sure you want to delete this expense record?</p>
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px' }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </StyledTable>
  );
};

export default ExpensesList;