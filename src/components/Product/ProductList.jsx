import React, { useState, useEffect } from 'react';
import SearchField from '../Elements/SearchField'; // Import the reusable component
import Table from '../../styles/Table';
import useDelete from '../CustomHooks/useDelete';
import useUpdate from '../CustomHooks/useUpdate';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Modal from '../../styles/Modal';
import EditProductForm from './EditProductForm';
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

const ProductList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchInput, setSearchInput] = useState(''); // Search input state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(15); // Number of items per page
  const [productData, setProductData] = useState([]); // Data state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product
  const [productToDelete, setProductToDelete] = useState(null); // State to track the product to delete

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${apiUrl}/v1/product?page=${currentPage}&limit=${itemsPerPage}&item=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch product');
      }

      setProductData(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [currentPage, searchTerm, selectedCategory]); // Refetch when page, search term, or category changes

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    await deleteData(`${apiUrl}/v1/product/${productToDelete._id}`);
    setProductToDelete(null);
    fetchProduct();
  };

  const handleSave = async (updatedProduct) => {
    await updateData(`${apiUrl}/v1/product/${updatedProduct._id}`, updatedProduct);
    setSelectedProduct(null);
    fetchProduct();
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

      {/* product Table */}
      <Table
        headers={headers}
        data={productData.map((product) => ({
          Product: product.item,
          Category: product.category,
          Quantity: product.quantity,
          Price: product.price,
          Actions: (
            <div style={{ display: 'flex', gap: '10px' }}>
              <FaRegEdit
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(product)}
              />
              <MdDelete
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => handleDelete(product)}
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
      {selectedProduct && (
        <Modal
          show={selectedProduct !== null}
          onClose={() => setSelectedProduct(null)}
          title="Edit product"
        >
          <EditProductForm
            product={selectedProduct}
            onSave={handleSave}
          />
        </Modal>
      )}

      {productToDelete && (
        <Modal
          show={true}
          onClose={() => setProductToDelete(null)}
          title="Confirm Deletion"
        >
          <StyledContent>
            <p>Are you sure you want to delete this product?</p>
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

export default ProductList;