"use strict"

const UUID = require("uuid");
const mysql = require("mysql");

class EoloPlant {

    constructor(city, progress = 0, completed = false, planning = null) {
        this.id = UUID.v1();
        this.city = city.toLowerCase();
        this.progress = progress;
        this.completed = completed;
        this.planning = planning;
    }

}

class DaoEoloPlants {

    constructor() {
        this.eoloPlants = [
            new EoloPlant("madrid", 25),
            new EoloPlant("paris", 50),
            new EoloPlant("lisboa", 100, true)
        ];
    }

    findAll() {
        return this.eoloPlants;
    }

    find(id) {
        const searchedEoloPlants = this.eoloPlants.filter(eoloPlant => eoloPlant.id === id);
        return searchedEoloPlants.length > 0 ? searchedEoloPlants[0] : null;
    }

    findByName(city) {
        const searchedEoloPlants = this.eoloPlants.filter(eoloPlant => eoloPlant.city === city);
        return searchedEoloPlants.length > 0 ? searchedEoloPlants[0] : null;
    }

    save(city) {
        const eoloPlant = new EoloPlant(city);
        this.eoloPlants.push(eoloPlant);
        return eoloPlant;
    }

    remove(eoloPlant) {
        const index = this.eoloPlants.indexOf(eoloPlant);
        if (index > -1) this.eoloPlants.splice(index, 1);
    }

}

module.exports = DaoEoloPlants;