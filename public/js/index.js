"use strict"

const socket = io();

socket.on("connection", () => {
    console.log("Nuevo cliente conectado! =]");
    rechargeEoloPlants();
});

socket.on("updatePlants", () => {
    rechargeEoloPlants();
});

socket.on("messageFromController", data => {
    console.log(`${data.message}`);
})

function addEoloPlant() {
    const city = document.getElementById("forCityName").value.trim();
    if (city === "") {
        alert("El nombre de la ciudad no puede ser vacio");
    } else {
        update("/api/eoloplants", {city: city})
            .then(eoloPlant => {
                socket.emit("updatePlants", {city: eoloPlant.city}); // envia evento al servidor para que los demas recarguen
            });
    }
}

function removeEoloPlant(buttonClicked) {
    const plantId = buttonClicked.value;
    if (plantId === undefined || plantId === "") {
        alert("Error en el id");
    } else {
        update("/api/eoloplants", {id: plantId}, "DELETE");
        socket.emit("updatePlants");
    }
}

function rechargeEoloPlants() {
    read("/api/eoloplants").then(eoloPlants => {
        const eoloPlantsList = document.getElementById("eolic-plants-list");
        eoloPlantsList.innerHTML = eoloPlants.map(eoloPlant => {
            return renderLiFromEoloPlant(eoloPlant);
        }).join("\n");
    });
}

function renderLiFromEoloPlant(eoloPlant) {
    // const completed = eoloPlant.completed ? `<strong>COMPLETADO</strong>` : "";
    const deleteButton =
        `<button onClick="removeEoloPlant(this)" class="btn btn-raised btn-danger" value="${eoloPlant.id}">Eliminar</button>`;
    return `<li class="mi-li mi-border shadow p-2 mb-2 bg-white rounded">
                <div id="eolic-plant-info"><strong>${eoloPlant.city}</strong> :: ${eoloPlant.progress}%</div>
                ${deleteButton}
            </li>`
}

function update(url, data, method = "POST") {
    return new Promise((resolve, reject) => {
        const headers = new Headers();
        headers.append("Content-type", "application/json");
        fetch(url, {
            "headers": headers,
            "method": method,
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