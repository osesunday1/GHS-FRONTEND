import { useState } from 'react';
import styled from 'styled-components';
import usePost from './CustomHooks/usePost';



// Styled components
const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Select = styled.select`
  width: 94%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;


const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;

const ApartmentForm = () => {
  const { postData, loading, error } = usePost(`https://ghsapartment-8b6109df7c25.herokuapp.com/api/v1/apartments`);

  const initialFormData = {
    name: '',
    type: '',
    description: '',
    maxGuests: 1,
    address: '',
    city: '',
  };


  const [formData, setFormData] = useState(initialFormData )
    


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
      <FormTitle>Create Apartment</FormTitle>
      <form style={{width:'100%'}}  onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="type">Type:</Label>
          <Select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select type</option>
            <option value="1-bed">1 Bed</option>
            <option value="2-bed">2 Bed</option>
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="description">Description:</Label>
          <TextArea name="description" value={formData.description} onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="maxGuests">Max Guests:</Label>
          <Input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required />
        </FormField>
        <Button type="submit" >
          {loading ? 'Creating...' : 'Create Apartment'}
          {error && <Error>{error}</Error>}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ApartmentForm;