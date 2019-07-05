import header_template from "/javascripts/app/header-template.js"
import map_loader from "/javascripts/app/map.js"
import load_header from "/javascripts/util/header-loader.js"
import * as storage from "/javascripts/util/local-storage-key-data.js"

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
});

function setTitle(title) {
    document.querySelector('.project-title a').innerHTML = title;
    document.querySelector('head title').innerHTML = title + ' | CADO';
}