import styled from "styled-components";
import GuestList from "../components/GuestList";
import { MdAddBox } from "react-icons/md";


const StyledGuest= styled.div`
  margin: 0 auto;
`

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




const Guest = () => {
  return (
    <>
    <StyledGuest>
        <StyledHeadings>
        <StyledH4>All Guest</StyledH4>
        <StyledH4><MdAddBox /></StyledH4>
      </StyledHeadings>
      <GuestList />
    </StyledGuest>

    </>
  );
}

export default Guest;