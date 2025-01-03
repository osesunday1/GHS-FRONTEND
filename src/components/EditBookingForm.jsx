import { useState } from 'react';
import styled from 'styled-components';
import useFetch from './CustomHooks/useFetch';


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

const EditBookingForm = ({ booking, onSave}) => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({ ...booking });
  const { data: apartments} = useFetch(`${apiUrl}/v1/apartments`);

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
              value={formData.guest.firstName}
              onChange={handleChange}
              required
              disabled={true}
            />
          </FormField>
          <FormField>
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.guest.lastName}
              onChange={handleChange}
              required
              disabled={true}
            />
          </FormField>
          <FormField>
            <Label>Check-In Date</Label>
            <Input
              type="date"
              name="checkInDate"
              value={formData.checkInDate.split('T')[0]}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Check-Out Date</Label>
            <Input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate.split('T')[0]}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Number of Rooms</Label>
            <Input
              type="number"
              name="numberOfRooms"
              value={formData.numberOfRooms}
              onChange={handleChange}
              min="1"
              required
            />
          </FormField>
          <FormField>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </FormField>
          <FormField>
            <Label>Amount Paid</Label>
            <Input
              type="number"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleChange}
              min="0"
              required
            />
          </FormField>
          <FormField>
            <Label>Caution Fee</Label>
            <Input
              type="number"
              name="cautionFee"
              value={formData.cautionFee}
              onChange={handleChange}
              min="0"
              required
            />
          </FormField>
          <FormField fullWidth>
            <Label>Apartment</Label>
            <Select
              name="apartmentId"
              value={formData.apartmentId}
              onChange={handleChange}
              required
            >
              <option value="">Select an Apartment</option>
              {apartments.map(apartment => (
                <option key={apartment._id} value={apartment._id}>
                  {apartment.name}
                </option>
              ))}
            </Select>
          </FormField>
        </FormGrid>
        <Button type="submit">Save</Button>
      </form>
    </FormContainer>
  );
};

export default EditBookingForm;