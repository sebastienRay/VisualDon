import * as d3 from 'd3'
import { select } from 'd3'

console.log(d3);

//create and manage the year picker under the map
const input = document.getElementById('year-input');
const onYearChange = year => {
    console.log(year);
    yearDisplay.text(year)
};


input.addEventListener('input', e => onYearChange(Number(e.target.value)));

const div = select('#graph');

const svg = div.append('svg');
const YEAR_DISPLAY_SIZE = 100;

export const yearDisplay = svg.append('text')
    .attr('x', 1000)
    .attr('y', 400 )
    .attr('font-size', YEAR_DISPLAY_SIZE)
    .attr('text-anchor', 'end')
    .attr('opacity', 0.5)
    .text(2020);



// mapid is the id of the div where the map will appear
var map = L
    .map('mapid')
    .setView([47, 2], 5);   // center position + zoom

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
    }).addTo(map);

// Add a svg layer to the map
L.svg().addTo(map);


d3.json("earthquake.json")
    .then(function(json) {
    console.log(json);


// Select the svg area and add circles:
d3.select("#mapid")
    .select("svg")
    .selectAll("myCircles")
    .data(json)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
    .attr("r", 2)
    .style("fill", "red")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4);
    console.log("test");


// Function that update circle position if something change
function update() {
    d3.selectAll("circle")
        .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
        .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
    // TRANSITION BLOW TO WORK ON
    /*circles.transition()
        .duration(2000)
        .attr("r", 14)
        .transition()
        .duration(2000)
        .attr("r",0)*/
}

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update);
    });