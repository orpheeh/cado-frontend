import { CADO_API_URL } from "../util/api.js"
import { KEY_AUTHENTIFICATION_TOKEN } from "../util/local-storage-key-data.js"

export default function login(user, password, callback = ()=>{}) {
    fetch(CADO_API_URL + '/api/auth', {
        method: 'post',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
            user, password
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        callback(data);
        if(data.status === 200){
            window.localStorage.setItem(KEY_AUTHENTIFICATION_TOKEN, data.token);
            window.location = "app-home.html";
        }
    });
}