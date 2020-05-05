import {select} from 'd3'

import data from '../dist/earthquake.json'
import L from "leaflet";
import d3Tip from "d3-tip";
import {map} from "./index";
let tip = d3Tip;


export default mapTWENTY => {
    const mapFIX = L.map(mapTWENTY).setView([47, 2], 2);

// map

// le fond de carte
    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 6,
        }).addTo(mapFIX);


    const svgLayer2 = L.svg().addTo(mapFIX);

// traduire les coordonnées en position sur la couche SVG
    const getLeafletPosition = d => mapFIX.latLngToLayerPoint([d.latitude, d.longitude]);

// une fonction pour aller chercher les données par année
    const twentyBEST = twenty =>
            data.sort((a, b) => a.eq_primary > b.eq_primary ? -1 : 1).filter((d, i) => i < 11);



// ELEMENTS

// prendre la couche svg "leaflet" avec "d3"
    const svg2 = select(svgLayer2._container);



//taille des bulles en fonction de l'intensité du seisme
    function taille(size) {
        data.filter(d => d === size);
        return size.eq_primary * size.eq_primary / 2;
    }

// une fonction pour créer les cercles
// elle prends les données par année
    const createCircles = data =>
        svg2.selectAll('circle')
            .data(data, d => d.id)
            .enter()
            .append('circle')
            .attr('cx', d => getLeafletPosition(d).x)
            .attr('cy', d => getLeafletPosition(d).y)
            .attr("r", taille)
            .style("fill", "red")
            .attr("fill-opacity", .4)
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide);

//TOOLTIPS
    let tool_tip = tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "TEST"; });
    svg2.call(tool_tip);
// EVENEMENTS

// repositionner les cercles sur la carte quand tu zoom la carte
    mapFIX.on('moveend', () => {
        svg2.selectAll('circle')
            .attr('cx', d => getLeafletPosition(d).x)
            .attr('cy', d => getLeafletPosition(d).y)
    });

    createCircles(twentyBEST(twenty));
}