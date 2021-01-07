"use strict"

const socket = io();

socket.on("connection", iConnection => {
    console.log(`Conexion numero ${iConnection}`);
    // peticion para cargar las plantas eolicas
    chargeEolicPlants();
});

socket.on("newPlant", eolicPlant => {
    // peticion para añadir nueva planta eolica
})

function render(data) {
    document.getElementById('eolicPlants').innerHTML = data.map((elem, index) => {
        return (
            `<li>
                <strong>${elem.cityName}</strong>
            </li>`)
    }).join(" ");
}

function addEolicPlant() {
    const cityName = document.getElementById("forCityName").value.trim();
    if (cityName === "") {
        alert("El nombre de la ciudad no puede ser vacio");
    } else {
        alert("Se guarda la planta eolica");
        socket.send({cityName: cityName})
    }
}

function chargeEolicPlants() {
    // llamada ajax al servidor para recoger las plantas eolicas
    read("/eolic/").then(eolicPlants => {
        const eolicPlantsList = document.getElementById("eolic-plants-list");
        eolicPlants.forEach(eolicPlant => {
            const li =
                `<li>
                    <strong>${eolicPlant.cityName}</strong> :: <strong>${eolicPlant.progress}%</strong>
                </li>`;
            eolicPlantsList.innerHTML = eolicPlantsList.innerHTML + `\n${li}`;
        })
    });
}

function save(url, data) {
    return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        fetch(url, {
            "headers": headers,
            "method": "POST",
            "body": JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                return resolve(data);
            })
    });
}

function read(url) {
    return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        fetch(url, {
            "headers": headers
        })
            .then(response => response.json())
            .then(data => {
                return resolve(data);
            })
    });
}