"use strict"

const DaoEoloPlants = require("../public/js/daoEoloPlants");
const daoEoloPlants = new DaoEoloPlants();

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

function save(request, response) {
    const city = request.body.city;
    if (city !== undefined && city.trim() !== "") {
        response.status(200);
        const eoloPlant = daoEoloPlants.save(city.trim());
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