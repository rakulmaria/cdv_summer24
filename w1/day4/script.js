    //GOAL: can we move shapes around based on their data? 
    // Can we store more information inside every data piece aside from just numbers?

    var margin = 40;
    var width = 1000;
    var height = 800;
    var radius = 30;
    var spacing = 80;

    var skydata = [{
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

    var canvas =
        d3.select("div")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

    // X axis
    canvas.append("line")
        .attr("x1", 0 - margin)
        .attr("y1", height/2)
        .attr("x2", width - margin)
        .attr("y2", height/2)
        .style("stroke", "gray")

    // Y axis
    canvas.append("line")
        .attr("x1", width/2)
        .attr("y1", 0 + margin)
        .attr("x2", width/2)
        .attr("y2", height - margin)
        .style("stroke", "gray")

    canvas.append("text")
        .attr("x", width/2)
        .attr("y", height/2 + 20)
        .attr('text-anchor', 'middle')
        .text("minutes");

    canvas.append("text")
        .attr("x", width/2)
        .attr("y", 250)
        .attr('text-anchor', 'middle')
        .text("humidity");

        
    // 100%
    canvas.append("rect")
        .attr("x", width/2)
        .attr("y", margin)
        .attr("width", 10)
        .attr("height", 10)
        .attr("opacity", 0.708);

    // 50%
    canvas.append("rect")
        .attr("x", width/2)
        .attr("y", height/2)
        .attr("width", 10)
        .attr("height", 10)
        .attr("opacity", 0.708);

    // 0 %
    canvas.append("rect")
        .attr("x", width/2)
        .attr("y", height - margin)
        .attr("width", 10)
        .attr("height", 10)
        .attr("opacity", 0.708);

    var circles = 
        canvas.selectAll("circle")
            .data(skydata)
            .join("circle")
            .attr("class", function(_,i) {
                return i;
            })
            .attr("cx", function(d, i) {
                return (i * spacing) + spacing;
            })
            .attr("cy", function(d, i) {
                switch (d.humidity) {
                    case 0.7:
                        return width/2;
                    case 0.65:
                        return width/2 + 50;
                    case 0.60:
                        return width/2 + 80;
                    default:
                        break;
                }
                
            })
            .attr("r", radius)
            .style("fill", function(d) {
                switch (d.weather) {
                    case "cloudy":
                        return "#DDE6ED"
                    case "raining":
                        return "#B4D4FF"
                    default:
                        break;
                }
            })
            //.style("stroke", "black")
            .style("opacity", function (d) {
                return 0.8;
            })