import header_template from "/cado/javascripts/app/header-template.js"
import map_loader from "/cado/javascripts/app/map.js"
import load_header from "/cado/javascripts/util/header-loader.js"
import * as storage from "/cado/javascripts/util/local-storage-key-data.js"
import { toDoOnWindowsLoad, toDoOnWindowsClick } from "/cado/javascripts/app/header-bar.js"

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

    //Show map
    map_loader('map-view-id');

    //Header bar action on load
    toDoOnWindowsLoad();

    window.addEventListener('click', (e) => {
        //Header bar action on click
        toDoOnWindowsClick(e);
    });
});

function setTitle(title) {
    document.querySelector('.project-title a').innerHTML = title;
    document.querySelector('head title').innerHTML = title + ' | CADO';
}