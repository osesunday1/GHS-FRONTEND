import React from 'react';
import useFetch from "../CustomHooks/useFetch";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

 const Container = styled.div`
  max-width: 720px;
  height: 450px;
  background: white;
  border-radius: 10px;
  padding: 10px;
 `



const RevenueComparisonChart = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/revenue-per-apartment`);

  const chartData = React.useMemo(() => {
    if (loading || error || !data.length) return null;

    const apartmentNames = data.map(item => item.apartmentName);
    const revenueData = data.map(item => item.revenue);

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: apartmentNames.map((name, index) => ({
        label: name,
        data: revenueData[index],
        fill: true,
        borderColor: `rgba(${index * 50}, ${index * 50}, 255, 1)`,
        backgroundColor: `rgba(${index * 50}, ${index * 50}, 255, 0.2)`,
        tension: 0.1
      }))
    };
  }, [data, loading, error]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    
    <Container>
      <h2>Revenue Comparison</h2>
      {chartData ? <Line data={chartData} /> : <p>No data available</p>}
    </Container>
  );
};

export default RevenueComparisonChart;