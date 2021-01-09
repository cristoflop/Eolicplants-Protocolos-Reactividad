"use strict"

const amqp = require("amqplib");

const CONN_URL = 'amqp://guest:guest@localhost';

async function publish(queueName, data) {
    try {
        const connection = await amqp.connect(CONN_URL);

        const chanel = await connection.createChannel();
        await chanel.assertQueue(queueName, {durable: true}); // por defecto durable es true siempre

        const json = JSON.stringify(data); // el objeto se envia en formato json

        const sent = await chanel.sendToQueue(queueName, Buffer.from(json)/*, {persistent: true}*/); // se persiste si durable es true

        return sent;
    } catch (error) {
        return false;
    }
}

module.exports = {
    publish
}