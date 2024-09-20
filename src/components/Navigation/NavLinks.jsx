import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GrDashboard } from "react-icons/gr";
import { IoPeopleOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
//import { useContext } from "react";
//import { AuthContext } from "../../context/auth-context";

const StyledNavLinks = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.isSidebar ? 'column' : 'row')};
  align-items: center;
  padding-left: ${(props) => (props.isSidebar ? '0' : '0')};
  
`;

const StyledIcon = styled.div`
  display: ${(props) => (props.isSidebar ? 'block' : 'none')};
  font-size: 30px;
  margin-right: 10px;
  margin: ${(props) => (!props.collapseSidebar ? 'none' : '0 auto')};
`;

const StyledLi = styled.li`
  margin: 0.5rem;
  width: 100%;
  height:${(props) => (props.isSidebar ? '60px' : '')};
  display: flex;
  align-items: center;
  
  
  
  &:hover,
  &.active {
    background-color: ${(props) => (props.isSidebar ? '' : 'var(--highlight-color)')};
  }
`;

const StyledNavLink = styled(NavLink)`
  border: 1px solid transparent;
  border-radius:${(props) => (props.isSidebar ? '0' : '20px')};
  text-decoration: none;
  padding: 0.7rem;
  display: ${(props) => (props.isSidebar ? 'flex' : '')};
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  
  justify-content: flex-start;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:active,
  &.active {
    background: ${(props) => (props.isSidebar ? '' : 'var(--darkgrey)')};
    text-decoration: none;
    color: ${(props) => (props.isSidebar ? 'var(--blue)' : 'var(--white)')};
    
  }

  @media (min-width: 768px) {
    color: var(--darkgrey);
    text-decoration: none;   
}
`;




const NavLinks = ({ isSidebar, collapseSidebar }) => {
  

  return (
    <>
    

    <StyledNavLinks isSidebar={ isSidebar }>

      
        <StyledLi isSidebar={isSidebar}>
            <StyledNavLink to="dashboard" exact isSidebar={isSidebar} >
            <StyledIcon isSidebar={isSidebar} collapseSidebar={collapseSidebar}><GrDashboard /></StyledIcon>{!collapseSidebar && 'DASHBOARD'} 
            </StyledNavLink>
        </StyledLi>
        
        <StyledLi isSidebar={ isSidebar }>
            <StyledNavLink to="guest" isSidebar={isSidebar} > 
            <StyledIcon isSidebar={isSidebar} collapseSidebar={collapseSidebar}><IoPeopleOutline /></StyledIcon>
              {!collapseSidebar &&'GUEST'} 
              </StyledNavLink>
        </StyledLi>


        <StyledLi isSidebar={ isSidebar }>
          <StyledNavLink to="/calendar" isSidebar={isSidebar} >
            <StyledIcon isSidebar={isSidebar}  collapseSidebar={collapseSidebar}><FaCalendarAlt /> </StyledIcon>{!collapseSidebar && 'CALENDAR'}
          </StyledNavLink>
        </StyledLi>

        
        
    </StyledNavLinks>
    </>
  );
}

export default NavLinks;