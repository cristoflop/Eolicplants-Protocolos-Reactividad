"use strict"

let nextId = 0;

class EoloPlant {

    constructor(city, progress = 0, completed = false) {
        this.id = nextId++;
        this.city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        this.progress = progress;
        this.completed = completed;
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

    save(city) {
        const eoloPlant = new EoloPlant(city);
        this.eoloPlants.push(eoloPlant);
        return eoloPlant;
    }

    remove(id) {
        const searchedEoloPlants = this.eoloPlants.filter(eoloPlant => eoloPlant.id === id);
        if (searchedEoloPlants.length > 0) {
            const index = this.eoloPlants.indexOf(searchedEoloPlants[0]);
            this.eoloPlants.splice(index, 1)
        }
    }

}

module.exports = DaoEoloPlants;