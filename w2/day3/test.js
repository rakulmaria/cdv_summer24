// Select the SVG canvas
const svg = d3.select("svg");

// Define the width and height of the canvas
const width = +svg.attr("width");
const height = +svg.attr("height");

// Create a dataset for the symbols' positions
const dataset = d3.range(10).map(() => ({
  x: Math.random() * width,
  y: Math.random() * height
}));

// Define a symbol generator for diamond shapes
const symbolGenerator = d3.symbol().type(d3.symbolDiamond).size(100);

// Append symbols to the SVG canvas
svg.selectAll("path")
  .data(dataset)
  .enter()
  .append("path")
  .attr("d", symbolGenerator)
  .attr("transform", d => `translate(${d.x},${d.y})`)
  .attr("fill", "steelblue");
