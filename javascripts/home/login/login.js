import header_template from "/javascripts/home/main-header-template.js"
import login from "/javascripts/home/login/login-service.js"
import load_header from "/javascripts/util/header-loader.js"

window.addEventListener('load', function () {
    //Add header on to the home page of cado web site
    load_header(header_template());
    this.document.getElementById('login-btn').addEventListener('click', (e) => {
        e.target.innerHTML = '<li class="fa fa-spinner fa-spin"></li> Connexion en cour';
        //Perform login
        const user = getAuthInformation();
        if (verifyInformationIntegrity(user)) {
            login(user.username, user.password, (data) => onLoginResponse(data, e));
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
    if(result === false){
        document.getElementById('login-btn').innerHTML = 'Connexion';
    }
    return result;
}

function getAuthInformation() {
    const passwdField = document.getElementById('password');
    const result = {
        username: document.getElementById('username').value,
        password: passwdField.value
    }
    passwdField.value = '';
    return result;
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

function onLoginResponse(data, event){
    if(data.status === 401){
        inputError('username', "Ce nom d'utilisateur n'est pas reconnu");
        event.target.innerHTML = 'Connexion';

    } else if(data.status === 403){
        inputError('password', "Mode de passe incorrecte");
        event.target.innerHTML = 'Connexion';
    }
}