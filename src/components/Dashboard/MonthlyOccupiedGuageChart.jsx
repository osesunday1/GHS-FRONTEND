import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";



const CardContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #333;
  margin-top: 60px;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: auto;
  max-width: 600px; /* Adjust the maximum width */
  margin: 0 auto;
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
`;

const MonthlyOccupiedGaugeChart = () => {
  const chartRef = useRef();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const expectedDays = new Date(year, month, 0).getDate(); // Get the number of days in the month

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${apiUrl}/v1/admin/bookings/monthly-occupied-dates?year=${year}&month=${month}&expectedDays=${expectedDays}`
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
  }, [apiUrl, year, month, expectedDays]);

  useEffect(() => {
    if (data && chartRef.current) {
      drawGaugeChart(data.totalOccupiedDates, data.expectedDays);
    }
  }, [data]);

  const drawGaugeChart = (value, maxValue) => {
    maxValue= maxValue *2
    const container = chartRef.current;
    d3.select(container).selectAll("*").remove();

    const width = 400;
    const height = width * 0.6; // Adjust height
    const radius = Math.min(width, height) / 2 + 40;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const arc = d3
      .arc()
      .innerRadius(radius - 50)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle((-Math.PI / 2) + (Math.PI * (value / maxValue)));

    const backgroundArc = d3
      .arc()
      .innerRadius(radius - 50)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    svg
      .append("path")
      .attr("d", backgroundArc)
      .attr("transform", `translate(${width / 2}, ${height * 0.7})`) // Adjust position
      .style("fill", "#e0e0e0");

    svg
      .append("path")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height * 0.7})`) // Adjust position
      .style("fill", "#007bff");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height * 0.65) // Adjust text position
      .attr("text-anchor", "middle")
      .style("font-size", "32px")
      .style("fill", "#000")
      .text(`${value}/ ${maxValue}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <CardContainer>
      <SelectorContainer>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
    </SelectorContainer>
    <Title>Days Booked in {new Date(0, month - 1).toLocaleString("default", { month: "long" })}</Title>
      <ChartContainer ref={chartRef} />
      </CardContainer>
  );
};

export default MonthlyOccupiedGaugeChart;