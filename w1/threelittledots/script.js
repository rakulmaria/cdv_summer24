var width = 600, height = 600;

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

var canvas = 
    d3.select("#canvas")
    .append("svg")
    .attr('width', width)
    .attr('height', height)

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        canvas.append("circle")
        .attr("cx", i * 50 + 80)
        .attr("cy", j * 50 + 80)
        .attr("r", Math.random() * 50 + 10)
        .attr("opacity", 0.708)
        .style("fill", function () { return getRandomColor()});
    }
}