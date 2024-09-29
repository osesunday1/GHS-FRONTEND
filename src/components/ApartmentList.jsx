import { useState} from 'react';
import useFetch from './CustomHooks/useFetch';
import Table from '../styles/Table';
import useDelete from './CustomHooks/useDelete';
import { MdDelete } from "react-icons/md";
import Modal from '../styles/Modal';
import styled from 'styled-components';

const ApartmentList = () => {

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [trigger, setTrigger] = useState(0);
  const { data: apartments, loading, error } = useFetch(`${apiUrl}/v1/apartments`, trigger);
  const { deleteData } = useDelete();
  const [apartmentToDelete, setApartmentToDelete] = useState(null);
  

  
  const handleDelete = (apt) => {
    setApartmentToDelete(apt); 
    
  };

  const confirmDelete = async () => {
    if (!apartmentToDelete) return; // Make sure there's an apartment selected for deletion
  
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      await deleteData(`${apiUrl}/v1/apartments/${apartmentToDelete._id}`); 
      setApartmentToDelete(null); // Clear after delete
      setTrigger(trigger + 1);
  
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = ['Apartment Name', 'Type', 'Description', 'Max Guests'];
  const data = apartments.map(apartment => ({
    'Apartment Name': apartment.name,
    'Type': apartment.type,
    'Description': apartment.description,
    'Max Guests': apartment.maxGuests,
    'Actions': (
      <div style={{ display: 'flex', gap: '10px' }}>
            <MdDelete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(apartment)} />
          </div>
    )
  }));

  const StyledContent =styled.div`
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
`
  
  return (
    <div>
      
      <Table headers={headers} data={data} />

      {apartmentToDelete && (
        <Modal show={true} onClose={() => setApartmentToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this booking?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </StyledContent>
        </Modal>
      )}
    </div>

    
  );
};

export default ApartmentList;