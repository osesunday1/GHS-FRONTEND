import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useFetch from "../CustomHooks/useFetch";
import styled from 'styled-components';

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
width: 720px;
height: 450px;
background: white;
border-radius: 20px;
padding: 10px;
`

const TotalAmountPaidChart = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/total-amount-paid-per-month`);
  

  const chartData = React.useMemo(() => {
    if (loading || error || !data) return null;

    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Total Amount Paid',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [data, loading, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <h2>Total Amount Paid Per Month</h2>
      {chartData ? <Bar data={chartData} /> : <p>No data available</p>}
    </Container>
  );
};

export default TotalAmountPaidChart;