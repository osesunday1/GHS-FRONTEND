import InventoryList from "../components/Inventory/InventoryList";
import styled from "styled-components";
import { useState } from "react";
import Modal from "../styles/Modal";
import { MdAddBox } from "react-icons/md";
import { useNavigate  } from "react-router-dom";


const StyledHeadings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end; 
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  border-bottom: 2px solid var(--blue); /* Add bottom border */
  padding-bottom: 0px; /* Adjust padding as needed */
`;

const StyledH4 = styled.h4`
  padding: 0;
  margin-bottom: 0;
  font-size: 30px;
  color: var(--blue);
  cursor: pointer;
`;


const Inventory = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/addInventory');
  };
  const closeModal = () => setIsModalOpen(false);
  

  return (
    <>
     <StyledHeadings>
        <StyledH4>PRODUCTS</StyledH4>
        <StyledH4><MdAddBox onClick={handleAddClick}/></StyledH4>
      </StyledHeadings>
    <InventoryList/>

    <Modal show={isModalOpen} onClose={closeModal}>
      
      </Modal>
    </>
  );
}

export default Inventory;