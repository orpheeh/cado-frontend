import { CADO_API_URL } from "/cado/javascripts/util/api.js";

export function create_project(title, token, callback = () => { }) {

    fetch(CADO_API_URL + '/api/project', {
        method: 'post',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
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

export function get_all_projects(token, callback = () => { }) {
    fetch(CADO_API_URL + '/api/projects', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            callback(data);
        });
}

export function create_mobile_app(token, pid, callback = () => { }) {
    console.log(pid);
    fetch(CADO_API_URL + '/api/mobile', {
        method: 'post',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
        body: JSON.stringify({ pid }),
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            callback(data);
        })
        .catch((error) => {
            console.log('error: ' + error);
        });;
}

export function find_project(pid, token, callback = () => { }) {
    fetch(CADO_API_URL + '/api/project/' + pid, {
        method: 'get',
        headers: new Headers({
            'authorization': 'Access browserBearer ' + token
        }),
    }).then(response => response.json())
        .then((data) => {
            console.log(data);
            callback(data);
        });
}