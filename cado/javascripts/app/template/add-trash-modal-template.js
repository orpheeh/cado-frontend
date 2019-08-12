import { CADO_API_URL } from "/cado/javascripts/util/api.js";

export function loadTrashModal(token, container) {

    //Load all waste type and put it on select;

    fetch(CADO_API_URL + '/api/poubelles', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                const dispositifs = document.createElement('select');

                data.poubelles.forEach((dechet) => {
                    const options = document.createElement('option');
                    options.value = dechet._id;
                    options.innerHTML = dechet.name;
                    dispositifs.appendChild(options);
                });
                container.appendChild(dispositifs);
            } else {
                console.log('Erreur lors du chargement des dispositifs');
            }
        });

}

export function loadModal(token, select_unit, waste_container) {
    fetch(CADO_API_URL + '/api/units', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {

                data.units.forEach((unit) => {
                    const options = document.createElement('option');
                    options.value = unit._id;
                    options.innerHTML = unit.name;
                    select_unit.appendChild(options);
                });
            } else {
                console.log('Erreur lors du chargement des unités');
            }
        });

    loadTrashModal(token, waste_container);
}

export function createDispositif(token, select_poubelles, select_unit, name, quantities) {
    const poubelles = [];
    for (let i = 0; i < select_poubelles.children.length; i++) {
        const select = select_poubelles.children[i];
        poubelles.push({
            poubelle: select.value
        });
    }
    const unit = select_unit.value;

    fetch(CADO_API_URL + '/api/dispositif', {
        method: 'post',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
        body: JSON.stringify({ poubelles, unit, name, quantities })
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                console.log(data.newDispositif);
                document.querySelector('.modal').style.display = "none";
            } else {
                console.log('Erreur lors du chargement des dispositifs');
            }
        });
}

export function displayTrash(token, trash_container, map) {
    fetch(CADO_API_URL + '/api/dispositifs', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                console.log(data.dispositifs);
                data.dispositifs.forEach((dispositif) => {
                    const template = `
                    <div class="trash-item">
                        <div class="top">
                            <h1 class="poubelle-name"></h1>
                            <span class="delete-dispositif">&times;</span>
                        </div>
                        <h1 class="poubelle-count"></h1>
                        <div class="bottom">
                            <label for="trahs-lat-lng">Marquer le dispositif</label>
                            <input type="checkbox" id="trash-lat-lng"/>
                            <button class="qrcode-generator">QR code</button>
                        </div>
                    </div>
                `;

                    //Add all marker on map
                    map.addMarker(dispositif.lat, dispositif.lng, 'Dispositif (Non déployé)', dispositif.name);

                    const trash_item = new DOMParser().parseFromString(template, 'text/html').querySelector('.trash-item');
                    trash_item.addEventListener('click', () => {
                        if(dispositif.lat < 0)
                            return;
                        map.centerMapTo(dispositif.lat, dispositif.lng);
                    });
                    trash_item.querySelector('.poubelle-count').innerHTML = dispositif.poubelles.length + ' poubelles';
                    if(dispositif.isDeploy === 0){
                        trash_item.querySelector('.poubelle-count').classList.add('trash-is-not-deploy');
                    }
                    trash_item.querySelector('.delete-dispositif').addEventListener('click', () => {
                        //Delete current dispositif
                        console.log('delete dispositif ' + dispositif._id );
                        deleteDispositif(token, dispositif._id, trash_item, trash_container);
                    });
                    trash_item.querySelector('#trash-lat-lng').addEventListener('click', (e) => {
                        //Update lat lng
                        if(e.target.checked){
                            map.changeDispositifMarker(dispositif._id);
                        } else {
                            map.changeDispositifMarker("none");
                        }
                    });
                    trash_item.querySelector('.poubelle-name').innerHTML = dispositif.name;
                    trash_item.querySelector('.qrcode-generator').addEventListener('click', () => {
                        //Generate QR Code and show it on modal
                        document.querySelector('.qrcode-modal').style.display = "block";
                        const qrcode_container = document.querySelector('#qrcode-canvas');
                        while (qrcode_container.firstChild) {
                            qrcode_container.removeChild(qrcode_container.firstChild);
                        }
                        var qrcode = new QRCode("qrcode-canvas", {
                            width: 128,
                            height: 128,
                            colorDark : "#000000",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        });
                        qrcode.makeCode(dispositif._id);
                    });
                    trash_container.appendChild(trash_item);
                });
            } else {
                console.log('Erreur lors du chargement des unités');
            }
        });
}

function deleteDispositif(token, id, trash_item, trash_container){
    fetch(CADO_API_URL + '/api/dispositif/' + id, {
        method: 'delete',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                console.log(data);
                trash_container.removeChild(trash_item);
            } else {
                console.log('Erreur lors du chargement des dispositifs');
            }
        });
}