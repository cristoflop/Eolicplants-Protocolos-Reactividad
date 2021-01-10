"use strict"

const UUID = require("uuid");

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

    constructor(pool = undefined) {
        this.pool = pool;
        this.eoloPlants = [
            new EoloPlant("madrid", 25),
            new EoloPlant("paris", 50),
            new EoloPlant("lisboa", 100, true)
        ];
    }

    async findAll() {
        const query = "select * from eoloplants";
        const params = [];
        this.pool.getConnection(async (error, connection) => {
            if (error) {
                return [];
            }
            console.log("CONECTADO");
            const rows = await connection.query(query, params);
            if (rows.length === 0)
                return this.eoloPlants;
            console.log(rows);
            const eoloPlants = rows.map(row => mapToEoloPlant(row));
            return this.eoloPlants.concat(eoloPlants);
        });
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
        const uuid = UUID.v1();
        const query = `insert into eoloplants('id', 'city',)
                       values (?, ?)`;
        const params = [uuid, city];
        this.pool.getConnection(async (error, connection) => {
            if (error) {
                return null;
            }
            console.log("CONECTADO");
            const rows = await connection.query(query, params);
            if (rows.length === 0)
                return this.eoloPlants;
            console.log(rows);
            const eoloPlants = rows.map(row => mapToEoloPlant(row));
            return this.eoloPlants.concat(eoloPlants);
        });
        const eoloPlant = new EoloPlant(city);
        this.eoloPlants.push(eoloPlant);
        return eoloPlant;
    }

    remove(eoloPlant) {
        const index = this.eoloPlants.indexOf(eoloPlant);
        if (index > -1) this.eoloPlants.splice(index, 1);
    }

}

function mapToEoloPlant(row) {
    return {
        id: row.id,
        city: row.city,
        progress: row.progress,
        completed: row.completed,
        planning: row.planning
    }
}

module.exports = DaoEoloPlants;