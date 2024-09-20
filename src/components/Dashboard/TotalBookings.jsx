import useFetch from "../CustomHooks/useFetch";
import SmallCard from "./SmallCard";
import { faBuildingUser } from '@fortawesome/free-solid-svg-icons'




const TotalBookings = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/bookings/total`);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SmallCard
     title="Total Bookings"
     count={data ? data : 'No bookings available'}
     icon={faBuildingUser}
     newSessionsText= {data < 1 ? "You have no bookings" : "You have bookings"}
     isPositive={data < 1 ? false : true}
    />
  );
};

export default TotalBookings;