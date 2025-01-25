import { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import usePost from './CustomHooks/usePost';
import useFetch from './CustomHooks/useFetch';



const FormContainer = styled.div`
  max-width: 85%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: var(--white);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: vertical;
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

const BookingForm = () => {

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const { postData, loading, error } = usePost(`https://ghsapartment-8b6109df7c25.herokuapp.com/api/v1/bookings`);
  
  const { data: apartments} = useFetch(`${apiUrl}/v1/apartments`);

  


  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    checkInDate: '',
    checkOutDate: '',
    apartmentId: '',
    numberOfRooms: 1,
    price: 0,
    amountPaid: 0,
    cautionFee: 0,
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
      setFormData(initialFormData)
    }
  };

  return (
    <FormContainer>
      <ToastContainer />
      <FormTitle>Create a Booking</FormTitle>
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
          <FormField>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField fullWidth>
            <Label>Address</Label>
            <TextArea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </FormField>
          <FormField>
            <Label>Check-In Date</Label>
            <Input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Check-Out Date</Label>
            <Input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
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
            <Label>Price per Day</Label>
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
        </FormGrid>
        <Button type="submit">
          {loading ? 'Creating...': 'Create Booking'}
          
          </Button>
        {error && <Error>{error}</Error>}
      </form>
    </FormContainer>
  );
};

export default BookingForm;