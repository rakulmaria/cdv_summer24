// GOAL: can we draw a shape for every cup of coffee we drank this morning?

var width = 500;
var height = 500;

var canvas = d3.select("#vis")
				.append("svg")
				.attr("width",width)
				.attr("height",height)
				.style("background-color", "lightblue");

var cupsOfCoffee = [0, 0, 0, 0, 1, 2, 1, 1, 1, 0, 0, 0, 3, 2, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1];
var cupsOfWater = [2, 1, 3, 2, 2, 1, 2, 1, 1, 1, 1, 0, 3, 1, 2, 2, 1, 2, 1, 2, 2, 3, 4, 4, 0];

var xScale = 
	d3.scaleLinear() // number-based scales
	.domain([0, cupsOfCoffee.length])
	.range([0, width]) 

var rectangles = 
	canvas.selectAll("rect") // what you want drawn
	.data(cupsOfCoffee) // bind it to the data
	.join("rect") // join it to the element
	.attr("x", function (_, i) {
		return xScale(i);
	})
	.attr("y", function (data) {
		return height / 2 - data * 10;
	})
	.attr("width", function (data) {
		if (data==0) {
			return 1
		} else {
			return data * 10;
		}
	})
	.attr("height", function (data) {
		if (data==0) {
			return 1
		} else {
			return data * 10;
		}
	})
	.attr("fill", "none")
	.attr("stroke", "black")
	