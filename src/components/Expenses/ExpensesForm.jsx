import { useState } from 'react';
import styled from 'styled-components';
import usePost from '../CustomHooks/usePost';

const FormContainer = styled.div`
  max-width: 85%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: var(--white);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  grid-column: ${props => props.fullWidth ? 'span 2' : 'auto'};
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

const Error = styled.div`
  color: red;
  margin-top: 10px;
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

const ExpensesForm = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const { postData, loading, error } = usePost(`${apiUrl}/v1/expenses`);

  const initialFormData = {
    description: '',
    amount: 0,
    category: 'Maintenance', // Default value
    date: '', // Empty date initially
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await postData(formData);
    if (result) {
      // Success handling
      setFormData(initialFormData);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormField fullWidth>
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
              <option value="Utilities">Utilities</option>
              <option value="Maintenance">Maintenance</option>
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
        </FormGrid>
        <Button type="submit">{loading ? 'Adding...' : 'Add Expense'}</Button>
        {error && <Error>{error}</Error>}
      </form>
    </FormContainer>
  );
};

export default ExpensesForm;