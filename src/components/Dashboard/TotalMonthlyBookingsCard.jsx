import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 90%; /* Full width with margin for responsiveness */
  max-width: 400px; /* Limit maximum width for larger screens */
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
  margin-top: 70px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const Value = styled.p`
  font-size: 56px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    font-size: 36px; /* Smaller font size for smaller screens */
    margin-bottom: 35px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font size for smaller screens */
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  select {
    padding: 5px 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;

    @media (max-width: 768px) {
      padding: 4px 8px; /* Smaller padding for smaller screens */
      font-size: 12px;
    }
  }
`;

const TotalMonthlyBookingsCard = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const expectedBookings = 50;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${apiUrl}/v1/admin/bookings/monthly-total?year=${year}&month=${month}&expectedBookings=${expectedBookings}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, year, month]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <CardContainer>
      <SelectorContainer>
        {/* Year Selector */}
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>

        {/* Month Selector */}
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </SelectorContainer>

      <Title>Total Monthly Bookings</Title>
      <Value>{data?.totalBookings || 0}</Value>
      <Subtitle>
        Total bookings for {new Date(0, month - 1).toLocaleString("default", { month: "long" })}{" "}
        {year}
      </Subtitle>
    </CardContainer>
  );
};

export default TotalMonthlyBookingsCard;