import useFetch from '../CustomHooks/useFetch';// Adjust the import path to where your useFetch hook is located
import { faDollarSign } from '@fortawesome/free-solid-svg-icons'
import SmallCard from './SmallCard';



const TotalRevenue = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  // Use the custom useFetch hook to fetch total revenue from the API
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/revenue/total`);

 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  
    <SmallCard
    title="Total Revenue"
    count={data ? `₦${data.toLocaleString()}` : 'No data available'}
    icon={faDollarSign}
    newSessionsText= {data < 1 ? 'No data available' : "Revenue is Good"}
    isPositive={data < 1 ? false : true}
    />
  );
};

export default TotalRevenue;