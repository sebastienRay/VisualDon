import L from 'leaflet'

// la carte "leaflet"
export const map = L.map('mapid').setView([47, 2], 2)

// le fond de carte
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 6,
    }).addTo(map);

// la couche SVG de leaflet
export const svgLayer = L.svg().addTo(map);

// traduire les coordonnées en position sur la couche SVG
export const getLeafletPosition = d => map.latLngToLayerPoint([d.latitude, d.longitude]);