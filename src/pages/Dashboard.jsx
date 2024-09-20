import styled from "styled-components";
import TotalBookings from "../components/Dashboard/TotalBookings";
import TotalRevenue from "../components/Dashboard/TotalRevenue";
import OccupancyRate from "../components/Dashboard/OccupancyRate";
import TotalGuests from "../components/Dashboard/TotalGuest";
import RepeatGuests from "../components/Dashboard/RepeatGuest";
import RevenueComparisonChart from "../components/Dashboard/RevenueComparisonChart";
import TotalAmountPaidChart from "../components/Dashboard/TotalAmountPaidChart";

const Container =styled.div`
  max-width: 1500px;
  margin: 0 auto;
`

const Top = styled.section`
  display: flex;
  justify-content:center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 10px;
`;


const Middle = styled.section`
  width: 100%;
  display: grid;
  justify-content:center;
  margin: 0 auto;
  margin-bottom: 30px;
  gap: 10px;
  grid-template-columns: 1fr auto;
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