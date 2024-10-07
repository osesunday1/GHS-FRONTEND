import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import NavLinks from './components/Navigation/NavLinks';
import useWindowWidth from './styles/UseWindowWidth';
import { AuthContext } from './context/auth-context';

import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Guest from './pages/Guest';
import Apartments from './pages/Apartments';
import Inventory from './pages/Inventory';
import styled from 'styled-components';
import Consumption from './pages/Consumption';
import MainNavigation from './components/Navigation/MainNavigation';
import SideDrawer from './components/Navigation/SideDrawer';
import AddBooking from './pages/AddBooking';
import AddApartment from './pages/AddApartment';
import Addings from './components/Navigation/Addings';
import Calendar from './pages/Calendar';
import ConsumptionForm from './components/consumption/ConsumptionForm';
import EditConsumptionForm from './components/consumption/EditConsumptionForm';
import Auth from './pages/Auth';
import Home from './pages/Home';
import InventoryForm from './components/Inventory/InventoryForm';

const StyledStructure = styled.div`
  display: ${({ isLoggedIn }) => (isLoggedIn ? 'grid' : 'block')}; 
  grid-template-columns: ${({ collapseSidebar }) => (collapseSidebar ? '100px 1fr' : '250px 1fr')};
  height: 100%;
  width: 100%;
  background-color: var(--white);
  transition: grid-template-columns 0.3s ease, transform 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledMain = styled.main`
  background-color: var(--white);
  min-height: 100vh;
  padding: ${(props) => (props.isLoggedIn ? '1em' : 'none')} 1em;
  
`;

const StyledH1Logo = styled.div`
  color: #c22b2b;
  width: 120px;
  display: ${({ collapseSidebar }) => (collapseSidebar ? 'none' : 'block')};
  transition: display 0.3s ease, transform 0.3s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  const windowWidth = useWindowWidth();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 60 * 60 * 1000); // default to 1 hour expiry
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString(), })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);



  // Check if user is already logged in by retrieving token from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()

    ) {
      login(storedData.userId, storedData.token);
    } else {
      logout(); // Log out if the token is expired or invalid
    }
  }, [login, logout]);

 
  // Auto logout when token expires
  useEffect(() => {
    if (token) {
      const tokenExpirationDate = new Date(
        JSON.parse(localStorage.getItem('userData')).expiration
      );
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();

      const tokenTimer = setTimeout(() => {
        logout();
      }, remainingTime);

      return () => {
        clearTimeout(tokenTimer); // Clear the timer if the component unmounts or the token changes
      };
    }
  }, [token, logout]);
 
 
 
 
  useEffect(() => {
    if (windowWidth <= 768) {
      setCollapseSidebar(true);
    } else {
      setCollapseSidebar(false);
    }
  }, [windowWidth]);

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/addBookings" element={<AddBooking />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/apartment" element={<Apartments />} />
        <Route path="/addApartment" element={<AddApartment />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/addInventory" element={<InventoryForm />} />
        <Route path="/consumption" element={<Consumption />} />
        <Route path="/addConsumption" element={<ConsumptionForm />} />
        <Route path="/consumption/edit/:id" element={<EditConsumptionForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    );
  }

  return (
    <>
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>


        <StyledStructure isLoggedIn={!!token} collapseSidebar={collapseSidebar}>
         
         {/*====================== sidebar =======================*/}
          {token && (
            <SideDrawer collapseSidebar={collapseSidebar}>
              <StyledH1Logo collapseSidebar={collapseSidebar}>
                <Link to="/">
                  <img src="./logo2.png" alt="logo" />
                </Link>
              </StyledH1Logo>
              <NavLinks isSidebar={true} collapseSidebar={collapseSidebar} />
              <Addings collapseSidebar={collapseSidebar} />
            </SideDrawer>
          )}
          <div>
            {/* ================navigation===================*/}
          <MainNavigation setCollapseSidebar={setCollapseSidebar} collapseSidebar={collapseSidebar} />
          <br />

          {/* ===================content=====================*/}
            <StyledMain isLoggedIn={!!token}>
              {routes}
            </StyledMain>
          </div>
        </StyledStructure>
      </AuthContext.Provider>
    </>
  );
}

export default App;