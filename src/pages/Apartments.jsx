import { useState } from "react";
import Modal from "../styles/Modal";
import ApartmentList from "../components/ApartmentList";
import styled from "styled-components";
import { MdAddBox } from "react-icons/md";

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


const Apartments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>

        
    

    <StyledHeadings>
        <StyledH4>All Apartments</StyledH4>
        <StyledH4><MdAddBox  onClick={openModal}/></StyledH4>
      </StyledHeadings>
      <ApartmentList/>

        
      <Modal show={isModalOpen} onClose={closeModal}>
      
      </Modal>
    </>
  );
}

export default Apartments;