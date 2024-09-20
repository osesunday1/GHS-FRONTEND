import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    maxGuests: 1,
    address: '',
    city: '',
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const uploadImage = async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "GHS_Cloudinary");
      data.append("cloud_name", "dvh9j4utq");
      data.append("folder", "apartments");

      const res = await fetch("https://api.cloudinary.com/v1_1/dvh9j4utq/image/upload", {
        method: 'POST',
        body: data
      });

      return res.json();
    };

    const uploadedImages = [];
    try {
      for (let i = 0; i < images.length; i++) {
        const uploadRes = await uploadImage(images[i]);
        uploadedImages.push({
          url: uploadRes.secure_url,
          public_id: uploadRes.public_id
        });
      }

      const apartmentData = {
        ...formData,
        images: uploadedImages.map(img => img.url)
      };

      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      
      const response = await axios.post(`${apiUrl}/v1/apartments`, apartmentData);
      console.log('Apartment created:', response.data);
      alert('Apartment created successfully');
    } catch (error) {
      console.error('Error creating apartment:', error);
      alert('Error creating apartment');

      for (let img of uploadedImages) {
        await axios.post(`https://api.cloudinary.com/v1_1/dvh9j4utq/delete_by_token`, {
          public_id: img.public_id
        });
      }
    } finally {
      setUploading(false);
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
            <option value="studio">Studio</option>
            <option value="penthouse">Penthouse</option>
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
        <FormField>
          <Label htmlFor="images">Images:</Label>
          <Input type="file" name="images" onChange={handleFileChange} multiple required />
        </FormField>
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Create Apartment'}
        </Button>
      </form>
    </FormContainer>
  );
};

export default ApartmentForm;