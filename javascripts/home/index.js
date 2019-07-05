import header_template from "/javascripts/home/main-header-template.js"
import load_header from "/javascripts/util/header-loader.js"
import * as storage from "/javascripts/util/local-storage-key-data.js"

window.addEventListener('load', function(){
    
    //Verify if user are authenticate
    if(this.window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN) !== null){
        this.window.location ="/views/app-pages/app-home.html";
    }

    //Add header on to the home page of cado web site
    load_header(header_template());
});