
import * as st from "/cado/javascripts/util/local-storage-key-data.js"
import { CADO_API_URL } from "/cado/javascripts/util/api.js"

export default class Map {

    constructor(mapid, polygon = [], center = [0.42185, 9.4450316], zoom = 19) {
        this._draw = 'no';
        this._osm = L.map(mapid).setView(center, zoom);
        this._polygon = polygon;
        this.last_polygon = null;
        
        this.createPolygon();

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18,
        }).addTo(this._osm);

        this._osm.on('click', (e) => {
            if (this._draw === 'yes') {
                this.sendPolygonToServer(e.latlng.lat, e.latlng.lng, 'add');
                this._polygon.push([e.latlng.lat, e.latlng.lng]);
                this.createPolygon();
            }
        });
    }

    searchLocation(query, callback = () => { }) {
        const url = 'https://nominatim.openstreetmap.org/search?q=' + query + '&format=json';
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                //Set map center
                if (data[0] !== undefined) {
                    this._osm.panTo(new L.LatLng(data[0].lat, data[0].lon));
                }
                callback(data);
            })
            .catch((error) => console.log(error));
    }

    startDraw() {
        this._draw = 'yes';
    }

    stopDraw() {
        this._draw = 'no';
    }

    removeLastPolygonsPoint() {
        console.log('remove polygon point');
        this._polygon.pop();
        this.createPolygon();
        this.sendPolygonToServer(-1, -1, 'remove');
    }

    createPolygon() {
        if (this.last_polygon !== null) {
            this._osm.removeLayer(this.last_polygon);
        }
        this.last_polygon = new L.polygon(this._polygon);
        this.last_polygon.addTo(this._osm);
    }

    sendPolygonToServer(lat, lng, action) {
        const url = CADO_API_URL + '/api/zone';

        fetch(url, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': window.localStorage.getItem(st.KEY_AUTHENTIFICATION_TOKEN)
            }),
            body: JSON.stringify({ lat, lng, action,
                pid: window.localStorage.getItem(st.KEY_USER_PROJECT_ID) })
        }).then(response => response.json())
        .then((data) => {
            console.log(data);
        });
    }

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