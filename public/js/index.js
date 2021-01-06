"use strict"

const config = require("../../config");
const url = `http://${config.dbConfig.host}/${config.port}`;
const socket = io.connect(url, {'forceNew': true});

socket.on('messages', function (data) {
    console.log(data);
});

function chargeEolicPlants() {
    // llamada ajax al servidor para recoger las plantas eolicas
}

window.onload = function () {
    chargeEolicPlants();
}