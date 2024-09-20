import BookingForm from "../components/BookingForm";
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
`
const StyledH4 = styled.h4`
  padding: 0;
  margin-bottom: 0;
  font-size: 30px;
  color: var(--blue);
  cursor: pointer;
`;
const AddBooking = () => {
  return (
    <>
    <StyledHeadings>
    <StyledH4>Add Booking</StyledH4>
    <StyledH4><MdAddBox /></StyledH4>
  </StyledHeadings> <br />
   <BookingForm />
   </>
  );
}

export default AddBooking;