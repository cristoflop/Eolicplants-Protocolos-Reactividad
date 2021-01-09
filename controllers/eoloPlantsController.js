"use strict"

const DaoEoloPlants = require("../public/js/daoEoloPlants");
const daoEoloPlants = new DaoEoloPlants();

const publisher = require("../amqp/newEoloPlantsPublisher");

/*
dentro de los metodos de los controller que necesiten emitir a los clientes
    let io = request.app.get("io");
    io.sockets.emit("messageFromController", {message: "Mensaje del controlador"});
*/

function findAll(request, response) {
    const eoloPlants = daoEoloPlants.findAll();
    response.status(200);
    response.json(eoloPlants);
}

function find(request, response) {
    const id = request.params.id;
    const eoloPlant = daoEoloPlants.find(id);
    if (eoloPlant != null) {
        response.status(200);
        response.json(eoloPlant);
    } else {
        response.status(404);
        response.json({message: "Planta no encontrada"});
    }
}

async function save(request, response) {
    const city = request.body.city.trim();
    if (city !== undefined && city !== "") {

        // mensaje a la cola de peticion de creacion
        const sent = await publisher.publish("newEoloPlantsQueue", {city: city});
        console.log(`Se ha enviado la peticion de creacion: ${sent}`);

        response.status(200);
        const eoloPlant = daoEoloPlants.save(city);
        response.json(eoloPlant);
    } else {
        response.status(400); // bad request
        response.json({message: "Nombre invalido"});
    }
}

function remove(request, response) {
    const id = request.body.id;
    if (id !== undefined) {
        const eoloPlant = daoEoloPlants.find(id);
        if (eoloPlant != null) {
            response.status(204);
            daoEoloPlants.remove(eoloPlant);
            response.json();
        } else {
            response.status(404);
            response.json({message: "Id no encontrado"});
        }
    } else {
        response.status(400);
        response.json({message: "Nombre invalido"});
    }
}

module.exports = {
    findAll,
    find,
    save,
    remove
}