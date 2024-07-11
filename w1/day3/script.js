//GOAL: can we move shapes around based on their data? 
// Can we store more information inside every data piece aside from just numbers?

var width = 1200;
var height = 800;
var radius = 30;

var canvas = 
    d3.select("#canvas")
        .append("svg")
        .attr("width",width)
        .attr("height",height)
        .style("background-color", "lightblue");


var dataObject = [
    {
        name: "annelie",
        coffee: 1,
        water: 2
    },
    {
        name: "mie",
        coffee: 0,
        water: 2
    },
    {
        name: "oliver",
        coffee: 1,
        water: 3
    },
    {
        name: "saynab",
        coffee: 0,
        water: 1
    },
    {
        name: "natalie",
        coffee: 0,
        water: 0
    },
    {
        name: "magnus",
        coffee: 1,
        water: 1
    },
    {
        name: "rakul",
        coffee: 1,
        water: 3
    },
    {
        name: "olivia",
        coffee: 0,
        water: 3
    }
    
]

function getMatch (array, element) {
    return dataObject.filter(d => d.coffee == element.coffee && d.water == element.water).length;
}

var circles = 
    canvas.selectAll("circle")
        .data(dataObject)
        .join("circle")
        .attr("class", function(d) {
            return d.name;
        })
        .attr("cx", function(d, _) {
            return height / 4 + (d.water * 100);
        })
        .attr("cy", function(d, _) {
            return height / 2 - (d.coffee * 100);
        })
        .attr("r", function(d) {
            intersection = getMatch(dataObject, d);
            if(intersection >= 1) {
                return radius * intersection
            } else {
                return radius
            }

        })
        .style("fill", "none")
        .style("stroke", "black")