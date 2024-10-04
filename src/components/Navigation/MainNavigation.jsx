
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { HiArrowNarrowRight } from "react-icons/hi";
import MainHeader from './MainHeader';
import styled from 'styled-components';
import NavLinks from './NavLinks';
import NavLinksMobile from "./NavLinksMobile";
import SideDrawerMobile from "./SideDrawerMobile";
import Backdrop from "../../styles/Backdrop";

const DrawerNav = styled.nav`
height: 100%;
position: fixed;
color: var(--white);
align-content: center;
justify-items: center;
justify-content: center;
align-items: center;
margin: 0 auto;
`;


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
  color: var(--white);

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton2 = styled.button`
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
  color: var(--white);

  @media (min-width: 768px) {
    display: none;
  }
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
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    auth.logout(); 
  };
  
  function toggleSidebar(){
    setCollapseSidebar(!collapseSidebar)
  }

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };



  return (
    <>
    {auth.isLoggedIn &&
          <>
          {drawerIsOpen && <Backdrop closeDrawerHandler={closeDrawerHandler} />}
          <SideDrawerMobile show={drawerIsOpen} closeDrawerHandler={closeDrawerHandler}>
          <DrawerNav>
          <NavLinksMobile/>
          </DrawerNav>
          </SideDrawerMobile>
          
          
          <MainHeader >
              <MenuButton onClick={toggleSidebar}><HiAdjustmentsHorizontal/>
              </MenuButton>

              <MenuButton2>
              <HiArrowNarrowRight onClick={openDrawerHandler}/>
              </MenuButton2>
              
              <HeaderNav><NavLinks isSidebar={ false } /></HeaderNav>
              <StyledNavLink onClick={handleLogout}>Logout</StyledNavLink>
          </MainHeader>
          </>
           }
        
    </>
  );
}

export default MainNavigation;