import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FormContainer = styled.div`
  max-width: 85%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: var(--white);
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const EditExpensesForm = ({ expense, onSave }) => {
  const [formData, setFormData] = useState({
    description: expense?.description || '',
    amount: expense?.amount || '',
    category: expense?.category || '',
    date: expense?.date ? expense.date.split('T')[0] : '', // Format date for input type="date"
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form fields
    if (!formData.description || !formData.amount || !formData.category || !formData.date) {
      setError('All fields are required');
      return;
    }

    try {
      const updatedExpense = {
        ...expense,
        description: formData.description,
        amount: parseFloat(formData.amount), // Ensure amount is a number
        category: formData.category,
        date: formData.date,
      };

      await onSave(updatedExpense); // Call the onSave function passed from parent
      toast.success('Expense updated successfully!');
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Failed to update expense. Please try again.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter expense description"
            required
          />
        </FormField>
        <FormField>
          <Label>Amount</Label>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            required
          />
        </FormField>
        <FormField>
          <Label>Category</Label>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Utilities">Utilities</option>
            <option value="Subscription">Subscription</option>
            <option value="Salaries">Salaries</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </Select>
        </FormField>
        <FormField>
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormField>
        <Button type="submit">Save Changes</Button>
        {error && <Error>{error}</Error>}
      </form>
    </FormContainer>
  );
};

export default EditExpensesForm;