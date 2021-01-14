"use strict"

const amqp = require("amqplib/callback_api");
const daoEoloPlants = ""; // cogemos el dao y actualizamos la bd con la planta

const CONN_URL = 'amqp://guest:guest@localhost';
const queueName = "newEoloPlantsQueue";

function consume(io) {
    amqp.connect(CONN_URL, async function (err, connection) {
        const chanel = await connection.createChannel();

        chanel.assertQueue(queueName);

        chanel.consume(queueName, (buffer) => {
            const content = JSON.parse(buffer.content.toString());
            console.log(content);
            // guardar en bd
            // await dao.update(eoloPlant);
            // a los clientes de que actualicen
            io.sockets.emit("enableBtn");
            chanel.ack(buffer);
        });
    });
}

module.exports = {
    consume
}