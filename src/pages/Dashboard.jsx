import styled from "styled-components";
import BookingComparisonChart from "../components/Dashboard/BookingComparisonChart";
import MonthlyRevenueCard from "../components/Dashboard/MonthlyRevenueCard";
import MonthlyRevenueColumnStack from "../components/Dashboard/MonthlyRevenueColumnStack";
import TotalMonthlyBookingsCard from "../components/Dashboard/TotalMonthlyBookingsCard";
import MonthlyOccupiedGaugeChart from "../components/Dashboard/MonthlyOccupiedGuageChart";

// Dashboard container
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  gap: 40px;

  
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

// Section headings
const Heading = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;

`;

// Styled card component
const Card = styled.div`
  display:flex;
  background: white;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;
const Card2 = styled.div`
  display:flex;
  background: white;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 800px;
  text-align: center;

   @media (max-width: 768px) {
    max-width: 400px;
    padding: 5px;
  }
`;

// Section for cards and charts
const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;



const Dashboard = () => {
  return (
    <Container>
      {/* Top Section: Key Metrics */}
      <div>
        <Heading>Key Metrics</Heading>
        <Section>
          <Card>
            <MonthlyRevenueCard />
          </Card>
          <Card>
            <MonthlyOccupiedGaugeChart />
          </Card>
        </Section>
      </div>

      {/* Middle Section: Charts */}
      <div>
        <Heading>Monthly Performance</Heading>
        <Section>
          <Card>
            <MonthlyRevenueColumnStack />
          </Card>
          <Card>
            <TotalMonthlyBookingsCard />
          </Card>
        </Section>
      </div>

      {/* Bottom Section: Comparisons */}
      <div>
        <Heading>Monthly Bookings by Apartments</Heading>
        <Section>
          <Card2>
            <BookingComparisonChart />
          </Card2>
        </Section>
      </div>
    </Container>
  );
};

export default Dashboard;