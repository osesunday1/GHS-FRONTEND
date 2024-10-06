import { useState } from 'react';
import Table from '../styles/Table';
import useDelete from './CustomHooks/useDelete';
import useFetch from './CustomHooks/useFetch';
import useUpdate from './CustomHooks/useUpdate';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Modal from '../styles/Modal';
import EditGuestForm from './EditGuestForm'; // Assume this component exists for editing guests
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

const GuestList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [trigger, setTrigger] = useState(0);
  const { data: guests, loading, error } = useFetch(`${apiUrl}/v1/guests`, trigger);
  
  const { updateData } = useUpdate();
  const { deleteData } = useDelete();

  const [selectedGuest, setSelectedGuest] = useState(null); // State to track the selected guest
  const [guestToDelete, setGuestToDelete] = useState(null); // State to track the guest to delete



  const handleEdit = (guest) => {
    setSelectedGuest(guest);
  };

  const handleDelete = (guest) => {
    setGuestToDelete(guest);
  };

  const confirmDelete = async () => {
    if (!guestToDelete) return;

      await deleteData(`${apiUrl}/v1/guests/${guestToDelete._id}`);
      setGuestToDelete(null); // Close the modal after deletion
      setTrigger(trigger + 1);
  };

  const handleSave = async (updatedGuest) => {

      await updateData(`${apiUrl}/v1/guests/${updatedGuest._id}`, updatedGuest);
      setSelectedGuest(null); // Reset the form after saving
      setTrigger(trigger + 1);
  }


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = [
    'First Name', 
    'Last Name', 
    'Email', 
    'Phone', 
    'Actions'
  ];

  return ( 
    <div>
      <Table headers={headers} data={guests.map((guest) => ({
        'Name': `${guest.firstName} ${guest.lastName}`,
        'Email': guest.email,
        'Phone': guest.phone,
        'Actions': (
          <div style={{ display: 'flex', gap: '10px' }}>
            <FaRegEdit 
              style={{ cursor: 'pointer' }} 
              onClick={() => handleEdit(guest)}
            />
            <MdDelete 
              style={{ cursor: 'pointer', color: 'red' }} 
              onClick={() => handleDelete(guest)}
            />
          </div>
        )
      }))} />

      {selectedGuest && (
        <Modal show={selectedGuest !== null} onClose={() => setSelectedGuest(null)} title="Edit Guest">
          <EditGuestForm
            guest={selectedGuest} 
            onSave={handleSave} 
          />
        </Modal> 
      )}

      {guestToDelete && (
        <Modal show={true} onClose={() => setGuestToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this guest?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </StyledContent>
        </Modal>
      )}
    </div>
  );
};


export default GuestList;