const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
const radius = 22;

var skydata = [];

//load the external data file
d3.json('skydata.json').then(function(d) {
    skydata = d;
})

function draw() {
    // establish the domain

    var min = d3.min(skydata, function(d) { return d.humidity })
    var max = d3.max(skydata, function(d) { return d.humidity })

    console.log(min, max)

    // xScale = timeScale
    // yScale = 

    const yScale = d3.scaleLinear()
        .domain([min, max]) // humidity ranges from min humidity to max humidity
        .range([height, 0]); // Invert the range so 0 is at the bottom and 100 is at the top
    

}

const svg = d3.select("svg");
const expl = d3.select("#explanation");


const xScale = d3.scaleLinear()
    .domain([9, 0]) // Minutes range from 1st minute to 10th
    .range([width, margin.left * 2]); // Invert the range so 0 is at the bottom and 100 is at the top

const xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickFormat(function (d) {
        return d+1 + " min";
    });

const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);
    
const yAxis = d3.axisLeft(yScale)
    .tickFormat(function (d) {
        return d * 100 + " %";
    });

svg.select("#yaxis")
    .call(yAxis);

svg.select("#xaxis")
    .call(xAxis);

function getColor(d) {
    switch (d.weather) {
        case "cloudy":
            return "#DDE6ED"
        case "raining":
            return "#B4D4FF"
        case "raining":
            return "#B4D4FF"
        case "raining":
            return "#B4D4FF"        
        default:
    }
}

skydata.forEach((d, i) => {
    svg.append("circle")
        .attr("cx", xScale(i)) // Adjust X position
        .attr("cy", yScale(d.humidity) + margin.top)  // Adjust Y position
        .attr("r", radius)
        .attr("fill", function() {
            switch (d.weather) {
                case "cloudy":
                    return "#DDE6ED"
                case "raining":
                    return "#B4D4FF"
                default:
            }
        })
})

expl.append("text")
    .attr("x", 50)
    .attr("y", 50)
    .text("cloudy");

expl.append("rect")
    .attr("x", 35)
    .attr("y", 35)
    .attr("width", 70)
    .attr("height", 20)
    .attr("fill", "none")
    .attr("stroke", "#DDE6ED")
    .style("stroke-width", 3)

expl.append("text")
    .attr("x", 50)
    .attr("y", 100)
    .text("rainy");

expl.append("rect")
    .attr("x", 35)
    .attr("y", 85)
    .attr("width", 70)
    .attr("height", 20)
    .attr("fill", "none")
    .attr("stroke", "#B4D4FF")
    .style("stroke-width", 3)
