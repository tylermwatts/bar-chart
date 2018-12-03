import "./styles.css";
import * as d3 from "d3";

const req = new XMLHttpRequest();
req.open("GET", "/src/data.json", true);
req.send();
req.onload = function() {
  const json = JSON.parse(req.responseText);
  const gdpAndYears = json.data.map(d => d);
  const w = 1100;
  const h = 600;
  const padding = 50;
  const xScale = d3
    .scaleTime()
    .domain([new Date(1947,1,1), new Date(2015,7,1)])
    .range([50, 1050]);
  const widthScale = d3.scaleLinear().domain([0,275]).range([50,1050])
  const yScale = d3
    .scaleLinear()
    .domain([0, 19000])
    .range([550,50]);
  const xAxis = d3
    .axisBottom(xScale)
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(10);
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);

  svg
    .selectAll("rect")
    .data(gdpAndYears)
    .enter()
    .append("rect")
    .attr("x", (d,i)=>widthScale(i))
    .attr("y", d => yScale(d[1]))
    .attr("height", d => h-padding-yScale(d[1]))
    .attr("width", 5)
    .attr("fill", "blue")
    .attr("class", "bar")
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1])
    .on("mouseover", function(d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(`$${d[1]} Billion\n${d[0]}`)
          .style("left", d3.event.pageX + 20 + "px")
          .style("top", d3.event.pageY + 20 + "px");
        tooltip.attr("data-date", d[0]);
      })
      .on("mouseout", function(d) {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
      });

  svg
    .append("g")
    .attr("transform", "translate(0,550)")
    .call(xAxis)
    .attr("id", "x-axis");
svg
    .append("g")
    .attr("transform", "translate(50,0)")
    .call(yAxis)
    .attr("id", "y-axis");
};
