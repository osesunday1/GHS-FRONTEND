
import styled from "styled-components";
import { MdAddBox } from "react-icons/md";
import { useNavigate  } from "react-router-dom";
import ConsumptionList from "../components/consumption/ConsumptionList";

const StyledBooking= styled.div`
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



const Consumption = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/addConsumption');
  };


  return (
    <>
    <StyledBooking>
        <StyledHeadings>
        <StyledH4>CONSUMPTION</StyledH4>
        <StyledH4><MdAddBox onClick={handleAddClick}/></StyledH4>
      </StyledHeadings>
      <ConsumptionList/>
    </StyledBooking>

    </>
  );
}

export default Consumption;