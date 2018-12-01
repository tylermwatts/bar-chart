import "./styles.css";
import * as d3 from 'd3';

const req = new XMLHttpRequest();
req.open("GET",'/src/data.json',true);
req.send();
req.onload=function(){
  const json = JSON.parse(req.responseText);
  const gdpAndYears = json.data.map(d => d);
  const padding = 50;
  const w = (gdpAndYears.length*4) + (padding * 2)
  const xScale = d3.scaleLinear()
                   .domain(0,d3.max(gdpAndYears[1]))
                   .range([padding, w - padding])
  const yScale = d3.scaleLinear();
  const svg = d3.select('body')
                .append("svg")
                .attr("id","chart")
                .attr('width',w)
                .attr('height', 950);
  svg.selectAll('rect')
     .data(gdpAndYears)
     .enter()
     .append('rect')
     .attr('x', (d,i)=>xScale(d))
     .attr('y',(d,i)=>950-d[1])
     .attr('width',3)
     .attr('height',(d)=>d[1])
     .attr("id","bar")
     .attr("fill","blue")
     
}
