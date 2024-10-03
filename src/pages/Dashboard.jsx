import styled from "styled-components";
import TotalBookings from "../components/Dashboard/TotalBookings";
import TotalRevenue from "../components/Dashboard/TotalRevenue";
import OccupancyRate from "../components/Dashboard/OccupancyRate";
import TotalGuests from "../components/Dashboard/TotalGuest";
import RepeatGuests from "../components/Dashboard/RepeatGuest";
import RevenueComparisonChart from "../components/Dashboard/RevenueComparisonChart";
import TotalAmountPaidChart from "../components/Dashboard/TotalAmountPaidChart";

const Container =styled.div`
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`

const Top = styled.section`
  display: flex;
  justify-content:center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    width: 90%;
    margin-top: 10px;
  }
`;


const Middle = styled.section`
  width: 100%;
  display: grid;
  justify-content:center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 10px;
  grid-template-columns: 1fr auto;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    width: 90%;
    display: none;
  }
`


const Dashboard = () => {
  return (
    <Container>
    <Top>
      <TotalBookings/>
      <TotalRevenue/>  
      <TotalGuests/>     
    </Top>

    <Middle>
    <RevenueComparisonChart/>
    <TotalAmountPaidChart/>
    </Middle>

    <Top>
    <RepeatGuests/>
    <OccupancyRate/>
    </Top>
    </Container>
  );
}

export default Dashboard;