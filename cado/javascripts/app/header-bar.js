import * as storage from "/cado/javascripts/util/local-storage-key-data.js"

export function toDoOnWindowsLoad() {
    //Logout the app
    document.getElementById('logout-button').addEventListener('click', () => {
        window.localStorage.removeItem(storage.KEY_AUTHENTIFICATION_TOKEN);
        window.localStorage.removeItem(storage.KEY_USER_ID);
        window.localStorage.removeItem(storage.KEY_USER_EMAIL);
        window.localStorage.removeItem(storage.KEY_USER_USERNAME);
        window.localStorage.removeItem(storage.KEY_USER_PROJECT_ID);
        window.localStorage.removeItem(storage.KEY_USER_PROJECT_TITLE);
        window.localStorage.removeItem(storage.KEY_USER_PROJECT_DESCRIPTION);
        window.location = "/cado/index.html";
    });
    //Show dropdown profil
    document.getElementById('username').onclick = () => {
        document.querySelector('#profil-dd').classList.add('dd-active');
    }
}

export function toDoOnWindowsClick(e) {
    const dds = document.querySelectorAll('.dd');
    dds.forEach((dd) => {
        const id = dd.classList[0].split('dd-parent-')[1];
        if (e.target.id.toString() !== id) {
            dd.classList.remove('dd-active');
        }
    });
}