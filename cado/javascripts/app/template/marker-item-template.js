import { delete_marker } from "/cado/javascripts/app/project.js"
import * as storage from "/cado/javascripts/util/local-storage-key-data.js"

export default (title, details, lat, lng, _id, map, marker_index) => {
    const template = `
    <div class="marker-item">
        <h1><span class="marker-item-title">title</span> <span class="delete-marker">&times;<span></h1>
        <h2 class="marker-item-latlng">latitude: <span class="lat"></span>, longitude: <span class="lng"><span></h2>
        <p class="marker-item-details">details...</p>
    </div>
    `;
    const dom = new DOMParser();
    const doc = dom.parseFromString(template, "text/html");
    doc.querySelector('.marker-item-title').innerHTML = title;
    doc.querySelector('.marker-item-details').innerHTML = details;
    doc.querySelector('.lat').innerHTML = lat;
    doc.querySelector('.lng').innerHTML = lng;

    const item = doc.querySelector('.marker-item');

    doc.querySelector('.delete-marker').onclick = () => {
        delete_marker(window.localStorage.getItem(storage.KEY_USER_PROJECT_ID),
            _id,
            window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
            (data) => {
                //If OK, Remove from list;
                if (data.status === 200) {
                    item.remove();
                    map.removeMarker(marker_index);
                }
                console.log(data);
            });
    }

    item.onclick = () => {
        map.centerMapTo(lat, lng);
    }

    return item;
}
