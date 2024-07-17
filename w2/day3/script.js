// set up the canvas with a margin
// const width = "device-width", height = "device-height";
const width = 1200, height = 600;
const margin = { left: 30, right: 30, top: 30, bottom: 30 };
const padding = 40
const columnWidth = (width / 6)

// load the data
var data = [];
d3.json('data.json').then(function(d) { 
    data = d;
    draw()
});

// function that maps input to output
// D3 creates a function myScale which accepts input between 0 and 16 (the domain) and maps it to output between margin.left and width-margin.right (the range).
// var xScale = d3.scaleLinear()
//     .domain([0, 60])
//     .range([margin.left, width - margin.right]);

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

const randomPosition = (min, max) => Math.random() * (max - min) + min;

// function createColumnScale(array, i) {
//     return columnScale = d3.scaleLinear()
//         .domain([getMin(array), getMax(array)])
//         .range([xScale(i) + padding, xScale(i+10) - padding])
// }

function draw() {
    const drawCircles = (group, count, xMin, xMax, color, cond) => {
        group.selectAll("circle")
                .data(d3.range(count))
                .join("circle")
                .attr("cx", () => randomPosition(xMin, xMax))
                .attr("cy", () => randomPosition(20, height) - 20)
                .attr("r", 5)
                .attr("fill", (cond) ? color : "none")
                .attr("opacity", 0.7)
                .attr("stroke", color)
        }

    const drawRectangles = (group, count, xMin, xMax, color, cond) => {
        group.selectAll("rect")
            .data(d3.range(count))
            .join("rect")
            .attr("x", () => randomPosition(xMin, xMax))
            .attr("y", () => randomPosition(20, height) - 20)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", (cond) ? color : "none")
            .attr("opacity", 0.7)
            .attr("stroke", color);
    }

    const drawShapes = (dataset, xMin, xMax, offset) => {   
        dataset.forEach((count, index) => {
            const group = svg.append("g").attr("class", `index-${index + offset}`);
            console.log(dataset, count, getMax(dataset))

            var b = (getMax(dataset) == count) ? true : false
            if (index == 0) {
                drawCircles(group, count, xMin, xMax, "orange", b);
            } else if (index == 1) {
                drawRectangles(group, count, xMin, xMax, "red", b);
            } else if (index == 2) {
                drawCircles(group, count, xMin, xMax, "green", b);
            } else if (index == 3) {
                drawRectangles(group, count, xMin, xMax, "blue", b);
            }
        });
    };
    

    var svg = d3.select("#canvas")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            //.attr("viewBox", [0, 0, width, height]) // not sure if this makes sense or not!
            .style("background-color", "lightblue");

        // // append x-axis to the canvas
        // svg.append("g")
        //     .attr("transform", `translate(0,${margin.top})`)
        //     .call(d3.axisTop(xScale)
        //             .ticks(6) // only have 6 ticks
        //             .tickPadding(5));

                    
    drawShapes(data.s10, padding, columnWidth - padding, 1);
    drawShapes(data.s20, columnWidth, (columnWidth * 2) - padding, 2);
    drawShapes(data.s30, (columnWidth * 2), (columnWidth * 3) - padding, 3);
    drawShapes(data.s40, (columnWidth * 3), (columnWidth * 4) - padding, 4);
    drawShapes(data.s50, (columnWidth * 4), (columnWidth * 5) - padding, 5);
    drawShapes(data.s60, (columnWidth * 5), (columnWidth * 6) - padding, 6);
}



// function draw() {

//     console.log("xScale", xScale(10))
//     var svg = d3.select("#canvas")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         //.attr("viewBox", [0, 0, width, height]) // not sure if this makes sense or not!
//         .style("background-color", "lightblue");

//     // append x-axis to the canvas
//     svg.append("g")
//         .attr("transform", `translate(0,${margin.top})`)
//         .call(d3.axisTop(xScale)
//                 .ticks(6) // only have 6 ticks
//                 .tickPadding(5));

//     var scaleCol1 = createColumnScale(data.s10, 0)

//     data.s10.forEach((count, index) => {
//         svg.selectAll(`circle.index-${index}`)
//             .data(d3.range(count))
//             .join("circle")
//             .attr("cx", scaleCol1(index))
//             .attr("cy", scaleCol1(index))
//             .attr("r", 5)
//             .attr("fill", colors[index])
//             .attr("class", `index-${index}`);
//     });
    

//     svg.selectAll("rect")
//         .data(data.s20)
//         .join("rect")
//         .attr("x", function(_, i) {
//             console.log("xScale:", xScale(i))
//             return xScale(i)
//         })
//         .attr("y", height * Math.random())
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", "none")
//         .attr("stroke", "black")
    
// }


// // draw each person as their shape and corresponding color
// // p1: drop with stripe through
// // p2: diagonal line
// // p3: star-thingy
// // p4: square

// // within each column, draw the amount of drops registered pr person


// // the shape is filled, if the person had most registered drops pr 10 steps