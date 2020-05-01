import { select } from 'd3'

import data from '../dist/earthquake.json'
import {jsdelivr} from "d3/dist/package";
import L from "leaflet";


export default mapTWENTY => {
    const mapFIX = L.map(mapTWENTY).setView([50, -0.1], 4);

// map

// le fond de carte
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
    }).addTo(mapFIX);


}