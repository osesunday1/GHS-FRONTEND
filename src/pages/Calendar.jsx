import styled from "styled-components";
import CalendarBooking from "../components/CalendarBooking";


const StyledCalendar= styled.div`
  margin: 0 auto;
`

const StyledH4 = styled.h4`
  padding: 0;
  margin-bottom: 0;
  font-size: 30px;
  color: var(--blue);
  cursor: pointer;
`;

const StyledHeadings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end; 
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  border-bottom: 2px solid var(--blue); /* Add bottom border */
  padding-bottom: 0px; /* Adjust padding as needed */
  margin-bottom: 10px;
`

const Calendar = () => {
  return (
    <StyledCalendar>
    <StyledHeadings>
    <StyledH4>Calendar</StyledH4>
    </StyledHeadings>
    <CalendarBooking/>
    </StyledCalendar>
  );
}

export default Calendar;