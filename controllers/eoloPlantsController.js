"use strict"

const mysql = require("mysql2/promise");
const config = require("../config.js");
const pool = mysql.createPool(config.dbConfig);

const DaoEoloPlants = require("../public/js/daoEoloPlants");
const daoEoloPlants = new DaoEoloPlants(pool);

const publisher = require("../amqp/newEoloPlantsPublisher");

async function findAll(request, response) {
    const eoloPlants = await daoEoloPlants.findAll();
    response.status(200);
    response.json(eoloPlants);
}

async function find(request, response) {
    const id = request.params.id;
    const eoloPlant = await daoEoloPlants.find(id);
    if (eoloPlant != null) {
        response.status(200);
        response.json(eoloPlant);
    } else {
        response.status(404);
        response.json({message: "Planta no encontrada"});
    }
}

async function remove(request, response) {
    const id = request.body.id;
    if (id !== undefined) {

        const eoloPlant = await daoEoloPlants.find(id);
        if (eoloPlant != null) {

            await daoEoloPlants.remove(eoloPlant.id);

            response.status(204);
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

        const searchedEoloPlant = await daoEoloPlants.findByName(city);
        if (searchedEoloPlant == null) {

            const eoloPlant = await daoEoloPlants.save(city);

            // mensaje a la cola de peticion de creacion
            const sent = await publisher.publish({id: eoloPlant.id, city: eoloPlant.city});
            console.log(`Se ha enviado la peticion de creacion: ${sent}`);

            response.status(200);
            response.json(eoloPlant);
        } else {
            response.status(412) // precondicion no cumplida, la planta ya existe en esa ciudad
            response.json({message: "La planta ya existe en esa ciudad"});
        }
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