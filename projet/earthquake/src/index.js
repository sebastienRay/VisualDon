import * as d3 from 'd3'

console.log(d3);

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

d3.json("results-20200403-144145.json")
    .then(function(json) {
    console.log(json);

// Create data for circles:
/*var markers = [
    {long: 31.1, lat: 35.5}, // corsica
    {long: 7.26, lat: 43.71}, // nice
    {long: 2.349, lat: 48.864}, // Paris
    {long: -1.397, lat: 43.664}, // Hossegor
    {long: 3.075, lat: 50.640}, // Lille
    {long: -3.83, lat: 48}, // Morlaix
];*/

// Select the svg area and add circles:
d3.select("#mapid")
    .select("svg")
    .selectAll("myCircles")
    .data(json)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
    .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
    .attr("r", 14)
    .style("fill", "red")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("fill-opacity", .4)

// Function that update circle position if something change
function update() {
    d3.selectAll("circle")
        .attr("cx", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
        .attr("cy", function(d){ return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
}

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update);
    });