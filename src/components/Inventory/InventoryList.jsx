import { useState } from 'react';
import Table from '../../styles/Table';
import useDelete from '../CustomHooks/useDelete';
import useFetch from '../CustomHooks/useFetch';
import useUpdate from '../CustomHooks/useUpdate';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Modal from '../../styles/Modal';
import EditInventoryForm from './EditInventoryForm';
import styled from 'styled-components';



const StyledContent = styled.div`
  display: grid;
  place-items: center;
  margin: 0 auto;

  p {
    font-size: 30px;
    color: red;
  }

  button {
    font-size: 20px;
    width: 100px;
    height: 50px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--blue);
    color: white;
  }
`;

const InventoryList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [trigger, setTrigger] = useState(0);
  const { data: inventory, loading, error } = useFetch(`${apiUrl}/v1/inventory`, trigger);
  
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  const [selectedInventory, setSelectedInventory] = useState(null); // State to track the selected guest
  const [inventoryToDelete, setInventoryToDelete] = useState(null); // State to track the guest to delete



  const handleEdit = (inventory) => {
    setSelectedInventory(inventory);
  };

  const handleDelete = (inventory) => {
    setInventoryToDelete(inventory);
  };

  const confirmDelete = async () => {
    if (!inventoryToDelete) return;

      await deleteData(`${apiUrl}/v1/inventory/${inventoryToDelete._id}`);
      setInventoryToDelete(null); // Close the modal after deletion
      setTrigger(trigger + 1);
  };

  const handleSave = async (updatedInventory) => {

      await updateData(`${apiUrl}/v1/inventory/${updatedInventory._id}`, updatedInventory);
      setSelectedInventory(null); // Reset the form after saving
      setTrigger(trigger + 1);
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = [
    'Product', 
    'Quantity', 
    'Price',
    'Actions'
  ];

  return ( 
    <div>
      <Table headers={headers} data={inventory.map((inventory) => ({
        'Product': `${inventory.item}`,
        'Quantity': inventory.quantity,
        'Price': inventory.price,
        'Actions': (
          <div style={{ display: 'flex', gap: '10px' }}>
            <FaRegEdit 
              style={{ cursor: 'pointer' }} 
              onClick={() => handleEdit(inventory)}
            />
            <MdDelete 
              style={{ cursor: 'pointer', color: 'red' }} 
              onClick={() => handleDelete(inventory)}
            />
          </div>
        )
      }))} />

      {selectedInventory && (
        <Modal show={selectedInventory !== null} onClose={() => setSelectedInventory(null)} title="Edit Inventory">
          <EditInventoryForm
            inventory={selectedInventory} 
            onSave={handleSave} 
          />
        </Modal> 
      )}

      {inventoryToDelete && (
        <Modal show={true} onClose={() => setInventoryToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this guest?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </StyledContent>
        </Modal>
      )}
    </div>
  );
};


export default InventoryList;