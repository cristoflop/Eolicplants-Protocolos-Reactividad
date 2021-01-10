"use strict"

const UUID = require("uuid");

class DaoEoloPlants {

    constructor(pool = undefined) {
        this.pool = pool;
    }

    async findAll() {
        const query = "select * from eoloplants";
        const params = [];
        const connection = await this.pool.getConnection();
        const [rows, fields] = await connection.execute(query, params);
        const eoloPlants = rows.map(row => mapToEoloPlant(row));
        await connection.close();
        return eoloPlants;

    }

    async find(id) {
        const query = "select * from eoloplants where id = ?";
        const params = [id];
        const connection = await this.pool.getConnection();
        const [rows, fields] = await connection.execute(query, params);
        const eoloPlants = rows.map(row => mapToEoloPlant(row));
        connection.close();
        return eoloPlants.length > 0 ? eoloPlants[0] : null;
    }

    async findByName(city) {
        const query = "select * from eoloplants where city = ?";
        const params = [city];
        const connection = await this.pool.getConnection();
        const [rows, fields] = await connection.execute(query, params);
        const eoloPlants = rows.map(row => mapToEoloPlant(row));
        connection.close();
        return eoloPlants.length > 0 ? eoloPlants[0] : null;
    }

    async save(city) {
        const id = UUID.v1();
        const query = "insert into eoloplants(id, city) values(?, ?)";
        const params = [id, city];
        const connection = await this.pool.getConnection();
        const [row, fields] = await connection.execute(query, params);
        connection.close();
        return mapToEoloPlant(row);
    }

    async remove(id) {
        const query = "delete from eoloplants where id = ?";
        const params = [id];
        const connection = await this.pool.getConnection();
        await connection.execute(query, params);
        connection.close();
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