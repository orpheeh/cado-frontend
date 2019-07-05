import { CADO_API_URL } from "../../util/api.js"

export default function register(username, email, password, callback = ()=>{}) {

    fetch(CADO_API_URL + '/api/register', {
        method: 'post',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({
            username, email, password
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        callback(data);
    }).catch((error) => {
        console.log(error);
    });
}