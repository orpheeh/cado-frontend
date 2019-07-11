import header_template from "/cado/javascripts/app/header-template.js"
import Map from "/cado/javascripts/app/map.js"
import load_header from "/cado/javascripts/util/header-loader.js"
import * as storage from "/cado/javascripts/util/local-storage-key-data.js"
import { CADO_API_URL } from "/cado/javascripts/util/api.js"
import { toDoOnWindowsLoad, toDoOnWindowsClick } from "/cado/javascripts/app/header-bar.js"
import { find_project, create_mobile_app } from "/cado/javascripts/app/project.js"

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
                console.log(data);
                const p = loadZone(data.project);
                //Show map
                _map = new Map('map-view-id', p);
                //Load mobiles
                const list = document.querySelector('.mobile-list');
                data.project.mobiles.apps.forEach(e => {
                    const li = document.createElement('li');
                    li.innerHTML = 'P' + data.project.pid + 'M' + e.mid;
                    list.appendChild(li);
                });
            }
        });


    //Search country where you want to manage waste
    document.getElementById('search-lt-lg').addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            e.target.classList.add('header-input-loading');
            _map.searchLocation(e.target.value, (data) => {
                console.log(data);
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
    });

    //Desactived mobile menu
    document.querySelector('.mobile-menu .title').onclick = () => closeAllFixedMenu();

    //Remove last point on polygon zone
    document.getElementById('z-rm-last-pt').onclick = () => _map.removeLastPolygonsPoint();

    //Create mobile app
    document.getElementById('z-create_mob').onclick = () => create_mobile_app(
        window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
        window.localStorage.getItem(storage.KEY_USER_PROJECT_ID),
        (data) => {
            if(data.status === 200){
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

function loadZone(data) {
    let p = [];
    data.zone.forEach(element => {
        p.push([element.lat, element.lng]);
    });
    return p;
}

function closeAllFixedMenu() {
    const fms = document.querySelectorAll('.fixed-menu');
    fms.forEach(fm => {
        fm.style.display = "none";
    });
}