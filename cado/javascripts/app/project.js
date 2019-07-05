import { CADO_API_URL } from "/cado/javascripts/util/api.js";

export function create_project(title, token, callback = ()=>{}){

    fetch(CADO_API_URL + '/api/project', {
        method: 'post',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', token] ]),
        body: JSON.stringify({
            title
        })
    }).then((response) => response.json())
    .then((data) => {
        //callback
        console.log(data);
        callback(data);
    })
    .catch((error) => {
        console.log('error: ' + error);
    });
}

export function get_all_projects(token, callback = ()=>{}){
    fetch(CADO_API_URL + '/api/project', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', token] ]),
    }).then((response) => response.json())
    .then((data)=>{
        callback(data);
    });
}