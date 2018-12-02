import "./styles.css";
import * as d3 from "d3";

const req = new XMLHttpRequest();
req.open("GET", "/src/data.json", true);
req.send();
req.onload = function() {
  const json = JSON.parse(req.responseText);
  const gdpAndYears = json.data.map(d => d);
  const w = 825;
  const h = 500;
  const xScale = d3
    .scaleLinear()
    .domain([1947, 2017])
    .range([50, 875]);
  const yScale = d3
    .scaleLinear()
    .domain([0, 20000])
    .range([0, 500]);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(14)
    .tickFormat(d3.format(""));
  const yAxis = d3.axisLeft(yScale).ticks(10);
  const svg = d3
    .select("#bar-area")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(gdpAndYears)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i*3)
    .attr("y", d => h - d[1] * 0.0275)
    .style("height", d => d[1])
    .style("width", 2)
    .attr("fill", "blue")
    .attr("class", "bar")
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1]);

  const chartsvg = d3
    .select("body")
    .append("svg")
    .attr("height", 600)
    .attr("width", 925);

  chartsvg
    .append("g")
    .attr("transform", "translate(0,0)")
    .call(xAxis)
    .attr("id", "x-axis");
  chartsvg
    .append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis)
    .attr("id", "y-axis");
};
