
import styled from "styled-components";
import { MdAddBox } from "react-icons/md";
import { useNavigate  } from "react-router-dom";
import ExpensesList from "../components/Expenses/ExpensesList";

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



const Expenses = () => {

  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/addExpenses');
  };


  return (
    <>
    <StyledBooking>
        <StyledHeadings>
        <StyledH4>EXPENSES</StyledH4>
        <StyledH4><MdAddBox onClick={handleAddClick}/></StyledH4>
      </StyledHeadings>
      <ExpensesList/>
    </StyledBooking>

    </>
  );
}

export default Expenses;