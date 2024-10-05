import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const Container = styled.section`
  background-color: var(--white);
  background-size: 70px 70px;
  width: 100vw;
  padding: 60px 0;

  @media (max-width: 768px) {
    padding: 0px 0;
    height: 100%;
    margin-top: 10%;
    background-color: var(--blue4); 
  }
  
`;

const Container2 = styled.section`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  justify-content: center;
  justify-items: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;

  }
`;

const Tops = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  font-size: 26px;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 5%;
    color: var(--white);
    margin-bottom: 10px;
  }
`;

const StyledParagraph = styled.p`
    font-family: 'Roboto', sans-serif;
    font-weight: 400; /* Normal font weight for paragraphs */
    line-height: 1.6; /* Optional: Set a line-height for better readability */
    margin: 0 0 20px 0; /* Optional: Set a default margin for paragraphs */
    text-align: center; /* Center-align the text */
    margin-top: 7px;
    
    @media (max-width: 768px) {
    color: var(--white)
  }
`


// Styled components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom:5%;
  border: 1px solid var(--blue);
  background-color: var(--white); 

  
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Form = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    checkInDate: '',
    checkOutDate: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);  // For loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${apiUrl}/v1/email/send`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      toast.success('Success! We will get back to you shortly via WhatsApp.');
      setFormData(initialFormData);  // Reset form
    } catch (error) {
      toast.error(`There was an error sending the email: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>

    <Tops>Contact Us</Tops>

    <Container2>
    <StyledParagraph>
      You can also contact our 24hrs customer care <i>Whatsapp</i>  line on <strong>08090392222</strong> 
    </StyledParagraph>

    <StyledForm onSubmit={handleSubmit}>
      <ToastContainer />
      <FormGroup>
        <Label htmlFor="firstName">First Name:</Label>
        <Input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="lastName">Last Name:</Label>
        <Input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="email">Email:</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="number">Whatsapp Number:</Label>
        <Input
          id="number"
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="checkInDate">Check-In Date:</Label>
        <Input
          id="checkInDate"
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="checkOutDate">Check-Out Date:</Label>
        <Input
          id="checkOutDate"
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reservation Request'}
      </Button>
    </StyledForm>
    </Container2>
    </Container>
  );
};

export default Form;