import { useReducer } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MdNoFood} from "react-icons/md";
//import {  MdOutlineInventory } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { VscNotebook } from "react-icons/vsc";
import { BsDot } from "react-icons/bs";
import { PiBuildingApartment } from "react-icons/pi";
import { GrSchedules } from "react-icons/gr";

// Initial state for the reducer
const initialState = {
  bookings: false,
  consumption: false,
  inventory: false,
  apartments: false
};

// Reducer function to manage visibility
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_CONSUMPTION":
      return { ...state, 
        consumption: !state.consumption 
      };
    case "TOGGLE_BOOKINGS":
      return { ...state, 
        bookings: !state.bookings 
      };
    case "TOGGLE_INVENTORY":
        return { ...state, 
          inventory: !state.inventory 
        };
    case "TOGGLE_TIMETABLE":
        return { ...state, 
          timetable: !state.timetable
          };
    case "TOGGLE_APARTMENT":
        return { ...state, 
            apartments: !state.apartments
          };
    default:
      throw new Error('Action Unknown');
  }
}

const StyledNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0;

`;

const StyledIcon = styled.div`
  display: block;
  font-size: 30px;
  margin-right: 10px;
  margin: ${(props) => (!props.collapseSidebar ? "none" : "0 auto")};
  transition: 0.3s;
`;

const Arrow = styled.div`
  font-size: 20px;
  transform: ${(props) => (props.isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`;

const StyledLi = styled.li`
  margin: 0.5rem;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  border-radius: 0;
  text-decoration: none;
  padding: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  justify-content: flex-start;
  transition: background-color 0.3s ease, transform 0.3s ease;
  color: var(--white) !important;

  &:hover,
  &:active,
  &.active {
    color: var(--blue);
    text-decoration: none;
  }

  @media (min-width: 768px) {
    color: var(--darkgrey);
    text-decoration: none;
  }
`;

const SubMenu = styled.div`
  margin-top: ${(props) => (props.isVisible ? "0px" : "-10px")};
  max-height: ${(props) => (props.isVisible ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease, margin-top 0.4s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  ${StyledLi} {
    margin: 0rem;
  }
`;

const Addings = ({ collapseSidebar }) => {
  const [{ bookings, consumption,  inventory }, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <StyledNavLinks>

        {/* Bookings Management */}
        <StyledLi onClick={() => dispatch({ type: "TOGGLE_BOOKINGS" })} style={{ cursor: "pointer" }}>
          <StyledNavLink as="div">
            <StyledIcon collapseSidebar={collapseSidebar}><VscNotebook /></StyledIcon>
            {!collapseSidebar && "BOOKINGS"}
            <Arrow isOpen={bookings}>
              <IoIosArrowForward />
            </Arrow>
          </StyledNavLink>
        </StyledLi>

        {/* SUB MENU of BOOKINGS */}
        <SubMenu isVisible={bookings}>

          <StyledLi>
            <StyledNavLink to="/bookings">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "BOOKINGS"}
            </StyledNavLink>
          </StyledLi>

          <StyledLi>
            <StyledNavLink to="/addBookings">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "ADD BOOKING"}
            </StyledNavLink>
          </StyledLi>

        </SubMenu>

        {/* 

        
        <StyledLi onClick={() => dispatch({ type: "TOGGLE_INVENTORY" })} style={{ cursor: "pointer" }}>
          <StyledNavLink as="div">
            <StyledIcon collapseSidebar={collapseSidebar}><MdOutlineInventory /></StyledIcon>
            {!collapseSidebar && "INVENTORY"}
            <Arrow isOpen={inventory}>
              <IoIosArrowForward />
            </Arrow>
          </StyledNavLink>
        </StyledLi>

     
        <SubMenu isVisible={inventory}>
          <StyledLi>
            <StyledNavLink to="/addInventory">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "ADD INVENTORY"}
            </StyledNavLink>
          </StyledLi>

          <StyledLi>
          <StyledNavLink to="/inventory">
            <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
            {!collapseSidebar && "INVENTORY"}
          </StyledNavLink>
        </StyledLi>
        </SubMenu>

*/}
        

        {/* Consumption Management */}
        <StyledLi onClick={() => dispatch({ type: "TOGGLE_CONSUMPTION" })} style={{ cursor: "pointer" }}>
          <StyledNavLink as="div">
            <StyledIcon collapseSidebar={collapseSidebar}><MdNoFood /></StyledIcon>
            {!collapseSidebar && "CONSUMPTIONS"}
            <Arrow isOpen={consumption}>
              <IoIosArrowForward />
            </Arrow>
          </StyledNavLink>
        </StyledLi>

        {/* Consumption submenu */}
        <SubMenu isVisible={consumption}>

          <StyledLi>
            <StyledNavLink to="/consumption">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "CONSUMPTION"}
            </StyledNavLink>
          </StyledLi>

          <StyledLi>
            <StyledNavLink to="/addConsumption">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "ADD CONSUMPTION"}
            </StyledNavLink>
          </StyledLi>

        </SubMenu>



        {/* Apartment Management */}
        <StyledLi onClick={() => dispatch({ type: "TOGGLE_INVENTORY" })} style={{ cursor: "pointer" }}>
          <StyledNavLink as="div">
            <StyledIcon collapseSidebar={collapseSidebar}><PiBuildingApartment /></StyledIcon>
            {!collapseSidebar && "PRODUCTS"}
            <Arrow isOpen={inventory}>
              <IoIosArrowForward />
            </Arrow>
          </StyledNavLink>
        </StyledLi>

         {/* Consumption submenu */}
         <SubMenu isVisible={inventory}>

          <StyledLi>
            <StyledNavLink to="/inventory">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "PRODUCTS"}
            </StyledNavLink>
          </StyledLi>

          <StyledLi>
            <StyledNavLink to="/addInventory">
              <StyledIcon collapseSidebar={collapseSidebar}><BsDot /></StyledIcon>
              {!collapseSidebar && "ADD PRODUCT"}
            </StyledNavLink>
          </StyledLi>

          </SubMenu>


           {/* Timetable Management */}
        <StyledLi style={{ cursor: "pointer" }}>
          <StyledNavLink to="/timeTable">
            <StyledIcon collapseSidebar={collapseSidebar}><GrSchedules /></StyledIcon>
            {!collapseSidebar && "TIME TABLE"}
          </StyledNavLink>
        </StyledLi>





       



      </StyledNavLinks>
    </>
  );
};

export default Addings;