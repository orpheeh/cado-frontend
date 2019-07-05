import header_template from "/cado/javascripts/home/main-header-template.js"
import load_header from "/cado/javascripts/util/header-loader.js"
import * as storage from "/cado/javascripts/util/local-storage-key-data.js"

window.addEventListener('load', function(){
    
    //Verify if user are authenticate
    if(this.window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN) !== null){
        this.window.location ="/views/app-pages/app-home.html";
    }

    //Add header on to the home page of cado web site
    load_header(header_template());

    //Only Little screen
    this.document.getElementById('humberger').onclick = () => {
        const navItem = this.document.querySelectorAll('.nav-bar-item');
        navItem.forEach(element => {
            if(!element.classList.contains('little-media-only')){
                element.classList.toggle('nav-item-show');
            }
        });
    }
});