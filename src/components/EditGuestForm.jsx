import { useState } from 'react';
import styled from 'styled-components';

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

const EditGuestForm = ({ guest, onSave }) => {
  const [formData, setFormData] = useState({ ...guest });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormField>
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField fullWidth>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField fullWidth>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormField>
        </FormGrid>
        <Button type="submit">Save</Button>
      </form>
    </FormContainer>
  );
};

export default EditGuestForm;