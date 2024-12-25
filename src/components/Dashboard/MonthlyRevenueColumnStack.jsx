import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import useFetch from "../CustomHooks/useFetch";

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const SelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;

  select {
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f9fa;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 10px;

  span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    background-color: ${(props) => props.color};
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #333;
  }
`;

const MonthlyRevenueColumnStack = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, loading, error } = useFetch(
    `${apiUrl}/v1/admin/monthly-revenue-by-apartment?year=${year}`
  );
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      drawStackedBarChart(data);
    }
  }, [data]);

  const drawStackedBarChart = (data) => {
    const container = chartRef.current;

    if (!container) return;

    d3.select(container).selectAll("*").remove();

    const containerWidth = container.offsetWidth;
    const margin = { top: 50, right: 20, bottom: 50, left: 70 };
    const width = containerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${containerWidth} 400`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const months = [...Array(12).keys()].map((i) =>
      new Date(0, i).toLocaleString("default", { month: "short" })
    );

    const apartments = Array.from(
      new Set(data.flatMap((d) => d.apartments.map((a) => a.apartmentName)))
    );

    const stackedData = months.map((month, index) => {
      const monthlyData = data.find((d) => d._id === index + 1) || {
        apartments: [],
      };
      const monthRevenue = {};
      apartments.forEach((apartment) => {
        const apartmentData = monthlyData.apartments.find(
          (a) => a.apartmentName === apartment
        );
        monthRevenue[apartment] = apartmentData
          ? apartmentData.totalRevenue
          : 0;
      });
      return { month, ...monthRevenue };
    });

    const x = d3
      .scaleBand()
      .domain(months)
      .range([0, width])
      .padding(0.2);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d3.sum(apartments.map((a) => d[a])))]).nice()
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal().domain(apartments).range(d3.schemeCategory10);

    const stack = d3.stack().keys(apartments);
    const layers = stack(stackedData);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("g.layer")
      .data(layers)
      .enter()
      .append("g")
      .attr("fill", (d) => colorScale(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.data.month))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
        const apartment = d3.select(this.parentNode).datum().key;
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>Apartment:</strong> ${apartment}<br>
             <strong>Amount:</strong> $${(d[1] - d[0]).toFixed(2)}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
        d3.select(this).style("opacity", 0.8);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
        d3.select(this).style("opacity", 1);
      });

    const tooltip = d3
      .select(container)
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("box-shadow", "0px 2px 5px rgba(0, 0, 0, 0.2)")
      .style("opacity", 0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ChartContainer>
      <SelectorContainer>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </SelectorContainer>
      <Title>Monthly Amount by Apartments</Title>
      <LegendContainer>
        <LegendItem color="#0e3778">
          <span></span>
          <p>Cozy Suites</p>
        </LegendItem>
        <LegendItem color="#e3910e">
          <span></span>
          <p> Ivory Pearl</p>
        </LegendItem>
      </LegendContainer>
      <div id="revenue-chart-container" ref={chartRef}></div>
    </ChartContainer>
  );
};

export default MonthlyRevenueColumnStack;