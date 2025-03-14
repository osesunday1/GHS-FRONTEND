import { NavLink } from "react-router-dom";
import styled from "styled-components";




// Styled components
const StyledNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0;
`;


const StyledLi = styled.li`
  margin: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: var(--blue);

  &:hover,
  &.active {
    background-color: var(--darkgrey);
    border-radius: 50%;
  }
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  border-radius: 20px;
  text-decoration: none;
  padding: 0.7rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  justify-content: flex-start;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:active,
  &.active {
    background: var(--darkgrey);
    text-decoration: none;
    color: var(--white);
  }

  @media (min-width: 768px) {
    color: var(--darkgrey);
    text-decoration: none;
  }
`;



// Main component
const NavLinksMobile = () => {

  return (
    <StyledNavLinks>
      {/* Static Links */}
      <StyledLi>
        <StyledNavLink to="dashboard">DASHBOARD</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="guest">GUEST</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/calendar">CALENDAR</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/bookings">VIEW BOOKINGS</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/addBookings">ADD BOOKING</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/inventory">INVENTORY</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/addInventory">ADD INVENTORY</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/expenses">EXPENSES</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/addInventory">ADD EXPENSES</StyledNavLink>
      </StyledLi>


      <StyledLi>
        <StyledNavLink to="/product">PRODUCT</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/addInventory">ADD PRODUCT</StyledNavLink>
      </StyledLi>

      <StyledLi>
        <StyledNavLink to="/timeTable">STAFF TIMETABLE</StyledNavLink>
      </StyledLi>



    
    </StyledNavLinks>
  );
};

export default NavLinksMobile;