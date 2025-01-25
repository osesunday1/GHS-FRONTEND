import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormField = styled.div`
  margin-bottom: 15px;
  grid-column: ${props => props.fullWidth ? 'span 2' : 'auto'};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const InventoryDropdown = ({ item, index, handleItemChange }) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL
  const [productItems, setProductItems] = useState([]); // State to hold product items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch all products
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiUrl}/v1/product`); // Fetch without filters
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to fetch products');
      }

      setProductItems(result.data); // Set fetched products
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) return <div>Loading products...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error state

  return (
    <FormField>
      <Label>Inventory Item</Label>
      <Select
        name="productItemId"
        value={item.productItemId}
        onChange={(e) => handleItemChange(index, e)}
        required
      >
        <option value="">Select an Item</option>
        {productItems.map((productItem) => (
          <option key={productItem._id} value={productItem._id}>
            {productItem.item} - #{productItem.price.toLocaleString()}
          </option>
        ))}
      </Select>
    </FormField>
  );
};

export default InventoryDropdown;