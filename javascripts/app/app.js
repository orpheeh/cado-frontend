import header_template from "./header-template.js"
import load_header from "../util/header-loader.js"
import * as storage from "../util/local-storage-key-data.js"
import map_loader from "./map.js"

window.addEventListener('load', ()=> {
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

function setTitle(title){
    document.querySelector('.project-title a').innerHTML = title;
    document.querySelector('head title').innerHTML = title + ' | CADO';
}