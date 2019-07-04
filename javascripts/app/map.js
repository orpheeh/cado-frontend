
export default function loadMap(mapid) {
    let mymap = L.map(mapid).setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
    }).addTo(mymap);
}

/**
 * LEAFLET TUTORIAL
 * 
 * Add marker on map
 * let marker = L.marker([51.5, -0.09]).addTo(mymap);
 * 
 * Add circle on map
 * let circle = L.circle([51.508, -0.11], {
 *    color: 'red',
 *    fillColor: '#f03',
 *    fillOpacity: 0.5,
 *    radius: 500
 * }).addTo(mymap);
 * 
 * Add polygon on map
 * let polygon = L.polygon([
 *   [51.509, -0.08],
 *   [51.503, -0.06],
 *   [51.51, -0.047]
 * ]).addTo(mymap);
 * 
 * Add popup
 * var popup = L.popup()
 *   .setLatLng([51.5, -0.09])
 *   .setContent("I am a standalone popup.")
 *   .openOn(mymap);
 * We can also add popup on marker, circle or polygon
 * 
 * Leaflet Event
 * function onMapClick(e) {
 *      popup
 *       .setLatLng(e.latlng)
 *       .setContent("You clicked the map at " + e.latlng.toString())
 *       .openOn(mymap);
 * }
 * mymap.on('click', onMapClick);
 */