import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePost from '../CustomHooks/usePost';



const FormContainer = styled.div`
  max-width: 85%;
  margin: 0 auto;
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

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const ConsumptionForm = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const { postData, loading, error } = usePost(`${apiUrl}/v1/bookings`);


  const initialFormData = {
    guestId: '',
    items: [{ inventoryItemId: '', quantity: 1 }],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [guests, setGuests] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [error2, setError2] = useState(null);
  useEffect(() => {
    const fetchGuestsAndInventory = async () => {
      try {
        const guestsResponse = await axios.get(`${apiUrl}/v1/guests`);
        setGuests(guestsResponse.data.data);
        
        const inventoryResponse = await axios.get(`${apiUrl}/v1/inventory`);
        setInventoryItems(inventoryResponse.data.data);

      } catch (err) {
        toast.error(error2)
        setError2('Failed to load guests or inventory items. Please try again.');
      }
    };
    fetchGuestsAndInventory();
  }, []);

  const handleItemChange = (index, e) => {
    const updatedItems = [...formData.items];
    updatedItems[index][e.target.name] = e.target.value;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { inventoryItemId: '', quantity: 1 }]
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

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
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormField fullWidth>
            <Label>Guest</Label>
            <Select
              name="guestId"
              value={formData.guestId}
              onChange={handleChange}
              required
            >
              <option value="">Select a Guest</option>
              {guests.map(guest => (
                <option key={guest._id} value={guest._id}>
                  {guest.firstName} {guest.lastName}
                </option>
              ))}
            </Select>
          </FormField>

          {formData.items.map((item, index) => (
            <div key={index}>
              <FormField>
                <Label>Inventory Item</Label>
                <Select
                  name="inventoryItemId"
                  value={item.inventoryItemId}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                >
                  <option value="">Select an Item</option>
                  {inventoryItems.map(inventoryItem => (
                    <option key={inventoryItem._id} value={inventoryItem._id}>
                      {inventoryItem.item} - #{inventoryItem.price.toLocaleString()}
                    </option>
                  ))}
                </Select>
              </FormField>
              <FormField>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  min="1"
                  required
                />
              </FormField>
              {formData.items.length > 1 && (
                <Button type="button" onClick={() => handleRemoveItem(index)}>
                  Remove Item
                </Button>
              )}
            </div>
          ))}

          <FormField fullWidth>
            <Button type="button" onClick={handleAddItem}>
              Add Another Item
            </Button>
          </FormField>
        </FormGrid>
        <Button type="submit">{loading ? 'Adding...': 'Add Consumption'}</Button>
        {error && <Error>{error}</Error>}
      </form>
    </FormContainer>
  );
};

export default ConsumptionForm;