import astuce from "/cado/javascripts/app/home-astuce-template.js"
import create_project_modal from "/cado/javascripts/app/create-project-modal.js"
import { create_project, get_all_projects } from "/cado/javascripts/app/project.js"
import header_template from "/cado/javascripts/app/header-template.js"
import load_header from "/cado/javascripts/util/header-loader.js"
import { CADO_API_URL } from "/cado/javascripts/util/api.js"
import * as storage from "/cado/javascripts/util/local-storage-key-data.js"
import { toDoOnWindowsLoad, toDoOnWindowsClick } from "/cado/javascripts/app/header-bar.js"

window.addEventListener('load', function () {
    //Verify Authorization
    if (window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN) === null) {
        document.body.innerHTML = "<h1>404 Not Found</h1>";
        return false;
    }

    //Add header on to the project home page of cado app
    load_header(header_template());

    //Get my information from server
    getUserInfo();

    //Load UI
    appHomeNavActionPerform();

    //load Astuces on Home
    //Show astuce
    const a = astuce('http://www.openstreetmap.fr/wp-content/uploads/2019/02/teamwork-puzzle-map-v03-300x176.png',
        '<a href="https://www.openstreetmap.fr" target="_blank" >CADO utilise OpenStreetMap</a>',
        "OpenStreetMap est un projet cartographique, en ligne et mondial. Chacun peut l'actualiser ou l'améliorer. C'est l'équivalent de Wikipedia pour les cartes"
    );
    this.document.querySelector('.home').appendChild(a);

    //Add modal from use for create new project
    const cp = create_project_modal();
    cp.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            cp.classList.remove('display-modal');
        }
    });
    cp.querySelector('.close-modal').onclick = () => cp.classList.remove('display-modal');
    this.document.querySelector('.modal-container').appendChild(cp);

    //Show create project modal after click on app-new-button
    this.document.querySelector('.app-new-button').addEventListener('click', () => {
        cp.classList.add('display-modal');
    });

    //Perform on change listener of project-title on create-project-modal
    this.document.getElementById('project-title').addEventListener('keydown', (e) => {
        this.console.log('key down');
        if (e.target.value.length === 1) {
            this.document.getElementById('create-new-project-button').classList.add('inactive');
        } else {
            this.document.getElementById('create-new-project-button').classList.remove('inactive');
        }
    });

    //Perform action create project on click of create-new-project-button
    this.document.getElementById('create-new-project-button').addEventListener('click', (e) => {
        if (!e.target.classList.contains('inactive')) {
            create_project(this.document.getElementById('project-title').value,
                window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
                (data) => {
                    if (data.status === 200) {
                        this.window.localStorage.setItem(storage.KEY_USER_PROJECT_TITLE, data.newProject.title);
                        this.window.localStorage.setItem(storage.KEY_USER_PROJECT_ID, data.newProject.pid);
                        this.window.location = "app.html";
                    } else {

                    }
                });
        }
    });

    //Load All Projects
    get_all_projects(
        this.window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN),
        loadAllProject);

    //Header bar action on load
    toDoOnWindowsLoad();

    window.addEventListener('click', (e) => {
        //Header bar action on click
        toDoOnWindowsClick(e);
    });
});

function getUserInfo() {
    fetch(CADO_API_URL + '/api/user', {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem(storage.KEY_AUTHENTIFICATION_TOKEN)
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        document.querySelector('#username').innerHTML = data.username.charAt(0);
        document.querySelector('#complet-username').innerHTML = data.username;
        window.localStorage.setItem(storage.KEY_USER_ID, data.uid);
        window.localStorage.setItem(storage.KEY_USER_USERNAME, data.username);
        window.localStorage.setItem(storage.KEY_USER_EMAIL, data.email);
    });
}

function appHomeNavActionPerform() {
    const navItems = document.querySelectorAll('.app-left-nav .app-home-left-nav-button');
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', () => {
            navItems.forEach((item) => item.classList.remove('app-home-left-nav-button-active'));
            navItems[i].classList.add('app-home-left-nav-button-active');
            //Change app-center-content content
            const contents = document.querySelectorAll('.app-center-content .app-center-item');
            contents.forEach((c) => c.classList.remove('app-center-item-show'));
            contents[i].classList.add('app-center-item-show');
        });
    }
}

function loadAllProject(data) {
    const container = document.querySelector('.project .content');
    data.projects.forEach((p) => {
        const a = document.createElement('a');
        a.href = '#';
        a.classList.add('app-project-button');
        a.innerHTML = p.title;
        a.addEventListener('click', () => {
            window.localStorage.setItem(storage.KEY_USER_PROJECT_ID, p.pid);
            window.localStorage.setItem(storage.KEY_USER_PROJECT_TITLE, p.title);
            window.location = "app.html";
        });
        container.appendChild(a);
    })
}