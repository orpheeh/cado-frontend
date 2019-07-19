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
    fetch(CADO_API_URL + '/api/mobile', {
        method: 'post',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
        body: JSON.stringify({ pid }),
    }).then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
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
            callback(data);
        });
}

export function delete_marker(pid, marker_id, token, callback = () => { }) {
    fetch(CADO_API_URL + '/api/mobile/marker', {
        method: 'delete',
        headers: new Headers({
            'content-type': 'application/json',
            'authorization': 'Access browserBearer ' + token
        }),
        body: JSON.stringify({ pid, marker_id }),
    }).then(response => response.json())
        .then((data) => {
            callback(data);
        });
}
