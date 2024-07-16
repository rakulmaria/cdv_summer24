// set up the canvas with a margin
// const width = "device-width", height = "device-height";
const width = 1200, height = 600;
const margin = { left: 30, right: 30, top: 30, bottom: 30 };

// load the data
var data = [];

d3.json('data.json').then(function(d) { 
    data = d;
    draw()
});

function getMax(array) {
    var max = 0;
    array.forEach(element => {
        if (element > max) {
            max = element
        }
    });
    console.log("getMax:", max)
    return max;
}

function draw() {

    const xScale = d3.scaleLinear()
        .domain([0, 60])
        .range([margin.left, width - margin.right]);

    var svg = d3.select("#canvas")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]) // not sure if this makes sense or not!
        .style("background-color", "lightblue");

    // on the x-axis, distribute 6 columns
    // append x-axis to the canvas
    svg.append("g")
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(xScale)
                .ticks(6)
                .tickPadding(5));

    console.log("Data:", data)

    svg.selectAll("circle")
        .data(data.s10)
        .join("circle")
        .attr("cx", function(_, i) {
            console.log("xScale:", xScale(i))
            return xScale(i)
        })
        .attr("cy", height * Math.random())
        .attr("r", 10)
        .attr("fill", function(d, i) {
            var max = getMax(data.s10)
            if (d == max) { return "pink" }
            else return "none"
        })
        .attr("stroke", "red")

    svg.selectAll("rect")
        .data(data.s20)
        .join("rect")
        .attr("x", function(_, i) {
            console.log("xScale:", xScale(i))
            return xScale(i)
        })
        .attr("y", height * Math.random())
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "none")
        .attr("stroke", "black")
    
}


// draw each person as their shape and corresponding color
// p1: drop with stripe through
// p2: diagonal line
// p3: star-thingy
// p4: square

// within each column, draw the amount of drops registered pr person

// the shape is filled, if the person had most registered drops pr 10 steps