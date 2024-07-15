const margin = { top: 100, bottom: 100, left: 80, right: 80 };
const width = 1000, height = 500;

var canvas = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#fffee0");

var skydata = [];

// load external file
d3.json('skydata.json').then(function(d) { 
    skydata = d;
    draw()
    console.log(d);
});

function draw() {
    var min = d3.min(skydata, function(d) { return d.humidity })
    var max = d3.max(skydata, function(d) { return d.humidity })

    // arrange circles on the x-axis, based on the dataset
    var xScale = d3.scaleLinear()
        .domain([0, skydata.length-1])
        .range([margin.left, width-margin.left])

    // arrange circles on the y-axis, based on the min and the max humidity in the dataset
    var yScale = d3.scaleLinear()
        .domain([min, max])
        .range([height-margin.top, margin.bottom]);
    
    // scale the colors using a d3 scheme
    var colorScale = d3.scaleOrdinal()
        .domain(skydata)
        .range(d3.schemePastel1);

    var radiusScale = d3.scaleLinear()
        .domain([min, max])
        .range([10, 40])

    // add the circle data to the canvas
    canvas.selectAll("circle")
        .data(skydata)
        .join("circle")
        .attr("cx", function(_, i) {
            console.log(xScale(i))
            return xScale(i)
        })
        .attr("cy", function(d) {
            return yScale(d.humidity)
        })
        .attr("r", function(d) {
            return radiusScale(d.humidity)
        })
        .attr("fill", function(d) {
            return colorScale(d.weather);
        })
        .attr("stroke", "darkgray")

}


// LINEAR SCALE
// var linearData = [0, 40, 30, 20, 10, 60, 70, 80, 10, 100];

// var xScale = d3.scaleLinear()
//     .domain([0, 100])
//     .range([width-margin.left, margin.left])

// canvas.selectAll("circle")
//     .data(linearData)
//     .join("circle")
//     .attr("cx", function(d, i) {
//         console.log(d)
//         return xScale(d)
//     })
//     .attr("cy", height/2)
//     .attr("r", 30)
//     .attr("fill", "none")
//     .attr("stroke", "black")


// CATEGORICAL DATA -> COLORS = ORDINAL SCALES
// var categoricalData = ["sunny", "windy", "rainy", "cloudy", "stormy", "haily"];

// var colorScale = d3.scaleOrdinal()
//     .domain(categoricalData)
//     .range(d3.schemeSet3); // d3 schemeColors

// // scale to place each object accordingly to the x-axis
// var xScaleLin = d3.scaleLinear()
// 	.domain([0, categoricalData.length-1])
// 	.range([margin.left, width-margin.left])

// // make a scale so that each circles is placed along the x axis according to its categorigaldata
// var xScaleBand = d3.scaleBand()
//     .domain(categoricalData)
//     .range([margin.left, width-margin.left]);


// // join data to circles and add to the canvas
// canvas.selectAll("circle")
//     .data(categoricalData)
//     .join("circle")
//     .attr("cx", function(d) {
//         return xScaleBand(d)
//     })
//     .attr("cy", height/2)
//     .attr("r", 30)
//     .attr("fill", function(d){
//         return colorScale(d)
//     })
//     .attr("stroke", "black")

