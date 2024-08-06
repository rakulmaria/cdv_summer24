// global const
const width = 1400, height = 600;
const padding = { y: 300, x: 0 }
const margin = { left: 50, right: 50, top: 100, bottom: 100 };
const fogPath = "M 0 0 C 1 -1 1 0 2 0 C 3 0 4 0 4 1 C 4 2 5 2 4 3 C 3 4 3 5 2 4 C 1 3 0 4 0 3 C 0 2 -0.6667 2.3333 -1 2 C -2 1 -1 1 0 0"
const space = 40
const radius = { min: 17, max: 40}
const colors = { background: "#212529", rain: "#0077b6", hail: "#90e0ef", storm: "#ffd100", fog: "#6c757d"}
const tempColors = d3.scaleSequential(d3.interpolateRdYlBu)


// description SVG 
var description = d3.select("#data-description")
    .append("svg")
    .attr("width", 150)
    .attr("height", height)
    .style("background-color", colors.background)

// setup a gradient for the temperature line
const defs = description.append("defs");

const tempGradient = defs.append("linearGradient")
    .attr("id", "line-gradient")

tempGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#313695");

tempGradient.append("stop")
.attr("offset", "50%")
.attr("stop-color", "#FCF4B4");


tempGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#A50026");


// setup canvas with the main svg
var canvas = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", colors.background)


// load the data
var data = [];
d3.json("data.json").then(function(d) {
    data = d;
    draw()
});


// helper functions
const randomPosition = (min, max) => Math.random() * (max - min) + min;

