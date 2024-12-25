import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import useFetch from "../CustomHooks/useFetch";

const ChartContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

const BookingComparisonChart = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, loading, error } = useFetch(
    `${apiUrl}/v1/admin/monthly-booking-comparison?year=${year}`
  );
  const containerRef = useRef(null); // Ref for the chart container

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  const drawChart = (data) => {
    const container = containerRef.current;

    if (!container) return; // Ensure the container is available

    d3.select(container).selectAll("*").remove(); // Clear the existing chart

    const containerWidth = container.offsetWidth; // Get dynamic container width
    const margin = { top: 50, right: 20, bottom: 50, left: 70 };
    const width = containerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${containerWidth} 400`) // Makes the chart responsive
      .attr("preserveAspectRatio", "xMidYMid meet") // Maintain proportions
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const months = [...Array(12).keys()].map((i) =>
      new Date(0, i).toLocaleString("default", { month: "short" })
    );
    const apartments = Array.from(
      new Set(data.flatMap((d) => d.apartments.map((a) => a.apartmentName)))
    );

    const x0 = d3.scaleBand().domain(months).range([0, width]).padding(0.2);
    const x1 = d3.scaleBand().domain(apartments).range([0, x0.bandwidth()]).padding(0.1);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d3.max(d.apartments, (a) => a.count))])
      .nice()
      .range([height, 0]);

    // Axes
    svg
      .append("g")
      .call(d3.axisBottom(x0).tickSize(0))
      .attr("transform", `translate(0,${height})`)
      .selectAll("text")
      .style("text-anchor", "middle");

    svg.append("g").call(d3.axisLeft(y));

    // Add Tooltip
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

    // Bars
    svg
      .selectAll("g.bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(months[d._id - 1])},0)`)
      .selectAll("rect")
      .data((d) => d.apartments)
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.apartmentName))
      .attr("y", (d) => y(d.count))
      .attr("width", x1.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d, i) => d3.schemeCategory10[i])
      .on("mouseover", function (event, d) {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>Apartment:</strong> ${d.apartmentName}<br>
             <strong>Bookings:</strong> ${d.count}`
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

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(apartments)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * 100},-40)`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d, i) => d3.schemeCategory10[i]);

    legend
      .append("text")
      .attr("x", 15)
      .attr("y", 10)
      .text((d) => d)
      .style("font-size", "12px");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ChartContainer>
      <label htmlFor="year">Select Year: </label>
      <select
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i} value={new Date().getFullYear() - i}>
            {new Date().getFullYear() - i}
          </option>
        ))}
      </select>
      <div id="booking-chart-container" ref={containerRef}></div>
    </ChartContainer>
  );
};

export default BookingComparisonChart;