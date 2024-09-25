import { Routes, Route, Navigate, Link } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import NavLinks from './components/Navigation/NavLinks';
import useWindowWidth from './styles/UseWindowWidth'
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
import { useState, useEffect, useCallback } from 'react';
import Calendar from './pages/Calendar';
import ConsumptionForm from './components/consumption/ConsumptionForm';
import EditConsumptionForm from './components/consumption/EditConsumptionForm';
import Auth from './pages/Auth';




const StyledStructure= styled.div`
display:${({ isLoggedIn }) => (isLoggedIn ? 'grid' : 'block')}; 
grid-template-columns: ${({ collapseSidebar }) => (collapseSidebar ? '100px 1fr' : '250px 1fr')};
height: 100vh;
background-color:var(--primary-background);
transition: grid-template-columns 0.3s ease, transform 0.3s ease;
`


const StyledMain = styled.main`
    background: var(--secondary-background);
    min-height: 100vh;
    padding: ${(props) => (props.isLoggedIn ? '1em' : 'none')} 1em;
`


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

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [collapseSidebar, setCollapseSidebar] = useState(true)
  const windowWidth = useWindowWidth();

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);


  useEffect(() => {
    if (windowWidth <= 768) {
      setCollapseSidebar(true);
    } else {
      setCollapseSidebar(false);
    }
  }, [windowWidth]);
  

  
  return (
    <> 
    <GlobalStyles />
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, login:login, logout:logout}}>


      <StyledStructure isLoggedIn= {isLoggedIn} collapseSidebar={collapseSidebar}>

        {isLoggedIn &&
        <SideDrawer collapseSidebar={collapseSidebar}>
            <StyledH1Logo collapseSidebar={collapseSidebar}>
              <Link to='/'><img src="./logo2.png" alt="" /></Link>
            </StyledH1Logo>
          <NavLinks isSidebar ={true} collapseSidebar={collapseSidebar}/>
          <Addings collapseSidebar={collapseSidebar}/>
        </SideDrawer>
        }

        <div>
            <MainNavigation setCollapseSidebar={setCollapseSidebar} collapseSidebar={collapseSidebar} />
              <StyledMain isLoggedIn={isLoggedIn}>

                <Routes>

                {isLoggedIn ? (
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/addBookings" element={<AddBooking />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path="/apartment" element={<Apartments />} />
                    <Route path="/addApartment" element={<AddApartment />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/addInventory" element={<AddApartment />} />
                    <Route path="/consumption" element={<Consumption />} />
                    <Route path="/addConsumption" element={<ConsumptionForm />} />
                    <Route path="/consumption/edit/:id" element={<EditConsumptionForm />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<Navigate to="/auth" />} />
                  </>
                )}
                </Routes>

                
              </StyledMain>

          </div>

      </StyledStructure>
      </AuthContext.Provider>
       
    </>
  )
}

export default App
