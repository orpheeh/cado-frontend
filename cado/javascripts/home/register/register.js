import header_template from "/cado/javascripts/home/main-header-template.js"
import register from "/cado/javascripts/home/register/register-service.js"
import login from "/cado/javascripts/home/login/login-service.js"
import load_header from "/cado/javascripts/util/header-loader.js"

const REGISTER_BUTTON_MESSAGE_LOGIN = '<li class="fa fa-spinner fa-spin"></li> Connexion en cours';
const REGISTER_BUTTON_MESSAGE_REGISTER = '<li class="fa fa-spinner fa-spin></li> Inscription en cours';
const REGISTER_BUTTON_MESSAGE_NORMAL = "Je m' inscris";

const EMAIL_EXIST_MESSAGE = "'Cette E-mail existe déjà";
const USERNAME_EXIST_MESSAGE = "Cet utilisateur existe déjà";
const EMPTY_FIELD_MESSAGE = "Ce champ ne doit pas être vide";

window.addEventListener('load', () => {
    //Add header on of register.html
    load_header(header_template());

    //On register button click do request create account
    const register_button = document.getElementById('register-btn');
    register_button.addEventListener('click', () => {
        //Get All user information from register form
        const user = getUserInformation();
        //Verify user's password match
        if (verifyInformationItegrity(user) &&
            verifyPasswordMatch(user.password, user.password_conf)) {
            //Register
            register_button.innerHTML = REGISTER_BUTTON_MESSAGE_REGISTER;
            register(user.username, user.email, user.password,
                (data) => onRegisterRequestResponse(data, user));
        }
    });

    //Remove invalid invalid input style on user informations form field
    removeInvalideInput();

    //Only Little screen
    document.getElementById('humberger').onclick = () => {
        const navItem = document.querySelectorAll('.nav-bar-item');
        navItem.forEach(element => {
            if (!element.classList.contains('little-media-only')) {
                element.classList.toggle('nav-item-show');
            }
        });
    }
});

function verifyPasswordMatch(pass1, pass2) {
    if (pass1 !== pass2) {
        inputError('password_conf', "Oups! Ce mot de passe est différent du précédent");
    }
    return pass1 === pass2;
}

function verifyInformationItegrity(user) {
    let result = true;
    if (user.username === '') {
        inputError('username', EMPTY_FIELD_MESSAGE);
        result = false;
    }
    if (user.password === '') {
        inputError('password', EMPTY_FIELD_MESSAGE);
        result = false;
    }
    if (user.password_conf === '') {
        inputError('password_conf', EMPTY_FIELD_MESSAGE);
        result = false
    }
    if (user.email === '') {
        inputError('email', EMPTY_FIELD_MESSAGE);
        result = false;
    }
    return result;
}

function getUserInformation() {
    return {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        password_conf: document.getElementById('password_conf').value,
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

function onRegisterRequestResponse(data, user) {
    const register_button = document.getElementById('register-btn');
    if (data.status === 200) {
        register_button.innerHTML = REGISTER_BUTTON_MESSAGE_LOGIN;
        login(user.username, user.password, () => { });
    } else if(data.status === 403){
        if (data.err.errmsg.includes('email')) {
            inputError('email', EMAIL_EXIST_MESSAGE);
        }
        if (data.err.errmsg.includes('username')) {
            inputError('username', USERNAME_EXIST_MESSAGE);
        }
        register_button.innerHTML = REGISTER_BUTTON_MESSAGE_NORMAL;
    } else {

        //TODO remove it
        console.log('Server error');
        console.log(data);
        register_button.innerHTML = 'Oups! Erreur, contactez Orphée';
        register_button.style.color = 'red';
        register_button.style.backgroundColor = 'white';
    }
}