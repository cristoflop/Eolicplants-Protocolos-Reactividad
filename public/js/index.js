"use strict"

const socket = io();

socket.on("connection", () => {
    console.log("Nuevo cliente conectado! =]");
    rechargeEoloPlants();
});

socket.on("updatePlants", () => {
    rechargeEoloPlants();
});

socket.on("enableBtn", () => {
    document.getElementById("add-btn").disabled = false;
});

function addEoloPlant() {
    const city = document.getElementById("forCityName").value.trim();
    if (city === "") {
        alert("El nombre de la ciudad no puede ser vacio");
    } else {
        save("/api/eoloplants", {city: city})
            .then(response => {
                if (response.status === 200) {
                    document.getElementById("add-btn").disabled = true;
                }
            });
    }
}

function removeEoloPlant(buttonClicked) {
    const plantId = buttonClicked.value;
    if (plantId === undefined || plantId === "") {
        alert("Error en el id");
    } else {
        remove("/api/eoloplants", {id: plantId});
        // socket.emit("updatePlants");
    }
}

function rechargeEoloPlants() {
    read("/api/eoloplants")
        .then(response => {
            const eoloPlantsList = document.getElementById("eolic-plants-list");
            eoloPlantsList.innerHTML = response.data.map(eoloPlant => {
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

/***********************************************************************************************************************************************/

async function read(url) {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const response = await fetch(url, {
        "headers": headers
    });
    const result = await response.json();
    return {
        status: response.status,
        data: result
    }
}

async function save(url, data) {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const response = await fetch(url, {
        "headers": headers,
        "method": "POST",
        "body": JSON.stringify(data)
    });
    return {
        status: response.status
    }
}

async function remove(url, data) {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const response = await fetch(url, {
        "headers": headers,
        "method": "DELETE",
        "body": JSON.stringify(data)
    });
    return {
        status: response.status
    }
}