import data from '../dist/earthquake.json'
import L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import 'leaflet.heat'

export default mapALL => {
    //Leaflet
    const map = L.map(mapALL).setView([47, 2], 2);
    let baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        }
    );

    // ajouter le fond de carte à "map"
    baseLayer.addTo(map);
    // couche heatmap
    const heat = L.heatLayer(data.map(d => ([
        d.latitude, // latitude
        d.longitude, // longitude
        20// intensité entre 0 et 1
    ])));
    heat.addTo(map)

}