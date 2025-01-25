import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  grid-column: ${(props) => (props.fullWidth ? 'span 2' : 'auto')};
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

const EditConsumptionForm = ({ consumption, onSave }) => {
  const [formData, setFormData] = useState({
    ...consumption,
    items: consumption.items.map((item) => ({
      ...item,
      inventoryItemId: item.inventoryItemId._id || item.inventoryItemId, // Ensure only the ID is stored
    })),
  });
  const [inventoryItems, setInventoryItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        const inventoryResponse = await axios.get(`${apiUrl}/v1/inventory`);
        setInventoryItems(inventoryResponse.data.data);
      } catch (err) {
        console.error('Error fetching inventory items:', err);
        setError('Failed to load inventory items. Please try again.');
      }
    };
    fetchInventoryItems();
  }, []); 

  const handleItemChange = (index, e) => {
    const updatedItems = [...formData.items];
    if (e.target.name === 'inventoryItemId') {
      updatedItems[index] = {
        ...updatedItems[index],
        inventoryItemId: e.target.value, // Store only the ID of the selected item
      };
    } else if (e.target.name === 'quantity') {
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Number(e.target.value), // Ensure quantity is a number
      };
    }
    setFormData({ ...formData, items: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { inventoryItemId: '', quantity: 1 }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await onSave(formData); // Await updated data from parent’s onSave function
      setFormData({
        ...updatedData, // Update formData with new data
        items: updatedData.items.map((item) => ({
          ...item,
          inventoryItemId: item.inventoryItemId._id || item.inventoryItemId,
        })),
      });
      toast.success('Changes saved successfully');
      setError(null); // Clear any existing error
    } catch (err) {
      console.error('Error saving changes:', err);
      setError('Failed to save changes. Please try again.');
      toast.error('Failed to save changes. Please try again.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormField>
            <Label>Guest Name</Label>
            <Input
              name="guestId"
              value={formData.guestId.firstName}
              disabled
            />
          </FormField>
          <FormField>
            <Label>Last Name</Label>
            <Input
              name="guestId"
              value={formData.guestId.lastName}
              disabled
            />
          </FormField>

          {formData.items.map((item, index) => (
            <div key={index}>
              <FormField fullWidth>
                <Label>Inventory Item</Label>
                <Select
                  name="inventoryItemId"
                  value={item.inventoryItemId}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                >
                  <option value="">Select an item</option>
                  {inventoryItems.map((inventoryItem) => (
                    <option key={inventoryItem._id} value={inventoryItem._id}>
                      {`${inventoryItem.item} - #${inventoryItem.price}`}
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
                <Button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  style={{ marginTop: '15px', backgroundColor: 'red' }}
                >
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
        <Button type="submit">Save Changes</Button>
        {error && <Error>{error}</Error>}
      </form>
    </FormContainer>
  );
};

export default EditConsumptionForm;