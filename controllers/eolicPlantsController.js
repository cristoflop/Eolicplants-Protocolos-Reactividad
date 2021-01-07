"use strict"

var eolicPlants = [
    {
        cityName: "Madrid",
        progress: 25
    },
    {
        cityName: "Paris",
        progress: 50
    }
];

function findAll(request, response) {
    response.status(200);
    response.json(eolicPlants);
}

function save(request, response) {
    const cityName = request.body.cityName;
    if (cityName !== undefined && cityName.trim() !== "") {
        response.status(200);
        const eolicPlant = {
            cityName: cityName.trim(),
            progress: 0
        }
        eolicPlants.push(eolicPlant);
        response.json(eolicPlants);
    } else {
        response.status(500);
    }
}

module.exports = {
    findAll,
    save
}