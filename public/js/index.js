"use strict"

const socket = io();

socket.on("connection", iConnection => {
    console.log(`Conexion numero ${iConnection}`);
    // peticion para cargar las plantas eolicas
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
}