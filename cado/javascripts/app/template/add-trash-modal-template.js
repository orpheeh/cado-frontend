import { CADO_API_URL } from "/cado/javascripts/util/api.js";

export function loadTrashModal(token, container){

    //Load all waste type and put it on select;
    
    fetch(CADO_API_URL + '/api/poubelles', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            if(data.status === 200){
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

export function loadModal(token, select_unit, waste_container){
    fetch(CADO_API_URL + '/api/units', {
        method: 'get',
        headers: new Headers([
            ['Content-Type', 'application/json'],
            ['authorization', 'Access browserBearer ' + token]]),
    }).then((response) => response.json())
        .then((data) => {
            if(data.status === 200){

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