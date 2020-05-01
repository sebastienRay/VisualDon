import { select } from 'd3'

// importer les données directement du fichier
import data from '../dist/earthquake.json'
import {jsdelivr} from "d3/dist/package";
import L from "leaflet";

export default mapTWENTY => {
    const div = select(`#${mapTWENTY}`);
    export const mapFIX = L.map(id).setView([47, 2], 2);

}

// la couche SVG de leaflet
const svgLayer = L.svg().addTo(mapFIX);

// map

// le fond de carte
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
    }).addTo(mapFIX);

// traduire les coordonnées en position sur la couche SVG
const getLeafletPosition = d => mapFIX.latLngToLayerPoint([d.latitude, d.longitude]);


console.log("TEST");
// ELEMENTS

// prendre la couche svg "leaflet" avec "d3"
const svg = select(svgLayer._container);


//taille des bulles en fonction de l'intensité du seisme
function taille (size){
    data.filter(d => d === size);
    return size.eq_primary;
}

// une fonction pour créer les cercles
// elle prends les données par année
const createCircles = data =>
    svg.selectAll('circle')
        .data(data, d => d.id)
        .enter()
        .append('circle')
        .attr('cx', d => getLeafletPosition(d).x)
        .attr('cy', d => getLeafletPosition(d).y)
        .attr("r", taille)
        .style("fill", "red")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4);

// EVENEMENTS


// quand le "slider" change

// repositionner les cercles sur la carte quand tu zoom la carte
mapFIX.on('moveend', () => {
    svg.selectAll('circle')
        .attr('cx', d => getLeafletPosition(d).x)
        .attr('cy', d => getLeafletPosition(d).y)
});
