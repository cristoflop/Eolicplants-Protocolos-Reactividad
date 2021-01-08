"use strict"

const DaoEoloPlants = require("../public/js/daoEoloPlants");
const daoEoloPlants = new DaoEoloPlants();

function findAll(request, response) {
    const eoloPlants = daoEoloPlants.findAll();
    response.status(200);
    response.json(eoloPlants);
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
    daoEoloPlants.remove(id);
    response.status(204);
    response.json({message: "Planta eolica correctamente borrada"});
}

module.exports = {
    findAll,
    save,
    remove
}