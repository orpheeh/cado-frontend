import header_template from "/cado/javascripts/app/header-template.js"
import Map from "/cado/javascripts/app/map.js"
import load_header from "/cado/javascripts/util/header-loader.js"
import * as storage from "/cado/javascripts/util/local-storage-key-data.js"
import { toDoOnWindowsLoad, toDoOnWindowsClick } from "/cado/javascripts/app/header-bar.js"
import { find_project, create_mobile_app } from "/cado/javascripts/app/project.js"
import marker_template from "/cado/javascripts/app/template/marker-item-template.js"
import { loadModal, loadTrashModal, createDispositif, displayTrash } from "/cado/javascripts/app/template/add-trash-modal-template.js"


window.addEventListener('load', () => {
    //Verify Authorization
    if (window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN) === null) {
        document.body.innerHTML = "<h1>404 Not Found</h1>";
        return false;
    }

    //Load the header of app
    load_header(header_template());

    //Show first letter of username on #username
    document.getElementById('username').innerHTML = window.localStorage
        .getItem(storage.KEY_USER_USERNAME).charAt(0);

    //Show project title
    setTitle(window.localStorage.getItem(storage.KEY_USER_PROJECT_TITLE));

    let _map = null;

    //load zone
    find_project(window.localStorage.getItem(storage.KEY_USER_PROJECT_ID),
        window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
        (data) => {
            if (data.status === 200) {
                const polygon = loadZone(data.project);
                const markers = loadMarker(data.project);
                //Show map
                _map = new Map('map-view-id', polygon, markers);
                //Show markers view on right map menu
                showMarker(markers, _map);
                //Load mobiles
                const list = document.querySelector('.mobile-list');
                data.project.mobiles.apps.forEach(e => {
                    const li = document.createElement('li');
                    li.innerHTML = 'P' + data.project.pid + 'M' + e.mid;
                    list.appendChild(li);
                });
                displayTrash(window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN), all_trash, _map);

            }
        });


    //Search country where you want to manage waste
    document.getElementById('search-lt-lg').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            e.target.classList.add('header-input-loading');
            _map.searchLocation(e.target.value, (data) => {
                e.target.classList.remove('header-input-loading');
                if (data[0] !== undefined) {
                    e.target.value = data[0].display_name;
                } else {
                    e.target.value = '';
                }
            });
        }
    });

    //Actived zone edit menu
    document.getElementById('z-edit-button').addEventListener('click', () => {
        closeAllFixedMenu();
        const zone_menu = document.querySelector('.zone-menu');
        zone_menu.style.display = "block";
        _map.startDraw();
    });

    //Desactived zone edit menu
    document.querySelector('.zone-menu .title').onclick = () => {
        closeAllFixedMenu();
        _map.stopDraw();
    }

    //Actived mobile menu
    document.getElementById('z-mobile-button').addEventListener('click', () => {
        closeAllFixedMenu();
        const mobile_menu = document.querySelector('.mobile-menu');
        mobile_menu.style.display = "block";
        _map.stopDraw();
    });

    //Actived trash menu
    document.getElementById('z-trash-manage-button').addEventListener('click', () => {
        closeAllFixedMenu();
        const trash_menu = document.querySelector('.trash-menu');
        trash_menu.style.display = "block";
        _map.stopDraw();
    });

    //Add trash button onClick
    document.querySelector('.add-trash-button').addEventListener('click', () => {
        const poubelle_type_container = document.querySelector('.poubelle-type-select');
        loadTrashModal(window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN), poubelle_type_container);
    });

    //Desactived trash menu
    document.querySelector('.trash-menu .title').onclick = () => closeAllFixedMenu();

    //Desactived mobile menu
    document.querySelector('.mobile-menu .title').onclick = () => closeAllFixedMenu();

    //Active Map manager menu
    document.getElementById('z-map-manage-button').addEventListener('click', () => {
        closeAllFixedMenu();
        const map_menu = document.querySelector('.map-menu');
        map_menu.style.display = "block";
        _map.stopDraw();
    });

    //Open Modal
    document.getElementById('add-trash-button').onclick = () => {
        document.querySelector('.add-trash-modal').style.display = "block";

        const select_unit = document.querySelector('.trash-unit-select');
        const poubelle_type_container = document.querySelector('.poubelle-type-select');

        while (poubelle_type_container.firstChild) {
            poubelle_type_container.removeChild(poubelle_type_container.firstChild);
        }
        loadModal(window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN), select_unit, poubelle_type_container);
    }

    //Close modal
    document.querySelectorAll('.modal').forEach((modal) => {
        modal.onclick = function (e) {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        }
    });

    //Ajouter un dispositif
    document.querySelector('.button-add-dispositif').addEventListener('click', (e) => {
        const select_unit = document.querySelector('.trash-unit-select');
        const poubelle_type_container = document.querySelector('.poubelle-type-select');
        createDispositif(window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
            poubelle_type_container, select_unit,
            document.querySelector('#dispo-name').value,
            document.querySelector('.quantity-unit').value
        );
    });

    //Show all dispositif
    const all_trash = document.querySelector('.all-trash');
    while (all_trash.firstChild) {
        all_trash.removeChild(all_trash.firstChild);
    }

    //Desactived map menu
    document.querySelector('.map-menu .title').onclick = () => closeAllFixedMenu();

    //Remove last point on polygon zone
    document.getElementById('z-rm-last-pt').onclick = () => _map.removeLastPolygonsPoint();

    //Create mobile app
    document.getElementById('z-create_mob').onclick = () => create_mobile_app(
        window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
        window.localStorage.getItem(storage.KEY_USER_PROJECT_ID),
        (data) => {
            if (data.status === 200) {
                const li = document.createElement('li');
                li.innerHTML = 'P' + data.update.pid + 'M' + data.update.mobiles.counter;
                document.querySelector('.mobile-list').appendChild(li);
            }
        });

    //Header bar action on load
    toDoOnWindowsLoad();

    window.addEventListener('click', (e) => {
        //Header bar action on click
        toDoOnWindowsClick(e);
    });
});

function setTitle(title) {
    document.querySelector('#project-title').innerHTML = title;
    document.querySelector('head title').innerHTML = title + ' | CADO';
}

function loadZone(project) {
    let polygon = [];
    project.zone.forEach(element => {
        polygon.push([element.lat, element.lng]);
    });
    return polygon;
}

function loadMarker(project) {
    let markers = [];
    project.markers.forEach(marker => {
        markers.push({ latlng: [marker.lat, marker.lng], popup: "<b>" + marker.title + "</b><br/>" + marker.details, _id: marker._id, title: marker.title, details: marker.details });
    });

    return markers;
}

function showMarker(markers, map) {
    const marker_list_html = document.querySelector('.markers-list');
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        marker_list_html.appendChild(marker_template(marker.title, marker.details, marker.latlng[0], marker.latlng[1], marker._id, map, i));
    }
}

function closeAllFixedMenu() {
    const fms = document.querySelectorAll('.fixed-menu');
    fms.forEach(fm => {
        fm.style.display = "none";
    });
}