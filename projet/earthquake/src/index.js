import { select } from 'd3'
import { map, svgLayer, getLeafletPosition } from './map'
import {setBubble} from './bubble'
import 'css/style.css';

// DONNEES

// importer les données directement du fichier
import data from '../dist/earthquake.json'
import {jsdelivr} from "d3/dist/package";

// une fonction pour aller chercher les données par année
const getDataByYear = year =>
    data.filter(d => d.year === year);


// ELEMENTS

// prendre la couche svg "leaflet" avec "d3"
const svg = select(svgLayer._container)

// le "slider"
const input = document.getElementById('year-input')

//taille des bulles en fonction de l'intensité du seisme
function taille (size){
    data.filter(d => d === size);
    console.log(size.eq_primary)
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
        .attr("fill-opacity", .4)

// EVENEMENTS

// quand l'année change
const onYearChange = year => {
    svg.selectAll('circle').remove() // enlever les cercles existants
    createCircles(getDataByYear(year)) // ajouter les cercles pour l'année
}

// quand le "slider" change
input.addEventListener('input', e => onYearChange(Number(e.target.value)))

// repositionner les cercles sur la carte quand tu zoom la carte
map.on('moveend', () => {
    svg.selectAll('circle')
        .attr('cx', d => getLeafletPosition(d).x)
        .attr('cy', d => getLeafletPosition(d).y)
})

// montrer les cercles pour 2020 quand la page charge
window.addEventListener('load', () => onYearChange(2020))

// bubbles

