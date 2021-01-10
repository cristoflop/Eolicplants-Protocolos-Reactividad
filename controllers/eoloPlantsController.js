"use strict"

const mysql = require("mysql");
const config = require("../config.js");
const pool = mysql.createPool(config.dbConfig);

const DaoEoloPlants = require("../public/js/daoEoloPlants");
const daoEoloPlants = new DaoEoloPlants(pool);

const publisher = require("../amqp/newEoloPlantsPublisher");

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

async function publish(request, response) {
    const city = request.body.city.trim().toLowerCase();
    if (city !== undefined && city !== "") {

        const eoloPlant = daoEoloPlants.save(city);

        // mensaje a la cola de peticion de creacion
        const sent = await publisher.publish({id: eoloPlant.id, city: eoloPlant.city});
        console.log(`Se ha enviado la peticion de creacion: ${sent}`);

        response.status(200);
        response.json(eoloPlant);
    } else {
        response.status(400); // bad request
        response.json({message: "Nombre invalido"});
    }
}

module.exports = {
    findAll,
    find,
    remove,
    publish
}