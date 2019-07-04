import header_template from "./main-header-template.js"
import load_header from "../util/header-loader.js"
import * as storage from "../util/local-storage-key-data.js"

window.addEventListener('load', function(){
    
    //Verify if user are authenticate
    if(this.window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN) !== null){
        this.window.location ="./views/app-home.html";
    }

    //Add header on to the home page of cado web site
    load_header(header_template());
});