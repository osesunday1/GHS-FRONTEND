import { useState } from 'react';
import Table from '../../styles/Table';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdReceipt } from "react-icons/md";
import Modal from '../../styles/Modal';
import useFetch from '../CustomHooks/useFetch';
import useDelete from '../CustomHooks/useDelete';
import useUpdate from '../CustomHooks/useUpdate'; // Make sure this is imported correctly
import styled from 'styled-components';
import EditConsumptionForm from './EditConsumptionForm';
import ConsumptionInvoice from './ConsumptionInvoice';

const ConsumptionList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data: consumptions, loading, error } = useFetch(`${apiUrl}/v1/consumption`);
  const { deleteData } = useDelete();
  const { updateData } = useUpdate(); // Add useUpdate hook
  const [selectedConsumption, setSelectedConsumption] = useState(null);
  const [consumptionToDelete, setConsumptionToDelete] = useState(null);
  const [invoiceConsumption, setInvoiceConsumption] = useState(null); // State to handle invoice view

  const handleEdit = (consumption) => {
    setSelectedConsumption(consumption);
  };

  const handleInvoice = (consumption) => {
    setInvoiceConsumption(consumption);
  };

  const handleDelete = (consumption) => {
    setConsumptionToDelete(consumption); 
  };

  const confirmDelete = async () => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    await deleteData(`${apiUrl}/v1/consumption/${consumptionToDelete._id}`);
    setConsumptionToDelete(null);
  };

  const handleSave = async (updatedConsumption) => {
    await updateData(`${apiUrl}/v1/consumption/${updatedConsumption._id}`, updatedConsumption);
    setSelectedConsumption(null); // Close the modal after saving
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const headers = [
    'Guest Name', 'Items', 'Total Amount', 'Date Consumed', 'Actions'
  ];

  const StyledContent = styled.div`
    margin: 0 auto;
    display: grid;
    justify-content: center;
    align-items: center;
  `;

  return (
    <div>
      <Table headers={headers} data={consumptions.map((consumption) => ({
        'Guest Name': consumption.guestId
          ? `${consumption.guestId.firstName} ${consumption.guestId.lastName}`
          : 'Unknown Guest',
        'Items': consumption.items.map(item => (
          <div key={item.inventoryItemId._id}>
            {item.inventoryItemId.item} - Qty: {item.quantity}, Amount: #{item.amount.toLocaleString()}
          </div>
        )),
        'Total Amount': `#${(consumption.totalAmount).toLocaleString()}`,
        'Date Consumed': new Date(consumption.createdAt).toLocaleDateString(),
        'Actions': (
          <div style={{ display: 'flex', gap: '10px' }}>
            <FaRegEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(consumption)} />
            <MdReceipt style={{ cursor: 'pointer', color: 'green' }} onClick={() => handleInvoice(consumption)} />
            <MdDelete style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(consumption)} />
          </div>
        )
      }))} />

      {selectedConsumption && (
        <Modal show={true} onClose={() => setSelectedConsumption(null)} title="Edit Consumption">
          <EditConsumptionForm consumption={selectedConsumption} onSave={handleSave} />
        </Modal> 
      )}

      {consumptionToDelete && (
        <Modal show={true} onClose={() => setConsumptionToDelete(null)} title="Confirm Deletion">
          <StyledContent>
            <p>Are you sure you want to delete this consumption record?</p>
            <button onClick={confirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </StyledContent>
        </Modal>
      )}

      {invoiceConsumption && (
        <Modal show={true} onClose={() => setInvoiceConsumption(null)} title="Invoice">
          <ConsumptionInvoice consumption={invoiceConsumption} />
        </Modal>
      )}
    </div>
  );
};

export default ConsumptionList;