function draw() {

    // helper values for scaling
    var minPP = Math.min(...data.map(e => e.PP))
    var maxPP = Math.max(...data.map(e => e.PP))
    console.log("PP: ", minPP, maxPP)

    var minS = Math.min(...data.map(e => e.snowDays))
    var maxS = Math.max(...data.map(e => e.snowDays))
    console.log("H:", minS, maxS);

    var minTemp = Math.min(...data.map(e => e.Temp))
    var maxTemp = Math.max(...data.map(e => e.Temp))
    console.log("Temp: ", minTemp, maxTemp)

    var minFog = Math.min(...data.map(e => e.foggyDays))
    var maxFog = Math.max(...data.map(e => e.foggyDays))
    console.log("Fog: ", minFog, maxFog)

    const getRandomAngle = () => Math.random() * 360;

    var yScaleDescription = d3.scaleLinear()
        .domain([0, 6])
        .range([margin.top, (height) - margin.bottom])

    // arrange circles on the x-axis, based on the dataset
    var xScale = d3.scaleLinear()
        .domain([0, 9])
        .range([margin.left + space, width-margin.right - space])

    var yScale = d3.scaleLinear()
        .domain([1970, 2000])
        .range([margin.bottom, height - margin.bottom])
    
    var rainScale = d3.scaleLinear()
        .domain([minPP, maxPP])
        .range([radius.min, radius.max])

        // have to flip it, to get blue = cold and red = hot
    var tempScale = d3.scaleSequential()
        .domain([maxTemp, minTemp])
        .interpolator(d3.interpolateRdYlBu); // d3 schemeColors

    var fogColorScale = d3.scaleSequential()
        .domain([minFog, maxFog])
        .interpolator(d3.interpolateRdPu); // d3 schemeColors

    var fogSizeScale = d3.scaleSequential()
        .domain([minFog, maxFog])
        .range([7, 15]);


    const drawRain = () => {
        canvas.selectAll("rain")
        .data(data)
        .join("circle")
        .attr("cx", function(d, i) {
            return xScale(d.Year)
            // return (d.Year * space) + space
        })
        .attr("cy", function(d, i) {
            return yScale(d.Century)
            return (((d.Century) - 1970) * 10) + space
        })
        .attr("r", function(d) {
            return rainScale(d.PP)
        })
        .attr("fill", colors.rain)
        // .attr("transform", function(data, index) {
        //     return `translate(${data.Year * space}, ${index})`
        // })
        .attr("class", function(d, i) {
            return d.Year + d.Century
        })
    }

    const drawSnow = () => {
        data.forEach(element => {
            var padding = rainScale(element.PP)
            var buff = 15
            for (let j = 0; j < element.snowDays; j++) {
                var xMin = (xScale(element.Year) - padding) - buff
                var xMax = xScale(element.Year) + padding + buff
                var yMin = yScale(element.Century) - padding - buff 
                var yMax = yScale(element.Century) + padding + buff

                canvas.append("circle")
                    .attr("cx", randomPosition(xMin, xMax))
                    .attr("cy", randomPosition(yMin, yMax))
                    .attr("r", function() {
                        r = rainScale(element.PP)
                        return 0.75
                    })
                    .attr("fill", "white")
                    .attr("stroke", "none")                    
            }
            
        });
    }

    const drawStorm = () => {
        data.forEach(element => {
            for (let j = 0; j < element.stormDays; j++) {
                canvas.append("circle")
                    .attr("cx", function(d, i) {
                        return xScale(element.Year)
                        // return (d.Year * space) + space
                    })
                    .attr("cy", function(d, i) {
                        return yScale(element.Century)
                        return (((d.Century) - 1970) * 10) + space
                    })
                    .attr("r", function() {
                        r = rainScale(element.PP)
                        return r + (j * 4) + 4
                    })
                    .attr("fill", "none")
                    .attr("stroke", colors.storm)                    
            }
            
        });
    }

    const drawHail = () => {
        data.forEach(element => {
            for (let j = 0; j < element.hailDays; j++) {
                canvas.append("line")
                .attr("x1", function(d, i) {
                    if (j%2 == 0) {
                        return xScale(element.Year) + (j * 2) + 1
                    } else {
                        return xScale(element.Year) - (j * 2) - 1
                    }
                })
                .attr("y1", function() {
                    var padding = rainScale(element.PP)
                    return yScale(element.Century) - padding 
                })
                .attr("x2", function() {
                    if (j%2 == 0) {
                        return xScale(element.Year) + (j * 2)+ 1
                    } else {
                        return xScale(element.Year) - (j * 2)- 1
                    }
                })
                .attr("y2", function() {
                    var padding = rainScale(element.PP)
                    return yScale(element.Century) + padding 
                })
                .attr("stroke", colors.hail)
                
            }
            
        });

    }

    const drawTemperature = () => {
        canvas.selectAll("temperature")
        .data(data)
        .join("line")
        .attr("x1", function(d) {
            var padding = rainScale(d.PP) + 4 + (d.stormDays * 4)
            return xScale(d.Year) - padding
        })
        .attr("y1", function(d) {
            var padding = rainScale(d.PP) + 20 + (d.stormDays * 4)
            return yScale(d.Century) + padding
        })
        .attr("x2", function(d) {
            var padding = rainScale(d.PP) + 4 + (d.stormDays * 4)
            return xScale(d.Year) + padding
        })
        .attr("y2", function(d) {
            var padding = rainScale(d.PP) + 20 + (d.stormDays * 4)
            return yScale(d.Century) + padding
        })
        .attr("stroke", function(d) {
            return tempScale(d.Temp)
        })
        .attr("stroke-width", 3)
        .attr("class", function(d, i) {
            return d.Year + d.Century + "-" + d.Temp
        })


    }

    const drawFog = () => {
        canvas.selectAll("fog")
        .data(data)
        .join("path")
        .attr("d", fogPath)
        .attr("fill", "#f686bd")
        .attr("stroke", "none")
        .attr("opacity", 0.6)
        .attr("transform", function(d, i) {
            var x = xScale(d.Year) 
            var y = yScale(d.Century)
            console.log(x, y)
            return `translate(${x}, ${y}) scale(${fogSizeScale(d.foggyDays)}) rotate(${getRandomAngle()})`;
        })
    }

    const drawDescriptionShapes = () => {
        var pad = 20

        // PP - min
        description.append("circle")
            .attr("cx", margin.left + pad)
            .attr("cy", yScaleDescription(0))
            .attr("r", 20)
            .attr("fill", colors.rain)

        // // PP - max
        // description.append("circle")
        //     .attr("cx", margin.left * 3)
        //     .attr("cy", yScaleDescription(0))
        //     .attr("r", 20)
        //     .attr("fill", colors.rain)

        // Temperature
        description.append("rect")
            .attr("x", margin.left - 6)
            .attr("y", yScaleDescription(1))
            .attr("width", 50)
            .attr("height", 5)
            .attr("fill", "url(#line-gradient)")
            .attr("stroke-width", 10);

        // Storm - 2 circles
        for (let i = 0; i < 2; i++) {
            description.append("circle")
            .attr("cx", margin.left + pad)
            .attr("cy", yScaleDescription(2) + pad)
            .attr("r", 20 + (i * 4))
            .attr("fill", "none")
            .attr("stroke", colors.storm)     
            
        }

        // Hail - 4 lines
        for(let i = 0; i < 4; i++) {
            description.append("line")
            .attr("x1", margin.left + pad/2 + (i * 6))
            .attr("y1", yScaleDescription(3) + pad)
            .attr("x2", margin.left + pad/2 + (i * 6))
            .attr("y2", yScaleDescription(3) + pad*3.2)
            .attr("stroke", colors.hail)
        }

        // Snow - 15 dots
        for (let i = 0; i < 15; i++) {
            var buff = 15
            var xMin = margin.left
            var xMax = margin.left * 2 
            var yMin = yScaleDescription(4) + pad*1.5
            var yMax = yScaleDescription(5) + pad
            description.append("circle")
                    .attr("cx", randomPosition(xMin, xMax))
                    .attr("cy", randomPosition(yMin, yMax))
                    .attr("r", 0.75)
                    .attr("fill", "white")
                    .attr("stroke", "none") 
        }

        // Fog - min
        description.append("path")
            .attr("d", fogPath)
            .attr("fill", "#f686bd")
            .attr("stroke", "none")
            .attr("opacity", 0.6)
            .attr("transform", `translate(${margin.left + 10}, ${yScaleDescription(6)}) scale(${9}) rotate(${20})`)

        // // Fog - max
        // description.append("path")
        //     .attr("d", fogPath)
        //     .attr("fill", "#f686bd")
        //     .attr("stroke", "none")
        //     .attr("opacity", 0.6)
        //     .attr("transform", `translate(${margin.left + pad + 50}, ${yScaleDescription(6)}) scale(${15}) rotate(${30})`)
    }

    
    drawDescriptionShapes()
    drawRain();
    drawStorm();
    drawTemperature();
    drawHail();
    drawSnow();
    drawFog();
    
}



