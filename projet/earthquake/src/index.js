import {select} from 'd3'
import 'css/style.css';
// importer l'indicateur d'année pour le slider
import {} from './bubble';

// importer les données directement du fichier
import data from '../dist/earthquake.json'

//Leaflet
import L from "leaflet";

//MAP TWENTY
import map20 from './mapTWENTY.js'
map20('mapTWENTY');

//MAP TWENTY
import mapALL from './mapALL.js'
mapALL('mapALL');

// la carte "leaflet"
export const map = L.map('mapid').setView([47, 2], 2)


// la couche SVG de leaflet
const svgLayer = L.svg().addTo(map);

// map

// le fond de carte
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
    }).addTo(map);

// traduire les coordonnées en position sur la couche SVG
const getLeafletPosition = d => map.latLngToLayerPoint([d.latitude, d.longitude]);

// une fonction pour aller chercher les données par année
const getDataByYear = year =>
    data.filter(d => d.year === year);


// ELEMENTS

// prendre la couche svg "leaflet" avec "d3"
const svg = select(svgLayer._container);

// le "slider"
const input = document.getElementById('year-input');

//taille des bulles en fonction de l'intensité du seisme
function taille (size){
    data.filter(d => d === size);
    return size.eq_primary * size.eq_primary / 2;
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

// quand l'année change
const onYearChange = year => {
    svg.selectAll('circle').remove() ;// enlever les cercles existants
    createCircles(getDataByYear(year)) // ajouter les cercles pour l'année
};

// quand le "slider" change
input.addEventListener('input', e => onYearChange(Number(e.target.value)));

// repositionner les cercles sur la carte quand tu zoom la carte
map.on('moveend', () => {
    svg.selectAll('circle')
        .attr('cx', d => getLeafletPosition(d).x)
        .attr('cy', d => getLeafletPosition(d).y)
});

// montrer les cercles pour 2020 quand la page charge
window.addEventListener('load', () => onYearChange(2020));

map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.dragging.disable();

//routage
$(window).on("popstate", evt  => {
    let anchor = location.hash;
    anchor = anchor.substr(1);
    if (location.hash == ""){
        anchor = "intro"
    }
    $('.page').hide();
    let page = $(`[name="${anchor}"]`)
    page.show();
});
$(window).trigger("popstate");



