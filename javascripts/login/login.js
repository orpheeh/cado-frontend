import header_template from "../home/main-header-template.js"
import load_header from "../util/header-loader.js"
import login from "./login-service.js"

window.addEventListener('load', function () {
    //Add header on to the home page of cado web site
    load_header(header_template());
    this.document.getElementById('login-btn').addEventListener('click', () => {
        //Perform login
        const user = getAuthInformation();
        if (verifyInformationIntegrity(user)) {
            login(user.username, user.password);
        }
    });
    //Remove invalide input after change
    removeInvalideInput();
});

function verifyInformationIntegrity(user) {
    let result = true;
    if (user.username === '') {
        inputError('username', 'Vous devez remplir ce champ');
        result = false;
    }
    if (user.password === '') {
        inputError('password', 'Vous devez remplir ce champ');
        result = false;
    }
    return result;
}

function getAuthInformation() {
    return {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
}

function inputError(id, message) {
    document.getElementById(id).classList.add('invalide-input');
    document.querySelector('label[for=' + id + ']').innerHTML = message;
}

function removeInvalideInput() {
    //Remove invalide-input after change
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => {
            inputs[i].classList.remove('invalide-input');
            document.querySelector('label[for=' + inputs[i].id + ']').innerHTML = '';
        });
    }
}