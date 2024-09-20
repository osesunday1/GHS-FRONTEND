import useFetch from "../CustomHooks/useFetch";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import SmallCard from "./SmallCard";




const TotalGuests = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  // Use the custom useFetch hook to fetch the total number of guests from the API
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/guests/total`);

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;





  return (
    <SmallCard
      title="Total Guests"
      count={data ? `${data.toLocaleString()}` : 'No data available'}
      icon={faEnvelope}
      newSessionsText="8.5% New Sessions Today"
      isPositive={true}
      
    />
  );
};

export default TotalGuests;