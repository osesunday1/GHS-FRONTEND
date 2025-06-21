import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 60px;
  border-radius: 8px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  margin-top: 60px;
`;

const Value = styled.p`
  font-size: 36px;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
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
  }

 @media (max-width: 768px) {
    padding: 1px 5px;
  }
`;

const MonthlyRevenueCard = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${apiUrl}/v1/admin/bookings/monthly-revenue?year=${year}&month=${month}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error("Error fetching monthly revenue:", err.message); // Debug log
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

      <Title>{new Date(0, month - 1).toLocaleString("default", { month: "long" })} Revenue </Title>
      <Value>N{data?.totalRevenue.toLocaleString() || "0.00"}</Value>
      <Subtitle>
        Total revenue for {new Date(0, month - 1).toLocaleString("default", { month: "long" })}{" "}
        {year}
      </Subtitle>
    </CardContainer>
  );
};

export default MonthlyRevenueCard;