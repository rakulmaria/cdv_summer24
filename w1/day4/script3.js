const width = 400, height = 400;
const rows = 4, cols = 3;
const rectWidth = width / cols;
const rectHeight = height / rows;

const skyData = [{
        color: "#586474",
        weather: "cloudy",
        humidity: 0.7
    }, 
    {
        color: "#5c6a7a",
        weather: "raining",
        humidity: 0.65 
    },
    {
        color: "#535f6b",
        weather: "raining",
        humidity: 0.65 
    },
    {
        color: "#5e6e7c",
        weather: "raining",
        humidity: 0.65 
    },
    {
        color: "#546273",
        weather: "raining",
        humidity: 0.7 
    },
    {
        color: "#5c697c",
        weather: "cloudy",
        humidity: 0.7 
    },
    {
        color: "#5c697c",
        weather: "cloudy",
        humidity: 0.65 
    },
    {
        color: "#56677c",
        weather: "cloudy",
        humidity: 0.60
    },
    {
        color: "#53657a",
        weather: "cloudy",
        humidity: 0.65 
    },
    {
        color: "#47586b",
        weather: "cloudy",
        humidity: 0.65 
    }]

const canvas = d3.select("svg")

skyData.forEach((d, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
    
        canvas.append("rect")
            .attr("x", col * rectWidth)
            .attr("y", row * rectHeight)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", d.color)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .attr("opacity", d.humidity)

        canvas.append("text")
            .attr("x", col * rectWidth + rectWidth / 2) // Center the text horizontally
            .attr("y", row * rectHeight + rectHeight / 2) // Center the text vertically
            .attr("dy", ".35em") // Adjust the text's vertical alignment
            .attr("text-anchor", "middle") // Center the text horizontally
            .text(d.weather);
    });
