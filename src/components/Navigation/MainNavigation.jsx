
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import MainHeader from './MainHeader';
import styled from 'styled-components';
import NavLinks from './NavLinks';


const MenuButton = styled.button`
  width: 3rem;
  height: 3rem;
  font-size: 30px;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
  color: var(--darkgrey);
`;


const HeaderNav = styled.nav`
 
  @media (max-width: 900px) {
    display: none;
  }
`;


const StyledNavLink = styled(NavLink)`
  margin: 0.5rem;
  width: 4rem;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  background-color: var(--darkgrey);
  text-decoration: none; // Remove underline for NavLink

  &:hover {
    background-color: ${(props) => (props.isSidebar ? '' : 'var(--highlight-color)')};
    color: var(--highlight-color);
  }
`;
const MainNavigation = ({setCollapseSidebar, collapseSidebar}) => {
  
  const auth = useContext(AuthContext);

  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    auth.logout(); 
  };
  
  function toggleSidebar(){
    setCollapseSidebar(!collapseSidebar)
  }

  return (
    <>
    {auth.isLoggedIn &&
          <MainHeader >
          
  
              <MenuButton onClick={toggleSidebar}><HiAdjustmentsHorizontal/></MenuButton>
              
              <HeaderNav><NavLinks isSidebar={ false } /></HeaderNav>
              <StyledNavLink onClick={handleLogout}>Logout</StyledNavLink>
            
              
          </MainHeader>
           }
        
    </>
  );
}

export default MainNavigation;