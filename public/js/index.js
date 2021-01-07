"use strict"

const socket = io();

socket.on("connection", function () {
    console.log("Nuevo cliente conectado! =]");
    rechargeEolicPlants();
});

socket.on("newPlant", function () {
    rechargeEolicPlants();
});

function addEolicPlant() {
    const cityName = document.getElementById("forCityName").value.trim();
    if (cityName === "") {
        alert("El nombre de la ciudad no puede ser vacio");
    } else {
        save("/eolic/", {cityName: cityName})
            .then(eolicPlant => {
                socket.emit("newPlant", eolicPlant.cityName); // envia evento al servidor para que los demas recarguen
            });
    }
}

function rechargeEolicPlants() {
    // llamada ajax al servidor para recoger las plantas eolicas
    read("/eolic/").then(eolicPlants => {
        const eolicPlantsList = document.getElementById("eolic-plants-list");
        let innerHTML = "";
        eolicPlants.forEach(eolicPlant => {
            const li =
                `<li>
                    <strong>${eolicPlant.cityName}</strong> :: <strong>${eolicPlant.progress}%</strong>
                </li>`;
            innerHTML = innerHTML.concat("\n", li);
        })
        eolicPlantsList.innerHTML = innerHTML;
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
            });
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