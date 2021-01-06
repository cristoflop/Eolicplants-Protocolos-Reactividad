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
    const cityName = request.body.cityName.trim();
    if (cityName !== "" && cityName !== undefined) {
        response.status(200);
        const eolicPlant = {
            cityName: cityName,
            progress: 0
        }
        eolicPlants.push(eolicPlant);
    } else {
        response.status(500);
    }
}

module.exports = {
    findAll,
    save
}