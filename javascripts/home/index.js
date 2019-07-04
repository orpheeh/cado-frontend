import header_template from "./main-header-template.js"
import load_header from "../util/header-loader.js"

window.addEventListener('load', function(){
    
    //Add header on to the home page of cado web site
    load_header(header_template());
});