"use strict"

const amqp = require("amqplib");

const CONN_URL = 'amqp://guest:guest@localhost';
const queueName = require("./rabbitQueueNames").eoloplantCreationRequests

async function publish(data) {
    const connection = await amqp.connect(CONN_URL);

    const chanel = await connection.createChannel();
    await chanel.assertQueue(queueName, {durable: true}); // por defecto durable es true siempre

    const json = JSON.stringify(data); // el objeto se envia en formato jsonno

    const sent = await chanel.sendToQueue(queueName, Buffer.from(json)/*, {persistent: true}*/); // se persiste si durable es true
}

module.exports = {
    publish
}