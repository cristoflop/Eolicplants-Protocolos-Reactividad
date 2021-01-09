"use strict"

const amqp = require("amqplib");

const CONN_URL = 'amqp://guest:guest@localhost';

async function consume(queueName) {
    try {
        const connection = await amqp.connect(CONN_URL);

        const chanel = await connection.createChannel();

        await chanel.assertQueue(queueName); // crea la cola si no existe y si existe no hace nada

        chanel.consume(queueName, (msg) => {
            const content = JSON.parse(msg.content.toString());
            chanel.ack(msg);
            console.log(content);
            return content;
        }); // , {noAck: true}); // noAck borra de la cola los mensajes una vez recibidos hay que evitarlo

        return null;
    } catch (error) {

    }
}

consume("newEoloPlantsQueue")
    .catch(err => {
        console.log("ERROR");
    });

module.exports = {
    consume
}