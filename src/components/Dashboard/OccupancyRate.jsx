import useFetch from "../CustomHooks/useFetch";
import SmallCard from "./SmallCard";
import { faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';

const OccupancyRate = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Use the custom useFetch hook to fetch occupancy rate from the API with JWT token
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/occupancy-rate`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SmallCard
      title="Occupancy Rate"
      count={data ? `${data.toFixed(2)}%` : 0}
      icon={faPersonWalkingLuggage}
      newSessionsText={data < 1 ? 'No data available' : "Rate is Good"}
      isPositive={data < 1 ? false : true}
    />
  );
};

export default OccupancyRate;