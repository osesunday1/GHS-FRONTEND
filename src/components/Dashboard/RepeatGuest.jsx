import useFetch from "../CustomHooks/useFetch";
import SmallCard from "./SmallCard";

const RepeatGuests = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Use the custom useFetch hook to fetch the total number of repeat guests from the API
  const { data, loading, error } = useFetch(`${apiUrl}/v1/admin/guests/repeat`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SmallCard
      title="Returning Guests"
      count={data ? `${data.toLocaleString()}` : 0} // Format the number with commas
      height="180px"
      newSessionsText={data < 1 ? "You have no returning guest" : "You have returning guest"}
      isPositive={data < 1 ? false : true}
    />
  );
};

export default RepeatGuests;